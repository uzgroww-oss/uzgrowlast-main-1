"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Shaffof bo'lishi mumkin bo'lgan rasmlar (logotiplar — PNG/SVG) uchun
 * yuklanish foni chizilmaydi: rasm yuklangach ham fon ko'rinib qolardi.
 */
const mayBeTransparent = (src: string) => /\.(png|svg|gif)(\?|#|$)/i.test(src);

/**
 * Rasm. Ikki vazifasi bor:
 *
 * 1. Manzil bo'sh bo'lsa HECH NARSA chizmaydi. Admin paneldan rasm
 *    o'chirilganda manzil bo'sh satrga aylanadi, oddiy `<img src="">` esa
 *    buzuq rasm belgisini ko'rsatadi.
 * 2. Rasm yuklanguncha uning o'rnida yengil miltillovchi fon turadi
 *    (`.img-ph`, app/globals.css) — sekin internetda bo'sh joy emas,
 *    "yuklanmoqda" ko'rinadi. Yuklangach rasm silliq paydo bo'ladi.
 */
export function MediaImg({
  src,
  alt = "",
  loading = "lazy",
  decoding = "async",
  placeholder,
  className,
  onLoad,
  onError,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Yuklanish fonini majburan yoqish/o'chirish (standart: PNG/SVG dan boshqasiga) */
  placeholder?: boolean;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const url = typeof src === "string" ? src : "";

  // Manzil almashsa (slayder, galereya) — fon qaytadan ko'rinadi. Brauzer
  // keshidan darhol olingan rasm uchun onLoad ba'zan React ulanishidan oldin
  // chaqiriladi, shuning uchun "complete" ham tekshiriladi.
  useEffect(() => {
    const img = ref.current;
    setLoaded(Boolean(img && img.complete && img.naturalWidth > 0));
  }, [url]);

  if (!url) return null;
  const withPh = (placeholder ?? !mayBeTransparent(url)) && !loaded;

  // Standart holat — "lazy": ekrandan tashqaridagi rasm yuklanmaydi.
  // Galereyada 90 dan ortiq rasm bor, ularning hammasini birdan tortish
  // sahifani sekinlashtiradi. Ekranning yuqorisidagi rasm (masalan bosh
  // ekran foni) uchun chaqirilayotgan joyda loading="eager" beriladi.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={url}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={cn(className, withPh && "img-ph")}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        // Buzuq rasmda fon cheksiz miltillab turmasin
        setLoaded(true);
        onError?.(e);
      }}
      {...rest}
    />
  );
}

/** Video uchun xuddi shunday himoya */
export function MediaVideo({
  src,
  ...rest
}: React.VideoHTMLAttributes<HTMLVideoElement>) {
  if (!src) return null;
  return <video src={src} {...rest} />;
}
