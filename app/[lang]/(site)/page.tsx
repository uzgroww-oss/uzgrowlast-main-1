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

export const generateMetadata = pageMeta({
  path: "/",
  title: "UZ-GROW | Greenhouse Engineering",
  description:
    "UZ-GROW — Greenhouse Engineering: O'zbekistonda zamonaviy issiqxonalarni loyihalash va qurish bo'yicha yetakchi kompaniya. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar. 9+ yillik tajriba, 1500+ muvaffaqiyatli loyiha.",
  keywords:
    "issiqxona qurish, agro-injiniring, qishloq xo'jaligi, UZ GROW, issiqxona turlari, polikarbonat issiqxona, gidroponik, agrobiznes, O'zbekiston, Toshkent",
});

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "UZ-GROW",
      alternateName: ["UZ-GROW | Greenhouse Engineering", "UZ GROW", "UzGrow"],
      url: `${SITE_URL}/`,
      inLanguage: ["uz", "ru", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "UZ-GROW",
      legalName: "GROW AGRO TEAM",
      description: "Greenhouse Engineering — zamonaviy issiqxonalarni loyihalash va qurish",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/og.jpg`,
      email: "uzgrrow@gmail.com",
      telephone: "+998555152223",
      foundingDate: "2017",
      founder: { "@type": "Person", name: "Rustamjon Raxmonov" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Qo'yliq-6 mavzesi, Ziyokor 1-tor ko'chasi, 6/9",
        addressLocality: "Toshkent",
        addressRegion: "Sirg'ali tumani",
        addressCountry: "UZ",
      },
      geo: { "@type": "GeoCoordinates", latitude: 41.243669, longitude: 69.290648 },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
      ],
      areaServed: ["UZ", "KZ", "KG", "TJ", "TM"],
      sameAs: [
        "https://www.instagram.com/uz.grow",
        "https://t.me/Uz_Grow",
        "https://www.tiktok.com/@uz.grow",
        "https://www.facebook.com/share/1DePjLwX79/",
        "https://youtube.com/@rustamjonrakhmonov",
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Google uchun: sayt nomi va kompaniya kartochkasi (manzil, telefon,
          ish vaqti, ijtimoiy tarmoqlar) — qidiruv va xaritada ko'rinadi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
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
