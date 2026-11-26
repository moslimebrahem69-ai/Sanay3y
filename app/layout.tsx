import type { Metadata } from "next";
import { Readex_Pro, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";

const display = Readex_Pro({ subsets: ["arabic", "latin"], variable: "--font-display", display: "swap" });
const body = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "صنايعي | شخّص عطل جهازك بالذكاء الاصطناعي",
  description: "اوصف عطل جهازك (تكييف، ثلاجة، غسالة، لوحة كهربائية...) واحصل على تقرير: الأسباب المحتملة، خطوات الفحص، الأدوات، وتقدير التكلفة.",
  openGraph: { title: "صنايعي — شخّص العطل قبل ما تدفع", description: "تقرير تشخيص إرشادي لأعطال الأجهزة بالذكاء الاصطناعي.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${display.variable} ${body.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
