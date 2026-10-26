import { createStore, type StoredItem } from "./store";
import { patchContent, readAll } from "./content";

export interface NewsTranslation {
  title: string;
  body: string;
}

export interface NewsItem extends StoredItem {
  /** O'zbekcha — asosiy til, majburiy */
  title: string;
  body: string;
  imageUrl: string;
  /** Rus va ingliz tarjimalari (ixtiyoriy). Bo'sh bo'lsa o'zbekchasi ko'rsatiladi */
  i18n?: { ru?: NewsTranslation; en?: NewsTranslation };
}

export const newsStore = createStore<NewsItem>("news", {
  title: "title",
  body: "body",
  imageUrl: "image_url",
  // Admin sanani o'zi tanlashi mumkin (masalan, o'tgan tadbir haqida yangilik)
  createdAt: "created_at",
});

/**
 * Tarjimalar alohida jadvalda emas — sahifa matnlari bilan bir joyda
 * (content_overrides), "newsItems.<id>.title" kalitida saqlanadi.
 * Shunda bazaga yangi ustun qo'shish shart bo'lmadi.
 */
const keyOf = (id: string, field: keyof NewsTranslation) =>
  `newsItems.${id.replace(/-/g, "")}.${field}`;

type Lang = "ru" | "en";
const LANGS: Lang[] = ["ru", "en"];

/** Eng yangisi birinchi (tartib bazada beriladi) */
export async function listNews(): Promise<NewsItem[]> {
  const items = await newsStore.list();
  // Tarjimalar o'qilmasa ham yangiliklar chiqaveradi (o'zbekcha)
  const content = await readAll().then((r) => r.content).catch(() => null);
  if (!content) return items;

  return items.map((item) => {
    const i18n: NewsItem["i18n"] = {};
    for (const lang of LANGS) {
      const title = content[lang]?.[keyOf(item.id, "title")] ?? "";
      const body = content[lang]?.[keyOf(item.id, "body")] ?? "";
      if (title || body) i18n[lang] = { title, body };
    }
    return { ...item, i18n };
  });
}

/** Tarjimalarni saqlaydi; bo'sh qiymat — tarjimani o'chirish */
export async function saveTranslations(
  id: string,
  i18n: Partial<Record<Lang, Partial<NewsTranslation>>> | undefined,
): Promise<void> {
  if (!i18n) return;
  const patch: Partial<Record<Lang, Record<string, string | null>>> = {};
  for (const lang of LANGS) {
    const t = i18n[lang];
    if (!t) continue;
    patch[lang] = {};
    for (const field of ["title", "body"] as const) {
      if (t[field] === undefined) continue;
      const value = t[field]!.trim();
      patch[lang]![keyOf(id, field)] = value ? value : null;
    }
  }
  if (Object.keys(patch).length) await patchContent(patch);
}

/** Yangilik o'chirilganda uning tarjimalari ham o'chadi */
export async function removeTranslations(id: string): Promise<void> {
  const nulls = {
    [keyOf(id, "title")]: null,
    [keyOf(id, "body")]: null,
  };
  await patchContent({ ru: nulls, en: nulls });
}
