import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import {
  checkType,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  saveUpload,
} from "@/lib/server/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Admin: qurilmadan rasm yoki video yuklash (Supabase Storage'ga) */
export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Fayl o'qib bo'lmadi" },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { ok: false, error: "Fayl tanlanmagan" },
      { status: 400 },
    );
  }

  const allowed = checkType(file.type);
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
  if (file.size > limit) {
    const mb = Math.round(limit / (1024 * 1024));
    return NextResponse.json(
      { ok: false, error: `Fayl juda katta. Chegara: ${mb} MB` },
      { status: 413 },
    );
  }

  try {
    const saved = await saveUpload(file, file.type);
    return NextResponse.json({ ok: true, ...saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "TOO_LARGE") {
      return NextResponse.json(
        { ok: false, error: "Fayl chegaradan katta" },
        { status: 413 },
      );
    }
    if (message === "UNSUPPORTED_TYPE") {
      return NextResponse.json(
        { ok: false, error: "Bu turdagi fayl qabul qilinmaydi" },
        { status: 415 },
      );
    }
    console.error("Yuklashda xatolik:", error);
    return NextResponse.json(
      { ok: false, error: "Faylni saqlab bo'lmadi" },
      { status: 500 },
    );
  }
}
