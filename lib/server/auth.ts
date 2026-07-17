import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { clientIp, rateLimit, resetLimit } from "./rate-limit";

// Bitta IP dan 15 daqiqada 10 ta noto'g'ri urinish — parolni brute-force
// qilishning oldini oladi
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60_000;

function sha256(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/**
 * Doimiy vaqtli solishtirish. Ikkala qiymat ham avval sha256 qilinadi,
 * shunda uzunliklari doim teng bo'ladi va parol uzunligi vaqt orqali
 * sizib chiqmaydi.
 */
function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(sha256(a), sha256(b));
}

export type AuthResult = NextResponse | null;

/**
 * Admin so'rovini tekshiradi: `Authorization: Bearer <ADMIN_PASSWORD>`.
 * Ruxsat berilsa `null`, aks holda tayyor xato javobi qaytadi.
 */
export function requireAdmin(req: NextRequest): AuthResult {
  const password = process.env.ADMIN_PASSWORD;

  // Parol sozlanmagan bo'lsa admin API butunlay yopiq
  if (!password) {
    console.error("ADMIN_PASSWORD sozlanmagan — admin API o'chirilgan");
    return NextResponse.json(
      { ok: false, error: "Admin API is not configured" },
      { status: 503 },
    );
  }

  const ip = clientIp(req);
  const key = `admin:${ip}`;
  const { limited, retryAfter } = rateLimit(key, MAX_ATTEMPTS, WINDOW_MS);
  if (limited) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const auth = req.headers.get("authorization") || "";
  if (!safeEqual(auth, `Bearer ${password}`)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  // To'g'ri parol — hisobni tozalaymiz, admin o'zini bloklab qo'ymasin
  resetLimit(key);
  return null;
}
