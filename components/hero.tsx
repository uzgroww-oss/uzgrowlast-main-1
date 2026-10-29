"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Download,
  Calculator,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mediaIds, useMedia } from "@/contexts/MediaContext";
import { MediaImg, MediaVideo } from "@/components/ui/media-img";
import { CATALOG_URL } from "@/lib/catalog";

const SLIDE_KEYS = ["slide1", "slide2", "slide3", "slide4"];

type VideoVariant = "portrait" | "landscape" | "large";

// Koddagi standart videolar (lib/media-registry.ts dagi qiymatlar bilan bir xil)
const DEFAULT_LANDSCAPE = "/videos/hero.mp4";
const DEFAULT_PORTRAIT = "/videos/hero-vertical.mp4";
const LARGE_LANDSCAPE = "/videos/hero-1080.mp4";

/**
 * Qurilmaga mos video manzili.
 *
 * Admin faqat yotiq videoni almashtirgan bo'lsa (tik video standartligicha
 * qolgan bo'lsa), telefonda ham yangi yotiq video ko'rsatiladi — eski tik
 * video bilan aralashib ketmasin. 1080p varianti faqat standart video uchun bor.
 */
function pickVideo(
  variant: VideoVariant | null,
  landscape: string,
  portrait: string,
): string {
  if (!variant) return "";
  const customLandscape = landscape !== DEFAULT_LANDSCAPE;
  if (variant === "portrait") {
    if (customLandscape && portrait === DEFAULT_PORTRAIT) return landscape;
    return portrait || landscape;
  }
  if (variant === "large" && landscape === DEFAULT_LANDSCAPE) return LARGE_LANDSCAPE;
  return landscape;
}

const getSlides = (t: (key: string) => string) => [
  {
    quote: t("hero.slides.slide1.quote"),
    author: t("hero.slides.slide1.author"),
    role: t("hero.slides.slide1.role"),
    cta: t("hero.slides.slide1.cta"),
  },
  {
    quote: t("hero.slides.slide2.quote"),
    author: t("hero.slides.slide2.author"),
    role: t("hero.slides.slide2.role"),
    cta: t("hero.slides.slide2.cta"),
  },
  {
    quote: t("hero.slides.slide3.quote"),
    author: t("hero.slides.slide3.author"),
    role: t("hero.slides.slide3.role"),
    cta: t("hero.slides.slide3.cta"),
  },
  {
    quote: t("hero.slides.slide4.quote"),
    author: t("hero.slides.slide4.author"),
    role: t("hero.slides.slide4.role"),
    cta: t("hero.slides.slide4.cta"),
  },
];

function AnimatedNumber({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOut = 1 - Math.pow(1 - percentage, 3); // cubic ease out

      setCount(Math.floor(end * easeOut));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
}

export function Hero() {
  const { t, isHidden } = useLanguage();
  const { m, mList } = useMedia();
  // O'chirilgan slaydlar aylanmaga tushmaydi
  const slides = getSlides(t).filter(
    (_, i) => !isHidden(`hero.slides.${SLIDE_KEYS[i]}`),
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fon rasmi slaydlar bilan birga almashadi. Admin paneldan rasm
  // o'chirilsa bo'sh satr keladi — u ro'yxatdan chiqarib tashlanadi,
  // shuning uchun bitta rasm qolsa ham fon to'g'ri ishlayveradi.
  const posters = mList(mediaIds("bosh.hero.poster", 4)).filter(Boolean);
  const bgIndex = posters.length > 0 ? currentSlide % posters.length : 0;

  // Barcha fon rasmlari birdan yuklanmasin — sahifa og'irlashmasligi uchun
  // ular bosqichma-bosqich qo'shiladi. Lekin KEYINGISI ham oldindan
  // qo'yiladi: aks holda rasm aynan ko'rsatilishi kerak bo'lgan paytda
  // yuklana boshlaydi va o'tish paytida fon bo'sh qolib ketadi.
  const [maxShown, setMaxShown] = useState(0);

  /* ---------- Fon videosi ---------- */

  // Qurilmaga qarab variant: tik ekran (telefon, tik planshet) — 9:16,
  // oddiy ekran — 720p, katta/retina ekran — 1080p. null — hali
  // aniqlanmagan yoki video o'chirilgan ("harakatni kamaytirish" yoki
  // trafikni tejash rejimi yoqilgan).
  const [variant, setVariant] = useState<VideoVariant | null>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData,
    );
    if (reduce || saveData) return;

    const portraitQuery = window.matchMedia("(orientation: portrait)");
    const pick = () => {
      const physicalWidth = window.innerWidth * (window.devicePixelRatio || 1);
      setVariant(
        portraitQuery.matches
          ? "portrait"
          : physicalWidth > 1920
            ? "large"
            : "landscape",
      );
    };
    pick();
    // Telefon burilganda mos variantga o'tadi
    portraitQuery.addEventListener("change", pick);
    return () => portraitQuery.removeEventListener("change", pick);
  }, []);

  const videoSrc = pickVideo(
    variant,
    m("bosh.hero.video"),
    m("bosh.hero.videoMobile"),
  );
  // Qaysi manzil o'ynay boshlagani — variant almashsa, yangisi tayyor
  // bo'lguncha rasmlar ko'rinib turadi
  const [playingSrc, setPlayingSrc] = useState("");
  const videoReady = videoSrc !== "" && playingSrc === videoSrc;

  // Video o'ynayotgan bo'lsa qolgan rasmlarni yuklash shart emas
  useEffect(() => {
    if (!videoReady) setMaxShown((prev) => Math.max(prev, bgIndex));
  }, [bgIndex, videoReady]);
  const mountCount = Math.min(posters.length, maxShown + 2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
    <section
      id="bosh-sahifa"
      className="relative min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center overflow-hidden bg-brand-dark"
    >
      {/* Fon: slaydlar bilan birga almashadigan rasmlar.
          Ular ustma-ust turadi va faqat bittasi ko'rinadi — shu sababli
          o'tish silliq bo'ladi (opacity).
          Ular ustidan fon videosi o'ynaydi — har qurilmaga o'z varianti
          (pickVideo). Videolar public/videos/ da, admin paneldan
          almashtiriladi yoki o'chiriladi. */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {posters.slice(0, mountCount).map((src, i) => (
          <MediaImg
            key={i}
            src={src}
            alt=""
            // Hammasi eager: "lazy" ko'rinmayotgan (opacity 0) rasmni
            // yuklamay qo'yishi mumkin, u holda o'tish paytida fon bo'sh
            // qoladi. Birinchi rasm — sahifaning asosiy rasmi, shuning uchun
            // yuqori ustuvorlikda; qolganlari pastda, LCP ga xalaqit bermasin.
            loading="eager"
            fetchPriority={i === 0 ? "high" : "low"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === bgIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {videoSrc && (
          <MediaVideo
            key={videoSrc}
            src={videoSrc}
            // Video o'ynay boshlagunicha rasmlar ko'rinib turadi, keyin u
            // ustidan silliq paydo bo'ladi — bo'sh/qora kadr ko'rinmaydi.
            // iPhone'da quvvat tejash rejimida avtomatik o'ynash taqiqlangan:
            // u holda video shunchaki chiqmaydi, rasmlar qoladi.
            onPlaying={() => setPlayingSrc(videoSrc)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
          />
        )}
</div>
      {/* Overlay: chap tomon to'qroq — matn har qanday kadrda o'qiladi */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/15" />

      <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl">
          {/* Qo'lyozma uslubidagi ustki yozuv */}
          <p className="font-hand text-2xl md:text-3xl font-bold text-brand-yellow mb-3">
            {t("hero.tagline")}
          </p>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 text-balance">
            {t("hero.title")}
          </h1>
          <span className="block w-16 h-1 bg-brand-yellow mb-8" aria-hidden="true" />

          {/* Slider Content */}
          <div className="relative min-h-[180px] mb-10">
            {slides.map((slide: any, index: number) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                <blockquote className="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-4 sm:mb-6 text-pretty">
                  &ldquo;{slide.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <span className="text-white font-bold text-base sm:text-lg">
                      {slide.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      {slide.author}
                    </p>
                    <p className="text-white/60 text-xs sm:text-sm">
                      {slide.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <Button
              size="lg"
              className="px-7 h-12 sm:h-13 text-sm sm:text-base w-full sm:w-auto"
              asChild
            >
              <Link href="/aloqa" className="gap-2">
                <Calculator className="w-5 h-5" />
                {t("hero.cta")}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-dark px-7 h-12 sm:h-13 text-sm sm:text-base font-semibold w-full sm:w-auto shadow-none"
              asChild
            >
              <Link
                href={CATALOG_URL}
                className="gap-2"
              >
                <Download className="w-5 h-5" />
                {t("hero.downloadCatalog")}
              </Link>
            </Button>
          </div>

          {/* Slide Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              {slides.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`${t("common.slide")} ${index + 1}`}
                  aria-current={index === currentSlide ? "true" : undefined}
                  className={`h-1 transition-all duration-300 ${
                    index === currentSlide
                      ? "w-10 bg-brand-yellow"
                      : "w-5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                aria-label={t("common.previous")}
                className="w-10 h-10 border border-white/40 text-white hover:bg-white hover:text-brand-dark flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label={t("common.next")}
                className="w-10 h-10 border border-white/40 text-white hover:bg-white hover:text-brand-dark flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* Raqamlar — bosh ekran ostidagi oq polosa */}
    <section className="bg-white border-b border-border" aria-label={t("hero.stats.projects")}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: 9, suffix: "+", label: t("hero.stats.experience"), duration: 3000 },
              { value: 1500, suffix: "+", label: t("hero.stats.projects"), duration: 2000 },
              { value: 50, suffix: "+", label: t("hero.stats.specialists"), duration: 3000 },
              { value: 5, suffix: "+", label: t("hero.stats.countries"), duration: 3000 },
            ].map((stat, index) => (
              <div
                key={index}
                className="py-7 md:py-10 px-2 sm:px-4 text-center"
              >
                <div className="font-heading text-4xl md:text-5xl font-semibold text-brand-green tracking-tight">
                  <AnimatedNumber end={stat.value} duration={stat.duration} />{stat.suffix}
                </div>
                <div className="text-brand-dark text-sm md:text-[15px] font-semibold mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
    </section>
    </>
  );
}
