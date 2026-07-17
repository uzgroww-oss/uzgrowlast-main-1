"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  Check,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";

export function Header() {
  const { m } = useMedia();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isValuesHovered, setIsValuesHovered] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { currentLang, setLanguage, t, tObj } = useLanguage();

  const aboutValues = (() => {
    const raw = tObj("about.values");
    return Array.isArray(raw) ? raw : [];
  })();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/issiqxona-turlari", label: t("nav.greenhouse") },
    { href: "/loyihalar", label: t("nav.projects") },
    { href: "/yangiliklar", label: t("nav.news") },
    { href: "/rahbariyat", label: t("nav.team") },
    { href: "/aloqa", label: t("nav.contact") },
  ];

  const languages: { code: Language; label: string; short: string }[] = [
    { code: "uz", label: "O'zbekcha", short: "UZ" },
    { code: "ru", label: "Русский", short: "RU" },
    { code: "en", label: "English", short: "EN" },
  ];
  const activeLang = languages.find((l) => l.code === currentLang);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showTransparent = isHome && !isScrolled;

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-6">
              <a
                href="tel:+998555152223"
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                <span className="text-xs font-medium tracking-wide">
                  +998 55 515 22 23
                </span>
              </a>
              <a
                href="mailto:uzgrrow@gmail.com"
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                <span className="text-xs font-medium tracking-wide">
                  uzgrrow@gmail.com
                </span>
              </a>
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label={t("nav.language")}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold tracking-wide bg-white/10 hover:bg-white/20 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {activeLang?.short}
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-44">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "flex items-center justify-between gap-4 cursor-pointer py-2.5",
                      currentLang === lang.code && "bg-primary/10 text-primary",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold w-7 text-center py-0.5 rounded bg-muted text-muted-foreground">
                        {lang.short}
                      </span>
                      {lang.label}
                    </span>
                    {currentLang === lang.code && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          showTransparent
            ? "bg-transparent py-3"
            : "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm py-2",
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <img
                src={m("umumiy.logo")}
                alt={t("common.logoAlt")}
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain animate-logo"
              />
              <span className="hidden sm:block font-bold text-lg lg:text-xl tracking-tight text-foreground whitespace-nowrap">
                {t("footer.brandName")}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Home Link */}
              <Link
                href={navItems[0].href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                  pathname === navItems[0].href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                )}
              >
                {navItems[0].label}
              </Link>

              {/* Qadriyatlar Dropdown */}
              <div
                className="flex items-center"
                onMouseEnter={() => setIsValuesHovered(true)}
                onMouseLeave={() => setIsValuesHovered(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-all whitespace-nowrap",
                    isValuesHovered
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                  )}
                >
                  {t("about.valuesTitle")}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isValuesHovered && "rotate-180",
                    )}
                  />
                </button>

                {/* Dropdown Menu - Full Width */}
                <div
                  className={cn(
                    "absolute top-full left-0 w-full pt-4 transition-all duration-300 transform origin-top z-50",
                    isValuesHovered
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 -translate-y-4 scale-95 pointer-events-none",
                  )}
                >
                  <div className="bg-white/95 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.2)] border-y border-gray-100 py-12">
                    <div className="container mx-auto px-4 lg:px-8">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Mission Card */}
                        <div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100/50 hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group/card">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover/card:scale-110 group-hover/card:bg-primary transition-all duration-500">
                            <Target className="w-7 h-7 text-primary group-hover/card:text-white transition-colors" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wider">
                            {t("about.mission")}
                          </h3>
                          <p className="text-base text-gray-600 leading-relaxed">
                            {t("about.missionDesc")}
                          </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100/50 hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group/card">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover/card:scale-110 group-hover/card:bg-primary transition-all duration-500">
                            <Eye className="w-7 h-7 text-primary group-hover/card:text-white transition-colors" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wider">
                            {t("about.vision")}
                          </h3>
                          <p className="text-base text-gray-600 leading-relaxed">
                            {t("about.visionDesc")}
                          </p>
                        </div>

                        {/* Values Card */}
                        <div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100/50 hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group/card">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover/card:scale-110 group-hover/card:bg-primary transition-all duration-500">
                            <Heart className="w-7 h-7 text-primary group-hover/card:text-white transition-colors" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wider">
                            {t("about.valuesTitle")}
                          </h3>
                          <p className="text-base text-gray-600 leading-relaxed mb-6">
                            {t("about.valuesAndRules.desc")}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {aboutValues.map((tag: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining Nav Items */}
              {navItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile: language + menu */}
            <div className="lg:hidden flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label={t("nav.language")}
                    className="flex items-center gap-1 h-11 px-3 rounded-lg text-xs font-semibold text-foreground/80 hover:bg-primary/5 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    {activeLang?.short}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-44">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={cn(
                        "flex items-center justify-between gap-4 cursor-pointer py-2.5",
                        currentLang === lang.code &&
                          "bg-primary/10 text-primary",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-[10px] font-bold w-7 text-center py-0.5 rounded bg-muted text-muted-foreground">
                          {lang.short}
                        </span>
                        {lang.label}
                      </span>
                      {currentLang === lang.code && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
                aria-expanded={isOpen}
                className="w-11 h-11 flex items-center justify-center rounded-lg text-foreground hover:bg-primary/5 transition-colors"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <div
            className={cn(
              "lg:hidden overflow-y-auto transition-all duration-300",
              isOpen ? "max-h-[calc(100vh-120px)] mt-4 pb-8" : "max-h-0",
            )}
          >
            <div className="bg-background rounded-2xl p-4 shadow-xl">
              {/* Mobile Contact Info */}
              <div className="flex flex-col gap-2 pb-4 mb-4 border-b border-border">
                <a
                  href={`tel:${t("contact.companyPhone").replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  {t("contact.companyPhone")}
                </a>
                <a
                  href={`mailto:${t("contact.companyEmail")}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  {t("contact.companyEmail")}
                </a>
              </div>

              <nav className="flex flex-col gap-1">
                {/* Mobile Home Link */}
                <Link
                  href={navItems[0].href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl transition-colors font-medium",
                    pathname === navItems[0].href
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5",
                  )}
                >
                  {navItems[0].label}
                </Link>

                {/* Mobile Qadriyatlar link */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    const el = document.getElementById("mobile-values");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-4 py-3 rounded-xl transition-colors font-medium text-left text-foreground hover:text-primary hover:bg-primary/5"
                >
                  {t("about.valuesTitle")}
                </button>

                {/* Remaining Mobile Nav Items */}
                {navItems.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl transition-colors font-medium",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-primary/5",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Extra Info Cards for Mobile */}
              <div id="mobile-values" className="flex flex-col gap-4 mt-6">
                {/* Mission Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide">
                    {t("about.mission")}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t("about.missionDesc")}
                  </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide">
                    {t("about.vision")}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t("about.visionDesc")}
                  </p>
                </div>

                {/* Values Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide">
                    {t("about.valuesTitle")}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {t("about.valuesAndRules.desc")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {aboutValues.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Language Switcher Mobile */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-4 uppercase tracking-wider">
                  {t("nav.language")}
                </p>
                <div className="grid grid-cols-3 gap-2 px-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={cn(
                        "flex items-center justify-center gap-1.5 h-11 text-sm font-medium rounded-xl border transition-colors",
                        currentLang === lang.code
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground/80 border-border hover:border-primary/40 hover:text-primary",
                      )}
                    >
                      {currentLang === lang.code && (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      {lang.short}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
