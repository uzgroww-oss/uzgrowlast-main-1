"use client";

import Link from "next/link";
import {
  TrendingUp,
  Clock,
  Shield,
  Globe,
  Sprout,
  Download,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: TrendingUp,
    title: "Yuqori ichki rentabellik (ROI)",
    description: "Yillik 25-35% gacha daromad",
  },
  {
    icon: Clock,
    title: "Tez aylanuvchi mahsulot",
    description: "6-8 oyda pul qaytishi",
  },
  {
    icon: Shield,
    title: "Oziq-ovqat xavfsizligi",
    description: "Doimiy talab va bozor",
  },
  {
    icon: Globe,
    title: "Eksport salohiyati",
    description: "Xalqaro bozorga kirish",
  },
  {
    icon: Sprout,
    title: "ESG yondashuv",
    description: "Barqaror rivojlanish",
  },
];

const investmentOptions = [
  "1 dan 10 gektargacha loyihalar",
  "To'liq moliyaviy model va prognozlar",
  "Loyihani boshqarish xizmati",
  "Kafolatlangan daromad",
];

export function Investors() {
  return (
    <section
      id="investorlar"
      className="py-10 lg:py-14 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#24B14B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#24B14B]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
            Investorlar
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Agro-sanoat investitsiya imkoniyati
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            UZ GROW yuqori rentabelli issiqxona loyihalarini amalga oshirish
            bo&apos;yicha hamkorlik taklif qiladi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Benefits */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Nima uchun issiqxonaga investitsiya qilish kerak?
            </h3>

            {/* Benefits List */}
            <div className="space-y-6 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#24B14B]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#24B14B] group-hover:scale-105 transition-all duration-300">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - CTA Card */}
          <div className="relative">
            <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border shadow-xl">
              <div className="inline-flex items-center gap-2 bg-[#24B14B]/10 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">
                  Yuqori daromad
                </span>
              </div>

              <h4 className="text-2xl font-bold text-foreground mb-4">
                Investitsiya imkoniyatlarini o&apos;rganing
              </h4>
              <p className="text-muted-foreground mb-8">
                Batafsil ma&apos;lumot va moliaviy modellar uchun bizning
                investor prezentatsiyasini yuklab oling yoki mutaxassislarimiz
                bilan bog&apos;laning.
              </p>

              {/* Options List */}
              <ul className="space-y-3 mb-8">
                {investmentOptions.map((option, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full flex-1" asChild>
                  <Link href="#" className="gap-2">
                    <Download className="w-5 h-5" />
                    PDF yuklab olish
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full flex-1"
                  asChild
                >
                  <Link href="#aloqa" className="gap-2">
                    Bog&apos;lanish
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl bg-[#24B14B]/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
