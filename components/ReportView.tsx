"use client";
import { SEV, type HistoryItem } from "@/lib/types";
import { waLink } from "@/lib/brand";

function List({ title, items, ordered }: { title: string; items: string[]; ordered?: boolean }) {
  if (!items.length) return null;
  const Tag = ordered ? "ol" : "ul";
  return (
    <section className="mt-6">
      <h3 className="font-display font-bold text-xl">{title}</h3>
      <Tag className={`${ordered ? "list-decimal" : "list-disc"} ms-6 mt-2 space-y-2 leading-loose`}>
        {items.map((x, i) => <li key={i}>{x}</li>)}
      </Tag>
    </section>
  );
}

export default function ReportView({ item }: { item: HistoryItem }) {
  const r = item.report;
  const sev = SEV[r.severity];
  const no = `A-${item.id.slice(-5).toUpperCase()}`;
  const date = new Date(item.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
  const summary = `تقرير تشخيص (${no})\nالجهاز: ${item.category} ${item.brand} ${item.model}\nالعطل: ${item.description}\nأرجح الأسباب:\n${r.causes.slice(0, 3).map((c, i) => `${i + 1}. ${c}`).join("\n")}\nالتكلفة التقريبية: ${r.cost}`;

  return (
    <article className="ticket">
      <div className="p-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-steel">أمر تشخيص <span dir="ltr" className="font-bold">{no}</span> · {date}</p>
          <h2 className="font-display font-extrabold text-2xl mt-1">{item.category}{item.brand && ` — ${item.brand}`}{item.model && ` ${item.model}`}</h2>
          <p className="text-sm mt-1">{item.warranty}</p>
        </div>
        <span className={`border-2 px-3 py-1 font-bold ${sev.cls}`}>الخطورة: {sev.label}</span>
      </div>
      <div className="perf" />
      <div className="p-5">
        <p className="bg-paper border-s-4 border-ink p-3"><strong>وصف العطل: </strong>{item.description}</p>

        {r.safety.length > 0 && (
          <section className="mt-6 bg-signal/20 border-2 border-ink p-4">
            <h3 className="font-display font-bold text-xl">قبل ما تبدأ: السلامة أولاً</h3>
            <ul className="list-disc ms-6 mt-2 space-y-1.5 leading-loose">{r.safety.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </section>
        )}

        <List title="الأسباب المحتملة (من الأرجح للأقل)" items={r.causes} ordered />
        <List title="خطوات الفحص" items={r.steps} ordered />
        {r.tools.length > 0 && (
          <section className="mt-6">
            <h3 className="font-display font-bold text-xl">الأدوات المطلوبة</h3>
            <div className="flex flex-wrap gap-2 mt-2">{r.tools.map((x, i) => <span key={i} className="border-2 border-ink px-2.5 py-1 text-sm bg-paper">{x}</span>)}</div>
          </section>
        )}
        <List title="خطوات الإصلاح" items={r.repair} ordered />

        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          <div className="border-2 border-ink p-3"><p className="text-sm text-steel">التكلفة التقريبية</p><p className="font-bold text-lg">{r.cost}</p></div>
          <div className="border-2 border-ink p-3"><p className="text-sm text-steel">الوقت المتوقع</p><p className="font-bold text-lg">{r.time}</p></div>
        </div>
        <p className="text-xs text-steel mt-2">التكلفة تقدير عام وبتختلف حسب المنطقة وقطع الغيار والفني.</p>

        <List title="إزاي تتجنب العطل ده تاني" items={r.preventive} />
        {r.proHelp && <p className="mt-6 border-2 border-ink p-4 bg-red-50"><strong>متى تستدعي فني متخصص: </strong>{r.proHelp}</p>}
        {r.questions.length > 0 && <List title="معلومات لو وفّرتها هيبقى التشخيص أدق" items={r.questions} />}
      </div>
      <div className="perf" />
      <div className="no-print p-5 flex flex-wrap gap-3">
        <button className="btn btn-ink" onClick={() => window.print()}>طباعة / حفظ PDF</button>
        <a className="btn btn-line" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(summary)}`}>مشاركة واتساب</a>
        <a className="btn btn-signal" target="_blank" rel="noopener noreferrer" href={waLink(`${summary}\n\nعايز رأي مهندس في الحالة دي.`)}>اسأل مهندس على واتساب</a>
      </div>
      <p className="px-5 pb-5 text-xs text-steel">تقرير إرشادي مولّد بالذكاء الاصطناعي، مش بديل عن الفحص الفعلي.</p>
    </article>
  );
}
