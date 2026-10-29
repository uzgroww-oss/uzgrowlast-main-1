"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, Send, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { telHref, whatsappHref } from "@/lib/contact-links";

const TEXT = {
  uz: { open: "Biz bilan bog'lanish", close: "Yopish", call: "Qo'ng'iroq" },
  ru: { open: "Связаться с нами", close: "Закрыть", call: "Позвонить" },
  en: { open: "Contact us", close: "Close", call: "Call" },
};

/** WhatsApp belgisi (lucide'da yo'q) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42zm8.02-17.45A11.33 11.33 0 0 0 12.05.72C5.8.72.72 5.8.72 12.04c0 2 .52 3.95 1.52 5.67L.62 23.28l5.7-1.5a11.3 11.3 0 0 0 5.72 1.46h.01c6.25 0 11.33-5.08 11.33-11.32 0-3.03-1.18-5.87-3.31-8z" />
    </svg>
  );
}

/**
 * Har sahifada o'ng pastki burchakdagi aloqa tugmasi: WhatsApp, Telegram,
 * qo'ng'iroq. Raqam va havolalar tarjima faylidan (admin: Aloqa
 * ma'lumotlari), shuning uchun alohida sozlash shart emas.
 * Admin panelda ko'rsatilmaydi.
 */
export function FloatingContact() {
  const pathname = usePathname();
  const { t, currentLang } = useLanguage();
  const tx = TEXT[currentLang] ?? TEXT.uz;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tashqariga bosilsa yoki Esc — yopiladi
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  const telegram = t("contact.socialLinks.telegram");
  const items = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: whatsappHref(t("contact.companyPhone2")),
      icon: <WhatsAppIcon className="w-5 h-5" />,
      color: "bg-[#25D366]",
      external: true,
    },
    telegram.startsWith("http") && {
      key: "telegram",
      label: "Telegram",
      href: telegram,
      icon: <Send className="w-5 h-5" />,
      color: "bg-[#229ED9]",
      external: true,
    },
    {
      key: "call",
      label: tx.call,
      href: telHref(t("contact.companyPhone")),
      icon: <Phone className="w-5 h-5" />,
      color: "bg-primary",
      external: false,
    },
  ].filter(Boolean) as {
    key: string;
    label: string;
    href: string;
    icon: React.ReactNode;
    color: string;
    external: boolean;
  }[];

  return (
    <div
      ref={ref}
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex flex-col items-end gap-3 print:hidden"
    >
      {open && (
        <ul className="flex flex-col items-end gap-2.5">
          {items.map((it) => (
            <li key={it.key}>
              <a
                href={it.href}
                {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 group"
              >
                <span className="px-3 py-1.5 rounded-full bg-background text-foreground text-sm font-medium shadow-lg border border-border">
                  {it.label}
                </span>
                <span
                  className={`w-11 h-11 rounded-full ${it.color} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
                >
                  {it.icon}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? tx.close : tx.open}
        className={`relative isolate w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl transition-colors ${
          open ? "bg-foreground/80" : "bg-[#25D366] hover:bg-[#1ebe5b]"
        }`}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && (
          // Diqqatni tortadigan yengil to'lqin; "harakatni kamaytirish"da o'chadi
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping motion-reduce:hidden -z-10" />
        )}
      </button>
    </div>
  );
}
