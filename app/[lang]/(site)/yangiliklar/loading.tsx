import { Header } from "@/components/header";

/**
 * Yangiliklar serverdan (bazadan) o'qiladi — shu vaqt ichida bo'sh sahifa
 * emas, menyu va yangiliklar kartalarining skeleti ko'rinadi.
 */
export default function NewsLoading() {
  return (
    <main className="min-h-screen" aria-busy="true">
      <Header />
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center mb-10 gap-4">
            <div className="h-8 w-32 img-ph" />
            <div className="h-10 w-72 max-w-full img-ph" />
            <div className="h-5 w-96 max-w-full img-ph" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="border border-border">
                <div className="aspect-video img-ph" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-24 img-ph" />
                  <div className="h-5 w-4/5 img-ph" />
                  <div className="h-3 w-full img-ph" />
                  <div className="h-3 w-2/3 img-ph" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
