import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// /_next/ yopilmaydi: Google sahifani to'g'ri ko'rishi uchun CSS, JS va
// rasmlarni yuklay olishi kerak.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
