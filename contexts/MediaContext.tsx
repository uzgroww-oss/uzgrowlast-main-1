"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { MEDIA_DEFAULTS } from "@/lib/media-registry";

interface MediaContextType {
  /** id bo'yicha rasm/video manzilini beradi: override → standart */
  m: (id: string) => string;
  /** Ro'yxatdagi bir nechta id ni tartib bilan qaytaradi */
  mList: (ids: string[]) => string[];
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  // Admin paneldan almashtirilgan manzillar. Yuklanmasa yoki xato bo'lsa,
  // sayt koddagi standart rasmlar bilan ishlayveradi.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/media")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.ok && data.media) setOverrides(data.media);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<MediaContextType>(() => {
    const m = (id: string) => overrides[id] || MEDIA_DEFAULTS[id] || "";
    return { m, mList: (ids) => ids.map(m) };
  }, [overrides]);

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
}

export function useMedia(): MediaContextType {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
}

/**
 * Ro'yxatdagi ketma-ket id larni yig'adi: prefix.0, prefix.1, ...
 * Massiv shaklidagi rasmlar (slayder, galereya) uchun qulay.
 */
export function mediaIds(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${prefix}.${i}`);
}
