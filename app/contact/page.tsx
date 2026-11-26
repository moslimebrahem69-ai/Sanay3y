import type { Metadata } from "next";
import { LINKS, WA_DISPLAY, waLink } from "@/lib/brand";

export const metadata: Metadata = { title: "تواصل معنا | صنايعي", description: "تواصل مباشرة على واتساب.", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-3xl">تواصل معنا</h1>
      <p className="mt-3 text-lg">أسرع طريقة واتساب. ابعت وصف العطل وصورة لو متاحة.</p>
      <div className="ticket p-6 mt-6">
        <p className="text-sm text-steel">رقم واتساب</p>
        <p className="font-display font-extrabold text-3xl" dir="ltr">{WA_DISPLAY}</p>
        <a href={waLink("السلام عليكم، عندي استفسار عن الصيانة")} target="_blank" rel="noopener noreferrer" className="btn btn-signal mt-4">ابدأ محادثة واتساب</a>
      </div>
      <p className="mt-8 font-bold">المطوّر: مسلم إبراهيم</p>
      <p className="mt-2 flex flex-wrap gap-3">
        {Object.entries(LINKS).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="btn btn-line capitalize">{k}</a>)}
      </p>
    </main>
  );
}
