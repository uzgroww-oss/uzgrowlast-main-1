import { pageMeta } from "@/lib/seo";

// Sahifaning o'zi "use client" — Next.js unda metadata eksport qilishga
// ruxsat bermaydi, shuning uchun sarlavha va tavsif shu yerda beriladi.
export const metadata = pageMeta({
  path: "/foydanalish-shartlari",
  title: "Foydalanish shartlari | UZ GROW",
  description:
    "UZ GROW veb-saytidan foydalanish shartlari va qoidalari.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
