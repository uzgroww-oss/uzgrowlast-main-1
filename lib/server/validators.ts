import { z } from "zod";

/**
 * Rasm/video manzili uchun umumiy tekshiruv.
 *
 * Ruxsat: to'liq http(s) havola (masalan Cloudinary) yoki sayt ichidagi yo'l
 * ("/api/files/..." — yuklangan fayl, "/images/..." — loyihadagi fayl).
 *
 * Rad etiladi: javascript:, data: va boshqa sxemalar — ular <img src> yoki
 * <video src> ga tushganda xavf tug'diradi. Shuningdek "//host" ko'rinishidagi
 * protokolsiz havola ham (u tashqi saytga olib chiqadi).
 */
export function mediaUrl(max = 2000) {
  return z
    .string()
    .trim()
    .max(max)
    .refine(
      (v) =>
        /^https?:\/\/.+/i.test(v) || (v.startsWith("/") && !v.startsWith("//")),
      { message: "Faqat https:// havola yoki /images/... yo'li" },
    );
}

/** Bo'sh qiymatga ham ruxsat beradigan variant */
export function optionalMediaUrl(max = 2000) {
  return z.union([z.literal(""), mediaUrl(max)]);
}
