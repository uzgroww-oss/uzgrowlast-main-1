"use client";

import Link from "next/link";
import {
  Building2,
  Cog,
  Droplets,
  LineChart,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Ikonkalar xizmatning asl tartib raqamiga bog'langan; admin qo'shgan
// yangi xizmatlar birinchisinikini oladi
const ICONS = [Building2, Cog, Droplets, LineChart];

/** /xizmatlar sahifasi. Barcha matnlar "servicesPage" da (admin: Xizmatlar sahifasi) */
export function ServicesPage() {
  const { t, tList } = useLanguage();
  const services = tList("servicesPage.items");

  return (
    <>
      <section className="pt-12 lg:pt-16 pb-10 lg:pb-14 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#24B14B]/10 text-primary rounded-full text-sm font-medium mb-6">
              {t("servicesPage.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("servicesPage.title")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("servicesPage.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8">
            {services.map(({ key, index, value: service }) => {
              const Icon = ICONS[index] ?? ICONS[0];
              const features: string[] = Array.isArray(service.features) ? service.features : [];
              return (
                <div
                  key={key}
                  className="group bg-card rounded-3xl p-8 md:p-10 border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-[#24B14B]/10 flex items-center justify-center mb-6 group-hover:bg-[#24B14B] group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                      {service.result && (
                        <div className="p-4 bg-[#24B14B]/5 rounded-xl border border-primary/10">
                          <p className="text-sm font-medium text-primary">
                            {t("servicesPage.resultLabel")}: {service.result}
                          </p>
                        </div>
                      )}
                    </div>

                    {features.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                          {t("servicesPage.includesLabel")}:
                        </h3>
                        {features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-[#24B14B]/5 transition-colors"
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#24B14B]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {t("servicesPage.ctaTitle")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            {t("servicesPage.ctaText")}
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-8 gap-2" asChild>
            <Link href="/aloqa">
              {t("servicesPage.ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
