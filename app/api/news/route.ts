import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optionalMediaUrl } from "@/lib/server/validators";
import { listNews, newsStore, saveTranslations } from "@/lib/server/news";
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

const newsSchema = z.object({
  title: z.string().trim().min(3).max(200),
  body: z.string().trim().min(10).max(20000),
  imageUrl: optionalMediaUrl(500).default(""),
  date: dateSchema,
  i18n: i18nSchema,
});

export async function GET() {
  try {
    const news = await listNews();
    return NextResponse.json({ ok: true, news });
  } catch (error) {
    return dbError("Yangiliklarni o'qishda xatolik", error);
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = newsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const { i18n, date, ...data } = parsed.data;
    const item = await newsStore.add({ ...data, createdAt: toTimestamp(date) as string });
    await saveTranslations(item.id, i18n);
    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    return dbError("Yangilik qo'shishda xatolik", error);
  }
}
