import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutDetailed } from "@/components/about-detailed";

export const metadata = {
  title: "Biz haqimizda | UZ GROW",
  description:
    "UZ GROW kompaniyasi haqida batafsil ma'lumot. 15+ yillik tajriba, 2000+ muvaffaqiyatli loyiha va professionallik.",
};

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
