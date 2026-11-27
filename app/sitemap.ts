import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/diagnose", "/guides", ...guides.map((g) => `/guides/${g.slug}`), "/faq", "/contact", "/privacy"].map((p) => ({ url: base + p, lastModified: new Date() }));
}
