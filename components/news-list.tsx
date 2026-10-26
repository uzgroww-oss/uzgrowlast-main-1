"use client";

import { useState } from "react";
import { Newspaper, CalendarDays } from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

export interface NewsListItem {
  id: string;
  title: string;
  body: string;
  imageUrl?: string | null;
  createdAt: string;
}

const LOCALES: Record<Language, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

// Shundan uzun matn kartada qisqartiriladi va "Ko'proq o'qish" chiqadi
const LONG_BODY = 220;

function NewsCard({ item }: { item: NewsListItem }) {
  const { t, currentLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const isLong = item.body.length > LONG_BODY;

  const date = new Date(item.createdAt).toLocaleDateString(
    LOCALES[currentLang] ?? "uz-UZ",
    { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Tashkent" },
  );

  return (
    <article className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      {item.imageUrl ? (
        <div className="aspect-video overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-primary/5 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="UZ GROW" className="h-12 w-auto opacity-60" />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <CalendarDays className="w-3.5 h-3.5" />
          <time dateTime={item.createdAt} suppressHydrationWarning>
            {date}
          </time>
        </div>
        <h2 className="text-lg font-bold text-foreground mb-2">{item.title}</h2>
        <p
          className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line ${
            open ? "" : "line-clamp-4"
          }`}
        >
          {item.body}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-3 self-start text-sm font-medium text-primary hover:underline"
          >
            {open ? t("common.showLess") : t("common.showMore")}
          </button>
        )}
      </div>
    </article>
  );
}

export function NewsList({ news }: { news: NewsListItem[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-10 lg:py-14 flex-1">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Newspaper className="w-4 h-4" />
            {t("newsPage.badge")}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("newsPage.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("newsPage.subtitle")}
          </p>
        </div>

        {news.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 text-muted-foreground">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="font-medium text-foreground mb-1">{t("newsPage.emptyTitle")}</p>
            <p className="text-sm">{t("newsPage.emptyText")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
