import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Projects } from "@/components/projects";

export const metadata = pageMeta({
  path: "/loyihalar",
  title: "Loyihalar - UZ GROW | Muvaffaqiyatli issiqxona loyihalari",
  description:
    "UZ GROW kompaniyasining muvaffaqiyatli issiqxona loyihalari. Prezident tashriflari, xalqaro hamkorliklar va zamonaviy agrotexnologiyalar.",
  keywords:
    "UZ GROW, loyihalar, issiqxona, qurilish, prezident tashrifi, qishloq xo'jaligi, agro-injiniring",
});

export default function LoyihalarPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Projects asPageTitle />
      <Footer />
    </main>
  );
}
