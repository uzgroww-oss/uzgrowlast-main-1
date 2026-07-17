import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Team } from "@/components/team";

export const metadata = {
  title: "Jamoa - UZ GROW | Mutaxassislar Jamoasi",
  description:
    "UZ GROW kompaniyasi mutaxassislar jamoasi. 15+ yillik tajribaga ega professional mutaxassislar. Agro-injiniring, marketing, moliya va loyiha boshqaruvi.",
  keywords:
    "UZ GROW jamoa, mutaxassislar, agro-injiniring, marketing, moliya, loyiha boshqaruvi, O'zbekiston",
  openGraph: {
    title: "Jamoa - UZ GROW | Mutaxassislar Jamoasi",
    description:
      "UZ GROW kompaniyasi mutaxassislar jamoasi. 15+ yillik tajribaga ega professional mutaxassislar.",
    images: ["/images/logo.png"],
  },
};

export default function RahbariyatPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Team />
      <Footer />
    </main>
  );
}
