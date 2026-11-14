import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Tashrifchining davlati (til tanlash uchun). Vercel har so'rovga
 * x-vercel-ip-country sarlavhasini qo'shadi — tashqi xizmat kerak emas.
 */
export function GET(req: NextRequest) {
  return NextResponse.json(
    { country: req.headers.get("x-vercel-ip-country") || "" },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
