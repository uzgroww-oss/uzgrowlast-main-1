import { translations, type Language } from "@/contexts/LanguageContext";
import { MEDIA, type MediaItem } from "@/lib/media-registry";
import { PAGES, blockMatches, type PageDef } from "@/lib/page-map";

export const LANGUAGES: Language[] = ["uz", "ru", "en"];

export const LANG_LABELS: Record<Language, string> = {
  uz: "O'zbekcha",
  ru: "Ruscha",
  en: "Inglizcha",
};

/** Tahrirlanadigan bitta matn maydoni */
export interface ContentField {
  /** Nuqtali yo'l, masalan "hero.title" yoki "projects.items.0.title" */
  path: string;
  /** Koddagi standart matnlar — admin hech narsa o'zgartirmasa shular ko'rinadi */
  base: Record<Language, string>;
  /** Uzun matnlar textarea'da ko'rsatiladi */
  multiline: boolean;
}

/** Sahifa ichidagi bitta blok: matnlar va/yoki rasmlar */
export interface BlockView {
  title: string;
  hint?: string;
  shared?: boolean;
  fields: ContentField[];
}

export interface PageView {
  key: string;
  title: string;
  path?: string;
  blocks: BlockView[];
  /** Shu sahifadagi rasm va videolar, blok nomi bo'yicha guruhlangan */
  mediaBlocks: { title: string; items: MediaItem[] }[];
  fieldCount: number;
  mediaCount: number;
}

/**
 * Havolalar tahrirlanmaydi — noto'g'ri yozilsa sayt navigatsiyasi buziladi.
 * Ular kodda va tarjima faylida boshqariladi.
 */
function isEditable(path: string): boolean {
  return !path.endsWith(".href");
}

/** Ichma-ich obyekt/massivni "a.b.0.c" ko'rinishdagi tekis yo'llarga yoyadi */
function flatten(value: unknown, prefix: string, out: string[]): void {
  if (typeof value === "string") {
    if (isEditable(prefix)) out.push(prefix);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => flatten(item, `${prefix}.${i}`, out));
    return;
  }
  if (typeof value === "object" && value !== null) {
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out);
    }
  }
}

function lookup(source: unknown, path: string): unknown {
  let value: any = source;
  for (const key of path.split(".")) {
    value = value?.[key];
  }
  return value;
}

function toField(path: string): ContentField {
  const base = {} as Record<Language, string>;
  for (const lang of LANGUAGES) {
    const value = lookup(translations[lang], path);
    base[lang] = typeof value === "string" ? value : "";
  }
  return {
    path,
    base,
    multiline: base.uz.length > 90 || base.uz.includes("\n"),
  };
}

/** Barcha tahrirlanadigan kalit yo'llari (o'zbekcha tarjima asos qilib olinadi) */
function allPaths(): string[] {
  const paths: string[] = [];
  flatten(translations.uz, "", paths);
  return paths;
}

function buildMediaBlocks(page: PageDef) {
  const items = MEDIA.filter((item) => item.page === page.key);
  const groups = new Map<string, MediaItem[]>();
  for (const item of items) {
    const list = groups.get(item.block) ?? [];
    list.push(item);
    groups.set(item.block, list);
  }
  return [...groups].map(([title, list]) => ({ title, items: list }));
}

/**
 * Saytni SAHIFA bo'yicha guruhlab qaytaradi: har bir sahifa o'z bloklari,
 * matnlari va rasmlari bilan.
 */
export function buildPages(): PageView[] {
  const paths = allPaths();

  return PAGES.map((page) => {
    const blocks: BlockView[] = page.blocks
      .map((block) => ({
        title: block.title,
        hint: block.hint,
        shared: block.shared,
        fields: paths.filter((p) => blockMatches(block, p)).map(toField),
      }))
      .filter((b) => b.fields.length > 0);

    const mediaBlocks = buildMediaBlocks(page);

    return {
      key: page.key,
      title: page.title,
      path: page.path,
      blocks,
      mediaBlocks,
      fieldCount: blocks.reduce((n, b) => n + b.fields.length, 0),
      mediaCount: mediaBlocks.reduce((n, b) => n + b.items.length, 0),
    };
  });
}

/**
 * Qidiruv uchun: barcha maydonlar, takrorlanmasdan.
 * Bitta matn bir necha sahifada ko'rinishi mumkin, lekin tahrirlanadigan
 * qiymat bitta — shuning uchun yo'l bo'yicha yagonalashtiriladi.
 */
export function allFields(): ContentField[] {
  return allPaths().map(toField);
}
