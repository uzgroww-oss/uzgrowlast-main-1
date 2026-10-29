"use client";

import { MediaImg } from "@/components/ui/media-img";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown, Check, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Flag } from "@/components/ui/flag";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";
import { CATALOG_URL } from "@/lib/catalog";

interface NavLink {
  href: string;
  label: string;
}
interface NavGroup {
  label: string;
  /** Guruh sarlavhasi bosilganda ochiladigan asosiy sahifa */
  href: string;
  children: NavLink[];
}
type NavEntry = NavLink | NavGroup;

const isGroup = (e: NavEntry): e is NavGroup => "children" in e;

/**
 * Sayt menyusi: to'q yashil polosa, katta harfli bandlar, ochiluvchi
 * guruhlar va sariq "Katalog" tugmasi. Telefonda — yig'iladigan ro'yxat.
 */
export function Header() {
  const { m } = useMedia();
  const pathname = usePathname();
  const { currentLang, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nav: NavEntry[] = [
    { href: "/", label: t("nav.home") },
    {
      label: t("nav.groupGreenhouses"),
      href: "/issiqxona-turlari",
      children: [
        { href: "/issiqxona-turlari", label: t("nav.greenhouse") },
        { href: "/ekinlar", label: t("nav.crops") },
        { href: "/jixozlar", label: t("nav.equipment") },
        { href: "/texnologiya", label: t("nav.technology") },
      ],
    },
    {
      label: t("nav.groupServices"),
      href: "/xizmatlar",
      children: [
        { href: "/xizmatlar", label: t("nav.allServices") },
        { href: "/agro-injiniring", label: t("nav.agro") },
        { href: "/investorlar", label: t("nav.investors") },
      ],
    },
    {
      label: t("nav.groupProjects"),
      href: "/loyihalar",
      children: [
        { href: "/loyihalar", label: t("nav.projects") },
        { href: "/xalqaro-hamkorlik", label: t("nav.international") },
        { href: "/gallery", label: t("nav.gallery") },
      ],
    },
    {
      label: t("nav.groupCompany"),
      href: "/haqimizda",
      children: [
        { href: "/haqimizda", label: t("nav.about") },
        { href: "/rahbariyat", label: t("nav.team") },
        { href: "/yangiliklar", label: t("nav.news") },
        { href: "/media-hamkorlik", label: t("nav.media") },
      ],
    },
    { href: "/aloqa", label: t("nav.contact") },
  ];

  const languages: { code: Language; label: string; short: string }[] = [
    { code: "uz", label: "O'zbekcha", short: "UZ" },
    { code: "ru", label: "Русский", short: "RU" },
    { code: "en", label: "English", short: "EN" },
  ];
  const activeLang = languages.find((l) => l.code === currentLang);

  const isActive = (e: NavEntry) =>
    isGroup(e)
      ? e.children.some((c) => pathname === c.href || pathname?.startsWith(c.href + "/"))
      : pathname === e.href;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sahifa almashganda menyular yopiladi
  useEffect(() => {
    setIsOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Sichqoncha bandidan ochiluvchi qismga o'tayotganda menyu yopilib qolmasin
  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  const languageMenu = (trigger: React.ReactNode) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
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
              <Flag code={lang.code} />
              {lang.label}
            </span>
            {currentLang === lang.code && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const linkClass = (active: boolean) =>
    cn(
      "relative flex items-center gap-1 h-full px-2.5 xl:px-3.5 text-[12.5px] font-medium uppercase tracking-[0.06em] whitespace-nowrap transition-colors",
      "after:absolute after:left-2.5 after:right-2.5 xl:after:left-3.5 xl:after:right-3.5 after:bottom-5 after:h-0.5 after:bg-brand-green after:transition-transform after:origin-left",
      active
        ? "text-white after:scale-x-100"
        : "text-white/80 hover:text-white after:scale-x-0 hover:after:scale-x-100",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-brand-dark text-white transition-shadow",
        isScrolled && "shadow-[0_6px_24px_rgba(0,0,0,0.25)]",
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <MediaImg
              src={m("umumiy.logo")}
              alt={t("common.logoAlt")}
              // Logotip har sahifada eng tepada turadi — kechiktirilmaydi
              loading="eager"
              className="h-10 sm:h-11 lg:h-12 w-auto object-contain"
            />
            <span className="hidden sm:block lg:hidden 2xl:block font-heading font-bold text-lg text-white whitespace-nowrap">
              {t("footer.brandName")}
            </span>
          </Link>

          {/* Kompyuter menyusi */}
          <nav className="hidden lg:flex items-stretch h-full" aria-label="Asosiy menyu">
            {nav.map((entry) =>
              isGroup(entry) ? (
                <div
                  key={entry.label}
                  className="relative flex"
                  onMouseEnter={() => openNow(entry.label)}
                  onMouseLeave={closeSoon}
                >
                  <button
                    type="button"
                    aria-expanded={openGroup === entry.label}
                    aria-haspopup="true"
                    onClick={() => setOpenGroup((g) => (g === entry.label ? null : entry.label))}
                    className={linkClass(isActive(entry))}
                  >
                    {entry.label}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform",
                        openGroup === entry.label && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full min-w-56 bg-white text-brand-dark shadow-xl border-t-2 border-brand-green py-2 transition-all duration-200",
                      openGroup === entry.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none",
                    )}
                  >
                    {entry.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={cn(
                          "block px-5 py-2.5 text-sm transition-colors",
                          pathname === c.href
                            ? "text-brand-green font-semibold bg-surface"
                            : "hover:bg-surface hover:text-brand-green",
                        )}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={entry.href} href={entry.href} className={linkClass(isActive(entry))}>
                  {entry.label}
                </Link>
              ),
            )}
          </nav>

          {/* O'ng tomon: til va katalog */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {languageMenu(
              <button
                aria-label={t("nav.language")}
                className="flex items-center gap-1.5 h-9 px-2.5 text-xs font-semibold tracking-wide text-white/90 hover:text-white border border-white/20 hover:border-white/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <Globe className="w-3.5 h-3.5" />
                {activeLang?.short}
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>,
            )}
            <a
              href={CATALOG_URL}
              className="hidden xl:inline-flex items-center gap-2 h-10 px-5 bg-brand-yellow text-brand-dark text-sm font-semibold hover:bg-[#ffcd38] transition-colors"
            >
              <Download className="w-4 h-4" />
              {t("nav.catalog")}
            </a>
          </div>

          {/* Telefon: til va menyu tugmasi */}
          <div className="lg:hidden flex items-center gap-1">
            {languageMenu(
              <button
                aria-label={t("nav.language")}
                className="flex items-center gap-1 h-11 px-3 text-xs font-semibold text-white/90"
              >
                <Globe className="w-4 h-4" />
                {activeLang?.short}
              </button>,
            )}
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
              aria-expanded={isOpen}
              className="w-11 h-11 flex items-center justify-center text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Telefon menyusi */}
      <div
        className={cn(
          "lg:hidden overflow-y-auto bg-white text-brand-dark transition-[max-height] duration-300",
          isOpen ? "max-h-[calc(100vh-4rem)] border-t-2 border-brand-green" : "max-h-0",
        )}
      >
        <nav className="container mx-auto px-4 py-3" aria-label="Telefon menyusi">
          {nav.map((entry) =>
            isGroup(entry) ? (
              <div key={entry.label} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenGroup((g) => (g === entry.label ? null : entry.label))}
                  aria-expanded={openGroup === entry.label}
                  className={cn(
                    "w-full flex items-center justify-between py-3.5 text-sm font-semibold uppercase tracking-wide",
                    isActive(entry) && "text-brand-green",
                  )}
                >
                  {entry.label}
                  <ChevronDown
                    className={cn("w-4 h-4 transition-transform", openGroup === entry.label && "rotate-180")}
                  />
                </button>
                {openGroup === entry.label && (
                  <div className="pb-3 pl-3 flex flex-col">
                    {entry.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={cn(
                          "py-2.5 text-[15px] border-l-2 pl-3",
                          pathname === c.href
                            ? "border-brand-green text-brand-green font-semibold"
                            : "border-border text-foreground/80",
                        )}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className={cn(
                  "block py-3.5 text-sm font-semibold uppercase tracking-wide border-b border-border",
                  isActive(entry) && "text-brand-green",
                )}
              >
                {entry.label}
              </Link>
            ),
          )}
          <a
            href={CATALOG_URL}
            className="mt-4 mb-2 flex items-center justify-center gap-2 h-12 bg-brand-yellow text-brand-dark font-semibold"
          >
            <Download className="w-4 h-4" />
            {t("nav.catalog")}
          </a>
        </nav>
      </div>
    </header>
  );
}
