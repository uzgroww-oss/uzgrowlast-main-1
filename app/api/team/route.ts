import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optionalMediaUrl } from "@/lib/server/validators";
import { teamStore } from "@/lib/server/team";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";

export const runtime = "nodejs";

const memberSchema = z.object({
  name: z.string().trim().min(2).max(100),
  position: z.string().trim().min(2).max(150),
  bio: z.string().trim().max(2000).default(""),
  avatar: optionalMediaUrl(500).default(""),
  experience: z.string().trim().max(100).default(""),
  email: z.string().trim().email().max(150).or(z.literal("")).default(""),
  phone: z.string().trim().max(30).default(""),
  skills: z.array(z.string().trim().min(1).max(50)).max(20).default([]),
});

export async function GET() {
  try {
    const members = await teamStore.list();
    return NextResponse.json({ ok: true, members });
  } catch (error) {
    return dbError("Jamoani o'qishda xatolik", error);
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = memberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const item = await teamStore.add(parsed.data);
    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    return dbError("A'zo qo'shishda xatolik", error);
  }
}
