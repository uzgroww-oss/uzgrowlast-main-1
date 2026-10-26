import { pageMeta } from "@/lib/seo";

// Sahifaning o'zi "use client" — Next.js unda metadata eksport qilishga
// ruxsat bermaydi, shuning uchun sarlavha va tavsif shu yerda beriladi.
export const metadata = pageMeta({
  path: "/texnologiya",
  title: "Zamonaviy issiqxona texnologiyalari | UZ GROW",
  description:
    "Eng so'nggi innovatsiyalar va texnologiyalar yordamida yuqori samaradorlikka erishish: iqlim nazorati, gidroponika, tomchilatib sug'orish va avtomatlashtirish.",
  keywords: "issiqxona texnologiyalari, gidroponika, iqlim nazorati, tomchilatib sug'orish",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
