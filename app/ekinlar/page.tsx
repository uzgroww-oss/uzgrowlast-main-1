import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CropsIndex } from "@/components/crops";

export const metadata = pageMeta({
  path: "/ekinlar",
  title: "Ekinlar bo'yicha issiqxona yechimlari | UZ GROW",
  description:
    "Pomidor, bodring, qulupnay, ko'katlar va ko'chat uchun qanday issiqxona kerak: qulay harorat, namlik, yetishtirish usullari va ko'p beriladigan savollar.",
  keywords:
    "pomidor issiqxonasi, bodring issiqxonasi, qulupnay issiqxonasi, gidroponika, ko'chat issiqxonasi, UZ GROW",
});

export default function CropsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CropsIndex />
      <Footer />
    </main>
  );
}
