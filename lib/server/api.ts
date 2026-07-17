import { NextResponse } from "next/server";

/**
 * Ma'lumotlar bazasi xatosi uchun yagona javob.
 *
 * Xatoning ichki tafsiloti (jadval nomi, SQL) mijozga chiqarilmaydi —
 * u faqat server logiga yoziladi.
 */
export function dbError(context: string, error: unknown): NextResponse {
  console.error(`${context}:`, error);
  return NextResponse.json(
    { ok: false, error: "Ma'lumotlar bazasiga ulanib bo'lmadi" },
    { status: 503 },
  );
}
