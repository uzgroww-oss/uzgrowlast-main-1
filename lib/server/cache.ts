/**
 * Qisqa muddatli kesh — Supabase uzilib qolsa ham sayt to'g'ri ishlashi uchun.
 *
 * Ikki vazifasi bor:
 *
 * 1. YUKNI KAMAYTIRISH. Sahifa matnlari va rasm manzillari har bir tashrifda
 *    o'qiladi. Kesh bo'lmasa, 100 ta tashrif = 100 ta so'rov. Endi TTL ichida
 *    bitta so'rov yetadi.
 *
 * 2. UZILISHDAN HIMOYA. Supabase javob bermay qolsa (texnik ish, tarmoq,
 *    bepul tarifdagi "uyqu" rejimi), oxirgi MUVAFFAQIYATLI natija qaytariladi.
 *    Ya'ni admin kiritgan matnlar yo'qolmaydi va sayt eski holida ishlayveradi.
 *    Bunday nusxa bo'lmasagina xato yuqoriga uzatiladi.
 *
 * Diqqat: kesh bitta Node jarayoni doirasida yashaydi. Bir nechta instance
 * ishlatilsa, har biri o'z keshini yuritadi — bu xavfsiz, chunki eng yomon
 * holatda matn TTL muddatiga kechikib yangilanadi.
 */

interface Entry<T> {
  value: T;
  /** Qachongacha "yangi" hisoblanadi */
  freshUntil: number;
}

const store = new Map<string, Entry<unknown>>();

/**
 * Standart muddat: 15 soniya.
 *
 * Nega qisqa: Vercel'da har bir serverless nusxa O'Z xotirasiga ega.
 * Admin o'zgartirganda `invalidate()` faqat so'rovni bajargan nusxada
 * ishlaydi, qolganlari esa TTL tugaguncha eski qiymatni beradi. Shuning
 * uchun muddat qisqa tutiladi — o'zgarish saytda tez ko'rinsin.
 * Admin paneli esa keshni umuman chetlab o'tadi (`fresh` parametri).
 */
const DEFAULT_TTL_MS = 15_000;

/**
 * `loader` natijasini keshlaydi.
 *
 * Kesh yangi bo'lsa — darhol qaytaradi.
 * Eskirgan bo'lsa — qayta o'qiydi; o'qish muvaffaqiyatsiz bo'lsa, eski
 * qiymatni qaytaradi (sayt ishlashda davom etsin).
 */
export async function cached<T>(
  key: string,
  loader: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS,
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;

  if (hit && now < hit.freshUntil) return hit.value;

  try {
    const value = await loader();
    store.set(key, { value, freshUntil: now + ttlMs });
    return value;
  } catch (error) {
    if (hit) {
      // Eski nusxa bor — sayt buzilmasin. Lekin sabab logga tushsin,
      // aks holda nosozlik ko'rinmay qolaveradi.
      console.error(
        `Kesh yangilanmadi (${key}), oxirgi saqlangan nusxa ishlatilmoqda:`,
        error,
      );
      // Muvaffaqiyatsiz urinish har safar takrorlanmasin — qisqa tanaffus
      store.set(key, { value: hit.value, freshUntil: now + 5_000 });
      return hit.value;
    }
    throw error;
  }
}

/** Admin ma'lumotni o'zgartirgach chaqiriladi — o'zgarish darhol ko'rinsin */
export function invalidate(key: string): void {
  store.delete(key);
}

/**
 * Keshni chetlab o'tib, to'g'ridan-to'g'ri bazadan o'qiydi va keshni yangilaydi.
 *
 * Admin panel uchun: u har doim HAQIQIY holatni ko'rishi kerak, aks holda
 * "saqladim, lekin o'zgarmadi" degan chalkashlik chiqadi. Xato bo'lsa
 * yashirilmaydi — admin muammoni bilib turishi kerak.
 */
export async function fresh<T>(
  key: string,
  loader: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS,
): Promise<T> {
  const value = await loader();
  store.set(key, { value, freshUntil: Date.now() + ttlMs });
  return value;
}
