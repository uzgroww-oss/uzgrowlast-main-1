import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { listNews } from "@/lib/server/news";
import { NewsList } from "@/components/news-list";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  path: "/yangiliklar",
  title: "Yangiliklar | UZ GROW",
  description:
    "UZ GROW kompaniyasining so'nggi yangiliklari, loyihalari va e'lonlari.",
});

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

      <NewsList news={news} />

      <Footer />
    </main>
  );
}
