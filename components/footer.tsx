"use client";

import { MediaImg } from "@/components/ui/media-img";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Send,
  Users,
  Youtube,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatPhone, telHref, whatsappHref } from "@/lib/contact-links";
import { useMedia } from "@/contexts/MediaContext";

interface FooterLink {
  label: string;
  href: string;
}

// Havolalar to'g'ridan-to'g'ri tarjima faylidagi ro'yxatdan olinadi, shunda
// admin paneldan nom o'zgartirilsa footer ham darrov yangilanadi.
const getColumn = (tObj: (key: string) => any, key: string): FooterLink[] => {
  const items = tObj(`footer.links.${key}`);
  if (!Array.isArray(items)) return [];
  return items.filter(
    (item): item is FooterLink =>
      typeof item?.label === "string" && typeof item?.href === "string",
  );
};

export function Footer() {
  const { t, tObj, currentLang } = useLanguage();
  const { m } = useMedia();
  // Havolalar tarjima faylidan (admin panelda tahrirlanadi) olinadi
  const socials = [
    { icon: Youtube, href: t("contact.socialLinks.youtube"), label: "Youtube" },
    { icon: Instagram, href: t("contact.socialLinks.instagram"), label: "Instagram" },
    { icon: Facebook, href: t("contact.socialLinks.facebook"), label: "Facebook" },
    { icon: Send, href: t("contact.socialLinks.telegram"), label: "Telegram" },
  ].filter((s) => s.href.startsWith("http"));
  const footerLinks = {
    xizmatlar: getColumn(tObj, "services"),
    kompaniya: getColumn(tObj, "company"),
    yordam: getColumn(tObj, "help"),
  };

  return (
    <footer className="bg-brand-dark text-white">
      {/* Chaqiruv polosasi */}
      <div className="bg-[#16331a] border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t("footer.ctaTitle")}</h2>
            <p className="text-white/75 max-w-2xl">{t("footer.ctaText")}</p>
          </div>
          <Link
            href="/aloqa"
            className="shrink-0 inline-flex items-center justify-center h-12 px-7 border-2 border-white text-white font-semibold hover:bg-white hover:text-brand-dark transition-colors"
          >
            {t("footer.ctaButton")}
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 xl:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <MediaImg src={m("umumiy.logo")} alt={t("common.logoAlt")} className="h-12 sm:h-16 w-auto object-contain" />
              <span className="font-heading text-2xl font-bold">{t("footer.brandName")}</span>
            </Link>
            <p className="text-white/70 max-w-sm leading-relaxed">
              {t("footer.brandDescription")}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-lg after:block after:w-8 after:h-0.5 after:bg-brand-yellow after:mt-3">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={telHref(t("contact.companyPhone"))}
                  className="flex items-start gap-3 text-white/70 hover:text-brand-yellow transition-colors"
                >
                  <Phone className="w-4 h-4 mt-1 shrink-0" />
                  <span>{formatPhone(t("contact.companyPhone"))}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(t("contact.companyPhone2"))}
                  className="flex items-start gap-3 text-white/70 hover:text-brand-yellow transition-colors"
                >
                  <Send className="w-4 h-4 mt-1 shrink-0" />
                  <span>{formatPhone(t("contact.companyPhone2"))} (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("contact.companyEmail")}`}
                  className="flex items-start gap-3 text-white/70 hover:text-brand-yellow transition-colors"
                >
                  <Mail className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("contact.companyEmail")}</span>
                </a>
              </li>
              <li>
                <a
                  href={t("contact.locationUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 hover:text-brand-yellow transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("contact.address")}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-lg after:block after:w-8 after:h-0.5 after:bg-brand-yellow after:mt-3">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {footerLinks.xizmatlar.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-lg after:block after:w-8 after:h-0.5 after:bg-brand-yellow after:mt-3">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.kompaniya.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Social */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-lg after:block after:w-8 after:h-0.5 after:bg-brand-yellow after:mt-3">{t("footer.help")}</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.yordam.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="font-medium mb-4 text-sm text-white/50">
                {t("contact.socialMedia")}
              </h5>
              <div className="flex gap-3">
                {socials.map((social: any, index: number) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-brand-yellow transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/70 group-hover:text-brand-dark transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} {t("footer.brandName")}. {t("footer.allRightsReserved")}.
            </p>
            <p className="text-sm text-white/50">
              {currentLang === "uz" ? "O'zbekistonda ishlab chiqarilgan" : currentLang === "ru" ? "Сделано в Узбекистане" : "Made in Uzbekistan"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
