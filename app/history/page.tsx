"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { clearHistory, loadHistory, removeItem } from "@/lib/history";
import { SEV, type HistoryItem } from "@/lib/types";
import ReportView from "@/components/ReportView";

export default function History() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => { setItems(loadHistory()); setReady(true); }, []);

  const stats = useMemo(() => {
    const cats: Record<string, number> = {};
    items.forEach((i) => (cats[i.category] = (cats[i.category] || 0) + 1));
    const top = Object.entries(cats).sort((a, b) => b[1] - a[1]);
    return { top, critical: items.filter((i) => i.report.severity === "critical").length, high: items.filter((i) => i.report.severity === "high").length };
  }, [items]);

  if (!ready) return null;
  const selected = items.find((i) => i.id === open);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-3xl">سجلّ التشخيصات</h1>
      <p className="mt-2 text-steel">محفوظ في متصفحك بس (آخر 50 تقرير)، ومش بيتبعت لأي حد.</p>

      {items.length === 0 ? (
        <div className="ticket p-8 mt-8 text-center">
          <p className="font-bold text-lg">لسه معملتش أي تشخيص.</p>
          <Link href="/diagnose" className="btn btn-signal mt-4">ابدأ أول تشخيص</Link>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            <div className="ticket p-4"><p className="text-sm text-steel">إجمالي التقارير</p><p className="font-display font-extrabold text-3xl">{items.length}</p></div>
            <div className="ticket p-4"><p className="text-sm text-steel">خطورة مرتفعة</p><p className="font-display font-extrabold text-3xl">{stats.high}</p></div>
            <div className="ticket p-4"><p className="text-sm text-steel">خطورة حرجة</p><p className="font-display font-extrabold text-3xl">{stats.critical}</p></div>
          </div>

          <section className="mt-8">
            <h2 className="font-display font-bold text-xl">الأجهزة الأكثر تشخيصاً</h2>
            <div className="mt-3 space-y-2">
              {stats.top.map(([c, n]) => (
                <div key={c} className="flex items-center gap-3 text-sm">
                  <span className="w-32 shrink-0 font-semibold">{c}</span>
                  <div className="flex-1 bg-white border-2 border-ink h-5"><div className="h-full bg-signal" style={{ width: `${(n / items.length) * 100}%` }} /></div>
                  <span className="w-6">{n}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border-2 border-ink bg-white">
              <thead className="bg-ink text-white"><tr><th className="p-2 text-start">التاريخ</th><th className="p-2 text-start">الجهاز</th><th className="p-2 text-start">الخطورة</th><th className="p-2" /></tr></thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-t-2 border-ink/20">
                    <td className="p-2">{new Date(i.createdAt).toLocaleDateString("ar-EG")}</td>
                    <td className="p-2 font-semibold">{i.category} {i.brand}</td>
                    <td className="p-2"><span className={`border px-2 py-0.5 text-xs font-bold ${SEV[i.report.severity].cls}`}>{SEV[i.report.severity].label}</span></td>
                    <td className="p-2 whitespace-nowrap">
                      <button className="font-bold underline me-3" onClick={() => setOpen(open === i.id ? null : i.id)}>{open === i.id ? "إخفاء" : "عرض"}</button>
                      <button className="text-red-800 underline" onClick={() => { removeItem(i.id); setItems(loadHistory()); if (open === i.id) setOpen(null); }}>حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {selected && <div className="mt-8"><ReportView item={selected} /></div>}
          <button className="btn btn-line mt-8 no-print" onClick={() => confirm("هتمسح كل التقارير المحفوظة. متأكد؟") && (clearHistory(), setItems([]), setOpen(null))}>مسح كل السجل</button>
        </>
      )}
    </main>
  );
}
