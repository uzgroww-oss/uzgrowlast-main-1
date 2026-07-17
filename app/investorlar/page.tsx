"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  TrendingUp,
  Shield,
  Globe,
  Leaf,
  Download,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InvestorlarPage() {
  const { t, tObj } = useLanguage();

  const benefitsItems = tObj("investor.benefits.items") || [];
  const benefits = benefitsItems.map((benefit: any, index: number) => ({
    ...benefit,
    icon: index === 0 ? TrendingUp :
          index === 1 ? BarChart3 :
          index === 2 ? Shield :
          index === 3 ? Globe :
          Leaf,
  }));

  const investmentModelsItems = tObj("investor.models.items") || [];
  const investmentModels = investmentModelsItems.map((model: any, index: number) => ({
    ...model,
    // Add minInvestment and roi which might be static or translated
    minInvestment: index === 0 ? "$100,000" : index === 1 ? "$25,000" : "$50,000",
    roi: index === 0 ? "25-35%" : index === 1 ? "18-25%" : "20-30%",
  }));

  const statsItems = tObj("investor.hero.stats") || [];
  
  const processItems = tObj("investor.process.items") || [];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-12 lg:pt-16 pb-10 lg:pb-14 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-[#24B14B]/10 text-primary rounded-full text-sm font-medium mb-6">
                {t("investor.hero.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                {t("investor.hero.title")}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {t("investor.hero.desc")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  <Download className="w-4 h-4" />
                  {t("investor.hero.pdf")}
                </Button>
                <Link href="/aloqa">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 gap-2"
                  >
                    {t("investor.hero.contact")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {statsItems.map((stat: any, index: number) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("investor.benefits.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("investor.benefits.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit: any, index: number) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#24B14B]/10 flex items-center justify-center mb-5 group-hover:bg-[#24B14B] group-hover:scale-110 transition-all">
                  <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Models */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("investor.models.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("investor.models.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {investmentModels.map((model: any, index: number) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                {index === 0 && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#24B14B] text-primary-foreground text-xs font-medium rounded-full">
                    {t("investor.models.popular")}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {model.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {model.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">
                      {t("investor.models.minInvestment")}
                    </span>
                    <span className="font-bold text-foreground">
                      {model.minInvestment}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">{t("investment.roi")}</span>
                    <span className="font-bold text-primary">{model.roi}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">
                      {t("investor.models.period")}
                    </span>
                    <span className="font-bold text-foreground">
                      {model.period}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full rounded-full group-hover:bg-[#24B14B] group-hover:text-primary-foreground"
                  variant={index === 0 ? "default" : "outline"}
                >
                  {t("investor.models.readMore")}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("investor.process.title")}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {processItems.map((item: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#24B14B] text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#24B14B]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {t("investor.cta.title")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            {t("investor.cta.desc")}
          </p>
          <Link href="/aloqa">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-8 gap-2"
            >
              {t("investor.hero.contact")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
