import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";

/**
 * Parolni tekshirish uchun yengil endpoint.
 * Admin sahifasi kirishda shu yerga murojaat qiladi va faqat aniq
 * `{ ok: true }` javobinigina muvaffaqiyat deb hisoblaydi.
 */
export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  return NextResponse.json({ ok: true });
}
