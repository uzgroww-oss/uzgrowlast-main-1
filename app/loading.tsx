/**
 * Sahifa yuklanayotganda ko'rinadi.
 *
 * Bu soxta taymer emas: Next.js uni sahifa tayyor bo'lguncha ko'rsatadi va
 * tayyor bo'lishi bilan darhol olib tashlaydi. Tez internetda ko'rinmaydi
 * ham, sekin internetda esa foydalanuvchi kutayotganini biladi.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-background">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt="UZ GROW"
        className="h-14 w-auto animate-pulse"
      />
      <div className="w-40 h-1 rounded-full bg-muted overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-primary animate-[loading-slide_1.1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
