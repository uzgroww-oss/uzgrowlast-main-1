"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";

/**
 * Bosh sahifadagi ikki blok: "Qanday ishlaymiz" (01–04) va to'q fonli
 * chaqiruv polosasi. Matnlar "homeBlocks" da (admin: Bosh sahifa).
 */

export function ProcessSteps() {
  const { t, tList } = useLanguage();
  const steps = tList("homeBlocks.steps");
  if (steps.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <span className="section-eyebrow">{t("homeBlocks.processEyebrow")}</span>
          <h2 className="section-title text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground text-balance">
            {t("homeBlocks.processTitle")}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t("homeBlocks.processText")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ key, value }, i) => (
            <div
              key={key}
              className="bg-white p-6 lg:p-7 border border-dashed border-[#c5cfc5] hover:border-brand-green hover:-translate-y-1 transition-all"
            >
              <h3 className="text-xl font-bold text-foreground mb-3">
                <span className="text-brand-green mr-1.5">{String(i + 1).padStart(2, "0")}.</span>
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild className="px-8 h-12">
            <Link href="/aloqa">{t("homeBlocks.processButton")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  const { t } = useLanguage();
  const { m } = useMedia();
  const bg = m("bosh.about.background");

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-brand-dark">
      {bg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-brand-dark/75" />
      <div className="relative container mx-auto px-4 lg:px-8 text-center max-w-3xl">
        <span className="section-eyebrow" style={{ color: "var(--brand-yellow)" }}>{t("homeBlocks.ctaEyebrow")}</span>
        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
          {t("homeBlocks.ctaTitle")}
        </h2>
        <p className="mt-6 text-lg text-white/85">{t("homeBlocks.ctaText")}</p>
        <Button asChild className="mt-8 px-8 h-12">
          <Link href="/aloqa">
            {t("homeBlocks.ctaButton")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
