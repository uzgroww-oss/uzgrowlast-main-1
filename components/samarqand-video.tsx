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
import { Button } from "@/components/ui/button";
import { Play, Calendar, MapPin, Users, Star, ArrowRight } from "lucide-react";

const presidentVisitProject = {
  id: 1,
  title: "Prezidentning Samarqand viloyatiga tashrifi",
  description:
    "O'zbekiston Respublikasi Prezidentining Samarqand viloyatiga rasmiy tashrifi va yangi loyihalarni ochish marosimi",
  video:
    "https://res.cloudinary.com/dnqi0bdjk/video/upload/v1775302121/video_2026-04-04_10-35-19_r8tdyl.mp4",
  thumbnail: "/images/photo_2026-04-04_10-35-25.jpg",
  date: "2024-yil 15-mart",
  location: "Samarqand shahri",
  participants: "Prezident, viloyat hokimi, tadbirkorlar",
  status: "Muvaffaqiyatli yakunlangan",
  achievements: [
    "5 ta yangi korxona ochilishi",
    "10,000+ yangi ish o'rinlari",
    "$50M investitsiyalar jalb qilindi",
  ],
  highlights: [
    "Zamonaviy texnologiyalar parki",
    "Xalqaro turizm markazi",
    "Qishloq xo'jaligi klasteri",
    "Raqamli ta'lim platformasi",
  ],
};

export function SamarqandVideo() {
  const { t } = useLanguage();
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-purple-50 to-white">
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
            Prezident Tashrifi - Samarqand
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O'zbekiston Respublikasi Prezidentining Samarqand viloyatiga
            tashrifi va ochilgan yangi loyihalar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-xl border-0">
              <div className="relative">
                <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    controls
                    poster={presidentVisitProject.thumbnail}
                  >
                    <source
                      src={presidentVisitProject.video}
                      type="video/mp4"
                    />
                    Sizning brauzeringiz video elementini qo'llab-quvvatlamaydi.
                  </video>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="default" className="bg-red-600 text-white">
                    <Play className="h-3 w-3 mr-1" />
                    Asosiy video
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    {presidentVisitProject.status}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {presidentVisitProject.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {presidentVisitProject.location}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">
                  {presidentVisitProject.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {presidentVisitProject.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Users className="h-4 w-4" />
                  <span>{presidentVisitProject.participants}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Yutuqlar
                    </h4>
                    <ul className="space-y-2">
                      {presidentVisitProject.achievements.map(
                        (achievement, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-blue-500" />
                      Asosiy yo'nalishlar
                    </h4>
                    <ul className="space-y-2">
                      {presidentVisitProject.highlights.map(
                        (highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex gap-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Batafsil ma'lumot
                  </Button>
                  <Button variant="outline">{t("stats.viewGallery")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">{t("stats.visitStats")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">{t("stats.enterpriseCount")}</span>
                  <span className="text-lg font-bold text-blue-600">5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">{t("stats.jobs")}</span>
                  <span className="text-lg font-bold text-green-600">
                    10,000+
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">{t("stats.investments")}</span>
                  <span className="text-lg font-bold text-purple-600">
                    $50M
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium">
                    Ta'lim muassasalari
                  </span>
                  <span className="text-lg font-bold text-orange-600">3</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">{t("stats.additionalResources")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Play className="h-4 w-4 mr-2" />
                  To'liq video yozuv
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Tadbir jadvali
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Ishtirokchilar ro'yxati
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Xarita va manzillar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
