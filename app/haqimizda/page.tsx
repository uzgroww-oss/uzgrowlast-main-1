import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutDetailed } from "@/components/about-detailed";

export const metadata = pageMeta({
  path: "/haqimizda",
  title: "Biz haqimizda | UZ GROW",
  description:
    "UZ GROW kompaniyasi haqida batafsil ma'lumot. 9+ yillik tajriba, 1500+ muvaffaqiyatli loyiha va professionallik.",
  keywords:
    "UZ GROW haqida, issiqxona kompaniyasi, agro-injiniring, tajriba",
});

export default function HaqimizdaPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <AboutDetailed />
      </div>
      <Footer />
    </main>
  );
}
