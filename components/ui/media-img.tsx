"use client";

/**
 * Rasm manzili bo'sh bo'lsa HECH NARSA chizmaydi.
 *
 * Admin paneldan rasm o'chirilganda manzil bo'sh satrga aylanadi. Oddiy
 * `<img src="">` esa brauzerda buzuq rasm belgisini ko'rsatadi (ba'zi
 * brauzerlarda sahifaning o'zini qayta so'raydi), shuning uchun bunday
 * holatda elementni umuman chizmaslik kerak.
 */
export function MediaImg({
  src,
  alt = "",
  loading = "lazy",
  decoding = "async",
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null;
  // Standart holat — "lazy": ekrandan tashqaridagi rasm yuklanmaydi.
  // Galereyada 90 dan ortiq rasm bor, ularning hammasini birdan tortish
  // sahifani sekinlashtiradi. Ekranning yuqorisidagi rasm (masalan bosh
  // ekran foni) uchun chaqirilayotgan joyda loading="eager" beriladi.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={loading} decoding={decoding} {...rest} />;
}

/** Video uchun xuddi shunday himoya */
export function MediaVideo({
  src,
  ...rest
}: React.VideoHTMLAttributes<HTMLVideoElement>) {
  if (!src) return null;
  return <video src={src} {...rest} />;
}
