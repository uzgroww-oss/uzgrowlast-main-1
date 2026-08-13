/**
 * Admin yuklagan rasm va videolar uchun qoidalar: qaysi turlar mumkin va
 * hajm chegarasi qancha.
 *
 * Fayllar Supabase Storage'dagi "media" bucket'ida saqlanadi. Bucket
 * ommaviy, shuning uchun fayl manzili to'g'ridan-to'g'ri Supabase CDN'ga
 * ishora qiladi va saytga qo'shimcha yuk tushmaydi.
 *
 * DIQQAT: fayl SERVER ORQALI YUBORILMAYDI. Vercel serverless funksiyaga
 * 4.5 MB dan katta so'rovni o'tkazmaydi, shuning uchun brauzer faylni
 * to'g'ridan-to'g'ri Supabase'ga jo'natadi. Server faqat qisqa muddatli
 * imzolangan havola beradi va shu yerdagi qoidalarni tekshiradi
 * (app/api/upload/sign/route.ts).
 */

/**
 * Ruxsat etilgan turlar. SVG ataylab yo'q: uning ichida skript bo'lishi
 * mumkin va brauzerda ochilganda ishga tushadi (XSS).
 */
const ALLOWED: Record<string, { ext: string; kind: "image" | "video" }> = {
  "image/jpeg": { ext: "jpg", kind: "image" },
  "image/png": { ext: "png", kind: "image" },
  "image/webp": { ext: "webp", kind: "image" },
  "image/gif": { ext: "gif", kind: "image" },
  "image/avif": { ext: "avif", kind: "image" },
  "video/mp4": { ext: "mp4", kind: "video" },
  "video/webm": { ext: "webm", kind: "video" },
};

const mb = (n: number) => n * 1024 * 1024;

export const MAX_IMAGE_BYTES = mb(Number(process.env.MAX_IMAGE_MB) || 15);
export const MAX_VIDEO_BYTES = mb(Number(process.env.MAX_VIDEO_MB) || 100);

export function checkType(mime: string) {
  return ALLOWED[mime] ?? null;
}
