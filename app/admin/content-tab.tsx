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
  Trash2,
  ChevronDown,
  Plus,
  Undo2,
} from "lucide-react";
import type { Language } from "@/contexts/LanguageContext";
import type { MediaItem } from "@/lib/media-registry";
import {
  LANGUAGES,
  LANG_LABELS,
  type CardView,
  type ContentField,
} from "@/lib/content-schema";
import { fieldLabel } from "@/lib/field-labels";
import { COLLECTIONS } from "@/lib/collections";
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

const LANG_SHORT: Record<string, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
  all: "3 til",
};

export function ContentToolbar() {
  const {
    query,
    setQuery,
    save,
    saving,
    changeCount,
    langView,
    setLangView,
  } = useContentStore();

  return (
    <div className="flex flex-wrap items-center gap-2 flex-1">
      {/* Til tanlash — bir vaqtda bitta til bilan ishlash qulayroq */}
      <div className="flex rounded-lg border border-border overflow-hidden shrink-0">
        {(["uz", "ru", "en", "all"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setLangView(v)}
            title={v === "all" ? "Uch tilni yonma-yon ko'rish" : LANG_LABELS[v]}
            className={`px-2.5 h-9 text-xs font-medium transition-colors ${
              langView === v
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            {LANG_SHORT[v]}
          </button>
        ))}
      </div>
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
    degraded,
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
    clearText,
    clearMedia,
    deleteCard,
    restoreCard,
    isCardHidden,
    addCard,
    lastAdded,
    mediaResults,
    visibleLangs,
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
      {degraded && (
        <div className="text-sm bg-amber-50 border border-amber-300 rounded-lg p-4">
          <p className="font-semibold text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Ma'lumotlar bazasiga ulanib bo'lmadi
          </p>
          <p className="text-amber-800 mt-1.5 leading-relaxed">
            Hozir o'zgartirishlaringiz <strong>saqlanmaydi</strong> va saytda
            ko'rinmaydi. Serverda <code>SUPABASE_URL</code> va{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> sozlamalari kiritilganini
            tekshiring, keyin saytni qayta joylashtiring.
          </p>
        </div>
      )}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </p>
      )}
      {saved && changeCount === 0 && (
        <p className="text-sm text-green-700 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
          <Check className="w-4 h-4 shrink-0" /> Saqlandi. Saytda 15 soniya ichida ko'rinadi
        </p>
      )}

      {/* Qidiruv natijalari */}
      {searchResults && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Qidiruv natijalari
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {searchResults.length + mediaResults.length} ta
            </span>
          </h2>
          {mediaResults.length > 0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
              {mediaResults.map((item) => (
                <MediaRow
                  key={item.id}
                  password={password}
                  item={item}
                  value={currentMedia(item)}
                  isOverridden={item.id in mediaOverrides}
                  isDirty={currentMedia(item) !== savedMedia(item)}
                  onChange={setMediaValue}
                  onClear={clearMedia}
                />
              ))}
            </div>
          )}
          {searchResults.length === 0 && mediaResults.length === 0 ? (
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
                onClear={clearText}
                langs={visibleLangs}
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
            <div className="flex items-center gap-3">
              {page.path && (
                <a
                  href={page.path}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  {page.path} ochish
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {overrideCount === 0 && (
            <p className="text-sm text-muted-foreground -mt-4">
              Matn yoki rasm manzilini o'zgartiring va yuqoridagi «Saqlash»ni
              bosing. Tegilmagan joylar standart holatida qoladi.
            </p>
          )}

          {page.cardBlocks.map((block) => {
            const collection = COLLECTIONS.find((c) => c.key === block.collectionKey);
            const cards = block.cards.filter((c) => !isCardHidden(c.path));
            const hiddenCards = block.cards.filter((c) => isCardHidden(c.path));
            const noun = collection?.addable?.noun;
            if (cards.length === 0 && hiddenCards.length === 0 && !noun) return null;
            return (
            <section key={block.title} className="space-y-3">
              <BlockTitle title={block.title} count={cards.length} icon="🗂" />
              <div className="space-y-3">
                {cards.map((card) => (
                  <CardRow
                    key={card.path}
                    card={card}
                    defaultOpen={card.path === lastAdded}
                    password={password}
                    onDelete={deleteCard}
                    currentText={currentText}
                    savedText={savedText}
                    setTextValue={setTextValue}
                    clearText={clearText}
                    textOverrides={textOverrides}
                    currentMedia={currentMedia}
                    savedMedia={savedMedia}
                    setMediaValue={setMediaValue}
                    clearMedia={clearMedia}
                    mediaOverrides={mediaOverrides}
                    langs={visibleLangs}
                  />
                ))}
              </div>
              {noun && (
                <button
                  type="button"
                  onClick={() => addCard(block.collectionKey)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Plus className="w-4 h-4" /> Yangi {noun} qo'shish
                </button>
              )}
              {hiddenCards.length > 0 && (
                <HiddenCards cards={hiddenCards} onRestore={restoreCard} />
              )}
            </section>
            );
          })}

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
                    onClear={clearMedia}
                  />
                ))}
              </div>
            </section>
          ))}

          {page.blocks.map((block) => (
            <CollapsibleBlock
              key={block.title}
              title={block.title}
              count={block.fields.length}
              shared={block.shared}
              hint={block.hint}
            >
              {block.fields.map((field) => (
                <TextRow
                  key={field.path}
                  field={field}
                  current={currentText}
                  saved={savedText}
                  overrides={textOverrides}
                  onChange={setTextValue}
                  onClear={clearText}
                  langs={visibleLangs}
                />
              ))}
            </CollapsibleBlock>
          ))}

          {page.blocks.length === 0 &&
            page.mediaBlocks.length === 0 &&
            page.cardBlocks.length === 0 && (
              <EmptyBox text="Bu sahifada tahrirlanadigan narsa yo'q" />
            )}
        </div>
      )}
    </div>
  );
}

/** Uzun bo'limlar yopiq holda ochiladi — ekran to'lib ketmasin */
function CollapsibleBlock({
  title,
  count,
  shared,
  hint,
  children,
}: {
  title: string;
  count: number;
  shared?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  // Kichik bo'limlar darhol ochiq — ularni bosib o'tirishning ma'nosi yo'q
  const [open, setOpen] = useState(count <= 8);

  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full text-left group"
      >
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
        <BlockTitle title={title} count={count} shared={shared} />
      </button>
      {hint && (
        <p className="text-xs text-muted-foreground -mt-1 ml-6">{hint}</p>
      )}
      {open && <div className="space-y-3">{children}</div>}
    </section>
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


/* ---------- Bitta karta: rasmi va barcha matnlari birga ---------- */

function CardRow({
  card,
  defaultOpen = false,
  password,
  onDelete,
  currentText,
  savedText,
  setTextValue,
  clearText,
  textOverrides,
  currentMedia,
  savedMedia,
  setMediaValue,
  clearMedia,
  mediaOverrides,
  langs,
}: {
  card: CardView;
  defaultOpen?: boolean;
  langs: Language[];
  password: string;
  onDelete: (card: CardView) => Promise<void>;
  currentText: (f: ContentField, l: Language) => string;
  savedText: (f: ContentField, l: Language) => string;
  setTextValue: (f: ContentField, l: Language, v: string) => void;
  clearText: (f: ContentField, l: Language) => void;
  textOverrides: Record<Language, Record<string, string>>;
  currentMedia: (i: MediaItem) => string;
  savedMedia: (i: MediaItem) => string;
  setMediaValue: (i: MediaItem, v: string) => void;
  clearMedia: (i: MediaItem) => void;
  mediaOverrides: Record<string, string>;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [busy, setBusy] = useState(false);

  // Yangi kartaning nomi — admin yozayotgan sarlavhadan olinadi
  const labelField = card.fields.find((f) =>
    /\.(title|name|label|author|country)$/.test(f.path),
  );
  const typed = labelField ? currentText(labelField, "uz").trim() : "";
  const label = card.added ? typed || card.label : card.label;

  const remove = async () => {
    const ok = window.confirm(
      card.added
        ? `«${label}» va uning barcha matn hamda rasmlari o'chiriladi.\n\nO'chirilsinmi?`
        : `«${label}» saytdan olib tashlanadi.\n\nKeyin uni shu bo'limning pastidagi «O'chirilganlar» ro'yxatidan qaytarish mumkin.\n\nO'chirilsinmi?`,
    );
    if (!ok) return;
    setBusy(true);
    await onDelete(card);
    setBusy(false);
  };

  return (
    <div className="bg-background rounded-xl border border-border">
      {/* Sarlavha */}
      <div className="flex items-center gap-3 p-4">
        {card.media[0] && currentMedia(card.media[0]) && (
          <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentMedia(card.media[0])}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex-1 text-left min-w-0 flex items-center gap-2"
        >
          <span className="font-medium text-foreground truncate">
            {label}
          </span>
          {card.added && (
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-primary/10 text-primary shrink-0">
              yangi
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <button
          type="button"
          onClick={remove}
          disabled={busy}
          title="Kartani o'chirish"
          aria-label={`${label} — o'chirish`}
          className="shrink-0 w-8 h-8 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Ichi */}
      {open && (
        <div className="border-t border-border p-4 space-y-3">
          {card.media.length > 0 && (
            <div className="grid md:grid-cols-2 gap-3">
              {card.media.map((item) => (
                <MediaRow
                  key={item.id}
                  password={password}
                  item={item}
                  value={currentMedia(item)}
                  isOverridden={item.id in mediaOverrides}
                  isDirty={currentMedia(item) !== savedMedia(item)}
                  onChange={setMediaValue}
                  onClear={clearMedia}
                />
              ))}
            </div>
          )}
          {card.fields.map((field) => (
            <TextRow
              key={field.path}
              field={field}
              current={currentText}
              saved={savedText}
              overrides={textOverrides}
              onChange={setTextValue}
              onClear={clearText}
              langs={langs}
              scope={card.path}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- O'chirilgan kartalar ---------- */

function HiddenCards({
  cards,
  onRestore,
}: {
  cards: CardView[];
  onRestore: (path: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-muted/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        O'chirilganlar ({cards.length})
      </button>
      {open && (
        <ul className="px-4 pb-3 space-y-2">
          {cards.map((card) => (
            <li key={card.path} className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate text-muted-foreground line-through">{card.label}</span>
              <button
                type="button"
                disabled={busy === card.path}
                onClick={async () => {
                  setBusy(card.path);
                  await onRestore(card.path);
                  setBusy(null);
                }}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 h-8 text-xs hover:bg-muted disabled:opacity-50"
              >
                {busy === card.path ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Undo2 className="w-3.5 h-3.5" />
                )}
                Qaytarish
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Rasm qatori ---------- */

function MediaRow({
  item,
  value,
  isOverridden,
  isDirty,
  onChange,
  onClear,
  password,
}: {
  item: MediaItem;
  password: string;
  onClear: (item: MediaItem) => void;
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
        ) : !value ? (
          <span className="text-[10px] text-muted-foreground text-center px-1 leading-tight">
            o'chirilgan
          </span>
        ) : broken ? (
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
          <div className="flex items-center gap-1.5 shrink-0">
            {value !== "" && (
              <button
                type="button"
                onClick={() => onClear(item)}
                title="Rasmni o'chirish (saytda ko'rinmaydi)"
                className="text-muted-foreground hover:text-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
            {value !== item.def && (
              <button
                type="button"
                onClick={() => onChange(item, item.def)}
                title="Standart rasmga qaytarish"
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
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
  onClear,
  langs,
  scope,
}: {
  field: ContentField;
  current: (f: ContentField, l: Language) => string;
  saved: (f: ContentField, l: Language) => string;
  overrides: Record<Language, Record<string, string>>;
  onChange: (f: ContentField, l: Language, v: string) => void;
  onClear: (f: ContentField, l: Language) => void;
  langs: Language[];
  /** Karta ichida bo'lsa nom qisqaradi */
  scope?: string;
}) {
  return (
    <div className="bg-background rounded-xl border border-border p-5">
      <p
        className="text-sm font-medium text-foreground mb-3"
        title={field.path}
      >
        {fieldLabel(field.path, scope)}
      </p>
      <div
        className={`grid gap-4 ${langs.length > 1 ? "lg:grid-cols-3" : ""}`}
      >
        {langs.map((lang) => {
          const value = current(field, lang);
          const isOverridden = field.path in (overrides[lang] ?? {});
          const isDirty = value !== saved(field, lang);
          const canReset = value !== field.base[lang];

          return (
            <div key={lang}>
              <div className="flex items-center justify-between mb-1.5 h-6">
                <label className="text-xs font-medium text-muted-foreground">
                  {langs.length > 1 ? LANG_LABELS[lang] : ""}
                  {isDirty && <span className="ml-1.5 text-amber-600">•</span>}
                  {!isDirty && isOverridden && value === "" && (
                    <span className="ml-1.5 text-xs text-red-600 font-normal">
                      o'chirilgan
                    </span>
                  )}
                  {!isDirty && isOverridden && value !== "" && (
                    <span className="ml-1.5 text-xs text-primary font-normal">
                      o'zgartirilgan
                    </span>
                  )}
                </label>
                <div className="flex items-center gap-1.5">
                  {value !== "" && (
                    <button
                      type="button"
                      onClick={() => onClear(field, lang)}
                      className="text-xs text-muted-foreground hover:text-red-600"
                      title="Matnni o'chirish (saytda ko'rinmaydi)"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
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
