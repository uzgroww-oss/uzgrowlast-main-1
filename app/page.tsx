import { pageMeta, SITE_URL } from "@/lib/seo";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { CropsStrip } from "@/components/crops";
import { CtaBand, ProcessSteps } from "@/components/home-blocks";
import { About } from "@/components/about";
import { ProjectsMap } from "@/components/projects-map";
import { Projects } from "@/components/projects";
import { Technology } from "@/components/technology";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export const metadata = pageMeta({
  path: "/",
  title: "UZ-GROW | Greenhouse Engineering",
  description:
    "UZ-GROW — Greenhouse Engineering: O'zbekistonda zamonaviy issiqxonalarni loyihalash va qurish bo'yicha yetakchi kompaniya. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar. 9+ yillik tajriba, 1500+ muvaffaqiyatli loyiha.",
  keywords:
    "issiqxona qurish, agro-injiniring, qishloq xo'jaligi, UZ GROW, issiqxona turlari, polikarbonat issiqxona, gidroponik, agrobiznes, O'zbekiston, Toshkent",
});

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Google qidiruvda sayt nomi sifatida shu chiqadi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "UZ-GROW",
            alternateName: ["UZ-GROW | Greenhouse Engineering", "UZ GROW", "UzGrow"],
            url: `${SITE_URL}/`,
          }),
        }}
      />
      <Header />
      <Hero />
      <About />
      <ProjectsMap />
      <CropsStrip />
      <ProcessSteps />
      <CtaBand />
      <Services />
      <Technology />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
