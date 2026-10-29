import type { Metadata } from "next";
import { Caveat, Inter, Roboto_Slab } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MediaProvider } from "@/contexts/MediaContext";
import { FloatingContact } from "@/components/floating-contact";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import "./globals.css";

// Rus tili uchun kirill harflari ham yuklanadi
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const slab = Roboto_Slab({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-slab",
});
const script = Caveat({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  // OG/Twitter rasmlarining to'liq manzili shu asosda quriladi
  metadataBase: new URL(SITE_URL),
  title:
    "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
  description:
    "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar. 9+ yillik tajriba, 1500+ muvaffaqiyatli loyiha.",
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
    url: "/",
    title:
      "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
    description:
      "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar.",
    siteName: "UZ GROW",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
    description:
      "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar.",
    images: [OG_IMAGE.url],
    creator: "@UZ GROW",
    site: "@UZ GROW",
  },
  // canonical bu yerda BERILMAYDI: u barcha sahifalarga meros bo'lib
  // o'tadi. Har sahifa o'zinikini lib/seo.ts dagi pageMeta() orqali oladi.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${slab.variable} ${script.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <MediaProvider>{children}</MediaProvider>
          <FloatingContact />
        </LanguageProvider>
        {/* Analitika skripti faqat Vercel'da mavjud. Render yoki lokal
            muhitda u /_vercel/insights/script.js ni topolmay, har bir
            sahifada konsolga 404 xatosi yozadi — shuning uchun shart. */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV && <Analytics />}
      </body>
    </html>
  );
}
