import { pageMeta } from "@/lib/seo";

// Sahifaning o'zi "use client" — Next.js unda metadata eksport qilishga
// ruxsat bermaydi, shuning uchun sarlavha va tavsif shu yerda beriladi.
export const metadata = pageMeta({
  path: "/maxfiylik-siyosati",
  title: "Maxfiylik siyosati | UZ GROW",
  description:
    "UZ GROW veb-saytida shaxsiy ma'lumotlar qanday yig'ilishi, ishlatilishi va himoya qilinishi haqida.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
