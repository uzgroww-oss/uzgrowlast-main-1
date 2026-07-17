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
import { useMedia } from "@/contexts/MediaContext";

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
  const { t } = useLanguage();
  const { m } = useMedia();
  const slides = getSlides(t);
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <section
      id="bosh-sahifa"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
  <video
    src={m("bosh.hero.video")}
    className="absolute top-1/2 left-1/2 w-[100vw] min-w-full h-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 object-cover"
    autoPlay
    loop
    muted
  >
  </video>
</div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/30 to-black/40" />

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-24 pb-12">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/10">
            <span className="w-2 h-2 bg-[#24B14B] rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">
              {t("hero.tagline")}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8 text-balance">
            {t("hero.title")}
          </h1>

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
                <blockquote className="text-lg sm:text-xl md:text-2xl text-white/90 font-light italic mb-4 sm:mb-6 text-pretty">
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
              className="bg-[#24B14B] hover:bg-[#24B14B]/90 text-primary-foreground rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto"
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
              className="border-white text-amber-500 hover:bg-white hover:text-amber-600 rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto"
              asChild
            >
              <Link
                href="https://drive.usercontent.google.com/download?id=1HErqszuF53VmZMGFVHg9mOFhM0y_G50L&export=download&authuser=0"
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-10 bg-[#24B14B]"
                      : "w-4 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Discover Button */}
        
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: 9, suffix: "+", label: t("hero.stats.experience"), duration: 3000 },
              { value: 2000, suffix: "+", label: t("hero.stats.projects"), duration: 2000 },
              { value: 50, suffix: "+", label: t("hero.stats.specialists"), duration: 3000 },
              { value: 12, suffix: "+", label: t("hero.stats.regions"), duration: 3000 },
            ].map((stat, index) => (
              <div
                key={index}
                className="py-4 sm:py-5 px-2 sm:px-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-white">
                  <AnimatedNumber end={stat.value} duration={stat.duration} />{stat.suffix}
                </div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
