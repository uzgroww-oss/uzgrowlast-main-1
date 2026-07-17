import { createStore, type StoredItem } from "./store";

export interface NewsItem extends StoredItem {
  title: string;
  body: string;
  imageUrl: string;
}

export const newsStore = createStore<NewsItem>("news", {
  title: "title",
  body: "body",
  imageUrl: "image_url",
});

/** Eng yangisi birinchi (tartib bazada beriladi) */
export async function listNews(): Promise<NewsItem[]> {
  return newsStore.list();
}
