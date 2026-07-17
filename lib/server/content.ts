import { supabase } from "./supabase";

export type Language = "uz" | "ru" | "en";
export const LANGUAGES: Language[] = ["uz", "ru", "en"];

/**
 * Admin paneldan o'zgartirilgan matnlar.
 *
 * Bu yerda tarjimalarning TO'LIQ nusxasi emas, faqat FARQLAR saqlanadi:
 * til → nuqtali kalit yo'li → yangi matn. Kalit bu yerda bo'lmasa, sayt
 * LanguageContext'dagi standart matnni ko'rsatadi. Shu sababli kodda
 * tarjima o'zgarsa, admin tegmagan joylar avtomatik yangilanib boraveradi.
 */
export type ContentOverrides = Record<Language, Record<string, string>>;

const empty = (): ContentOverrides => ({ uz: {}, ru: {}, en: {} });

// Prototip zanjiriga tegishli nomlar saqlanmaydi ham, o'qilmaydi ham
const RESERVED = new Set(["__proto__", "constructor", "prototype"]);

function isSafeKey(key: string): boolean {
  return key.split(".").every((part) => !RESERVED.has(part));
}

export async function readContent(): Promise<ContentOverrides> {
  const { data, error } = await supabase()
    .from("content_overrides")
    .select("lang, key, value");

  if (error) throw error;

  const result = empty();
  for (const row of data as { lang: string; key: string; value: string }[]) {
    if (!LANGUAGES.includes(row.lang as Language)) continue;
    if (!isSafeKey(row.key)) continue;
    result[row.lang as Language][row.key] = row.value;
  }
  return result;
}

/**
 * Kelgan o'zgarishlarni mavjudlari ustiga qo'shadi.
 * Qiymat sifatida bo'sh satr berilsa, override o'chiriladi — ya'ni
 * o'sha kalit koddagi standart matnga qaytadi.
 */
export async function patchContent(
  patch: Partial<Record<Language, Record<string, string>>>,
): Promise<ContentOverrides> {
  const upserts: { lang: string; key: string; value: string }[] = [];
  const deletes: { lang: string; key: string }[] = [];

  for (const lang of LANGUAGES) {
    const entries = patch[lang];
    if (!entries) continue;
    for (const [key, value] of Object.entries(entries)) {
      if (!isSafeKey(key)) continue;
      if (value === "") deletes.push({ lang, key });
      else upserts.push({ lang, key, value });
    }
  }

  const db = supabase();

  if (upserts.length > 0) {
    const { error } = await db
      .from("content_overrides")
      .upsert(
        upserts.map((u) => ({ ...u, updated_at: new Date().toISOString() })),
        { onConflict: "lang,key" },
      );
    if (error) throw error;
  }

  // O'chirishlar tillar bo'yicha guruhlanadi — har til uchun bitta so'rov
  for (const lang of LANGUAGES) {
    const keys = deletes.filter((d) => d.lang === lang).map((d) => d.key);
    if (keys.length === 0) continue;
    const { error } = await db
      .from("content_overrides")
      .delete()
      .eq("lang", lang)
      .in("key", keys);
    if (error) throw error;
  }

  return readContent();
}

/** Barcha o'zgarishlarni o'chirib, saytni koddagi standart matnlarga qaytaradi */
export async function resetContent(): Promise<ContentOverrides> {
  const { error } = await supabase()
    .from("content_overrides")
    .delete()
    .in("lang", LANGUAGES);
  if (error) throw error;
  return empty();
}
