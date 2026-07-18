import { supabase } from "./supabase";

/**
 * Admin paneldan almashtirilgan rasm/video manzillari: id → URL.
 *
 * Matnlardagi kabi bu yerda ham faqat FARQLAR saqlanadi. id bo'lmasa,
 * lib/media-registry.ts dagi standart manzil ishlatiladi.
 */
export type MediaOverrides = Record<string, string>;

export async function readMedia(): Promise<MediaOverrides> {
  const { data, error } = await supabase()
    .from("media_overrides")
    .select("id, url");

  if (error) throw error;

  const result: MediaOverrides = {};
  for (const row of data as { id: string; url: string }[]) {
    result[row.id] = row.url;
  }
  return result;
}

/**
 * `null` = o'zgarishni bekor qilib, koddagi standart rasmga qaytarish.
 * Bo'sh satr = rasmni butunlay o'chirish (saytda ko'rinmaydi).
 */
export async function patchMedia(
  patch: Record<string, string | null>,
): Promise<MediaOverrides> {
  const upserts: { id: string; url: string; updated_at: string }[] = [];
  const deletes: string[] = [];

  for (const [id, url] of Object.entries(patch)) {
    if (url === null) deletes.push(id);
    else upserts.push({ id, url, updated_at: new Date().toISOString() });
  }

  const db = supabase();

  if (upserts.length > 0) {
    const { error } = await db
      .from("media_overrides")
      .upsert(upserts, { onConflict: "id" });
    if (error) throw error;
  }

  if (deletes.length > 0) {
    const { error } = await db
      .from("media_overrides")
      .delete()
      .in("id", deletes);
    if (error) throw error;
  }

  return readMedia();
}

export async function resetMedia(): Promise<MediaOverrides> {
  // Butun jadvalni tozalaymiz. `neq` shartsiz delete Supabase'da ruxsat
  // etilmagani uchun har doim rost bo'ladigan shart beriladi.
  const { error } = await supabase()
    .from("media_overrides")
    .delete()
    .neq("id", "");
  if (error) throw error;
  return {};
}
