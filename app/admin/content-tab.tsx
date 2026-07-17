"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Save,
  Search,
  RotateCcw,
  Check,
  AlertCircle,
  ExternalLink,
  ImageOff,
} from "lucide-react";
import type { Language } from "@/contexts/LanguageContext";
import type { MediaItem } from "@/lib/media-registry";
import { LANGUAGES, LANG_LABELS, type ContentField } from "@/lib/content-schema";
import { useContentStore } from "./content-store";
import { UploadField } from "./upload-field";

/* ---------- Chapdagi sahifalar ro'yxati ---------- */

export function ContentPagesNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pages, activePage, setActivePage, pageIsDirty, pageIsEdited } =
    useContentStore();

  return (
    <div className="space-y-0.5">
      {pages.map((p) => {
        const active = activePage === p.key;
        const dirty = pageIsDirty(p.key);
        const edited = pageIsEdited(p.key);
        return (
          <button
            key={p.key}
            onClick={() => {
              setActivePage(p.key);
              onNavigate?.();
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              active
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span className="flex-1 truncate">{p.title}</span>
            {dirty ? (
              <span
                className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                title="Saqlanmagan o'zgarish bor"
              />
            ) : edited ? (
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0"
                title="O'zgartirilgan"
              />
            ) : null}
            <span className="text-[11px] tabular-nums opacity-50 shrink-0">
              {p.fieldCount + p.mediaCount}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Yuqoridagi qidiruv va saqlash paneli ---------- */

export function ContentToolbar() {
  const { query, setQuery, save, resetAll, saving, changeCount, overrideCount } =
    useContentStore();

  return (
    <div className="flex flex-wrap items-center gap-2 flex-1">
      <div className="relative flex-1 min-w-[180px] max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Barcha sahifalar bo'ylab qidirish..."
          className="pl-9 h-9"
        />
      </div>
      <Button
        onClick={save}
        disabled={saving || changeCount === 0}
        size="sm"
        className="h-9"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Saqlash{changeCount > 0 && ` (${changeCount})`}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={resetAll}
        disabled={saving || overrideCount === 0}
        className="h-9"
        title="Barcha o'zgarishlarni bekor qilib, saytni dastlabki holatiga qaytarish"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
}

/* ---------- Asosiy muharrir ---------- */

export function ContentTab() {
  const {
    password,
    pages,
    activePage,
    searchResults,
    loading,
    error,
    saved,
    changeCount,
    overrideCount,
    currentText,
    savedText,
    setTextValue,
    textOverrides,
    currentMedia,
    savedMedia,
    setMediaValue,
    mediaOverrides,
  } = useContentStore();

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-6 h-6 mx-auto animate-spin text-muted-foreground" />
      </div>
    );
  }

  const page = pages.find((p) => p.key === activePage);

  return (
    <div className="space-y-5">
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </p>
      )}
      {saved && changeCount === 0 && (
        <p className="text-sm text-green-700 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
          <Check className="w-4 h-4 shrink-0" /> Saqlandi — sayt yangilandi
        </p>
      )}

      {/* Qidiruv natijalari */}
      {searchResults && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Qidiruv natijalari
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {searchResults.length} ta
            </span>
          </h2>
          {searchResults.length === 0 ? (
            <EmptyBox text="Hech narsa topilmadi" />
          ) : (
            searchResults.map((field) => (
              <TextRow
                key={field.path}
                field={field}
                current={currentText}
                saved={savedText}
                overrides={textOverrides}
                onChange={setTextValue}
              />
            ))
          )}
        </div>
      )}

      {/* Tanlangan sahifa */}
      {!searchResults && page && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-bold text-foreground">{page.title}</h2>
            {page.path && (
              <a
                href={page.path}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                {page.path} sahifasini ochish
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {overrideCount === 0 && (
            <p className="text-sm text-muted-foreground -mt-4">
              Matn yoki rasm manzilini o'zgartiring va yuqoridagi «Saqlash»ni
              bosing. Tegilmagan joylar standart holatida qoladi.
            </p>
          )}

          {page.mediaBlocks.map((block) => (
            <section key={block.title} className="space-y-3">
              <BlockTitle title={block.title} count={block.items.length} icon="🖼" />
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                {block.items.map((item) => (
                  <MediaRow
                    key={item.id}
                    password={password}
                    item={item}
                    value={currentMedia(item)}
                    isOverridden={item.id in mediaOverrides}
                    isDirty={currentMedia(item) !== savedMedia(item)}
                    onChange={setMediaValue}
                  />
                ))}
              </div>
            </section>
          ))}

          {page.blocks.map((block) => (
            <section key={block.title} className="space-y-3">
              <div>
                <BlockTitle
                  title={block.title}
                  count={block.fields.length}
                  shared={block.shared}
                />
                {block.hint && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {block.hint}
                  </p>
                )}
              </div>
              {block.fields.map((field) => (
                <TextRow
                  key={field.path}
                  field={field}
                  current={currentText}
                  saved={savedText}
                  overrides={textOverrides}
                  onChange={setTextValue}
                />
              ))}
            </section>
          ))}

          {page.blocks.length === 0 && page.mediaBlocks.length === 0 && (
            <EmptyBox text="Bu sahifada tahrirlanadigan narsa yo'q" />
          )}
        </div>
      )}
    </div>
  );
}

function BlockTitle({
  title,
  count,
  shared,
  icon,
}: {
  title: string;
  count: number;
  shared?: boolean;
  icon?: string;
}) {
  return (
    <h3 className="font-semibold text-foreground flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {title}
      <span className="text-xs font-normal text-muted-foreground">
        {count} ta
      </span>
      {shared && (
        <span
          className="text-xs font-normal px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
          title="Bu blok bir nechta sahifada ko'rinadi"
        >
          umumiy
        </span>
      )}
    </h3>
  );
}

/* ---------- Rasm qatori ---------- */

function MediaRow({
  item,
  value,
  isOverridden,
  isDirty,
  onChange,
  password,
}: {
  item: MediaItem;
  password: string;
  value: string;
  isOverridden: boolean;
  isDirty: boolean;
  onChange: (item: MediaItem, value: string) => void;
}) {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [value]);

  return (
    <div className="bg-background rounded-xl border border-border p-3 flex gap-3">
      <div className="w-20 h-20 shrink-0 rounded-lg bg-muted overflow-hidden flex items-center justify-center">
        {item.type === "video" ? (
          <video src={value} className="w-full h-full object-cover" muted />
        ) : broken || !value ? (
          <ImageOff className="w-6 h-6 text-muted-foreground/50" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setBroken(true)}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <p className="text-xs font-medium text-foreground truncate">
            {item.label}
            {isDirty && <span className="ml-1.5 text-amber-600">•</span>}
            {!isDirty && isOverridden && (
              <span className="ml-1.5 text-primary font-normal">
                o'zgartirilgan
              </span>
            )}
          </p>
          {value !== item.def && (
            <button
              type="button"
              onClick={() => onChange(item, item.def)}
              title="Standart rasmga qaytarish"
              className="text-muted-foreground hover:text-foreground shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
        <UploadField
          value={value}
          onChange={(url) => onChange(item, url)}
          password={password}
          imagesOnly={item.type === "image"}
        />
        {broken && value && (
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 shrink-0" /> Rasm ochilmadi
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- Matn qatori ---------- */

function TextRow({
  field,
  current,
  saved,
  overrides,
  onChange,
}: {
  field: ContentField;
  current: (f: ContentField, l: Language) => string;
  saved: (f: ContentField, l: Language) => string;
  overrides: Record<Language, Record<string, string>>;
  onChange: (f: ContentField, l: Language, v: string) => void;
}) {
  return (
    <div className="bg-background rounded-xl border border-border p-5">
      <p className="text-xs font-mono text-muted-foreground mb-3 break-all">
        {field.path}
      </p>
      <div className="grid lg:grid-cols-3 gap-4">
        {LANGUAGES.map((lang) => {
          const value = current(field, lang);
          const isOverridden = field.path in (overrides[lang] ?? {});
          const isDirty = value !== saved(field, lang);
          const canReset = value !== field.base[lang];

          return (
            <div key={lang}>
              <div className="flex items-center justify-between mb-1.5 h-6">
                <label className="text-xs font-medium text-foreground">
                  {LANG_LABELS[lang]}
                  {isDirty && <span className="ml-1.5 text-amber-600">•</span>}
                  {!isDirty && isOverridden && (
                    <span className="ml-1.5 text-xs text-primary font-normal">
                      o'zgartirilgan
                    </span>
                  )}
                </label>
                {canReset && (
                  <button
                    type="button"
                    onClick={() => onChange(field, lang, field.base[lang])}
                    className="text-xs text-muted-foreground hover:text-foreground"
                    title="Standart matnga qaytarish"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>
              {field.multiline ? (
                <Textarea
                  value={value}
                  onChange={(e) => onChange(field, lang, e.target.value)}
                  rows={4}
                  className="text-sm"
                />
              ) : (
                <Input
                  value={value}
                  onChange={(e) => onChange(field, lang, e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmptyBox({ text }: { text: string }) {
  return (
    <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground text-sm">
      {text}
    </div>
  );
}
