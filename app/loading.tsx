import { Header } from "@/components/header";

/**
 * Sahifa yuklanayotganda ko'rinadi.
 *
 * Bu soxta taymer emas: Next.js uni sahifa tayyor bo'lguncha ko'rsatadi va
 * tayyor bo'lishi bilan darhol olib tashlaydi. Menyu joyida qoladi —
 * foydalanuvchi saytdan chiqib ketmaganini ko'radi.
 */
export default function Loading() {
  return (
    <main className="min-h-screen" aria-busy="true">
      <Header />
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="UZ GROW" className="h-14 w-auto animate-pulse" />
        <div className="w-40 h-1 bg-muted overflow-hidden">
          <div className="h-full w-1/3 bg-brand-yellow animate-[loading-slide_1.1s_ease-in-out_infinite]" />
        </div>
      </div>
    </main>
  );
}
