import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Technology } from "@/components/technology";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export const metadata = {
  title:
    "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
  description:
    "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar. 9+ yillik tajriba, 1200+ muvaffaqiyatli loyiha.",
  keywords:
    "issiqxona qurish, agro-injiniring, qishloq xo'jaligi, UZ GROW, issiqxona turlari, polikarbonat issiqxona, gidroponik, agrobiznes, O'zbekiston, Toshkent",
  openGraph: {
    title:
      "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
    description:
      "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar.",
    images: ["/images/logo.png"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Projects />
      <Technology />
      <Contact />
      <Footer />
    </main>
  );
}
