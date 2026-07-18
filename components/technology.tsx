"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Thermometer,
  Wind,
  Droplets,
  Lightbulb,
  Leaf,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";

const TECH_KEYS = ["heating", "ventilation", "shelving", "irrigation", "automation"];

const getTechnologies = (m: (id: string) => string) => [
  {
    icon: Thermometer,
    titleKey: "technology.heating.title",
    descriptionKey: "technology.heating.description",
    color: "from-orange-500/20 to-red-500/20",
    image: m("jixozlar.tech.0"),
  },
  {
    icon: Wind,
    titleKey: "technology.ventilation.title",
    descriptionKey: "technology.ventilation.description",
    color: "from-blue-500/20 to-cyan-500/20",
    image: m("jixozlar.tech.1"),
  },
  {
    icon: Leaf,
    titleKey: "technology.shelving.title",
    descriptionKey: "technology.shelving.description",
    color: "from-green-500/20 to-emerald-500/20",
    image: m("jixozlar.tech.2"),
  },
  {
    icon: Droplets,
    titleKey: "technology.irrigation.title",
    descriptionKey: "technology.irrigation.description",
    color: "from-sky-500/20 to-blue-500/20",
    image: m("jixozlar.tech.3"),
  },
  {
    icon: Cpu,
    titleKey: "technology.automation.title",
    descriptionKey: "technology.automation.description",
    color: "from-violet-500/20 to-purple-500/20",
    image: m("jixozlar.tech.4"),
  },
];

export function Technology() {
  const { t, isHidden } = useLanguage();
  const { m } = useMedia();
  const technologies = getTechnologies(m).filter(
    (_, i) => !isHidden(`technology.${TECH_KEYS[i]}`),
  );
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="texnologiya"
      ref={sectionRef}
      className="py-10 lg:py-14 bg-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? "opacity-30" : "opacity-0"}`}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#24B14B]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#24B14B]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div 
          className={`text-center mb-10 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
            {t("technology.title")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t("technology.subtitle")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t("technology.description")}
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={cn(
                "group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-700 hover:shadow-xl hover:-translate-y-2",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              )}
            >
              {/* Image */}
              <div className="aspect-video relative">
                {/* Rasm admin paneldan o'chirilgan bo'lsa chizilmaydi */}
                {tech.image && (
                  <Image
                    src={tech.image}
                    alt={t(tech.titleKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-[#24B14B] transition-colors duration-300">
                  <tech.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t(tech.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(tech.descriptionKey)}
                </p>
              </div>

              {/* Background Gradient */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br",
                  tech.color,
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
