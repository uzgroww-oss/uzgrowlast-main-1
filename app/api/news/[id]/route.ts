import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optionalMediaUrl } from "@/lib/server/validators";
import { newsStore } from "@/lib/server/news";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";

export const runtime = "nodejs";

const patchSchema = z.object({
  title: z.string().trim().min(3).max(200).optional(),
  body: z.string().trim().min(10).max(20000).optional(),
  imageUrl: optionalMediaUrl(500).optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const denied = requireAdmin(req);
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
    const item = await newsStore.update(id, parsed.data);
    if (!item) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return dbError("Yangilik yangilashda xatolik", error);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  try {
    const removed = await newsStore.remove(id);
    if (!removed) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbError("Yangilik o'chirishda xatolik", error);
  }
}
