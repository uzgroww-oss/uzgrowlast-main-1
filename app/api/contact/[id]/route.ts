import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { deleteLead, isMissingColumn, setLeadHandled } from "@/lib/server/leads";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

const patchSchema = z.object({ handled: z.boolean() });

/** Admin: "ko'rildi" belgisini o'zgartirish */
export async function PATCH(req: NextRequest, { params }: Params) {
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
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 422 });
  }

  try {
    const updated = await setLeadHandled(id, parsed.data.handled);
    if (!updated) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Bazaga "handled" ustuni hali qo'shilmagan
    if (isMissingColumn(error)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Bazada «ko'rildi» ustuni yo'q. Supabase SQL Editor'da supabase/schema.sql dagi «alter table public.leads ...» qatorini ishga tushiring",
        },
        { status: 409 },
      );
    }
    return dbError("Murojaatni yangilashda xatolik", error);
  }
}

/** Admin: bitta murojaatni o'chirish */
export async function DELETE(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    const removed = await deleteLead(id);
    if (!removed) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbError("Murojaatni o'chirishda xatolik", error);
  }
}
