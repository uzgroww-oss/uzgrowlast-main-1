import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optionalMediaUrl } from "@/lib/server/validators";
import { teamStore } from "@/lib/server/team";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  position: z.string().trim().min(2).max(150).optional(),
  bio: z.string().trim().max(2000).optional(),
  avatar: optionalMediaUrl(500).optional(),
  experience: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(150).or(z.literal("")).optional(),
  phone: z.string().trim().max(30).optional(),
  skills: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
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
    const item = await teamStore.update(id, parsed.data);
    if (!item) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return dbError("A'zo yangilashda xatolik", error);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  try {
    const removed = await teamStore.remove(id);
    if (!removed) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbError("A'zo o'chirishda xatolik", error);
  }
}
