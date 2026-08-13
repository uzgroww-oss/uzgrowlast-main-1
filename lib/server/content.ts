import { supabase } from "./supabase";
import { cached, invalidate } from "./cache";

const CACHE_KEY = "content";

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

/**
 * O'chirilgan kartalar shu nom bilan boshlanadigan kalitlarda saqlanadi.
 * Alohida jadval kerak bo'lmasligi uchun content_overrides ichida yashaydi;
 * o'chirish tilga bog'liq emas, shuning uchun har doim "uz" qatoriga yoziladi.
 */
const HIDDEN_PREFIX = "__hidden__.";

const empty = (): ContentOverrides => ({ uz: {}, ru: {}, en: {} });

// Prototip zanjiriga tegishli nomlar saqlanmaydi ham, o'qilmaydi ham
const RESERVED = new Set(["__proto__", "constructor", "prototype"]);

function isSafeKey(key: string): boolean {
  return key.split(".").every((part) => !RESERVED.has(part));
}

/**
 * Matnlar va o'chirilgan kartalar — bitta so'rovda.
 *
 * Natija keshlanadi: Supabase uzilib qolsa oxirgi muvaffaqiyatli nusxa
 * ishlatiladi va sayt admin kiritgan matnlar bilan ishlashda davom etadi
 * (lib/server/cache.ts).
 */
export async function readAll(): Promise<{
  content: ContentOverrides;
  hidden: string[];
}> {
  return cached(CACHE_KEY, readAllFromDb);
}

async function readAllFromDb(): Promise<{
  content: ContentOverrides;
  hidden: string[];
}> {
  const { data, error } = await supabase()
    .from("content_overrides")
    .select("lang, key, value");

  if (error) throw error;

  const content = empty();
  const hidden: string[] = [];

  for (const row of data as { lang: string; key: string; value: string }[]) {
    if (!isSafeKey(row.key)) continue;
    if (row.key.startsWith(HIDDEN_PREFIX)) {
      hidden.push(row.key.slice(HIDDEN_PREFIX.length));
      continue;
    }
    if (!LANGUAGES.includes(row.lang as Language)) continue;
    content[row.lang as Language][row.key] = row.value;
  }
  return { content, hidden };
}

export async function readContent(): Promise<ContentOverrides> {
  return (await readAll()).content;
}

/** Kartani saytdan yashirish / qaytarish */
export async function setHidden(
  path: string,
  hide: boolean,
): Promise<string[]> {
  if (!isSafeKey(path)) throw new Error("Noto'g'ri yo'l");
  const key = HIDDEN_PREFIX + path;
  const db = supabase();

  if (hide) {
    const { error } = await db
      .from("content_overrides")
      .upsert(
        { lang: "uz", key, value: "1", updated_at: new Date().toISOString() },
        { onConflict: "lang,key" },
      );
    if (error) throw error;
  } else {
    const { error } = await db
      .from("content_overrides")
      .delete()
      .eq("lang", "uz")
      .eq("key", key);
    if (error) throw error;
  }

  // Admin o'zgartirdi — kesh eskirdi, saytda darhol ko'rinsin
  invalidate(CACHE_KEY);
  return (await readAll()).hidden;
}

/**
 * Kelgan o'zgarishlarni mavjudlari ustiga qo'shadi.
 *
 * Qiymat `null` bo'lsa — override o'chiriladi, ya'ni kalit koddagi standart
 * matnga qaytadi. Bo'sh satr esa TO'LIQ HUQUQLI qiymat: u "admin bu matnni
 * o'chirdi, saytda ko'rinmasin" degani va shu holida saqlanadi.
 */
export async function patchContent(
  patch: Partial<Record<Language, Record<string, string | null>>>,
): Promise<ContentOverrides> {
  const upserts: { lang: string; key: string; value: string }[] = [];
  const deletes: { lang: string; key: string }[] = [];

  for (const lang of LANGUAGES) {
    const entries = patch[lang];
    if (!entries) continue;
    for (const [key, value] of Object.entries(entries)) {
      // Xizmatchi kalitlarga oddiy matn tahriri orqali tegib bo'lmaydi
      if (!isSafeKey(key) || key.startsWith(HIDDEN_PREFIX)) continue;
      if (value === null) deletes.push({ lang, key });
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

  invalidate(CACHE_KEY);
  return readContent();
}

/** Barcha o'zgarishlarni o'chirib, saytni koddagi standart matnlarga qaytaradi */
export async function resetContent(): Promise<ContentOverrides> {
  const { error } = await supabase()
    .from("content_overrides")
    .delete()
    .in("lang", LANGUAGES);
  if (error) throw error;
  invalidate(CACHE_KEY);
  return empty();
}
