export type Severity = "low" | "medium" | "high" | "critical";
export type Report = {
  safety: string[]; causes: string[]; steps: string[]; tools: string[]; repair: string[];
  severity: Severity; cost: string; time: string; preventive: string[]; proHelp: string; questions: string[];
};
export type HistoryItem = {
  id: string; createdAt: number; category: string; brand: string; model: string; warranty: string; description: string; report: Report;
};
export const SEV: Record<Severity, { label: string; cls: string }> = {
  low: { label: "منخفض", cls: "bg-emerald-100 text-emerald-900 border-emerald-700" },
  medium: { label: "متوسط", cls: "bg-sky-100 text-sky-900 border-sky-700" },
  high: { label: "مرتفع", cls: "bg-orange-100 text-orange-900 border-orange-700" },
  critical: { label: "حرج", cls: "bg-red-100 text-red-900 border-red-700" },
};
