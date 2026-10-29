"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Sprout,
  Sun,
  Thermometer,
  Timer,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaImg } from "@/components/ui/media-img";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";

/**
 * Ekinlar bo'limi: /ekinlar, /ekinlar/<kod> va bosh sahifadagi qisqa blok.
 * Matnlar tarjima faylining "cropsPage" bo'limida (admin: Ekinlar sahifasi),
 * rasmlar "ekinlar.<kod>" da.
 */

interface Crop {
  code: string;
  name: string;
  tagline: string;
  intro: string;
  conditions: { label: string; value: string }[];
  greenhouse: string;
  methods: string[];
  faq: { q: string; a: string }[];
}

// Sharoitlar tartibi bir xil: kunduzgi, tungi harorat, namlik, yorug'lik, muddat
const CONDITION_ICONS = [Thermometer, Thermometer, Droplets, Sun, Timer];

function useCrops() {
  const { tList } = useLanguage();
  const { m } = useMedia();
  return tList("cropsPage.items").map(({ value }) => {
    const crop = value as Crop;
    return { ...crop, image: m(`ekinlar.${crop.code}`) };
  });
}

function CropCard({ crop, compact = false }: { crop: ReturnType<typeof useCrops>[number]; compact?: boolean }) {
  const { t } = useLanguage();
  if (compact) {
    return (
      <Link
        href={`/ekinlar/${crop.code}`}
        className="group relative block aspect-[3/4] overflow-hidden bg-brand-dark"
      >
        <MediaImg
          src={crop.image}
          alt={crop.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-white font-bold text-lg sm:text-xl mb-1.5">{crop.name}</h3>
          <p className="text-white/75 text-xs sm:text-sm leading-snug line-clamp-3">{crop.tagline}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-brand-yellow text-sm font-semibold">
            {t("cropsPage.more")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/ekinlar/${crop.code}`}
      className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all"
    >
      <div className={`relative overflow-hidden bg-muted ${compact ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
        <MediaImg
          src={crop.image}
          alt={crop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        <h3 className="absolute left-4 bottom-3 right-4 text-white font-bold text-lg sm:text-xl drop-shadow">
          {crop.name}
        </h3>
      </div>
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{crop.tagline}</p>
        {!compact && crop.conditions?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {crop.conditions.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
              >
                {c.value}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          {t("cropsPage.more")}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

/** /ekinlar — barcha ekinlar */
export function CropsIndex() {
  const { t } = useLanguage();
  const crops = useCrops();

  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-5">
            <Sprout className="w-4 h-4" />
            {t("cropsPage.badge")}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("cropsPage.title")}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("cropsPage.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <CropCard key={crop.code} crop={crop} />
          ))}
        </div>

        <CallToAction />
      </div>
    </section>
  );
}

/** Bosh sahifadagi qisqa blok */
export function CropsStrip() {
  const { t } = useLanguage();
  const crops = useCrops();
  if (crops.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-10">
          <div>
            <span className="section-eyebrow">{t("cropsPage.badge")}</span>
            <h2 className="section-title section-title-left text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground text-balance">
              {t("cropsPage.homeTitle")}
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground text-lg mb-5">{t("cropsPage.homeSubtitle")}</p>
            <Button asChild className="px-7 h-11">
              <Link href="/ekinlar">
                {t("cropsPage.back")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {crops.map((crop) => (
            <CropCard key={crop.code} crop={crop} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction({ cropCode }: { cropCode?: string }) {
  const { t } = useLanguage();
  return (
    <div className="mt-14 rounded-3xl bg-[#24B14B] p-6 sm:p-10 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-balance">
        {t("cropsPage.ctaTitle")}
      </h2>
      <p className="text-white/85 max-w-2xl mx-auto mb-7">{t("cropsPage.ctaText")}</p>
      <Button size="lg" variant="secondary" className="rounded-full px-8 gap-2" asChild>
        <Link href={cropCode ? `/aloqa?ekin=${cropCode}` : "/aloqa"}>
          {t("cropsPage.ctaButton")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}

/** /ekinlar/<kod> — bitta ekin */
export function CropDetail({ code }: { code: string }) {
  const { t } = useLanguage();
  const crops = useCrops();
  const crop = crops.find((c) => c.code === code);
  const others = crops.filter((c) => c.code !== code);

  // Admin bu ekinni yashirgan bo'lsa
  if (!crop) {
    return (
      <section className="py-24 text-center container mx-auto px-4">
        <Link href="/ekinlar" className="inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft className="w-4 h-4" /> {t("cropsPage.back")}
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Sarlavha */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden">
        <MediaImg
          src={crop.image}
          alt={crop.name}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
        <div className="relative container mx-auto px-4 lg:px-8 pb-10 pt-28">
          <Link
            href="/ekinlar"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-5"
          >
            <ArrowLeft className="w-4 h-4" /> {t("cropsPage.back")}
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
            {crop.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-7">{crop.tagline}</p>
          <Button size="lg" className="bg-[#24B14B] hover:bg-[#24B14B]/90 rounded-full px-8 gap-2" asChild>
            <Link href={`/aloqa?ekin=${crop.code}`}>
              {t("cropsPage.ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Kirish va sharoitlar */}
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
            <p className="text-lg text-foreground/90 leading-relaxed">{crop.intro}</p>

            {crop.conditions?.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-5 sm:p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">{t("cropsPage.conditionsTitle")}</h2>
                <dl className="space-y-3">
                  {crop.conditions.map((c, i) => {
                    const Icon = CONDITION_ICONS[i] ?? Sprout;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-4.5 h-4.5" />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-xs text-muted-foreground">{c.label}</dt>
                          <dd className="font-semibold text-foreground">{c.value}</dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </div>
            )}
          </div>

          {/* Issiqxona va usullar */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-primary/5 rounded-2xl border border-primary/15 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Warehouse className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">{t("cropsPage.greenhouseTitle")}</h2>
              </div>
              <p className="text-foreground/85 leading-relaxed mb-5">{crop.greenhouse}</p>
              <Link
                href="/issiqxona-turlari"
                className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
              >
                {t("cropsPage.greenhouseLink")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {crop.methods?.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">{t("cropsPage.methodsTitle")}</h2>
                <ul className="space-y-3">
                  {crop.methods.map((mth, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{mth}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Savol-javoblar */}
          {crop.faq?.length > 0 && (
            <div className="mt-14 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{t("cropsPage.faqTitle")}</h2>
              <div className="space-y-3">
                {crop.faq.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-card rounded-xl border border-border open:border-primary/30 open:shadow-sm"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                      <span>{f.q}</span>
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-lg leading-none group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="px-5 pb-5 -mt-1 text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <CallToAction cropCode={crop.code} />

          {/* Boshqa ekinlar */}
          {others.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl font-bold text-foreground mb-5">{t("cropsPage.back")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {others.map((c) => (
                  <CropCard key={c.code} crop={c} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
