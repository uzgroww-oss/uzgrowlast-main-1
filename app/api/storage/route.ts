import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";
import { MEDIA_BUCKET, supabase } from "@/lib/server/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Fayllar omborini tozalash.
 *
 * Rasm almashtirilganda eski fayl omborda qolib ketadi — vaqt o'tib bepul
 * tarifdagi joy to'ladi. Bu yerda HECH QAYERDA ishlatilmayotgan fayllar
 * ko'rsatiladi va admin tasdiqlasa o'chiriladi.
 *
 * Xavfsizlik uchun:
 *  - 24 soatdan yangi fayllar "ishlatilmayapti" hisoblanmaydi: admin hozir
 *    yuklagan, lekin hali «Saqlash»ni bosmagan bo'lishi mumkin;
 *  - o'chirishdan oldin server ro'yxatni QAYTA tekshiradi — brauzer
 *    yuborgan nom ishlatilayotgan faylga tegishli bo'lsa, u o'chirilmaydi.
 */

const MIN_AGE_MS = 24 * 60 * 60 * 1000;

interface StoredFile {
  name: string;
  size: number;
  createdAt: string;
  url: string;
  used: boolean;
  /** Yangi yuklangan — hali o'chirib bo'lmaydi */
  recent: boolean;
}

/** Bazadagi barcha joylardan ishlatilayotgan fayl nomlarini yig'adi */
async function usedNames(): Promise<Set<string>> {
  const db = supabase();
  const [media, news, team, content] = await Promise.all([
    db.from("media_overrides").select("url"),
    db.from("news").select("image_url"),
    db.from("team_members").select("avatar"),
    db.from("content_overrides").select("value"),
  ]);
  for (const r of [media, news]) if (r.error) throw r.error;

  const urls: string[] = [
    ...(media.data ?? []).map((r) => r.url),
    ...(news.data ?? []).map((r) => r.image_url),
    // Bu ikki jadval ixtiyoriy — xato bo'lsa e'tiborsiz qoldiriladi
    ...(team.error ? [] : (team.data ?? []).map((r) => r.avatar)),
    ...(content.error ? [] : (content.data ?? []).map((r) => r.value)),
  ];

  const names = new Set<string>();
  const marker = `/${MEDIA_BUCKET}/`;
  for (const u of urls) {
    if (typeof u !== "string" || !u.includes(marker)) continue;
    names.add(decodeURIComponent(u.slice(u.lastIndexOf(marker) + marker.length).split("?")[0]));
  }
  return names;
}

async function listFiles(): Promise<StoredFile[]> {
  const db = supabase();
  const [{ data, error }, used] = await Promise.all([
    db.storage.from(MEDIA_BUCKET).list("", { limit: 1000, sortBy: { column: "created_at", order: "desc" } }),
    usedNames(),
  ]);
  if (error) throw error;

  const now = Date.now();
  return (data ?? [])
    .filter((f) => f.id) // papkalar emas, faqat fayllar
    .map((f) => ({
      name: f.name,
      size: Number(f.metadata?.size ?? 0),
      createdAt: f.created_at ?? "",
      url: db.storage.from(MEDIA_BUCKET).getPublicUrl(f.name).data.publicUrl,
      used: used.has(f.name),
      recent: now - new Date(f.created_at ?? now).getTime() < MIN_AGE_MS,
    }));
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    return NextResponse.json({ ok: true, files: await listFiles() });
  } catch (error) {
    return dbError("Fayllar ro'yxatini olishda xatolik", error);
  }
}

const deleteSchema = z.object({
  names: z.array(z.string().regex(/^[a-zA-Z0-9._-]+$/).max(200)).min(1).max(500),
});

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 422 });
  }

  try {
    // Faqat hozir ham ishlatilmayotgan va eski fayllar o'chiriladi
    const files = await listFiles();
    const deletable = new Set(
      files.filter((f) => !f.used && !f.recent).map((f) => f.name),
    );
    const names = parsed.data.names.filter((n) => deletable.has(n));
    if (names.length === 0) {
      return NextResponse.json({ ok: true, deleted: 0 });
    }

    const { error } = await supabase().storage.from(MEDIA_BUCKET).remove(names);
    if (error) throw error;
    return NextResponse.json({ ok: true, deleted: names.length });
  } catch (error) {
    return dbError("Fayllarni o'chirishda xatolik", error);
  }
}
