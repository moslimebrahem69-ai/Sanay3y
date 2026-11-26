import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "أسئلة شائعة | صنايعي", description: "إجابات عن دقة التشخيص، الخصوصية، والتكلفة.", alternates: { canonical: "/faq" } };

const faqs: [string, string][] = [
  ["التشخيص دقيق قد إيه؟", "التقرير تقدير إرشادي مبني على وصفك للعطل، ومش فحص فعلي للجهاز. بيرتّب الأسباب الأرجح علشان توفّر وقت، لكن التأكد النهائي بيكون بالقياس والفحص."],
  ["هل أقدر أصلّح بنفسي؟", "الأعطال البسيطة (فلاتر، توصيلات، تنظيف) ممكن. أي حاجة فيها كهرباء عالية أو غاز تبريد أو ضغط، سيبها لفني متخصص. وفي التقرير قسم سلامة وقسم بيقولك متى تستدعي فني."],
  ["إزاي بتتحسب التكلفة؟", "تقدير تقريبي بالجنيه المصري ممكن يختلف حسب المنطقة وقطع الغيار والفني. اعتبره نقطة بداية للتفاوض مش سعر نهائي."],
  ["بياناتي بتتخزن فين؟", "السجل محفوظ في متصفحك بس. وصف العطل بيتبعت لخدمة Google Gemini وقت التشخيص علشان يتولّد التقرير، فمتكتبش بيانات شخصية حساسة."],
  ["هل الخدمة مجانية؟", "أيوه، ومفيش تسجيل. ممكن يكون فيه حد لعدد الطلبات في الفترة الواحدة."],
  ["لو محتاج مهندس يشوف الحالة؟", "ابعت التقرير على واتساب بزرار \"اسأل مهندس\" وهيتفتح معاك رسالة جاهزة."],
];

export default function FAQ() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-3xl">أسئلة شائعة</h1>
      <div className="mt-6 space-y-3">
        {faqs.map(([q, a]) => (
          <details key={q} className="ticket p-4 group">
            <summary className="font-bold cursor-pointer">{q}</summary>
            <p className="mt-3 leading-loose text-steel">{a}</p>
          </details>
        ))}
      </div>
      <Link href="/diagnose" className="btn btn-signal mt-8">ابدأ التشخيص</Link>
    </main>
  );
}
