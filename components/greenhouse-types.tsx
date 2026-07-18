"use client";

import { MediaImg } from "@/components/ui/media-img";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Home,
  Factory,
  ArrowUp,
  CheckCircle,
  ArrowRight,
  Users,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mediaIds, useMedia } from "@/contexts/MediaContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function GreenhouseTypes() {
  const { t, tObj } = useLanguage();
  const { m, mList } = useMedia();

  const greenhouseTypes = [
    {
      id: 9,
      title: t("greenhouse.vertical.title"),
      description: t("greenhouse.vertical.description"),
      images: mList(mediaIds("issiqxona.vertical", 7)),
      icon: <ArrowUp className="h-6 w-6" />,
      features: tObj("greenhouse.vertical.features") || [],
      complexity: t("greenhouse.vertical.complexity"),
      durability: t("greenhouse.vertical.durability"),
      cost: t("greenhouse.vertical.cost"),
      maintenance: t("greenhouse.vertical.maintenance"),
      color: "bg-red-500",
    },
    {
      id: 4,
      title: t("greenhouse.mini.title"),
      description: t("greenhouse.mini.description"),
      images: mList(mediaIds("issiqxona.mini", 3)),
      icon: <Home className="h-6 w-6" />,
      features: tObj("greenhouse.mini.features") || [],
      complexity: t("greenhouse.mini.complexity"),
      durability: t("greenhouse.mini.durability"),
      cost: t("greenhouse.mini.cost"),
      maintenance: t("greenhouse.mini.maintenance"),
      color: "bg-yellow-500",
    },
    {
      id: 5,
      title: t("greenhouse.oddiy.title"),
      description: t("greenhouse.oddiy.description"),
      images: mList(mediaIds("issiqxona.oddiy", 5)),
      icon: <Factory className="h-6 w-6" />,
      features: tObj("greenhouse.oddiy.features") || [],
      complexity: t("greenhouse.oddiy.complexity"),
      durability: t("greenhouse.oddiy.durability"),
      cost: t("greenhouse.oddiy.cost"),
      maintenance: t("greenhouse.oddiy.maintenance"),
      color: "bg-gray-500",
    },
    {
      id: 6,
      title: t("greenhouse.gektar.title"),
      description: t("greenhouse.gektar.description"),
      images: mList(mediaIds("issiqxona.gektar", 3)),
      icon: <ArrowUp className="h-6 w-6" />,
      features: tObj("greenhouse.gektar.features") || [],
      complexity: t("greenhouse.gektar.complexity"),
      durability: t("greenhouse.gektar.durability"),
      cost: t("greenhouse.gektar.cost"),
      maintenance: t("greenhouse.gektar.maintenance"),
      color: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-10 lg:py-14 bg-linear-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <MediaImg
              src={m("umumiy.logo")}
              alt={t("common.logoAlt")}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("greenhouse.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("greenhouse.description")}
          </p>
        </div>

        {/* Greenhouse Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {greenhouseTypes.map((type) => (
            <Card
              key={type.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <CardTitle className="text-xl flex items-center gap-2 mb-3">
                  <div className={`${type.color} text-white p-2 rounded-lg`}>
                    {type.icon}
                  </div>
                  {type.title}
                </CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  {type.description}
                </CardDescription>
                <div className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t("common.features") || "Xususiyatlar"}
                    </h4>
                    <div className="space-y-2">
                      {type.features.map((feature: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/aloqa">
                    <Button className="w-full" variant="outline">
                      {t("common.readMore")}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="relative overflow-hidden rounded-b-xl">
                <Carousel className="w-full">
                  <CarouselContent>
                    {type.images.map((imgSrc, index) => (
                      <CarouselItem key={index}>
                        <MediaImg
                          src={imgSrc}
                          alt={`${type.title} ${index + 1}`}
                          className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
                </Carousel>
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                  <div
                    className={`${type.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-md`}
                  >
                    {type.icon}
                    {type.complexity}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
