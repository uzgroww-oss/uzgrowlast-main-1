import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { listNews } from "@/lib/server/news";
import { Newspaper, CalendarDays } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Yangiliklar | UZ GROW",
  description:
    "UZ GROW kompaniyasining so'nggi yangiliklari, loyihalari va e'lonlari.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tashkent",
  });
}

export default async function NewsPage() {
  // Baza javob bermasa ham sahifa ochilsin — yangiliklarsiz bo'lsa ham
  let news: Awaited<ReturnType<typeof listNews>> = [];
  try {
    news = await listNews();
  } catch (error) {
    console.error("Yangiliklarni o'qib bo'lmadi:", error);
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="py-10 lg:py-14 flex-1">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Newspaper className="w-4 h-4" />
              Yangiliklar
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              So'nggi yangiliklar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              UZ GROW kompaniyasining loyihalari, yutuqlari va e'lonlari
            </p>
          </div>

          {news.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16 text-muted-foreground">
              <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="font-medium text-foreground mb-1">
                Hozircha yangiliklar yo'q
              </p>
              <p className="text-sm">Tez orada yangi ma'lumotlar qo'shiladi</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {item.imageUrl ? (
                    <div className="aspect-video overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-primary/5 flex items-center justify-center">
                      <img
                        src="/images/logo.png"
                        alt="UZ GROW"
                        className="h-12 w-auto opacity-60"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <time dateTime={item.createdAt}>
                        {formatDate(item.createdAt)}
                      </time>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 whitespace-pre-line">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
