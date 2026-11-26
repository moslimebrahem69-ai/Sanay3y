import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "تشخيص عطل جهاز | صنايعي",
  description: "اختر نوع الجهاز واوصف العطل واحصل على تقرير بالأسباب وخطوات الفحص والإصلاح وتقدير التكلفة.",
  alternates: { canonical: "/diagnose" },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
