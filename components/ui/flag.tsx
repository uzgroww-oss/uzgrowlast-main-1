import type { Language } from "@/contexts/LanguageContext";

/**
 * Til bayroqlari — ichki SVG ko'rinishida.
 *
 * NEGA EMOJI EMAS: 🇺🇿 kabi emoji bayroqlar Windows'da bayroq bo'lib
 * chizilmaydi — brauzer ularni oddiy harf juftligi ("UZ") ko'rinishida
 * ko'rsatadi. Mijozlarning katta qismi Windows'da bo'lgani uchun bu
 * hech narsani o'zgartirmagan bo'lardi. SVG esa barcha qurilmada bir xil.
 *
 * O'lcham nisbati 3:2. Kattaligi className orqali beriladi.
 */
export function Flag({
  code,
  size = 20,
  className = "",
}: {
  code: Language;
  /** Kenglik (px). Balandlik 3:2 nisbatda o'zi hisoblanadi. */
  size?: number;
  className?: string;
}) {
  const base = `${className} shrink-0 rounded-[2px] ring-1 ring-black/10`;
  // O'lcham KLASS bilan emas, bevosita beriladi: dropdown-menu.tsx ichida
  // "[&_svg:not([class*='size-'])]:size-4" qoidasi bor va u ichidagi har
  // qanday SVG ni 16x16 kvadratga majburlaydi — bayroq siqilib qolardi.
  const box = { width: size, height: Math.round((size * 2) / 3) };

  if (code === "uz") {
    return (
      <svg viewBox="0 0 24 16" className={base} style={box} aria-hidden="true">
        <rect width="24" height="16" fill="#fff" />
        <rect width="24" height="5.1" fill="#0099B5" />
        <rect y="5.1" width="24" height="0.5" fill="#CE1126" />
        <rect y="10.4" width="24" height="0.5" fill="#CE1126" />
        <rect y="10.9" width="24" height="5.1" fill="#1EB53A" />
        {/* Yarim oy */}
        <circle cx="4.3" cy="2.6" r="1.55" fill="#fff" />
        <circle cx="5.15" cy="2.6" r="1.55" fill="#0099B5" />
        {/* Yulduzlar (shu o'lchamda nuqta sifatida) */}
        <g fill="#fff">
          <circle cx="7.6" cy="1.5" r="0.28" />
          <circle cx="9.1" cy="1.5" r="0.28" />
          <circle cx="7.6" cy="2.7" r="0.28" />
          <circle cx="9.1" cy="2.7" r="0.28" />
          <circle cx="10.6" cy="2.7" r="0.28" />
          <circle cx="7.6" cy="3.9" r="0.28" />
          <circle cx="9.1" cy="3.9" r="0.28" />
          <circle cx="10.6" cy="3.9" r="0.28" />
        </g>
      </svg>
    );
  }

  if (code === "ru") {
    return (
      <svg viewBox="0 0 24 16" className={base} style={box} aria-hidden="true">
        <rect width="24" height="16" fill="#fff" />
        <rect y="5.33" width="24" height="5.33" fill="#0039A6" />
        <rect y="10.66" width="24" height="5.34" fill="#D52B1E" />
      </svg>
    );
  }

  // en — Buyuk Britaniya bayrog'i
  return (
    <svg viewBox="0 0 24 16" className={base} style={box} aria-hidden="true">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3.4" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.9" />
      <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="5.4" />
      <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="3.2" />
    </svg>
  );
}
