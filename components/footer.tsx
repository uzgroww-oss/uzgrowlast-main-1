"use client";

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



const socials = [
  {
    icon: Youtube,
    href: "https://youtube.com/@rustamjonrakhmonov?si=9-OxlFiY0B875tD9",
    label: "Youtube",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/uz.grow?igsh=MXMwN3lzaW95NTN1YQ==",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1DePjLwX79/",
    label: "Facebook",
  },
  {
    icon: Send,
    href: "https://t.me/Uz_Grow",
    label: "Telegram",
  },
  
];

export function Footer() {
  const { t, tObj, currentLang } = useLanguage();
  const { m } = useMedia();
  const footerLinks = {
    xizmatlar: getColumn(tObj, "services"),
    kompaniya: getColumn(tObj, "company"),
    yordam: getColumn(tObj, "help"),
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src={m("umumiy.logo")} alt={t("common.logoAlt")} className="h-12 sm:h-16 w-auto object-contain" />
              <span className="text-2xl font-bold">{t("footer.brandName")}</span>
            </Link>
            <p className="text-white/70 max-w-sm leading-relaxed">
              {t("footer.brandDescription")}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+998555152223"
                  className="flex items-start gap-3 text-white/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 mt-1 shrink-0" />
                  <span>+998 55 515 22 23</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+998994352313"
                  className="flex items-start gap-3 text-white/70 hover:text-primary transition-colors"
                >
                  <Send className="w-4 h-4 mt-1 shrink-0" />
                  <span>+998 99 435 23 13 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:uzgrrow@gmail.com"
                  className="flex items-start gap-3 text-white/70 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 mt-1 shrink-0" />
                  <span>uzgrrow@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://yandex.ru/navi?rtext=41.202864,69.235732~41.202625,69.235384&rtt=auto"
                  className="flex items-start gap-3 text-white/70 hover:text-primary transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("contact.address")}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {footerLinks.xizmatlar.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.kompaniya.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Social */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">{t("footer.help")}</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.yordam.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
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
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#24B14B] transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
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
