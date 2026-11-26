import type { HistoryItem } from "./types";
const KEY = "sanay3y-history-v1";
export function loadHistory(): HistoryItem[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(h: HistoryItem[]) { try { localStorage.setItem(KEY, JSON.stringify(h)); } catch {} }
export const saveItem = (i: HistoryItem) => write([i, ...loadHistory()].slice(0, 50));
export const removeItem = (id: string) => write(loadHistory().filter((x) => x.id !== id));
export const clearHistory = () => write([]);
