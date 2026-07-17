import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optionalMediaUrl } from "@/lib/server/validators";
import { listNews, newsStore } from "@/lib/server/news";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";

export const runtime = "nodejs";

const newsSchema = z.object({
  title: z.string().trim().min(3).max(200),
  body: z.string().trim().min(10).max(20000),
  imageUrl: optionalMediaUrl(500).default(""),
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
  const denied = requireAdmin(req);
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
    const item = await newsStore.add(parsed.data);
    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    return dbError("Yangilik qo'shishda xatolik", error);
  }
}
