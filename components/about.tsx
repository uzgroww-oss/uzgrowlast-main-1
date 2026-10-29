"use client";

import { MediaImg } from "@/components/ui/media-img";

import { useEffect, useState, useRef } from "react";
import { Target, Eye, Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { mediaIds, useMedia } from "@/contexts/MediaContext";
import Link from "next/link";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold">
      {count}
      {suffix}
    </div>
  );
}

// Alohida sahifada bu bo'lim sarlavhasi h1, bosh sahifada esa h2
// (u yerda h1 hero'da) — sahifada bittadan ortiq h1 bo'lmasligi kerak.
export function About({ asPageTitle = false }: { asPageTitle?: boolean }) {
  const Heading = asPageTitle ? "h1" : "h2";
  const { t } = useLanguage();
  const { m, mList } = useMedia();
  const [currentAboutImage, setCurrentAboutImage] = useState(0);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Slaydshou rasmlari — admin paneldan almashtiriladi
  const aboutBackgroundImages = mList(mediaIds("bosh.about.slide", 6));

  // Change image every 4 seconds for about section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAboutImage((prev) => (prev + 1) % aboutBackgroundImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [aboutBackgroundImages.length]);

  const stats = [
    { value: 9, suffix: "+", label: t("about.experience") },
    { value: 1500, suffix: "+", label: t("about.projects") },
    { value: 50, suffix: "+", label: t("about.clients") },
    { value: 5, suffix: "+", label: t("about.countries") },
  ];

  // Replace the values declaration with this:
  const rawValues = t("about.values");
  const values: string[] = Array.isArray(rawValues)
    ? rawValues
    : ([t("about.values.0"), t("about.values.1"), t("about.values.2")].filter(
        (v) => typeof v === "string" && v.length > 0,
      ) as string[]);
  return (
    <section id="haqimizda" className="py-14 lg:py-20 overflow-hidden relative bg-white">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Top Section with Video */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-20">
          {/* Image Slideshow */}
          <div className="relative group order-2 lg:order-2 mr-3 mb-3 sm:mr-5 sm:mb-5">
            <div className="aspect-video overflow-hidden relative z-10">
              <MediaImg
                src={aboutBackgroundImages[currentAboutImage]}
                alt="About UZ GROW"
                className="w-full h-full object-cover transition-opacity duration-1000"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 bg-brand-yellow" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-1">
            <span className="section-eyebrow">{t("about.tagline")}</span>
            <Heading className="section-title section-title-left text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-6 text-balance">
              {t("about.headline")}
            </Heading>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-muted-foreground">
              {t("about.descriptionText")}
            </p>
            <Link href="/haqimizda">
              <Button
                size="lg"
                className="px-8"
              >
                {t("about.aboutUsButton")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface p-7 border border-dashed border-[#c5cfc5] hover:border-brand-green transition-colors">
            <div className="w-12 h-12 bg-brand-green text-white flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              <span className="text-brand-green mr-1.5">01.</span>
              {t("about.mission")}
            </h3>
            <p className="text-muted-foreground">{t("about.missionDesc")}</p>
          </div>

          <div className="bg-surface p-7 border border-dashed border-[#c5cfc5] hover:border-brand-green transition-colors">
            <div className="w-12 h-12 bg-brand-green text-white flex items-center justify-center mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              <span className="text-brand-green mr-1.5">02.</span>
              {t("about.vision")}
            </h3>
            <p className="text-muted-foreground">{t("about.visionDesc")}</p>
          </div>

          <div className="bg-surface p-7 border border-dashed border-[#c5cfc5] hover:border-brand-green transition-colors">
            <div className="w-12 h-12 bg-brand-green text-white flex items-center justify-center mb-5">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              <span className="text-brand-green mr-1.5">03.</span>
              {t("about.valuesTitle")}
            </h3>
            <p className="text-muted-foreground">
              {t("about.valuesAndRules.desc")}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {values.map((value: any, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white border border-border text-brand-dark text-sm font-medium"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
