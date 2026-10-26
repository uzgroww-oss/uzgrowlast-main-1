import { pageMeta } from "@/lib/seo";

// Sahifaning o'zi "use client" — Next.js unda metadata eksport qilishga
// ruxsat bermaydi, shuning uchun sarlavha va tavsif shu yerda beriladi.
export const metadata = pageMeta({
  path: "/agro-injiniring",
  title: "Agro-injiniring | UZ GROW",
  description:
    "Zamonaviy texnologiyalar va avtomatlashtirish yechimlari bilan qishloq xo'jaligini kelajakka o'tkazing. UZ GROW agro-injiniring xizmatlari: loyihalash, qurilish va ishga tushirish.",
  keywords: "agro-injiniring, issiqxona loyihalash, avtomatlashtirish, UZ GROW",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
