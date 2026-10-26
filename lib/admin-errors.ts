/**
 * Server javobidagi xatoni admin tushunadigan o'zbekcha matnga aylantiradi.
 *
 * API inglizcha qisqa kodlar qaytaradi ("Unauthorized", "Validation
 * failed"...) — ular admin panelda shu holicha ko'rinmasligi kerak.
 */

const MESSAGES: Record<string, string> = {
  Unauthorized: "Parol eskirgan yoki noto'g'ri. Chiqib, qaytadan kiring",
  "Too many attempts": "Juda ko'p urinish. 15 daqiqadan keyin qayta urinib ko'ring",
  "Too many requests": "Juda ko'p so'rov. Biroz kutib, qayta urinib ko'ring",
  "Admin API is not configured": "Serverda ADMIN_PASSWORD sozlanmagan",
  "Invalid JSON": "So'rov noto'g'ri yuborildi. Sahifani yangilab ko'ring",
  "Validation failed": "Ma'lumot noto'g'ri to'ldirilgan",
  "Not found": "Topilmadi — ehtimol allaqachon o'chirilgan",
};

const FIELD_NAMES: Record<string, string> = {
  title: "Sarlavha",
  body: "Matn",
  imageUrl: "Rasm havolasi",
  date: "Sana",
};

const STATUS: Record<number, string> = {
  401: MESSAGES.Unauthorized,
  413: "Fayl juda katta",
  429: MESSAGES["Too many requests"],
  500: "Serverda xatolik. Birozdan keyin qayta urinib ko'ring",
  503: "Ma'lumotlar bazasiga ulanib bo'lmadi",
};

/** fetch javobidan o'qiladigan xato matni */
export async function apiError(res: Response): Promise<string> {
  const data = await res.json().catch(() => null);
  const raw: string | undefined = data?.error;

  // Qaysi maydon xato ekanini ham aytamiz: "Sarlavha: kamida 3 belgi"
  const fields = data?.details?.fieldErrors ?? data?.details;
  if (raw === "Validation failed" && fields && typeof fields === "object") {
    const names = Object.keys(fields)
      .map((k) => FIELD_NAMES[k] ?? k)
      .join(", ");
    if (names) return `${MESSAGES[raw]}: ${names}`;
  }

  if (raw && MESSAGES[raw]) return MESSAGES[raw];
  // Server allaqachon o'zbekcha yozgan bo'lsa (masalan "Saqlab bo'lmadi")
  if (raw && !/^[A-Za-z ]+$/.test(raw)) return raw;
  return STATUS[res.status] ?? `Xatolik (${res.status})`;
}
