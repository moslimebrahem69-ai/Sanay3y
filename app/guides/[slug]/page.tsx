import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guides, getGuide } from "@/lib/guides";

export function generateStaticParams() { return guides.map((g) => ({ slug: g.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  return { title: `${g.title} | صنايعي`, description: g.description, alternates: { canonical: `/guides/${g.slug}` } };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, inLanguage: "ar", author: { "@type": "Person", name: "مسلم إبراهيم" } };
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/guides" className="font-bold">← المقالات</Link>
      <article className="mt-6">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl leading-tight">{g.title}</h1>
        <p className="mt-3 text-lg text-steel">{g.description}</p>
        {g.sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="font-display font-bold text-2xl">{s.h}</h2>
            {s.p.map((p, i) => <p key={i} className="mt-3 leading-loose text-lg">{p}</p>)}
          </section>
        ))}
        <div className="ticket p-6 mt-12">
          <p className="font-display font-bold text-xl">لسه المشكلة مستمرة؟</p>
          <p className="mt-1 text-steel">اوصف العطل بالتفصيل واحصل على تقرير مخصص لحالتك.</p>
          <Link href={`/diagnose?cat=${encodeURIComponent(g.cat)}`} className="btn btn-signal mt-4">شخّص العطل</Link>
        </div>
        <p className="mt-6 text-sm text-steel">المقال إرشادي عام، ومش بديل عن فحص فني متخصص. التزم بإجراءات السلامة.</p>
      </article>
    </main>
  );
}
