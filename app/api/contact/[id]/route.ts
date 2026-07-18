import { NextRequest, NextResponse } from "next/server";
import { deleteLead } from "@/lib/server/leads";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

/** Admin: bitta murojaatni o'chirish */
export async function DELETE(req: NextRequest, { params }: Params) {
  const denied = requireAdmin(req);
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
