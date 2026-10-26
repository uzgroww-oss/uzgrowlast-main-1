import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optionalMediaUrl } from "@/lib/server/validators";
import { newsStore, removeTranslations, saveTranslations } from "@/lib/server/news";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";

export const runtime = "nodejs";


// Rus va ingliz tarjimasi ixtiyoriy: bo'sh qolsa saytda o'zbekchasi chiqadi
const translation = z
  .object({
    title: z.string().trim().max(200).optional(),
    body: z.string().trim().max(20000).optional(),
  })
  .optional();
const i18nSchema = z.object({ ru: translation, en: translation }).optional();

// "2026-05-14" — admin tanlagan sana (yangilik shu kun bilan chiqadi)
const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Sana noto'g'ri")
  .optional();

/** Tanlangan kunni Toshkent vaqti bilan tush payti deb saqlaymiz */
const toTimestamp = (date?: string) =>
  date ? new Date(`${date}T12:00:00+05:00`).toISOString() : undefined;

const patchSchema = z.object({
  title: z.string().trim().min(3).max(200).optional(),
  body: z.string().trim().min(10).max(20000).optional(),
  imageUrl: optionalMediaUrl(500).optional(),
  date: dateSchema,
  i18n: i18nSchema,
});

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const { i18n, date, ...data } = parsed.data;
    const item = await newsStore.update(id, { ...data, createdAt: toTimestamp(date) });
    if (!item) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    await saveTranslations(id, i18n);
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return dbError("Yangilik yangilashda xatolik", error);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  try {
    const removed = await newsStore.remove(id);
    if (!removed) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    // Tarjimalar o'chmasa ham yangilik o'chdi — bu xato emas
    await removeTranslations(id).catch((e) => console.error("Tarjima o'chmadi:", e));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbError("Yangilik o'chirishda xatolik", error);
  }
}
