/**
 * Admin paneldan QO'SHILGAN kartalar (yangi loyiha, yangi jamoa a'zosi...).
 *
 * Kodda bunday element yo'q — u faqat bazadagi matnlardan iborat, masalan
 * "projects.items.7.title". Sayt va admin panel uni bir xil qoida bilan
 * taniydi: shu sababli qoida shu yerda, bitta joyda.
 *
 *  - Massiv to'plamida: indeks koddagi elementlar sonidan katta yoki teng.
 *  - Obyekt to'plamida: kalit "new1", "new2", ... ko'rinishida.
 *
 * Yangi elementning tuzilishi to'plamdagi BIRINCHI elementdan olinadi,
 * faqat barcha matnlari bo'sh bo'ladi.
 */

export const NEW_KEY = /^new\d+$/;

/** Element tuzilishini saqlab, barcha matnlarini bo'shatadi */
export function blankClone<T>(value: T): T {
  if (typeof value === "string") return "" as T;
  if (Array.isArray(value)) return value.map(blankClone) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = blankClone(v);
    return out as T;
  }
  return value;
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * `parent[key]` hali yo'q bo'lsa va u qo'shilgan karta bo'lishi mumkin
 * bo'lsa — bo'sh nusxasini yaratadi. Yaratilsa true.
 */
export function ensureAddedItem(parent: unknown, key: string): boolean {
  if (Array.isArray(parent)) {
    if (!/^\d+$/.test(key) || !isPlainObject(parent[0])) return false;
    const index = Number(key);
    if (index < parent.length || index > parent.length + 200) return false;
    // Oradagi bo'sh joylar ham to'ldiriladi — ular bo'sh bo'lgani uchun
    // saytda ko'rinmaydi (isBlankItem)
    while (parent.length <= index) parent.push(blankClone(parent[0]));
    return true;
  }
  if (isPlainObject(parent) && NEW_KEY.test(key) && !(key in parent)) {
    const first = Object.values(parent)[0];
    if (!isPlainObject(first)) return false;
    parent[key] = blankClone(first);
    return true;
  }
  return false;
}

/**
 * `value` dagi bo'sh matnlarni `fallback` dagi mos matn bilan to'ldiradi.
 * `value` umuman bo'lmasa — `fallback` ning o'zi qaytadi.
 */
export function fillBlanks<T>(value: T, fallback: unknown): T {
  if (value === undefined || value === null) return fallback as T;
  if (fallback === undefined || fallback === null) return value;
  if (typeof value === "string") {
    return (value.trim() === "" && typeof fallback === "string"
      ? fallback
      : value) as T;
  }
  if (Array.isArray(value)) {
    const fb = Array.isArray(fallback) ? fallback : [];
    const length = Math.max(value.length, fb.length);
    return Array.from({ length }, (_, i) => fillBlanks(value[i], fb[i])) as T;
  }
  if (isPlainObject(value) && isPlainObject(fallback)) {
    const out: Record<string, unknown> = { ...fallback };
    for (const [k, v] of Object.entries(value)) out[k] = fillBlanks(v, fallback[k]);
    return out as T;
  }
  return value;
}

/** Barcha matnlari bo'sh element — saytda ko'rsatilmaydi */
export function isBlankItem(value: unknown): boolean {
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.every(isBlankItem);
  if (isPlainObject(value)) return Object.values(value).every(isBlankItem);
  return true;
}

/**
 * Element ichidagi matn ro'yxatlaridan (texnologiyalar, ko'nikmalar...)
 * bo'sh qatorlarni olib tashlaydi: admin qatorni bo'shatsa, saytda bo'sh
 * belgi chiqib qolmasin.
 */
export function cleanItem<T>(value: T): T {
  if (Array.isArray(value)) {
    const list = value.every((v) => typeof v === "string")
      ? value.filter((v) => (v as string).trim() !== "")
      : value;
    return list.map(cleanItem) as T;
  }
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = cleanItem(v);
    return out as T;
  }
  return value;
}
