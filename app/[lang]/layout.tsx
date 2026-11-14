import type { Metadata } from "next";
import { Caveat, Inter, Roboto_Slab } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MediaProvider } from "@/contexts/MediaContext";
import { FloatingContact } from "@/components/floating-contact";
import { NavigationProgress } from "@/components/navigation-progress";
import { ErrorReporter } from "@/components/error-reporter";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { LOCALES, isLocale } from "@/lib/i18n";
import "../globals.css";

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
    "UZ-GROW | Greenhouse Engineering",
  description:
    "UZ-GROW — Greenhouse Engineering: O'zbekistonda zamonaviy issiqxonalarni loyihalash va qurish bo'yicha yetakchi kompaniya. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar. 9+ yillik tajriba, 1500+ muvaffaqiyatli loyiha.",
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
  authors: [{ name: "Rustamjon Raxmonov" }],
  creator: "UZ-GROW",
  publisher: "UZ-GROW",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "/",
    title:
      "UZ-GROW | Greenhouse Engineering",
    description:
      "UZ-GROW — Greenhouse Engineering: O'zbekistonda zamonaviy issiqxonalarni loyihalash va qurish bo'yicha yetakchi kompaniya. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar.",
    siteName: "UZ-GROW",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "UZ-GROW | Greenhouse Engineering",
    description:
      "UZ-GROW — Greenhouse Engineering: O'zbekistonda zamonaviy issiqxonalarni loyihalash va qurish bo'yicha yetakchi kompaniya. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar.",
    images: [OG_IMAGE.url],
  },
  // canonical bu yerda BERILMAYDI: u barcha sahifalarga meros bo'lib
  // o'tadi. Har sahifa o'zinikini lib/seo.ts dagi pageMeta() orqali oladi.
};

// Har til uchun sahifalar build paytida tayyorlanadi; boshqa til — 404
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "uz";
  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${slab.variable} ${script.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NavigationProgress />
        <ErrorReporter />
        <LanguageProvider lang={lang}>
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
