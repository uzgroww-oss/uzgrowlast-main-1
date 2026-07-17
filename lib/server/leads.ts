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
