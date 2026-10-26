import { pageMeta } from "@/lib/seo";

// Sahifaning o'zi "use client" — Next.js unda metadata eksport qilishga
// ruxsat bermaydi, shuning uchun sarlavha va tavsif shu yerda beriladi.
export const metadata = pageMeta({
  path: "/investorlar",
  title: "Investorlar uchun | UZ GROW",
  description:
    "Agro-sanoat investitsiya imkoniyati. UZ GROW yuqori rentabelli issiqxona loyihalarini amalga oshirish bo'yicha hamkorlik taklif qiladi.",
  keywords: "issiqxona investitsiya, agrobiznes, investorlar, UZ GROW",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
