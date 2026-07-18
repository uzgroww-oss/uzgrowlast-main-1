import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveLead, listLeads, deleteAllLeads } from "@/lib/server/leads";
import { notifyTelegram } from "@/lib/server/telegram";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z
    .union([z.string().trim().email().max(150), z.literal("")])
    .optional()
    .default(""),
  service: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(5).max(3000),
  lang: z.enum(["uz", "ru", "en"]).optional().default("uz"),
  // honeypot — bot to'ldirsa rad etiladi
  website: z.string().max(0).optional().default(""),
});

// Bitta IP dan daqiqasiga 5 ta murojaat
const MAX_SUBMITS = 5;
const WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const { limited, retryAfter } = rateLimit(
    `contact:${ip}`,
    MAX_SUBMITS,
    WINDOW_MS,
  );
  if (limited) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { website: _honeypot, ...data } = parsed.data;

  try {
    const lead = await saveLead({ ...data, ip });
    const notified = await notifyTelegram(lead);
    return NextResponse.json({ ok: true, id: lead.id, notified });
  } catch (error) {
    return dbError("Murojaatni saqlashda xatolik", error);
  }
}

// Admin: GET /api/contact  (Authorization: Bearer <ADMIN_PASSWORD>)
export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const leads = await listLeads();
    return NextResponse.json({ ok: true, count: leads.length, leads });
  } catch (error) {
    return dbError("Murojaatlarni o'qishda xatolik", error);
  }
}

// Admin: barcha murojaatlarni o'chirish
export async function DELETE(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const count = await deleteAllLeads();
    return NextResponse.json({ ok: true, deleted: count });
  } catch (error) {
    return dbError("Murojaatlarni o'chirishda xatolik", error);
  }
}
