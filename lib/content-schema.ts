import { translations, type Language } from "@/contexts/LanguageContext";
import { MEDIA, type MediaItem } from "@/lib/media-registry";
import { PAGES, blockMatches, type PageDef } from "@/lib/page-map";
import { COLLECTIONS, cardPathOf, type Collection } from "@/lib/collections";

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

/** Bitta karta: o'z rasmlari va matnlari bilan */
export interface CardView {
  /** "team.members.rustamjon" — o'chirish shu yo'l bo'yicha */
  path: string;
  label: string;
  fields: ContentField[];
  media: MediaItem[];
}

export interface CardBlock {
  title: string;
  cards: CardView[];
}

export interface PageView {
  key: string;
  title: string;
  path?: string;
  blocks: BlockView[];
  /** Shu sahifadagi rasm va videolar, blok nomi bo'yicha guruhlangan */
  mediaBlocks: { title: string; items: MediaItem[] }[];
  /** Takrorlanuvchi kartalar — rasm va matni birga */
  cardBlocks: CardBlock[];
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

/** Bitta to'plamning kartalarini yig'adi */
function buildCards(collection: Collection, paths: string[]): CardView[] {
  const root = lookup(translations.uz, collection.basePath);
  if (!root || typeof root !== "object") return [];

  const keys =
    collection.kind === "array"
      ? (root as unknown[]).map((_, i) => String(i))
      : (collection.keys ?? Object.keys(root));

  return keys
    .map((key, index) => {
      const cardPath = `${collection.basePath}.${key}`;
      const item = lookup(translations.uz, cardPath);
      if (item === undefined) return null;

      const label =
        (lookup(item, collection.labelField) as string) || `${index + 1}-element`;

      return {
        path: cardPath,
        label,
        fields: paths
          .filter((p) => p.startsWith(cardPath + "."))
          .map(toField),
        media: (collection.mediaFor?.(key, index) ?? [])
          .map((id) => MEDIA.find((m) => m.id === id))
          .filter((m): m is MediaItem => Boolean(m)),
      };
    })
    .filter((c): c is CardView => c !== null && (c.fields.length > 0 || c.media.length > 0));
}

/**
 * Saytni SAHIFA bo'yicha guruhlab qaytaradi.
 *
 * Takrorlanuvchi elementlar (jamoa a'zosi, loyiha, issiqxona turi...) alohida
 * KARTA sifatida chiqadi: rasmi va barcha matnlari bir joyda. Shu sababli ular
 * oddiy bloklardan va rasm ro'yxatidan chiqarib tashlanadi — aks holda bir xil
 * maydon ikki joyda ko'rinardi.
 */
export function buildPages(): PageView[] {
  const paths = allPaths();
  // Kartaga tegishli rasm id lari — ular alohida ro'yxatda takrorlanmasin
  const cardMediaIds = new Set<string>();

  const cardsByPage = new Map<string, CardBlock[]>();
  for (const collection of COLLECTIONS) {
    const cards = buildCards(collection, paths);
    if (cards.length === 0) continue;
    for (const c of cards) for (const m of c.media) cardMediaIds.add(m.id);
    const list = cardsByPage.get(collection.page) ?? [];
    list.push({ title: collection.title, cards });
    cardsByPage.set(collection.page, list);
  }

  return PAGES.map((page) => {
    const cardBlocks = cardsByPage.get(page.key) ?? [];

    const blocks: BlockView[] = page.blocks
      .map((block) => ({
        title: block.title,
        hint: block.hint,
        shared: block.shared,
        fields: paths
          .filter((p) => blockMatches(block, p) && !cardPathOf(p))
          .map(toField),
      }))
      .filter((b) => b.fields.length > 0);

    const mediaBlocks = buildMediaBlocks(page)
      .map((b) => ({
        title: b.title,
        items: b.items.filter((i) => !cardMediaIds.has(i.id)),
      }))
      .filter((b) => b.items.length > 0);

    const cardFieldCount = cardBlocks.reduce(
      (n, b) => n + b.cards.reduce((k, c) => k + c.fields.length, 0),
      0,
    );
    const cardMediaCount = cardBlocks.reduce(
      (n, b) => n + b.cards.reduce((k, c) => k + c.media.length, 0),
      0,
    );

    return {
      key: page.key,
      title: page.title,
      path: page.path,
      blocks,
      mediaBlocks,
      cardBlocks,
      fieldCount:
        blocks.reduce((n, b) => n + b.fields.length, 0) + cardFieldCount,
      mediaCount:
        mediaBlocks.reduce((n, b) => n + b.items.length, 0) + cardMediaCount,
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
