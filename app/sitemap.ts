import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/seo";
import { LOCALES, localePath } from "@/lib/i18n";

// Yangi sahifa qo'shilsa, uni lib/seo.ts dagi PUBLIC_ROUTES ga yozish kifoya.
// Har sahifa uch tilda; har biri qolgan tillardagi nusxasini ko'rsatadi.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
  return PUBLIC_ROUTES.flatMap(({ path, priority }) =>
    LOCALES.map((lang) => ({
      url: abs(localePath(path, lang)),
      lastModified: now,
      changeFrequency: path === "/yangiliklar" ? ("weekly" as const) : ("monthly" as const),
      priority: lang === "uz" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, abs(localePath(path, l))])),
          "x-default": abs(path),
        },
      },
    })),
  );
}
