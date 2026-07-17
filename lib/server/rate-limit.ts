import { NextRequest } from "next/server";

// Sodda in-memory rate limiter.
// Diqqat: bitta Node jarayoni doirasida ishlaydi. Bir nechta instance
// ishlatilsa yoki serverless muhitga o'tilsa, buni Redis'ga ko'chirish kerak.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Map cheksiz o'smasligi uchun eskirgan yozuvlar vaqti-vaqti bilan tozalanadi
let lastSweep = Date.now();
const SWEEP_INTERVAL = 60_000;

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}

/**
 * `key` uchun limitdan oshib ketilganini tekshiradi.
 * Oshgan bo'lsa, necha soniyadan keyin qayta urinish mumkinligini qaytaradi.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfter: 0 };
  }

  bucket.count++;
  if (bucket.count > limit) {
    return {
      limited: true,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }
  return { limited: false, retryAfter: 0 };
}

/** Muvaffaqiyatli urinishdan keyin hisobni nolga qaytarish (login uchun) */
export function resetLimit(key: string) {
  buckets.delete(key);
}

/**
 * Mijoz IP manzili.
 *
 * x-forwarded-for'ni faqat proksi orqasida ishonchli deb hisoblash mumkin.
 * Render/Vercel har ikkisi ham bu sarlavhani o'zi to'ldiradi va tashqi
 * qiymatni almashtiradi, shuning uchun eng CHAPDAGI qiymat olinadi.
 * TRUST_PROXY=false bo'lsa (masalan to'g'ridan-to'g'ri internetga qaragan
 * server), sarlavhaga umuman ishonilmaydi.
 */
export function clientIp(req: NextRequest): string {
  if (process.env.TRUST_PROXY === "false") return "direct";
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
