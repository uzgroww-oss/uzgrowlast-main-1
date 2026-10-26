import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/seo";

// Yangi sahifa qo'shilsa, uni lib/seo.ts dagi PUBLIC_ROUTES ga yozish kifoya
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PUBLIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/yangiliklar" ? "weekly" : "monthly",
    priority,
  }));
}
