import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Projects } from "@/components/projects";

export const metadata = {
  title: "Loyihalar - UZ GROW | Muvaffaqiyatli issiqxona loyihalari",
  description:
    "UZ GROW kompaniyasining muvaffaqiyatli issiqxona loyihalari. Prezident tashriflari, xalqaro hamkorliklar va zamonaviy agrotexnologiyalar.",
  keywords: [
    "UZ GROW",
    "loyihalar",
    "issiqxona",
    "qurilish",
    "prezident tashrifi",
    "qishloq xo'jaligi",
    "agro-injiniring",
  ],
  openGraph: {
    title: "Loyihalar - UZ GROW | Muvaffaqiyatli issiqxona loyihalari",
    description:
      "UZ GROW kompaniyasining muvaffaqiyatli issiqxona loyihalari. Prezident tashriflari va qishloq xo'jaligi loyihalari.",
    images: ["/images/logo.png"],
  },
};

export default function LoyihalarPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Projects />
      <Footer />
    </main>
  );
}
