/**
 * Galereya rasmlarining tartibi, id si va kategoriyasi.
 *
 * Sarlavha va tavsif tarjima faylida ("galleryPage.items", 3 tilda) —
 * admin ularni tahrirlaydi. Rasmning o'zi "gallery.<id>" da
 * (lib/media-registry.ts). i-chi matn i-chi rasmga tegishli.
 *
 * Admin qo'shgan yangi rasmlar bu ro'yxatda yo'q: ularning rasmi
 * "gallery.add<tartib raqami>" da, kategoriyasi "Loyihalar".
 */
export type GalleryCategory = "Loyihalar" | "Samarqand";

export const GALLERY: { id: number; category: GalleryCategory }[] = [
  { id: 1, category: "Loyihalar" },
  { id: 2, category: "Loyihalar" },
  { id: 3, category: "Loyihalar" },
  { id: 4, category: "Loyihalar" },
  { id: 5, category: "Loyihalar" },
  { id: 6, category: "Loyihalar" },
  { id: 7, category: "Loyihalar" },
  { id: 8, category: "Loyihalar" },
  { id: 9, category: "Loyihalar" },
  { id: 10, category: "Samarqand" },
  { id: 11, category: "Samarqand" },
  { id: 12, category: "Samarqand" },
  { id: 13, category: "Samarqand" },
  { id: 14, category: "Samarqand" },
  { id: 15, category: "Samarqand" },
  { id: 21, category: "Loyihalar" },
  { id: 22, category: "Loyihalar" },
  { id: 23, category: "Loyihalar" },
  { id: 24, category: "Loyihalar" },
  { id: 25, category: "Loyihalar" },
  { id: 26, category: "Loyihalar" },
  { id: 27, category: "Loyihalar" },
  { id: 28, category: "Loyihalar" },
  { id: 29, category: "Loyihalar" },
  { id: 30, category: "Loyihalar" },
  { id: 31, category: "Loyihalar" },
  { id: 32, category: "Loyihalar" },
  { id: 33, category: "Loyihalar" },
  { id: 34, category: "Loyihalar" },
  { id: 35, category: "Loyihalar" },
  { id: 36, category: "Loyihalar" },
  { id: 37, category: "Loyihalar" },
  { id: 38, category: "Loyihalar" },
  { id: 39, category: "Loyihalar" },
  { id: 40, category: "Loyihalar" },
  { id: 41, category: "Loyihalar" },
  { id: 42, category: "Loyihalar" },
  { id: 43, category: "Loyihalar" },
  { id: 44, category: "Loyihalar" },
  { id: 45, category: "Loyihalar" },
  { id: 46, category: "Loyihalar" },
  { id: 47, category: "Loyihalar" },
  { id: 48, category: "Loyihalar" },
  { id: 49, category: "Loyihalar" },
  { id: 50, category: "Loyihalar" },
  { id: 51, category: "Loyihalar" },
];
