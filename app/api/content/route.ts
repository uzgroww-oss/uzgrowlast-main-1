import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/server/auth";
import { patchContent, readContent, resetContent } from "@/lib/server/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Kalit yo'li: "hero.title", "projects.items.0.title" kabi
const keyPattern = /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*$/;

// Prototip zanjiriga olib boradigan nomlar hech qachon kalit bo'lolmaydi
const RESERVED = new Set(["__proto__", "constructor", "prototype"]);

const keySchema = z
  .string()
  .max(300)
  .regex(keyPattern, "Noto'g'ri kalit yo'li")
  .refine((key) => key.split(".").every((part) => !RESERVED.has(part)), {
    message: "Kalitda ruxsat etilmagan nom bor",
  });

// null = standartga qaytarish, satr (shu jumladan bo'sh) = saqlanadigan qiymat
const entriesSchema = z.record(
  keySchema,
  z.string().max(20000).nullable(),
);

const patchSchema = z
  .object({
    uz: entriesSchema.optional(),
    ru: entriesSchema.optional(),
    en: entriesSchema.optional(),
  })
  .refine((v) => v.uz || v.ru || v.en, {
    message: "Kamida bitta til bo'lishi kerak",
  });

/** Ochiq: sayt o'zgartirilgan matnlarni shu yerdan oladi */
export async function GET() {
  try {
    const content = await readContent();
    return NextResponse.json(
      { ok: true, content },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    // Sayt ishdan chiqmasin — standart matnlar bilan ishlayveradi.
    // Lekin sabab logga tushsin, aks holda nosozlik ko'rinmay qoladi.
    console.error("Content o'qishda xatolik:", error);
    return NextResponse.json(
      { ok: true, content: { uz: {}, ru: {}, en: {} } },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}

/** Admin: matnlarni o'zgartirish (qisman merge, bo'sh qiymat = standartga qaytarish) */
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
      {
        ok: false,
        error: "Validation failed",
        details: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

  try {
    const content = await patchContent(parsed.data);
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    console.error("Content saqlashda xatolik:", error);
    return NextResponse.json(
      { ok: false, error: "Saqlab bo'lmadi" },
      { status: 500 },
    );
  }
}

/** Admin: barcha o'zgarishlarni bekor qilib, koddagi standart matnlarga qaytarish */
export async function DELETE(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const content = await resetContent();
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    console.error("Content tozalashda xatolik:", error);
    return NextResponse.json(
      { ok: false, error: "Tozalab bo'lmadi" },
      { status: 500 },
    );
  }
}
