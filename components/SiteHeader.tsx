import Link from "next/link";
import { BRAND } from "@/lib/brand";

const nav: [string, string][] = [["/", "الرئيسية"], ["/diagnose", "تشخيص"], ["/history", "سجلّي"], ["/faq", "أسئلة"], ["/contact", "تواصل"]];

export default function SiteHeader() {
  return (
    <header className="no-print bg-ink text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-display font-extrabold text-2xl tracking-tight">
          {BRAND.name}<span className="text-signal text-sm ms-2 font-semibold" dir="ltr">{BRAND.latin}</span>
        </Link>
        <nav className="flex gap-4 overflow-x-auto text-sm font-semibold whitespace-nowrap">
          {nav.map(([href, label]) => <Link key={href} href={href} className="hover:text-signal py-1">{label}</Link>)}
        </nav>
      </div>
      <div className="hazard" />
    </header>
  );
}
