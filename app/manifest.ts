import type { MetadataRoute } from "next";

// Telefonda "Bosh ekranga qo'shish" va brauzer rangi uchun
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UZ-GROW | Greenhouse Engineering",
    short_name: "UZ-GROW",
    description: "Zamonaviy issiqxonalarni loyihalash va qurish",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d1f0e",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
