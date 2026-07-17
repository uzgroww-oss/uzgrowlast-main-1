import { supabase } from "./supabase";

/**
 * Supabase jadvali ustidagi umumiy CRUD.
 *
 * Ilgari bu JSON fayllar bilan ishlagan; endi ma'lumot Postgres'da, lekin
 * tashqi ko'rinishi (list/add/update/remove) o'zgarmadi — API route'lar
 * shu sababli tegilmadi.
 */

export interface StoredItem {
  id: string;
  createdAt: string;
  updatedAt: string;
}

type Row = Record<string, unknown>;

/** camelCase (kodda) ↔ snake_case (bazada) */
function rowToItem<T extends StoredItem>(
  row: Row,
  map: Record<string, string>,
): T {
  const item: Row = {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  for (const [field, column] of Object.entries(map)) {
    item[field] = row[column];
  }
  return item as unknown as T;
}

function itemToRow(data: Row, map: Record<string, string>): Row {
  const row: Row = {};
  for (const [field, column] of Object.entries(map)) {
    if (data[field] !== undefined) row[column] = data[field];
  }
  return row;
}

/**
 * `table` — Supabase jadvali nomi.
 * `columns` — kod maydonlari → jadval ustunlari (id/createdAt/updatedAt dan tashqari).
 */
export function createStore<T extends StoredItem>(
  table: string,
  columns: Record<string, string>,
  orderBy: { column: string; ascending: boolean } = {
    column: "created_at",
    ascending: false,
  },
) {
  return {
    async list(): Promise<T[]> {
      const { data, error } = await supabase()
        .from(table)
        .select()
        .order(orderBy.column, { ascending: orderBy.ascending });
      if (error) throw error;
      return (data as Row[]).map((r) => rowToItem<T>(r, columns));
    },

    async add(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
      const { data: row, error } = await supabase()
        .from(table)
        .insert(itemToRow(data as Row, columns))
        .select()
        .single();
      if (error) throw error;
      return rowToItem<T>(row as Row, columns);
    },

    async update(
      id: string,
      patch: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>,
    ): Promise<T | null> {
      const { data: row, error } = await supabase()
        .from(table)
        .update({ ...itemToRow(patch as Row, columns), updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return row ? rowToItem<T>(row as Row, columns) : null;
    },

    async remove(id: string): Promise<boolean> {
      const { data, error } = await supabase()
        .from(table)
        .delete()
        .eq("id", id)
        .select("id");
      if (error) throw error;
      return (data?.length ?? 0) > 0;
    },
  };
}
