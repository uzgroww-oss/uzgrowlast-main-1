"use client";

import { MediaImg } from "@/components/ui/media-img";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Settings,
  Cpu,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { mediaIds, useMedia } from "@/contexts/MediaContext";

export function Services() {
  const [activeService, setActiveService] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const { t } = useLanguage();
  const { mList } = useMedia();

  const services = [
    {
      icon: Building2,
      title: t("services.engineering"),
      shortDesc: t("services.engineeringDesc"),
      description: t("services.engineeringFullDesc"),
      features: [
        t("services.engineeringFeatures.0"),
        t("services.engineeringFeatures.1"),
        t("services.engineeringFeatures.2"),
        t("services.engineeringFeatures.3"),
      ],
      images: mList(mediaIds("xizmatlar.engineering", 2)),
    },
    {
      icon: Settings,
      title: t("services.equipment"),
      shortDesc: t("services.equipmentDesc"),
      description: t("services.equipmentFullDesc"),
      features: [
        t("services.equipmentFeatures.0"),
        t("services.equipmentFeatures.1"),
        t("services.equipmentFeatures.2"),
        t("services.equipmentFeatures.3"),
      ],
      images: mList(mediaIds("xizmatlar.equipment", 5)),
    },
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(
        (prev) => (prev + 1) % services[activeService].images.length,
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [activeService, services]);

  // Reset image when service changes
  useEffect(() => {
    setActiveImage(0);
  }, [activeService]);

  return (
    <section id="xizmatlar" className="py-10 lg:py-14 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-3">
            {t("services.title")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t("services.subtitle")}
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-3xl mx-auto">
            {t("services.description")}
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                activeService === index
                  ? "bg-[#24B14B] text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-background text-foreground hover:bg-muted border border-border",
              )}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Active Service Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image Slider */}
          <div className="relative group">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeImage * 100}%)` }}
              >
                {services[activeService].images.map((image, index) => (
                  <MediaImg
                    key={index}
                    src={image}
                    alt={`${services[activeService].title} - Image ${index + 1}`}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-4 left-1/2 right-1/2 flex justify-center gap-2">
              {services[activeService].images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeImage
                      ? "bg-[#24B14B] text-primary-foreground"
                      : "bg-white/50 hover:bg-white text-muted-foreground"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <span className="sr-only">{index + 1}</span>
                </button>
              ))}
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full rounded-2xl bg-[#24B14B]/10" />
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#24B14B]/10 rounded-lg flex items-center justify-center">
                  {React.createElement(services[activeService].icon, {
                    className: "w-6 h-6 text-primary",
                  })}
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {services[activeService].title}
                </h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {services[activeService].description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {services[activeService].features.map(
                (feature: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setActiveService(index)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#24B14B]/10 rounded-lg flex items-center justify-center group-hover:bg-[#24B14B]/20 transition-colors">
                  {React.createElement(service.icon, {
                    className: "w-6 h-6 text-primary",
                  })}
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h4>
              </div>
              <p className="text-muted-foreground mb-4">{service.shortDesc}</p>
              <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                <span className="text-sm font-medium">
                  {t("common.readMore")}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
