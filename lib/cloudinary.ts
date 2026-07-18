/**
 * Cloudinary rasmlarini avtomatik siqadi.
 *
 * `q_auto` — sifatni ko'z ilg'amaydigan darajada siqadi, `f_auto` — brauzer
 * qo'llasa WebP/AVIF beradi. Amalda 5–6 MB lik rasm ~1 MB ga tushadi.
 *
 * Cloudinary manzili shunday tuzilgan:
 *   https://res.cloudinary.com/<cloud>/image/upload/[o'zgartirishlar/]v123/fayl.jpg
 * Shuning uchun o'zgartirishlar `/upload/` dan keyin qo'shiladi.
 */

const CLOUDINARY_HOST = "res.cloudinary.com";
const AUTO = ["q_auto", "f_auto"];
// Juda katta rasm kerak emas — eng keng ishlatilishi ekran kengligicha
const MAX_WIDTH = "c_limit,w_1920";

/** Versiya bo'lagi: v1775469212 */
const isVersion = (segment: string) => /^v\d+$/.test(segment);

export function optimizeImage(url: string): string {
  if (!url || !url.includes(CLOUDINARY_HOST)) return url;
  // Video Cloudinary tomonidan boshqacha ishlanadi — tegmaymiz
  if (url.includes("/video/upload/")) return url;

  const marker = "/upload/";
  const at = url.indexOf(marker);
  if (at === -1) return url;

  const head = url.slice(0, at + marker.length);
  const parts = url.slice(at + marker.length).split("/");

  // Versiyagacha bo'lgan hamma narsa — o'zgartirishlar.
  // Ular bir nechta bo'lakka bo'lingan bo'lishi mumkin: "q_auto/f_auto/v123/..."
  const versionAt = parts.findIndex(isVersion);
  const splitAt = versionAt === -1 ? Math.max(parts.length - 1, 0) : versionAt;

  const existing = parts
    .slice(0, splitAt)
    .flatMap((segment) => segment.split(","))
    .filter(Boolean);
  const rest = parts.slice(splitAt);

  // Bir xil turdagi o'zgartirish ikki marta qo'shilmasin (q_, f_, w_ ...)
  const has = (prefix: string) =>
    existing.some((e) => e.startsWith(prefix + "_"));

  const merged = [...existing];
  for (const auto of AUTO) {
    const prefix = auto.split("_")[0];
    if (!has(prefix)) merged.push(auto);
  }
  // Kenglik chegarasi faqat hech qanday o'lcham berilmagan bo'lsa
  if (!has("w") && !has("h") && !has("c")) merged.push(MAX_WIDTH);

  return head + [merged.join(","), ...rest].join("/");
}
