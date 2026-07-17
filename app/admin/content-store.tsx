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
  /** Qidiruv faol bo'lsa natijalar, aks holda null */
  searchResults: ContentField[] | null;

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
  loading: boolean;
  saving: boolean;
  error: string;
  saved: boolean;
  save: () => Promise<void>;
  resetAll: () => Promise<void>;
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
  const [textDrafts, setTextDrafts] = useState<Record<string, string>>({});
  const [mediaDrafts, setMediaDrafts] = useState<Record<string, string>>({});
  const [activePage, setActivePage] = useState(pages[0]?.key ?? "");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [c, m] = await Promise.all([
        fetch("/api/content").then((r) => r.json()),
        fetch("/api/media").then((r) => r.json()),
      ]);
      setText(c?.content ?? emptyText());
      setMedia(m?.media ?? {});
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

  /* ---------- Rasm ---------- */

  const savedMedia = (item: MediaItem) => media[item.id] ?? item.def;

  const currentMedia = (item: MediaItem) =>
    item.id in mediaDrafts ? mediaDrafts[item.id] : savedMedia(item);

  const setMediaValue = (item: MediaItem, value: string) => {
    setSaved(false);
    setMediaDrafts((prev) => ({ ...prev, [item.id]: value }));
  };

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
        const patch: Partial<Record<Language, Record<string, string>>> = {};
        for (const { lang, path, value } of textChanges) {
          const field = fieldIndex.get(path);
          patch[lang] ??= {};
          // Standart matnga qaytarilgan bo'lsa override o'chiriladi
          patch[lang]![path] = field && value === field.base[lang] ? "" : value;
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
        const patch: Record<string, string> = {};
        for (const { id, value, def } of mediaChanges) {
          patch[id] = value === def ? "" : value;
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

  const resetAll = async () => {
    if (
      !window.confirm(
        "Barcha o'zgartirilgan matn va rasmlar o'chiriladi, sayt dastlabki holatiga qaytadi. Davom etamizmi?",
      )
    )
      return;
    setSaving(true);
    setError("");
    try {
      await Promise.all([
        fetch("/api/content", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${password}` },
        }),
        fetch("/api/media", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${password}` },
        }),
      ]);
      await load();
    } catch {
      setError("Tozalashda xatolik");
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
    searchResults,
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
    loading,
    saving,
    error,
    saved,
    save,
    resetAll,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContentStore(): ContentStore {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useContentStore must be used within a ContentProvider");
  return ctx;
}
