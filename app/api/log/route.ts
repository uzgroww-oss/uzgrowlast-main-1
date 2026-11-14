import { NextRequest, NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

/**
 * Brauzerda yuz bergan xatolar shu yerga yuboriladi va Vercel loglarida
 * ("Logs" bo'limi, "[client-error]" bo'yicha qidiring) ko'rinadi.
 * Aks holda tashrifchida chiqqan xatodan hech kim xabar topmaydi.
 */
export async function POST(req: NextRequest) {
  // Bitta IP dan daqiqasiga 10 tadan ortiq yozilmaydi — loglarni to'ldirib yubormasin
  if (rateLimit(`log:${clientIp(req)}`, 10, 60_000).limited) {
    return new NextResponse(null, { status: 204 });
  }
  const text = (await req.text().catch(() => "")).slice(0, 2000);
  console.error("[client-error]", text.replace(/[\r\n]+/g, " "));
  return new NextResponse(null, { status: 204 });
}
