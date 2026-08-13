import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/server/auth";
import { MEDIA_BUCKET, publicUrl, supabase } from "@/lib/server/supabase";
import {
  checkType,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
} from "@/lib/server/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Fayl yuklash uchun IMZOLANGAN HAVOLA beradi.
 *
 * NEGA KERAK:
 * Vercel serverless funksiyaga 4.5 MB dan katta so'rovni umuman o'tkazmaydi
 * (FUNCTION_PAYLOAD_TOO_LARGE) — bizning kodimizgacha yetib ham bormaydi.
 * Telefonda olingan surat odatda 5-10 MB, video esa undan ham katta.
 *
 * Shuning uchun fayl serverdan EMAS, brauzerdan to'g'ridan-to'g'ri Supabase
 * omboriga yuboriladi. Bu yerda faqat qisqa muddatli ruxsat beriladi:
 *   - so'rov admin parolisiz o'tmaydi
 *   - fayl turi shu yerda tekshiriladi (SVG va boshqalar rad etiladi)
 *   - nomni server beradi, foydalanuvchi nomiga ishonilmaydi
 *   - havola faqat SHU bitta yo'lga amal qiladi va tez orada kuchini yo'qotadi
 *
 * Natijada hajm chegarasi Vercel'niki emas, o'zimiznikiga bog'liq bo'ladi.
 */

const schema = z.object({
  type: z.string().min(3).max(100),
  // Brauzer aytgan hajm — asosiy chegara Supabase tomonida ham bor
  size: z.number().int().positive().max(2_000_000_000),
});

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 422 },
    );
  }

  const allowed = checkType(parsed.data.type);
  if (!allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Bu turdagi fayl qabul qilinmaydi. Ruxsat: JPG, PNG, WebP, GIF, AVIF, MP4, WebM",
      },
      { status: 415 },
    );
  }

  const limit = allowed.kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (parsed.data.size > limit) {
    const mb = Math.round(limit / (1024 * 1024));
    return NextResponse.json(
      { ok: false, error: `Fayl juda katta. Chegara: ${mb} MB` },
      { status: 413 },
    );
  }

  const name = `${randomUUID()}.${allowed.ext}`;

  try {
    const { data, error } = await supabase()
      .storage.from(MEDIA_BUCKET)
      .createSignedUploadUrl(name);

    if (error || !data) throw error ?? new Error("imzolangan havola olinmadi");

    return NextResponse.json({
      ok: true,
      name,
      // Brauzer shu manzilga faylni PUT qiladi
      uploadUrl: data.signedUrl.startsWith("http")
        ? data.signedUrl
        : `${process.env.SUPABASE_URL}/storage/v1${data.signedUrl}`,
      // Yuklab bo'lgach saytda ishlatiladigan manzil
      publicUrl: publicUrl(name),
      kind: allowed.kind,
    });
  } catch (error) {
    console.error("Imzolangan havola berishda xatolik:", error);
    return NextResponse.json(
      { ok: false, error: "Yuklashni boshlab bo'lmadi" },
      { status: 500 },
    );
  }
}
