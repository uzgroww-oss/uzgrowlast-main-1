import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabase, MEDIA_BUCKET } from "@/lib/server/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sog'liq tekshiruvi: /api/health
 *
 * Nima uchun kerak — nosozlik JIMGINA yuz bermasligi uchun. Sayt Supabase
 * uzilganda ham koddagi standart matnlar bilan ishlayveradi (bu ataylab
 * shunday), lekin bu holatda admin o'zgarishlari ko'rinmay qoladi. Tashqi
 * ko'rinishdan sayt "joyida" bo'lgani uchun muammo sezilmasligi mumkin.
 * Shu manzil esa haqiqiy holatni bir qarashda ko'rsatadi.
 *
 * Sir ma'lumot chiqarilmaydi: faqat "sozlangan / sozlanmagan" va jadval
 * javob berdimi degan ma'lumot.
 *
 * Javob: barcha muhim qism ishlasa 200, aks holda 503.
 */

const TABLES = [
  "leads",
  "news",
  "team_members",
  "content_overrides",
  "media_overrides",
] as const;

type Check = { ok: boolean; detail?: string };

async function checkTable(name: string): Promise<Check> {
  try {
    // head:true — qatorlar tortilmaydi, faqat ulanish va huquq tekshiriladi
    const { error } = await supabase()
      .from(name)
      .select("*", { count: "exact", head: true });
    if (error) return { ok: false, detail: error.message.slice(0, 120) };
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message.slice(0, 120) : "noma'lum xato",
    };
  }
}

async function checkBucket(): Promise<Check> {
  try {
    const { data, error } = await supabase().storage.getBucket(MEDIA_BUCKET);
    if (error) return { ok: false, detail: error.message.slice(0, 120) };
    if (!data?.public) {
      return { ok: false, detail: "bucket ommaviy emas — rasmlar ochilmaydi" };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message.slice(0, 120) : "noma'lum xato",
    };
  }
}

export async function GET() {
  const started = Date.now();

  const config = {
    supabase: isSupabaseConfigured(),
    adminPassword: Boolean(process.env.ADMIN_PASSWORD),
    telegram: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
  };

  // Supabase sozlanmagan bo'lsa jadvallarni tekshirishning ma'nosi yo'q
  if (!config.supabase) {
    return NextResponse.json(
      {
        ok: false,
        status: "SUPABASE SOZLANMAGAN",
        config,
        hint: "SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY muhit o'zgaruvchilarini qo'shing",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const [tableResults, storage] = await Promise.all([
    Promise.all(TABLES.map(async (t) => [t, await checkTable(t)] as const)),
    checkBucket(),
  ]);

  const tables = Object.fromEntries(tableResults);
  const tablesOk = tableResults.every(([, r]) => r.ok);

  // Bucket faqat admin fayl yuklaganda kerak — u yiqilsa sayt ishlayveradi,
  // shuning uchun umumiy holatni "ishlamayapti" deb belgilamaydi.
  const ok = tablesOk && config.adminPassword;

  const problems: string[] = [];
  if (!config.adminPassword) problems.push("ADMIN_PASSWORD sozlanmagan — admin panel yopiq");
  for (const [name, r] of tableResults) {
    if (!r.ok) problems.push(`jadval "${name}": ${r.detail}`);
  }
  if (!storage.ok) problems.push(`"${MEDIA_BUCKET}" bucket: ${storage.detail}`);
  if (!config.telegram) problems.push("Telegram sozlanmagan — murojaatlar faqat bazaga tushadi");

  return NextResponse.json(
    {
      ok,
      status: ok ? "HAMMASI ISHLAYAPTI" : "MUAMMO BOR",
      config,
      tables,
      storage,
      problems,
      tookMs: Date.now() - started,
      checkedAt: new Date().toISOString(),
    },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
