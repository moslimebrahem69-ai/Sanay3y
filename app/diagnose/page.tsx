"use client";
import { useEffect, useState } from "react";
import { CATEGORIES, WARRANTY } from "@/lib/brand";
import { saveItem } from "@/lib/history";
import type { HistoryItem } from "@/lib/types";
import ReportView from "@/components/ReportView";

const empty = { category: "", brand: "", model: "", warranty: "مش عارف", code: "", description: "" };

export default function Diagnose() {
  const [f, setF] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [item, setItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat");
    if (c && (CATEGORIES as readonly string[]).includes(c)) setF((p) => ({ ...p, category: c }));
  }, []);

  const set = (k: keyof typeof empty, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!f.category) return setError("اختر نوع الجهاز الأول.");
    if (f.description.trim().length < 10) return setError("اوصف العطل بجملتين على الأقل.");
    setLoading(true);
    try {
      const res = await fetch("/api/diagnose", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "حدث خطأ، جرّب تاني.");
      const it: HistoryItem = { id: Date.now().toString(36), createdAt: Date.now(), category: f.category, brand: f.brand, model: f.model, warranty: f.warranty, description: f.description.trim(), report: data.report };
      saveItem(it);
      setItem(it);
      window.scrollTo({ top: 0 });
    } catch (err: any) {
      setError(err?.message || "حدث خطأ، جرّب تاني.");
    } finally {
      setLoading(false);
    }
  }

  if (item) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <ReportView item={item} />
        <button className="btn btn-line mt-6 no-print" onClick={() => { setItem(null); setF(empty); }}>تشخيص جهاز تاني</button>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-3xl">تشخيص عطل</h1>
      <p className="mt-2 text-steel">كل ما كان الوصف أدق، كان التقرير أفيد.</p>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <fieldset>
          <legend className="font-bold mb-2">1. نوع الجهاز</legend>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button type="button" key={c} onClick={() => set("category", c)} aria-pressed={f.category === c}
                className={`border-2 border-ink px-3 py-2 font-semibold ${f.category === c ? "bg-ink text-white" : "bg-white hover:bg-signal/30"}`}>{c}</button>
            ))}
          </div>
        </fieldset>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block"><span className="block font-bold mb-1">الماركة (اختياري)</span><input className="input" value={f.brand} onChange={(e) => set("brand", e.target.value)} placeholder="مثال: كاريير" /></label>
          <label className="block"><span className="block font-bold mb-1">الموديل (اختياري)</span><input className="input" value={f.model} onChange={(e) => set("model", e.target.value)} /></label>
          <label className="block"><span className="block font-bold mb-1">الضمان</span>
            <select className="input" value={f.warranty} onChange={(e) => set("warranty", e.target.value)}>{WARRANTY.map((w) => <option key={w}>{w}</option>)}</select></label>
          <label className="block"><span className="block font-bold mb-1">كود الخطأ لو ظاهر (اختياري)</span><input className="input" dir="ltr" value={f.code} onChange={(e) => set("code", e.target.value)} placeholder="E4" /></label>
        </div>

        <label className="block">
          <span className="block font-bold mb-1">2. وصف العطل</span>
          <textarea className="input min-h-36" value={f.description} onChange={(e) => set("description", e.target.value)} maxLength={1500}
            placeholder="مثال: التكييف بيشتغل بس مش بيبرّد، والوحدة الخارجية بتعمل صوت طقطقة وبتفصل بعد دقيقتين." />
          <span className="text-xs text-steel">{f.description.length}/1500</span>
        </label>

        {error && <p role="alert" className="border-2 border-red-700 bg-red-50 text-red-900 p-3 font-semibold">{error}</p>}
        <button className="btn btn-signal text-lg w-full sm:w-auto" disabled={loading}>{loading ? "بنحلل العطل... (لحظات)" : "شخّص العطل"}</button>
      </form>
    </main>
  );
}
