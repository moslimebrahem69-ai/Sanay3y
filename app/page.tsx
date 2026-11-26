import Link from "next/link";
import { CATEGORIES, waLink } from "@/lib/brand";

const steps: [string, string][] = [
  ["اوصف العطل", "اختار نوع الجهاز واكتب اللي بيحصل بالعامية، زي ما بتحكيه لفني."],
  ["استلم التقرير", "أسباب مرتبة من الأرجح، خطوات فحص، أدوات، تقدير تكلفة، ونصايح سلامة."],
  ["قرّر", "صلّح بنفسك لو بسيطة، أو ابعت التقرير لمهندس على واتساب."],
];

export default function Home() {
  return (
    <main>
      <section className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight">شخّص العطل<br />قبل ما تدفع للفني</h1>
            <p className="mt-5 text-lg text-white/80 max-w-prose">اوصف مشكلة جهازك وخد في ثواني تقرير مرتب: الأسباب المحتملة، خطوات الفحص، الأدوات المطلوبة، وتقدير للتكلفة.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/diagnose" className="btn btn-signal text-lg">ابدأ التشخيص</Link>
              <a href={waLink("السلام عليكم، عندي استفسار عن الصيانة")} target="_blank" rel="noopener noreferrer" className="btn btn-line text-lg">اسأل على واتساب</a>
            </div>
          </div>
          <div className="ticket text-ink p-0 rotate-[-1.5deg]" aria-label="مثال توضيحي لتقرير">
            <div className="p-4 flex justify-between items-start">
              <div><p className="text-xs text-steel">أمر تشخيص · مثال توضيحي</p><p className="font-display font-extrabold text-xl">تكييف — لا يبرّد</p></div>
              <span className="border-2 border-orange-700 bg-orange-100 text-orange-900 px-2 py-0.5 text-sm font-bold">مرتفع</span>
            </div>
            <div className="perf" />
            <div className="p-4 text-sm space-y-2">
              <p className="font-bold">الأسباب المحتملة</p>
              <ol className="list-decimal ms-5 space-y-1"><li>نقص أو تسريب غاز التبريد</li><li>عطل في مكثف تشغيل الضاغط</li><li>انسداد فلتر أو ملف المبخّر</li></ol>
              <div className="flex gap-2 pt-2"><span className="border-2 border-ink px-2 py-1">كلامب أمبير</span><span className="border-2 border-ink px-2 py-1">عداد ضغط</span></div>
            </div>
          </div>
        </div>
        <div className="hazard" />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="font-display font-extrabold text-3xl">بتشخّص إيه؟</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/diagnose?cat=${encodeURIComponent(c)}`} className="border-2 border-ink bg-white px-4 py-3 font-bold hover:bg-signal transition-colors">{c}</Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="font-display font-extrabold text-3xl">بتشتغل إزاي</h2>
        <ol className="mt-6 grid md:grid-cols-3 gap-6">
          {steps.map(([h, d], i) => (
            <li key={h} className="ticket p-5"><span className="font-display font-extrabold text-4xl text-signal" style={{ WebkitTextStroke: "1.5px #15181D" }}>{i + 1}</span>
              <h3 className="font-display font-bold text-xl mt-2">{h}</h3><p className="mt-2 text-steel leading-relaxed">{d}</p></li>
          ))}
        </ol>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="border-2 border-ink bg-signal/20 p-6">
          <h2 className="font-display font-bold text-2xl">حدود الأداة</h2>
          <p className="mt-2 leading-loose max-w-3xl">التقرير تقدير إرشادي مبني على وصفك، مش فحص فعلي. الكهرباء العالية وغاز التبريد والأجزاء الدوّارة خطر حقيقي، فلو مش متأكد سيب الشغل لفني متخصص.</p>
        </div>
      </section>
    </main>
  );
}
