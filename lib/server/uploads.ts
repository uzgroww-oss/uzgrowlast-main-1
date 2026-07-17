import { randomUUID } from "crypto";
import { MEDIA_BUCKET, publicUrl, supabase } from "./supabase";

/**
 * Admin yuklagan rasm va videolar Supabase Storage'dagi "media" bucket'ida
 * saqlanadi. Bucket ommaviy, shuning uchun fayl manzili to'g'ridan-to'g'ri
 * Supabase CDN'ga ishora qiladi va saytga qo'shimcha yuk tushmaydi.
 *
 * Yuklash faqat server orqali (service_role kaliti bilan) — bucket'ga
 * tashqaridan yozish siyosati berilmagan.
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

export interface SavedFile {
  name: string;
  url: string;
  kind: "image" | "video";
  size: number;
}

export async function saveUpload(file: File, mime: string): Promise<SavedFile> {
  const allowed = checkType(mime);
  if (!allowed) throw new Error("UNSUPPORTED_TYPE");

  const limit = allowed.kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > limit) throw new Error("TOO_LARGE");

  // Nomni server beradi — foydalanuvchi nomiga umuman ishonilmaydi
  const name = `${randomUUID()}.${allowed.ext}`;

  const { error } = await supabase()
    .storage.from(MEDIA_BUCKET)
    .upload(name, file, {
      contentType: mime,
      // Nom har safar yangi, shuning uchun ustiga yozish kutilmaydi
      upsert: false,
      cacheControl: "31536000",
    });

  if (error) throw error;

  return {
    name,
    url: publicUrl(name),
    kind: allowed.kind,
    size: file.size,
  };
}
