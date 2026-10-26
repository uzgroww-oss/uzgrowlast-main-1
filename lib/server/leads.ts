import { supabase } from "./supabase";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  lang: string;
  createdAt: string;
  ip?: string;
  /**
   * Admin "ko'rildi" deb belgilaganmi. `undefined` — bazada bu ustun hali
   * yo'q (supabase/schema.sql dagi qo'shimchani ishga tushirish kerak).
   */
  handled?: boolean;
}

interface Row {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  lang: string;
  ip: string | null;
  created_at: string;
  handled?: boolean;
}

const toLead = (row: Row): Lead => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  email: row.email,
  service: row.service,
  message: row.message,
  lang: row.lang,
  createdAt: row.created_at,
  ip: row.ip ?? undefined,
  handled: row.handled,
});

export async function saveLead(lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const { data, error } = await supabase()
    .from("leads")
    .insert({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      service: lead.service,
      message: lead.message,
      lang: lead.lang,
      ip: lead.ip ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return toLead(data as Row);
}

export async function listLeads(): Promise<Lead[]> {
  const { data, error } = await supabase()
    .from("leads")
    .select()
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Row[]).map(toLead);
}

/** Bitta murojaatni o'chiradi. Topilmasa false qaytadi. */
export async function deleteLead(id: string): Promise<boolean> {
  const { data, error } = await supabase()
    .from("leads")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

/** Ustun mavjud emas: Postgres (42703) yoki Supabase API (PGRST204) kodi */
export const isMissingColumn = (error: unknown) =>
  ["42703", "PGRST204"].includes((error as { code?: string })?.code ?? "");

/** "Ko'rildi" belgisini qo'yadi yoki olib tashlaydi */
export async function setLeadHandled(id: string, handled: boolean): Promise<boolean> {
  const { data, error } = await supabase()
    .from("leads")
    .update({ handled })
    .eq("id", id)
    .select("id");

  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

/** Barcha murojaatlarni o'chiradi. Nechta o'chirilgani qaytadi. */
export async function deleteAllLeads(): Promise<number> {
  const { data, error } = await supabase()
    .from("leads")
    .delete()
    .not("id", "is", null)
    .select("id");

  if (error) throw error;
  return data?.length ?? 0;
}
