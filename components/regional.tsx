"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Users, TrendingUp } from "lucide-react";

const viloyatlar = [
  {
    id: 1,
    name: "Samarqand viloyati",
    description:
      "Tarixiy markaz va zamonaviy texnologiyalar makoni. Turizm va IT sektoriga ixtisoslashgan viloyat.",
    image: "/images/24.jpg",
    capital: "Samarqand",
    population: "4.2M",
    projects: 28,
    status: "Rivojlanayotgan",
    speciality: "Turizm, IT, Qishloq xo'jaligi",
    budget: "$15M",
  },
  {
    id: 2,
    name: "Buxoro viloyati",
    description:
      "Qadimiy madaniyat merosi va zamonaviy sanoat korxonalari bilan mashhur viloyat.",
    image: "/images/25.jpg",
    capital: "Buxoro",
    population: "2.8M",
    projects: 19,
    status: "Faol",
    speciality: "Madaniy turizm, To'qimachilik",
    budget: "$12M",
  },
  {
    id: 3,
    name: "Farg'ona viloyati",
    description:
      "Qishloq xo'jaligi va oziq-ovqat sanoati markazi. Meva va sabzavot yetishtirish bo'yicha yetakchi.",
    image: "/images/27.jpg",
    capital: "Farg'ona",
    population: "4.5M",
    projects: 35,
    status: "Faol",
    speciality: "Qishloq xo'jaligi, Oziq-ovqat sanoati",
    budget: "$18M",
  },
  {
    id: 4,
    name: "Xorazm viloyati",
    description:
      "Qadimiy Xorazm viloyati - paxtachilik va qishloq xo'jaligining muhim markazi.",
    image: "/images/7.jpg",
    capital: "Urganch",
    population: "1.8M",
    projects: 22,
    status: "Rivojlanayotgan",
    speciality: "Paxtachilik, Turizm",
    budget: "$10M",
  },
  {
    id: 5,
    name: "Qashqadaryo viloyati",
    description:
      "Energetika va kon sanoati rivojlangan viloyat. Neft va gaz qazib olish markazi.",
    image: "/images/8.jpg",
    capital: "Qarshi",
    population: "3.2M",
    projects: 24,
    status: "Faol",
    speciality: "Energetika, Kon sanoati",
    budget: "$22M",
  },
  {
    id: 6,
    name: "Surxondaryo viloyati",
    description:
      "Janubiy darvoza - qishloq xo'jaligi va xalqaro savdo markazi.",
    image: "/images/3.jpg",
    capital: "Termiz",
    population: "2.4M",
    projects: 18,
    status: "Rivojlanayotgan",
    speciality: "Qishloq xo'jaligi, Xalqaro savdo",
    budget: "$11M",
  },
];

export function Regional() {
  const { t } = useLanguage();
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo.png"
              alt={t("common.logoAlt")}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Viloyatlar Loyihalari
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O'zbekiston viloyatlarida amalga oshirilayotgan rivojlanish
            dasturlari va mintaqaviy loyihalar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">12</h3>
            <p className="text-gray-600">{t("stats.regions")}</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">200+</h3>
            <p className="text-gray-600">{t("stats.projects")}</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">35M+</h3>
            <p className="text-gray-600">{t("stats.population")}</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">15%</h3>
            <p className="text-gray-600">{t("stats.growth")}</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Building className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">50+</h3>
            <p className="text-gray-600">{t("stats.enterprises")}</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">$100M+</h3>
            <p className="text-gray-600">{t("stats.budget")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {viloyatlar.map((viloyat) => (
            <Card
              key={viloyat.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={viloyat.image}
                  alt={viloyat.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={
                      viloyat.status === "Faol" ? "default" : "secondary"
                    }
                  >
                    {viloyat.status}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-xl">
                    {viloyat.name}
                  </h3>
                  <p className="text-white/80 text-sm">{viloyat.capital}</p>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-gray-600 line-clamp-2">
                  {viloyat.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t("stats.population")}:</span>
                    <span className="font-medium">{viloyat.population}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t("stats.projects")}:</span>
                    <span className="font-medium">{viloyat.projects} ta</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t("stats.budget")}:</span>
                    <span className="font-medium text-green-600">
                      {viloyat.budget}
                    </span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">{t("stats.specialty")}:</p>
                    <div className="flex flex-wrap gap-1">
                      {viloyat.speciality.split(", ").map((spec, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Loyihalarni ko'rish
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
