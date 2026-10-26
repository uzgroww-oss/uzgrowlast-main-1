import { pageMeta } from "@/lib/seo";

// Sahifaning o'zi "use client" — Next.js unda metadata eksport qilishga
// ruxsat bermaydi, shuning uchun sarlavha va tavsif shu yerda beriladi.
export const metadata = pageMeta({
  path: "/aloqa",
  title: "Aloqa | UZ GROW",
  description:
    "UZ GROW bilan bog'laning: issiqxona qurish, jihozlar va agro-konsalting bo'yicha bepul maslahat. Telefon, WhatsApp, Telegram va elektron pochta orqali murojaat qiling.",
  keywords: "UZ GROW aloqa, issiqxona maslahat, issiqxona narxi, bog'lanish",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
