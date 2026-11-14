import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  OG_LOCALE,
  PAGE_META_I18N,
  isLocale,
  localePath,
  type Locale,
} from "./i18n";

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

type MetaInput = {
  /** Sahifa manzili (prefikssiz), masalan "/loyihalar" */
  path: string;
  /** O'zbekcha sarlavha; ru/en — lib/i18n.ts dagi PAGE_META_I18N da */
  title: string;
  description: string;
  keywords?: string | string[];
};

/** Bitta til uchun to'liq metadata: sarlavha, canonical va hreflang */
export function buildMeta(input: MetaInput, lang: Locale): Metadata {
  const tr = lang === DEFAULT_LOCALE ? undefined : PAGE_META_I18N[input.path]?.[lang];
  const title = tr?.title ?? input.title;
  const description = tr?.description ?? input.description;
  const url = localePath(input.path, lang);
  return {
    title,
    description,
    // Kalit so'zlar faqat o'zbekcha yozilgan
    keywords: lang === DEFAULT_LOCALE ? input.keywords : undefined,
    alternates: {
      canonical: url,
      // Google har til versiyasini bir-biriga bog'laydi
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, localePath(input.path, l)])),
        "x-default": localePath(input.path, DEFAULT_LOCALE),
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      siteName: "UZ-GROW",
      url,
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
 * Sahifa uchun generateMetadata: `export const generateMetadata = pageMeta({...})`.
 * Til manzildagi [lang] dan olinadi.
 */
export function pageMeta(input: MetaInput) {
  return async ({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> => {
    const { lang } = await params;
    return buildMeta(input, isLocale(lang) ? lang : DEFAULT_LOCALE);
  };
}

/**
 * Qidiruv tizimlariga taqdim etiladigan sahifalar (app/sitemap.ts).
 *
 * /about va /services yo'q: ular /haqimizda va /xizmatlar ga doimiy
 * yo'naltiriladi (next.config.mjs). /admin esa umuman ommaviy emas.
 */
export const PUBLIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/issiqxona-turlari", priority: 0.9 },
  { path: "/loyihalar", priority: 0.9 },
  { path: "/xizmatlar", priority: 0.9 },
  { path: "/ekinlar", priority: 0.9 },
  { path: "/ekinlar/pomidor", priority: 0.8 },
  { path: "/ekinlar/bodring", priority: 0.8 },
  { path: "/ekinlar/qulupnay", priority: 0.8 },
  { path: "/ekinlar/kokatlar", priority: 0.8 },
  { path: "/ekinlar/kochat", priority: 0.8 },
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
