"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import type { Language } from "@/contexts/LanguageContext";
import type { MediaItem } from "@/lib/media-registry";
import {
  allFields,
  buildPages,
  LANGUAGES,
  type ContentField,
  type PageView,
} from "@/lib/content-schema";

type TextOverrides = Record<Language, Record<string, string>>;
type MediaOverrides = Record<string, string>;

const emptyText = (): TextOverrides => ({ uz: {}, ru: {}, en: {} });

/** Qoralama kaliti: bir maydonning bir tildagi tahriri */
const draftKey = (lang: Language, path: string) => `${lang}:${path}`;

interface ContentStore {
  /** Yuklash so'rovlarini imzolash uchun */
  password: string;
  pages: PageView[];
  activePage: string;
  setActivePage: (key: string) => void;
  query: string;
  setQuery: (q: string) => void;
  /** Ekranda ko'rsatiladigan tillar: bittasi yoki hammasi */
  langView: Language | "all";
  setLangView: (v: Language | "all") => void;
  visibleLangs: Language[];
  /** Qidiruv faol bo'lsa natijalar, aks holda null */
  searchResults: ContentField[] | null;

  /** Matnni bo'shatish — saytda ko'rinmaydi (standartga qaytarish emas) */
  clearText: (field: ContentField, lang: Language) => void;
  /** Rasmni o'chirish — saytda ko'rinmaydi */
  clearMedia: (item: MediaItem) => void;
  /**
   * Kartani butunlay o'chiradi. Qaytarib bo'lmaydi: karta saytdan ham,
   * shu paneldan ham yo'qoladi.
   */
  deleteCard: (cardPath: string) => Promise<void>;
  /** O'chirilgan kartalar ro'yxatdan chiqarib tashlanadi */
  isCardHidden: (cardPath: string) => boolean;

  currentText: (field: ContentField, lang: Language) => string;
  savedText: (field: ContentField, lang: Language) => string;
  setTextValue: (field: ContentField, lang: Language, value: string) => void;
  textOverrides: TextOverrides;

  currentMedia: (item: MediaItem) => string;
  savedMedia: (item: MediaItem) => string;
  setMediaValue: (item: MediaItem, value: string) => void;
  mediaOverrides: MediaOverrides;

  /** Sahifada saqlanmagan o'zgarish bormi — chapdagi menyuda nuqta ko'rsatish uchun */
  pageIsDirty: (pageKey: string) => boolean;
  /** Sahifada saqlangan o'zgarish bormi */
  pageIsEdited: (pageKey: string) => boolean;

  changeCount: number;
  overrideCount: number;
  /** Baza ulanmagan — o'zgarishlar saqlanmaydi */
  degraded: boolean;
  loading: boolean;
  saving: boolean;
  error: string;
  saved: boolean;
  save: () => Promise<void>;
}

const Ctx = createContext<ContentStore | undefined>(undefined);

export function ContentProvider({
  password,
  children,
}: {
  password: string;
  children: ReactNode;
}) {
  // Ro'yxat koddagi tarjima va registrdan quriladi — bir marta hisoblansa yetarli
  const pages = useMemo(() => buildPages(), []);
  const fieldIndex = useMemo(() => {
    const map = new Map<string, ContentField>();
    for (const f of allFields()) map.set(f.path, f);
    return map;
  }, []);
  const mediaIndex = useMemo(() => {
    const map = new Map<string, MediaItem>();
    for (const p of pages)
      for (const b of p.mediaBlocks) for (const i of b.items) map.set(i.id, i);
    return map;
  }, [pages]);

  const [text, setText] = useState<TextOverrides>(emptyText);
  const [media, setMedia] = useState<MediaOverrides>({});
  const [hidden, setHidden] = useState<string[]>([]);
  const [textDrafts, setTextDrafts] = useState<Record<string, string>>({});
  const [mediaDrafts, setMediaDrafts] = useState<Record<string, string>>({});
  const [activePage, setActivePage] = useState(pages[0]?.key ?? "");
  const [query, setQuery] = useState("");
  // Uch til birdan ko'rsatilsa ekran to'lib ketadi — odatda bitta til yetarli
  const [langView, setLangView] = useState<Language | "all">("uz");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [degraded, setDegraded] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [c, m] = await Promise.all([
        fetch("/api/content").then((r) => r.json()),
        fetch("/api/media").then((r) => r.json()),
      ]);
      setText(c?.content ?? emptyText());
      setHidden(Array.isArray(c?.hidden) ? c.hidden : []);
      setMedia(m?.media ?? {});
      // Server bazaga ulanolmasa, o'zgarishlarni saqlash ham ishlamaydi
      setDegraded(Boolean(c?.degraded || m?.degraded));
      setTextDrafts({});
      setMediaDrafts({});
    } catch {
      setError("Ma'lumotlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ---------- Matn ---------- */

  const savedText = (field: ContentField, lang: Language) =>
    text[lang]?.[field.path] ?? field.base[lang];

  const currentText = (field: ContentField, lang: Language) => {
    const key = draftKey(lang, field.path);
    return key in textDrafts ? textDrafts[key] : savedText(field, lang);
  };

  const setTextValue = (field: ContentField, lang: Language, value: string) => {
    setSaved(false);
    setTextDrafts((prev) => ({ ...prev, [draftKey(lang, field.path)]: value }));
  };

  // Bo'sh satr — to'liq huquqli qiymat: "bu matn saytda ko'rinmasin".
  // Standartga qaytarish uchun esa setTextValue(field, lang, field.base[lang]).
  const clearText = (field: ContentField, lang: Language) => {
    setSaved(false);
    setTextDrafts((prev) => ({ ...prev, [draftKey(lang, field.path)]: "" }));
  };

  /* ---------- Rasm ---------- */

  const savedMedia = (item: MediaItem) => media[item.id] ?? item.def;

  const currentMedia = (item: MediaItem) =>
    item.id in mediaDrafts ? mediaDrafts[item.id] : savedMedia(item);

  const setMediaValue = (item: MediaItem, value: string) => {
    setSaved(false);
    setMediaDrafts((prev) => ({ ...prev, [item.id]: value }));
  };

  const clearMedia = (item: MediaItem) => {
    setSaved(false);
    setMediaDrafts((prev) => ({ ...prev, [item.id]: "" }));
  };

  /* ---------- Kartani o'chirish ---------- */

  /**
   * Darhol saqlanadi va qaytarib bo'lmaydi — karta saytdan ham, shu
   * paneldan ham yo'qoladi. Shuning uchun chaqirishdan oldin
   * foydalanuvchidan tasdiq olinishi shart.
   */
  const deleteCard = async (cardPath: string) => {
    setError("");
    try {
      const res = await fetch("/api/content", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ path: cardPath, hidden: true }),
      });
      if (!res.ok) throw new Error(`Xatolik: ${res.status}`);
      const data = await res.json();
      setHidden(Array.isArray(data.hidden) ? data.hidden : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "O'chirishda xatolik");
    }
  };

  const isCardHidden = (cardPath: string) => hidden.includes(cardPath);

  /* ---------- O'zgarishlar ---------- */

  const textChanges = useMemo(() => {
    const out: { lang: Language; path: string; value: string }[] = [];
    for (const [key, value] of Object.entries(textDrafts)) {
      const sep = key.indexOf(":");
      const lang = key.slice(0, sep) as Language;
      const path = key.slice(sep + 1);
      const field = fieldIndex.get(path);
      if (!field) continue;
      if (value !== (text[lang]?.[path] ?? field.base[lang]))
        out.push({ lang, path, value });
    }
    return out;
  }, [textDrafts, text, fieldIndex]);

  const mediaChanges = useMemo(() => {
    const out: { id: string; value: string; def: string }[] = [];
    for (const [id, value] of Object.entries(mediaDrafts)) {
      const item = mediaIndex.get(id);
      if (!item) continue;
      if (value !== (media[id] ?? item.def))
        out.push({ id, value, def: item.def });
    }
    return out;
  }, [mediaDrafts, media, mediaIndex]);

  const changeCount = textChanges.length + mediaChanges.length;

  /* ---------- Sahifa holati (chapdagi menyu uchun) ---------- */

  const pathsOfPage = useMemo(() => {
    const map = new Map<string, { paths: Set<string>; ids: Set<string> }>();
    for (const p of pages) {
      map.set(p.key, {
        paths: new Set(p.blocks.flatMap((b) => b.fields.map((f) => f.path))),
        ids: new Set(p.mediaBlocks.flatMap((b) => b.items.map((i) => i.id))),
      });
    }
    return map;
  }, [pages]);

  const pageIsDirty = (pageKey: string) => {
    const scope = pathsOfPage.get(pageKey);
    if (!scope) return false;
    return (
      textChanges.some((c) => scope.paths.has(c.path)) ||
      mediaChanges.some((c) => scope.ids.has(c.id))
    );
  };

  const pageIsEdited = (pageKey: string) => {
    const scope = pathsOfPage.get(pageKey);
    if (!scope) return false;
    const inText = LANGUAGES.some((l) =>
      Object.keys(text[l] ?? {}).some((p) => scope.paths.has(p)),
    );
    return inText || Object.keys(media).some((id) => scope.ids.has(id));
  };

  /* ---------- Saqlash ---------- */

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      if (textChanges.length > 0) {
        const patch: Partial<Record<Language, Record<string, string | null>>> =
          {};
        for (const { lang, path, value } of textChanges) {
          const field = fieldIndex.get(path);
          patch[lang] ??= {};
          // Standart matnga teng bo'lsa override butunlay o'chiriladi (null).
          // Bo'sh satr esa saqlanadi — u "o'chirilgan" degan ma'noni bildiradi.
          patch[lang]![path] =
            field && value === field.base[lang] ? null : value;
        }
        const res = await fetch("/api/content", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${password}`,
          },
          body: JSON.stringify(patch),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => null);
          throw new Error(d?.error || `Matn saqlanmadi: ${res.status}`);
        }
        setText((await res.json()).content ?? emptyText());
        setTextDrafts({});
      }

      if (mediaChanges.length > 0) {
        const patch: Record<string, string | null> = {};
        for (const { id, value, def } of mediaChanges) {
          // Standart rasmga teng bo'lsa override o'chadi; bo'sh satr saqlanadi
          patch[id] = value === def ? null : value;
        }
        const res = await fetch("/api/media", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${password}`,
          },
          body: JSON.stringify(patch),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => null);
          throw new Error(d?.error || `Rasm saqlanmadi: ${res.status}`);
        }
        setMedia((await res.json()).media ?? {});
        setMediaDrafts({});
      }

      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  // Qidiruv barcha sahifalar bo'ylab ishlaydi
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return [...fieldIndex.values()]
      .filter(
        (f) =>
          f.path.toLowerCase().includes(q) ||
          LANGUAGES.some((l) => f.base[l].toLowerCase().includes(q)),
      )
      .slice(0, 80);
  }, [query, fieldIndex]);

  const overrideCount =
    LANGUAGES.reduce((n, l) => n + Object.keys(text[l] ?? {}).length, 0) +
    Object.keys(media).length;

  const value: ContentStore = {
    password,
    pages,
    activePage,
    setActivePage,
    query,
    setQuery,
    langView,
    setLangView,
    visibleLangs: langView === "all" ? LANGUAGES : [langView],
    searchResults,
    clearText,
    clearMedia,
    deleteCard,
    isCardHidden,
    currentText,
    savedText,
    setTextValue,
    textOverrides: text,
    currentMedia,
    savedMedia,
    setMediaValue,
    mediaOverrides: media,
    pageIsDirty,
    pageIsEdited,
    changeCount,
    overrideCount,
    degraded,
    loading,
    saving,
    error,
    saved,
    save,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContentStore(): ContentStore {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useContentStore must be used within a ContentProvider");
  return ctx;
}
