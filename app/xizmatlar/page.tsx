import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ServicesPage } from "@/components/services-page";

export const metadata = pageMeta({
  path: "/xizmatlar",
  title: "Xizmatlar | UZ GROW - Agro-Injiniring",
  description:
    "UZ GROW xizmatlari: issiqxona injiniringi, jihozlar yetkazib berish, tomchilatib sug'orish tizimlari va agro-konsalting. To'liq aylanma asosida loyihalash va qurilish.",
  keywords:
    "UZ GROW xizmatlari, issiqxona qurish, agro-injiniring, konsalting",
});

export default function XizmatlarPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesPage />
      <Footer />
    </main>
  );
}
