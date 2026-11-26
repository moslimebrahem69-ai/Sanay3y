import { NextRequest, NextResponse } from "next/server";
import { CATEGORIES, WARRANTY } from "@/lib/brand";

export const runtime = "nodejs";
export const maxDuration = 30;

const hits = new Map<string, { n: number; t: number }>();
const LIMIT = 15, WINDOW = 10 * 60 * 1000;
function limited(ip: string) {
  const now = Date.now(), h = hits.get(ip);
  if (!h || now - h.t > WINDOW) { hits.set(ip, { n: 1, t: now }); return false; }
  return ++h.n > LIMIT;
}

const SYSTEM = `أنت مهندس صيانة خبير بالأجهزة المنزلية والكهربائية والصناعية، وتخاطب فنيين وأصحاب أجهزة في مصر.
اكتب بالعربية الواضحة. رتّب الأسباب من الأكثر احتمالاً للأقل. ابدأ دائماً بإجراءات السلامة (فصل الكهرباء، الجهد العالي، الغازات، الأجزاء الدوّارة...).
لا تخترع أكواد أعطال أو مواصفات خاصة بموديل معين إذا لم تكن متأكداً. إذا كانت المعلومات غير كافية فاذكر ذلك واطرح حتى 3 أسئلة توضيحية.
قدّر التكلفة بالجنيه المصري كنطاق تقريبي، وبيّن في حقل proHelp متى يجب التوقف واستدعاء فني متخصص.`;

const SCHEMA = {
  type: "OBJECT",
  properties: {
    safety: { type: "ARRAY", items: { type: "STRING" } }, causes: { type: "ARRAY", items: { type: "STRING" } },
    steps: { type: "ARRAY", items: { type: "STRING" } }, tools: { type: "ARRAY", items: { type: "STRING" } },
    repair: { type: "ARRAY", items: { type: "STRING" } }, severity: { type: "STRING", enum: ["low", "medium", "high", "critical"] },
    cost: { type: "STRING" }, time: { type: "STRING" }, preventive: { type: "ARRAY", items: { type: "STRING" } },
    proHelp: { type: "STRING" }, questions: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: ["safety", "causes", "steps", "tools", "repair", "severity", "cost", "time", "preventive", "proHelp", "questions"],
};

const arr = (v: unknown) => (Array.isArray(v) ? v.map(String).slice(0, 8) : []);
const err = (m: string, s: number) => NextResponse.json({ error: m }, { status: s });

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return err("الخدمة غير مفعّلة حالياً (مفتاح الذكاء الاصطناعي غير مضبوط على السيرفر).", 500);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (limited(ip)) return err("عدد الطلبات كبير، جرّب بعد دقائق.", 429);

  let b: any;
  try { b = await req.json(); } catch { return err("طلب غير صالح.", 400); }
  const description = String(b?.description ?? "").trim();
  if (!(CATEGORIES as readonly string[]).includes(b?.category)) return err("اختر نوع الجهاز.", 400);
  if (description.length < 10 || description.length > 1500) return err("اكتب وصفاً للعطل بين 10 و1500 حرف.", 400);
  const warranty = (WARRANTY as readonly string[]).includes(b?.warranty) ? b.warranty : "مش عارف";
  const brand = String(b?.brand ?? "").slice(0, 80), model = String(b?.model ?? "").slice(0, 80), code = String(b?.code ?? "").slice(0, 60);

  const user = `نوع الجهاز: ${b.category}\nالماركة: ${brand || "غير محدد"}\nالموديل: ${model || "غير محدد"}\nالضمان: ${warranty}\nكود الخطأ الظاهر: ${code || "لا يوجد"}\nوصف العطل: ${description}`;
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM }] }, contents: [{ parts: [{ text: user }] }],
    generationConfig: { responseMimeType: "application/json", responseSchema: SCHEMA },
  });

  let delay = 800;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key }, body,
      });
      if (r.ok) {
        const data = await r.json();
        const p = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}");
        const sev = ["low", "medium", "high", "critical"].includes(p.severity) ? p.severity : "medium";
        return NextResponse.json({ report: {
          safety: arr(p.safety), causes: arr(p.causes), steps: arr(p.steps), tools: arr(p.tools), repair: arr(p.repair),
          severity: sev, cost: String(p.cost ?? ""), time: String(p.time ?? ""), preventive: arr(p.preventive),
          proHelp: String(p.proHelp ?? ""), questions: arr(p.questions).slice(0, 3),
        } });
      }
      if (r.status !== 429 && r.status < 500) break;
    } catch {}
    await new Promise((res) => setTimeout(res, delay));
    delay *= 2;
  }
  return err("تعذّر الحصول على التشخيص الآن، جرّب مرة أخرى بعد قليل.", 502);
}
