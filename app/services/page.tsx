import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Services } from "@/components/services";

export const metadata = {
  title: "Xizmatlar | UZ GROW",
  description: "UZ GROW tomonidan taqdim etiladigan to'liq aylanma xizmatlar: Injiniring, Jihozlar, Konsalting",
  keywords: "UZ GROW xizmatlari, issiqxona qurish, agro-injiniring, konsalting",
  openGraph: {
    title: "Xizmatlar | UZ GROW",
    description: "UZ GROW tomonidan taqdim etiladigan to'liq aylanma xizmatlar",
    images: ["/images/logo.png"],
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
    </main>
  );
}
