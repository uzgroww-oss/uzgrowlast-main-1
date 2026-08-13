import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MediaProvider } from "@/contexts/MediaContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  // OG/Twitter rasmlarining to'liq manzili shu asosda quriladi
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://uzgrow.uz",
  ),
  title:
    "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
  description:
    "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar. 9+ yillik tajriba, 2000+ muvaffaqiyatli loyiha.",
  keywords: [
    "issiqxona qurish",
    "agro-injiniring",
    "qishloq xo'jaligi",
    "UZ GROW",
    "issiqxona turlari",
    "polikarbonat issiqxona",
    "gidroponik",
    "agrobiznes",
    "O'zbekiston",
    "Toshkent",
    "issiqxona narxlari",
    "qurilish materiallari",
  ],
  authors: [{ name: "Rustamjon Rahmonov" }],
  creator: "UZ GROW Agro-Injiniring",
  publisher: "UZ GROW",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://uzgrow.uz",
    title:
      "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
    description:
      "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar.",
    siteName: "UZ GROW",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "UZ GROW Agro-Injiniring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
    description:
      "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar.",
    images: ["/images/logo.png"],
    creator: "@UZ GROW",
    site: "@UZ GROW",
  },
  // Til URL orqali emas, brauzerda almashtiriladi — shuning uchun har bir til
  // uchun alohida manzil yo'q va hreflang e'lon qilinmaydi.
  alternates: {
    canonical: "https://uzgrow.uz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <MediaProvider>{children}</MediaProvider>
        </LanguageProvider>
        {/* Analitika skripti faqat Vercel'da mavjud. Render yoki lokal
            muhitda u /_vercel/insights/script.js ni topolmay, har bir
            sahifada konsolga 404 xatosi yozadi — shuning uchun shart. */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV && <Analytics />}
      </body>
    </html>
  );
}
