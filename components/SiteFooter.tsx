import { BRAND, LINKS, WA_DISPLAY, waLink } from "@/lib/brand";

export default function SiteFooter() {
  return (
    <footer className="no-print bg-ink text-white/80 mt-20">
      <div className="hazard" />
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6 text-sm">
        <div>
          <p className="font-display font-bold text-white text-lg">{BRAND.name} — {BRAND.tagline}</p>
          <p className="mt-2 max-w-prose">التشخيص بيتولّد بالذكاء الاصطناعي وهو إرشادي وتقريبي، ومش بديل عن فحص فني متخصص. الأعمال الكهربائية والغازات خطر، فاتبع إجراءات السلامة.</p>
        </div>
        <div className="md:text-end space-y-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="block font-bold text-signal" dir="ltr">WhatsApp {WA_DISPLAY}</a>
          <p>تطوير: مسلم إبراهيم</p>
          <p className="flex gap-4 md:justify-end">
            {Object.entries(LINKS).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="hover:text-signal capitalize">{k}</a>)}
          </p>
        </div>
      </div>
    </footer>
  );
}
