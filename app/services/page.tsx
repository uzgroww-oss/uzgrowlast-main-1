import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Services } from "@/components/services";

export const metadata = pageMeta({
  path: "/xizmatlar",
  title: "Xizmatlar | UZ GROW - Agro-Injiniring",
  description:
    "UZ GROW xizmatlari: issiqxona injiniringi, jihozlar yetkazib berish, tomchilatib sug'orish tizimlari va agro-konsalting. To'liq aylanma asosida loyihalash va qurilish.",
  keywords:
    "UZ GROW xizmatlari, issiqxona qurish, agro-injiniring, konsalting",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <Services asPageTitle />
      </div>
      <Footer />
    </main>
  );
}
