/**
 * "Loyihangiz haqida" — aloqa formasidagi qo'shimcha savollar.
 *
 * Mijoz ekin turi, yetishtirish usuli, hudud va maydonni belgilaydi —
 * muhandis birinchi qo'ng'iroqdanoq aniq taklif bilan chiqa oladi.
 *
 * Bazaga alohida ustun qo'shilmagan: server javoblarni murojaat matnining
 * oxiriga tartibli blok qilib yozadi (admin panel va Telegram'da ko'rinadi).
 * Shu sababli ro'yxatlar shu yerda, server ham, brauzer ham o'qiy oladi.
 */

export type BriefLang = "uz" | "ru" | "en";
type Labels = Record<BriefLang, string>;

export interface BriefOption {
  code: string;
  label: Labels;
}

export const CROP_OPTIONS: BriefOption[] = [
  { code: "pomidor", label: { uz: "Pomidor", ru: "Томаты", en: "Tomatoes" } },
  { code: "bodring", label: { uz: "Bodring", ru: "Огурцы", en: "Cucumbers" } },
  { code: "qulupnay", label: { uz: "Qulupnay", ru: "Клубника", en: "Strawberries" } },
  { code: "kokatlar", label: { uz: "Ko'katlar va salat", ru: "Зелень и салат", en: "Greens and lettuce" } },
  { code: "kochat", label: { uz: "Ko'chat", ru: "Рассада", en: "Seedlings" } },
  { code: "gullar", label: { uz: "Gullar", ru: "Цветы", en: "Flowers" } },
  { code: "boshqa", label: { uz: "Boshqa", ru: "Другое", en: "Other" } },
];

export const METHOD_OPTIONS: BriefOption[] = [
  { code: "tuproq", label: { uz: "Tuproqda", ru: "В грунте", en: "In soil" } },
  { code: "gidroponika", label: { uz: "Gidroponika", ru: "Гидропоника", en: "Hydroponics" } },
  { code: "substrat", label: { uz: "Substrat (kokos, mineral paxta)", ru: "Субстрат (кокос, минвата)", en: "Substrate (coco, rockwool)" } },
  { code: "bilmayman", label: { uz: "Hali bilmayman", ru: "Пока не знаю", en: "Not sure yet" } },
];

export const REGION_OPTIONS: BriefOption[] = [
  { code: "toshkent-sh", label: { uz: "Toshkent shahri", ru: "г. Ташкент", en: "Tashkent city" } },
  { code: "toshkent", label: { uz: "Toshkent viloyati", ru: "Ташкентская обл.", en: "Tashkent region" } },
  { code: "andijon", label: { uz: "Andijon", ru: "Андижан", en: "Andijan" } },
  { code: "buxoro", label: { uz: "Buxoro", ru: "Бухара", en: "Bukhara" } },
  { code: "fargona", label: { uz: "Farg'ona", ru: "Фергана", en: "Fergana" } },
  { code: "jizzax", label: { uz: "Jizzax", ru: "Джизак", en: "Jizzakh" } },
  { code: "xorazm", label: { uz: "Xorazm", ru: "Хорезм", en: "Khorezm" } },
  { code: "namangan", label: { uz: "Namangan", ru: "Наманган", en: "Namangan" } },
  { code: "navoiy", label: { uz: "Navoiy", ru: "Навои", en: "Navoi" } },
  { code: "qashqadaryo", label: { uz: "Qashqadaryo", ru: "Кашкадарья", en: "Kashkadarya" } },
  { code: "qoraqalpogiston", label: { uz: "Qoraqalpog'iston", ru: "Каракалпакстан", en: "Karakalpakstan" } },
  { code: "samarqand", label: { uz: "Samarqand", ru: "Самарканд", en: "Samarkand" } },
  { code: "sirdaryo", label: { uz: "Sirdaryo", ru: "Сырдарья", en: "Syrdarya" } },
  { code: "surxondaryo", label: { uz: "Surxondaryo", ru: "Сурхандарья", en: "Surkhandarya" } },
  { code: "xorij", label: { uz: "Boshqa davlat", ru: "Другая страна", en: "Another country" } },
];

export const AREA_OPTIONS: BriefOption[] = [
  { code: "10s", label: { uz: "10 sotixgacha", ru: "до 10 соток", en: "up to 0.1 ha" } },
  { code: "50s", label: { uz: "10–50 sotix", ru: "10–50 соток", en: "0.1–0.5 ha" } },
  { code: "1ga", label: { uz: "0.5–1 gektar", ru: "0.5–1 га", en: "0.5–1 ha" } },
  { code: "5ga", label: { uz: "1–5 gektar", ru: "1–5 га", en: "1–5 ha" } },
  { code: "5plus", label: { uz: "5 gektardan ko'p", ru: "более 5 га", en: "over 5 ha" } },
  { code: "bilmayman", label: { uz: "Hali bilmayman", ru: "Пока не знаю", en: "Not sure yet" } },
];

export interface ProjectBrief {
  crops: string[];
  method: string;
  region: string;
  area: string;
}

export const EMPTY_BRIEF: ProjectBrief = { crops: [], method: "", region: "", area: "" };

const labelOf = (list: BriefOption[], code: string, lang: BriefLang = "uz") =>
  list.find((o) => o.code === code)?.label[lang];

const codesOf = (list: BriefOption[]) => list.map((o) => o.code);
export const BRIEF_CODES = {
  crops: codesOf(CROP_OPTIONS),
  method: codesOf(METHOD_OPTIONS),
  region: codesOf(REGION_OPTIONS),
  area: codesOf(AREA_OPTIONS),
};

/**
 * Murojaat matniga qo'shiladigan blok (o'zbekcha — admin uchun).
 * Hech narsa belgilanmagan bo'lsa bo'sh satr.
 */
export function formatBrief(brief: Partial<ProjectBrief> | undefined): string {
  if (!brief) return "";
  const lines: string[] = [];
  const crops = (brief.crops ?? []).map((c) => labelOf(CROP_OPTIONS, c)).filter(Boolean);
  if (crops.length) lines.push(`Ekin: ${crops.join(", ")}`);
  const method = brief.method && labelOf(METHOD_OPTIONS, brief.method);
  if (method) lines.push(`Usul: ${method}`);
  const region = brief.region && labelOf(REGION_OPTIONS, brief.region);
  if (region) lines.push(`Hudud: ${region}`);
  const area = brief.area && labelOf(AREA_OPTIONS, brief.area);
  if (area) lines.push(`Maydon: ${area}`);
  return lines.length ? `— Loyiha —\n${lines.join("\n")}` : "";
}
