import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "مقالات الصيانة | صنايعي",
  description: "دلائل عملية لفحص أعطال التكييف والثلاجة والغسالة وقواعد السلامة الكهربائية.",
  alternates: { canonical: "/guides" },
};

export default function Guides() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-3xl">مقالات الصيانة</h1>
      <ul className="mt-8 space-y-5">
        {guides.map((g) => (
          <li key={g.slug} className="ticket p-5">
            <Link href={`/guides/${g.slug}`} className="font-display font-bold text-xl hover:underline">{g.title}</Link>
            <p className="mt-2 text-steel">{g.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
