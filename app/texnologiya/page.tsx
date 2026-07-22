"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Thermometer,
  Wind,
  Droplets,
  Sun,
  Cpu,
  Gauge,
  Leaf,
  Zap,
} from "lucide-react";

const technologies = [
  {
    icon: Thermometer,
    title: "Iqlim nazorati",
    description:
      "Avtomatlashtirilgan isitish va sovutish tizimi orqali optimal harorat va namlikni saqlash.",
    features: [
      "Harorat sensori",
      "Avtomatik ventilyatsiya",
      "Namlik nazorati",
      "Iqlim ma'lumotlari",
    ],
  },
  {
    icon: Droplets,
    title: "Tomchilatib sug'orish",
    description:
      "Suv va o'g'itlarni to'g'ridan-to'g'ri ildizga yetkazish orqali 40% gacha suv tejash.",
    features: [
      "Aniq dozalash",
      "Suv tejash",
      "Avtomatik jadval",
      "Sensor monitoring",
    ],
  },
  {
    icon: Wind,
    title: "CO₂ tizimi",
    description:
      "Karbonat angidrid darajasini nazorat qilish orqali fotosintezni tezlashtirish.",
    features: [
      "CO₂ generatori",
      "Avtomatik nazorat",
      "Sensor tizimi",
      "Xavfsizlik",
    ],
  },
  {
    icon: Cpu,
    title: "Avtomatlashtirish",
    description:
      "Barcha tizimlarni markaziy boshqaruv paneli orqali masofadan nazorat qilish.",
    features: [
      "Mobil ilova",
      "Real-time monitoring",
      "Ogohlantirish tizimi",
      "Ma'lumot tahlili",
    ],
  },
  {
    icon: Leaf,
    title: "Hydroponika",
    description:
      "Tuproqsiz yetishtirish texnologiyasi - yuqori hosildorlik, kam joy.",
    features: ["NFT tizimi", "DWC tizimi", "Aeroponika", "Vertikal ferma"],
  },
];

const benefits = [
  { icon: Gauge, value: "30%", label: "Hosildorlik oshishi" },
  { icon: Droplets, value: "40%", label: "Suv tejash" },
  { icon: Zap, value: "25%", label: "Energiya tejash" },
  { icon: Leaf, value: "50%", label: "Kamroq kasallik" },
];

export default function TexnologiyaPage() {
  const { t, tObj } = useLanguage();

  const technologiesItems = tObj("techPage.technologies.items") || [];
  const technologies = technologiesItems.map((tech: any, index: number) => ({
    ...tech,
    icon: index === 0 ? Thermometer :
          index === 1 ? Droplets :
          index === 2 ? Wind :
          index === 3 ? Cpu :
          Leaf,
  }));

  const benefitsItems = tObj("techPage.benefits") || [];
  const benefits = benefitsItems.map((benefit: any, index: number) => ({
    ...benefit,
    icon: index === 0 ? Gauge :
          index === 1 ? Droplets :
          index === 2 ? Zap :
          Leaf,
    value: index === 0 ? "30%" : index === 1 ? "40%" : index === 2 ? "25%" : "50%",
  }));

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-12 lg:pt-16 pb-10 lg:pb-14 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#24B14B]/10 text-primary rounded-full text-sm font-medium mb-6">
              {t("techPage.hero.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("techPage.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("techPage.hero.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#24B14B]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit: any, index: number) => (
              <div key={index} className="text-center">
                <benefit.icon className="w-10 h-10 text-primary-foreground/80 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                  {benefit.value}
                </div>
                <div className="text-primary-foreground/70 text-sm">
                  {benefit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("techPage.technologies.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("techPage.technologies.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech: any, index: number) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#24B14B]/10 flex items-center justify-center mb-5 group-hover:bg-[#24B14B] group-hover:scale-110 transition-all duration-300">
                  <tech.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {tech.title}
                </h3>

                <p className="text-muted-foreground mb-5 leading-relaxed">
                  {tech.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {tech.features && tech.features.map((feature: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("techPage.video.title")}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t("techPage.video.desc")}
              </p>
            </div>

            <div className="aspect-video bg-card rounded-3xl flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Cpu className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t("technology.videoPlaceholder")}</p>
                <p className="text-sm text-muted-foreground/60">
                  {t("techPage.video.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
