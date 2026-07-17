import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase mijozi — FAQAT server tomonda.
 *
 * service_role kaliti RLS ni chetlab o'tadi, ya'ni u to'liq huquqqa ega.
 * Shuning uchun bu fayl hech qachon brauzerga tushmasligi kerak: uni faqat
 * API route'lar va server komponentlaridan import qiling.
 *
 * Sayt Supabase'ga brauzerdan murojaat qilmaydi, shuning uchun anon
 * (publishable) kalit umuman kerak emas va hech qayerga chiqarilmaydi.
 */

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client: SupabaseClient | null = null;

/** Supabase sozlanganmi? Sozlanmagan bo'lsa API'lar buni bilib turishi kerak */
export function isSupabaseConfigured(): boolean {
  return Boolean(url && serviceKey);
}

/**
 * Umumiy mijoz. Sozlamalar yo'q bo'lsa xato tashlaydi — jimgina bo'sh
 * ma'lumot qaytarib, muammoni yashirib qo'ymaslik uchun.
 */
export function supabase(): SupabaseClient {
  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_URL yoki SUPABASE_SERVICE_ROLE_KEY sozlanmagan — .env.local ni tekshiring",
    );
  }
  if (!client) {
    client = createClient(url, serviceKey, {
      auth: {
        // Server uchun sessiya kerak emas
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return client;
}

export const MEDIA_BUCKET = "media";

/** Yuklangan fayllarning ommaviy manzili shu asosda quriladi */
export function publicUrl(path: string): string {
  return supabase().storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
