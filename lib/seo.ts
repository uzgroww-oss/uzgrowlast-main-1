import type { Metadata } from "next";

/**
 * Sahifa metadatasi uchun yagona joy.
 *
 * Nega kerak: ilgari canonical faqat layout.tsx da "https://uzgrow.uz" deb
 * berilgan edi va u BARCHA sahifalarga meros bo'lib o'tardi. Natijada har
 * bir sahifa Google'ga "men bosh sahifaning nusxasiman" der edi va boshqa
 * sahifalar qidiruvda alohida chiqmasdi. Endi har sahifa o'z manzilini
 * canonical sifatida ko'rsatadi.
 */

/**
 * Saytning asosiy manzili. uzgrow.uz -> www.uzgrow.uz ga 308 bilan
 * yo'naltiriladi, shuning uchun canonical va sitemap www bilan bo'lishi kerak.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.uzgrow.uz"
).replace(/\/+$/, "");

/** Ijtimoiy tarmoqlarda ulashilganda ko'rinadigan rasm (1200x630 — standart) */
export const OG_IMAGE = {
  url: "/images/og.jpg",
  width: 1200,
  height: 630,
  alt: "UZ GROW — zamonaviy issiqxona yechimlari",
};

export function pageMeta({
  path,
  title,
  description,
  keywords,
}: {
  /** Sahifa manzili, masalan "/loyihalar". metadataBase bilan to'liq URL bo'ladi */
  path: string;
  title: string;
  description: string;
  keywords?: string | string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "uz_UZ",
      siteName: "UZ GROW",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Qidiruv tizimlariga taqdim etiladigan sahifalar (app/sitemap.ts).
 *
 * /about va /services bu yerda yo'q: ular /haqimizda va /xizmatlar bilan
 * mazmunan takrorlanadi, shuning uchun canonical'i o'sha sahifalarga
 * qaratilgan. /admin esa umuman ommaviy emas.
 */
export const PUBLIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/issiqxona-turlari", priority: 0.9 },
  { path: "/loyihalar", priority: 0.9 },
  { path: "/xizmatlar", priority: 0.9 },
  { path: "/jixozlar", priority: 0.8 },
  { path: "/texnologiya", priority: 0.8 },
  { path: "/agro-injiniring", priority: 0.8 },
  { path: "/haqimizda", priority: 0.8 },
  { path: "/aloqa", priority: 0.8 },
  { path: "/gallery", priority: 0.7 },
  { path: "/rahbariyat", priority: 0.7 },
  { path: "/xalqaro-hamkorlik", priority: 0.7 },
  { path: "/investorlar", priority: 0.7 },
  { path: "/yangiliklar", priority: 0.7 },
  { path: "/media-hamkorlik", priority: 0.5 },
  { path: "/maxfiylik-siyosati", priority: 0.3 },
  { path: "/foydanalish-shartlari", priority: 0.3 },
];
