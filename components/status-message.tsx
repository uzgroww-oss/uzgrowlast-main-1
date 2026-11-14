"use client";

import Link from "@/components/ui/localized-link";
import { useLanguage } from "@/contexts/LanguageContext";

const TEXT = {
  notFound: {
    uz: ["Sahifa topilmadi", "Siz qidirgan sahifa o'chirilgan yoki manzil noto'g'ri yozilgan."],
    ru: ["Страница не найдена", "Страница удалена или адрес введён с ошибкой."],
    en: ["Page not found", "The page has been removed or the address is mistyped."],
  },
  error: {
    uz: ["Xatolik yuz berdi", "Sahifani yuklashda muammo chiqdi. Qayta urinib ko'ring."],
    ru: ["Произошла ошибка", "Не удалось загрузить страницу. Попробуйте ещё раз."],
    en: ["Something went wrong", "The page failed to load. Please try again."],
  },
} as const;

const HOME = { uz: "Bosh sahifaga", ru: "На главную", en: "Go home" };
const RETRY = { uz: "Qayta urinish", ru: "Повторить", en: "Try again" };

/** 404 va xato sahifalari uchun umumiy xabar */
export function StatusMessage({
  kind,
  onRetry,
}: {
  kind: keyof typeof TEXT;
  onRetry?: () => void;
}) {
  const { currentLang } = useLanguage();
  const [title, text] = TEXT[kind][currentLang];
  return (
    <section className="container mx-auto px-4 py-24 lg:py-32 text-center">
      <p className="font-heading text-6xl sm:text-7xl font-bold text-brand-green">
        {kind === "notFound" ? "404" : "!"}
      </p>
      <h1 className="font-heading text-2xl sm:text-4xl font-bold text-foreground mt-4">{title}</h1>
      <p className="text-muted-foreground mt-3 max-w-md mx-auto">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="h-12 px-7 border-2 border-brand-dark text-brand-dark font-semibold hover:bg-brand-dark hover:text-white transition-colors"
          >
            {RETRY[currentLang]}
          </button>
        )}
        <Link
          href="/"
          className="inline-flex items-center h-12 px-7 bg-brand-yellow text-brand-dark font-semibold hover:bg-[#ffcd38] transition-colors"
        >
          {HOME[currentLang]}
        </Link>
      </div>
    </section>
  );
}
