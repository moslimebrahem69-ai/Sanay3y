import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الخصوصية | صنايعي", alternates: { canonical: "/privacy" } };

const items: [string, string][] = [
  ["السجل المحفوظ", "تقارير التشخيص تُحفظ في متصفحك فقط (localStorage) على جهازك، ولا نخزنها على خوادمنا، ويمكنك حذفها من صفحة السجل في أي وقت."],
  ["وصف العطل والذكاء الاصطناعي", "عند طلب التشخيص يُرسل نوع الجهاز والماركة والموديل ووصف العطل إلى خدمة Google Gemini لتوليد التقرير. لا تكتب بيانات شخصية أو حساسة في الوصف."],
  ["الحد من الاستخدام", "نستخدم عنوان IP بشكل مؤقت في ذاكرة الخادم لتحديد عدد الطلبات ومنع إساءة الاستخدام، ولا نحتفظ به."],
  ["واتساب", "أزرار واتساب تفتح تطبيقاً خارجياً بنص جاهز تقرر أنت إرساله أو لا. تسري عليه سياسة خصوصية واتساب."],
  ["الإعلانات وملفات الارتباط", "قد يعرض الموقع إعلانات من أطراف ثالثة مثل Google AdSense، وقد تستخدم ملفات تعريف الارتباط لعرض إعلانات مناسبة. يمكنك إدارتها من إعدادات متصفحك أو إعدادات الإعلانات في حسابك على Google."],
  ["التواصل", "لأي استفسار تواصل مع المطور مسلم إبراهيم عبر واتساب 01017098353."],
];

export default function Privacy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-3xl">سياسة الخصوصية</h1>
      {items.map(([h, p]) => <section key={h} className="mt-6"><h2 className="font-display font-bold text-xl">{h}</h2><p className="mt-2 leading-loose">{p}</p></section>)}
    </main>
  );
}
