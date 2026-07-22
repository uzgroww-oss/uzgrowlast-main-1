import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Building2,
  Cog,
  Droplets,
  LineChart,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Xizmatlar | UZ GROW - Agro-Injiniring",
  description:
    "UZ GROW xizmatlari: issiqxona injiniringi, jihozlar yetkazib berish, tomchilatib sug'orish tizimlari va agro-konsalting. To'liq aylanma asosida loyihalash va qurilish.",
  openGraph: {
    title: "Xizmatlar | UZ GROW - Agro-Injiniring",
    description:
      "Issiqxona injiniringi, jihozlar, sug'orish tizimlari va agro-konsalting xizmatlari.",
    images: ["/images/logo.png"],
  },
};

const services = [
  {
    icon: Building2,
    title: "Turnkey issiqxona qurish",
    description:
      "Biz to'liq sikl asosida issiqxona quramiz - loyihalashdan to'liq ishga tushirishgacha.",
    features: [
      "Metall konstruksiya",
      "Polikarbonat yoki shisha qoplama",
      "Isitish va sovutish tizimi",
      "Tomchilatib sug'orish",
      "Avtomatlashtirilgan boshqaruv",
    ],
    result: "Energiya tejamkor, yuqori hosildorlikka ega zamonaviy issiqxona.",
  },
  {
    icon: Cog,
    title: "Agro-injiniring va loyihalash",
    description:
      "Har bir loyiha individual yondashuv asosida ishlab chiqiladi.",
    features: [
      "Hudud iqlimi asosida hisoblanadi",
      "Shamol va yuklama tahlili qilinadi",
      "Ekin turiga moslashtiriladi",
      "Har bir kvadrat metr rentabelli ishlaydi",
    ],
    result: "Professional texnik chizma va klimat hisob-kitobi.",
  },
  {
    icon: Droplets,
    title: "Zamonaviy jihozlar",
    description:
      "Yuqori samaradorlik uchun eng zamonaviy tizimlarni o'rnatamiz.",
    features: [
      "Isitish tizimi",
      "Ventilyatsiya va sovutish",
      "CO₂ tizimi",
      "O'g'itlash va sug'orish tizimi",
    ],
    result: "To'liq avtomatlashtirilgan issiqxona boshqaruvi.",
  },
  {
    icon: LineChart,
    title: "Agro-konsalting",
    description: "Biz faqat qurmaymiz — natijaga olib chiqamiz.",
    features: [
      "Qulupnay (stellaq tizim)",
      "Pomidor yetishtirish",
      "Bodring yetishtirish",
      "Eksport yo'nalishi",
      "Rentabellik tahlili va biznes model",
    ],
    result: "Yuqori daromadli qishloq xo'jaligi biznesi.",
  },
];

export default function XizmatlarPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-12 lg:pt-16 pb-10 lg:pb-14 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#24B14B]/10 text-primary rounded-full text-sm font-medium mb-6">
              Xizmatlar
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Professional issiqxona xizmatlari
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Loyihalashdan tortib to'liq ishga tushirishgacha — biz sizga
              kompleks yechim taklif qilamiz.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-card rounded-3xl p-8 md:p-10 border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#24B14B]/10 flex items-center justify-center mb-6 group-hover:bg-[#24B14B] group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6">
                      {service.description}
                    </p>
                    <div className="p-4 bg-[#24B14B]/5 rounded-xl border border-primary/10">
                      <p className="text-sm font-medium text-primary">
                        Natija: {service.result}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Nimalar kiradi:
                    </h3>
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-[#24B14B]/5 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#24B14B]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Loyihangizni boshlashga tayyormisiz?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Bepul konsultatsiya oling va o'z issiqxona loyihangiz uchun
            individual taklif oling.
          </p>
          <Link href="/aloqa">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-8 gap-2"
            >
              Bog'lanish
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
