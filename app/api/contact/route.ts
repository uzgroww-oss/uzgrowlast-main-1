import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveLead, listLeads, deleteAllLeads } from "@/lib/server/leads";
import { notifyTelegram } from "@/lib/server/telegram";
import { requireAdmin } from "@/lib/server/auth";
import { dbError } from "@/lib/server/api";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { BRIEF_CODES, formatBrief } from "@/lib/project-brief";

// "Loyihangiz haqida" bo'limi — faqat ro'yxatdagi qiymatlar qabul qilinadi
const code = (allowed: string[]) =>
  z.string().refine((v) => v === "" || allowed.includes(v)).optional().default("");
const briefSchema = z
  .object({
    crops: z.array(z.enum(BRIEF_CODES.crops as [string, ...string[]])).max(10).optional().default([]),
    method: code(BRIEF_CODES.method),
    region: code(BRIEF_CODES.region),
    area: code(BRIEF_CODES.area),
  })
  .optional();

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
  project: briefSchema,
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

  const { website: _honeypot, project, ...rest } = parsed.data;
  // Loyiha ma'lumotlari xabar oxiriga blok bo'lib yoziladi (alohida ustun yo'q)
  const brief = formatBrief(project);
  const data = { ...rest, message: brief ? `${rest.message}

${brief}` : rest.message };

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
  const denied = await requireAdmin(req);
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
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const count = await deleteAllLeads();
    return NextResponse.json({ ok: true, deleted: count });
  } catch (error) {
    return dbError("Murojaatlarni o'chirishda xatolik", error);
  }
}
