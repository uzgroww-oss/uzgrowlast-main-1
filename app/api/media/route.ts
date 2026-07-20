import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/server/auth";
import { optionalMediaUrl } from "@/lib/server/validators";
import { patchMedia, readMedia, resetMedia } from "@/lib/server/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const idPattern = /^[a-zA-Z0-9_.-]+$/;

// null = standart rasmga qaytarish, bo'sh satr = rasmni o'chirish
const patchSchema = z
  .record(z.string().regex(idPattern).max(200), optionalMediaUrl().nullable())
  .refine((v) => Object.keys(v).length > 0, {
    message: "Bo'sh so'rov",
  });

/** Ochiq: sayt almashtirilgan rasmlarni shu yerdan oladi */
export async function GET() {
  try {
    const media = await readMedia();
    return NextResponse.json(
      { ok: true, media },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    // Sayt standart rasmlar bilan ishlayveradi, lekin sabab yozib qo'yiladi
    console.error("Media o'qishda xatolik:", error);
    return NextResponse.json(
      { ok: true, degraded: true, media: {} },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}

/** Admin: rasm/video manzillarini almashtirish */
export async function PUT(req: NextRequest) {
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

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    const media = await patchMedia(parsed.data);
    return NextResponse.json({ ok: true, media });
  } catch (error) {
    console.error("Media saqlashda xatolik:", error);
    return NextResponse.json(
      { ok: false, error: "Saqlab bo'lmadi" },
      { status: 500 },
    );
  }
}

/** Admin: barcha rasmlarni koddagi standart holatga qaytarish */
export async function DELETE(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const media = await resetMedia();
    return NextResponse.json({ ok: true, media });
  } catch (error) {
    console.error("Media tozalashda xatolik:", error);
    return NextResponse.json(
      { ok: false, error: "Tozalab bo'lmadi" },
      { status: 500 },
    );
  }
}
