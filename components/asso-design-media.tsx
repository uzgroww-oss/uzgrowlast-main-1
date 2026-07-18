"use client";

import { MediaImg } from "@/components/ui/media-img";

import { useLanguage } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Video,
  Globe,
  Target,
  TrendingUp,
  Star,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  MessageCircle,
  Music,
  CheckCircle,
  Award,
  BarChart3,
  Zap,
  Heart,
} from "lucide-react";

const platforms = [
  {
    name: "YouTube",
    icon: <Youtube className="h-6 w-6" />,
    subscribers: "122k+",
    color: "bg-red-500",
  },
  {
    name: "Instagram",
    icon: <Instagram className="h-6 w-6" />,
    subscribers: "74.5k+",
    color: "bg-pink-500",
  },
  {
    name: "TikTok",
    icon: <Music className="h-6 w-6" />,
    subscribers: "16k+",
    color: "bg-black",
  },
  {
    name: "Telegram",
    icon: <MessageCircle className="h-6 w-6" />,
    subscribers: "1.5k+",
    color: "bg-blue-500",
  },
];

const geographicCoverage = (tObj: any) => tObj("media.geographicCoverage") || [];
const partnershipPlans = (tObj: any) => tObj("media.partnershipPlans") || [];
const foreignPartners = (tObj: any) => tObj("media.foreignPartners") || [];



export function AssoDesignMedia() {
  const { t, tObj } = useLanguage();
  const { m } = useMedia();
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-gray-50 to-white">
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("media.title")}
          </h1>

        </div>

        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("media.professionalism")}
            </h2>
            <div className="space-y-6">
              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {t("media.realSector")}
                      </h3>
                      <p className="text-gray-600">
                        {t("media.realSectorDesc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {t("media.trustBrand")}
                      </h3>
                      <p className="text-gray-600">
                        {t("media.trustBrandDesc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {t("media.strongAudience")}
                      </h3>
                      <p className="text-gray-600">
                        {t("media.strongAudienceDesc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("media.statsTitle")}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {platforms.map((platform) => (
                <Card key={platform.name} className="text-center">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center text-white mx-auto mb-3`}
                    >
                      {platform.icon}
                    </div>
                    <h3 className="font-bold text-lg">{platform.name}</h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {platform.subscribers}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">
                  {t("media.totalReach")}
                </h3>
                <p className="text-3xl font-bold text-blue-600">150,000+</p>
                <p className="text-gray-600">{t("media.subscribers")}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("media.audienceTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{t("media.ageGroup")}</h3>
                <p className="text-2xl font-bold">25-55</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="font-semibold mb-2">{t("media.gender")}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("media.women")}</span>
                    <span className="font-bold">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("media.men")}</span>
                    <span className="font-bold">13%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">{t("media.regions")}</h3>
                <p className="text-sm text-gray-600">
                  O'zbekiston, Rossiya, Qozog'iston, Qirg'iston, Tojikiston
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Geographic Coverage */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("media.geographicTitle")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {geographicCoverage(tObj).map((country: any) => (
              <Card
                key={country.country}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{country.flag}</span>
                    <h3 className="font-bold text-lg">{country.country}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{country.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("media.tariffsTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {partnershipPlans(tObj).map((plan: any, index: number) => (
              <Card
                key={index}
                className={`border-2 ${index === 0 ? "border-blue-500" : index === 1 ? "border-purple-500" : "border-yellow-500"} hover:shadow-xl transition-shadow`}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>

                  <p className="text-gray-600">{plan.duration}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{t("media.video")}</span>
                      <span className="font-bold">{plan.videos} {t("projects.items.0.size").split(' ')[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("media.post")}</span>
                      <span className="font-bold">{plan.posts} {t("projects.items.0.size").split(' ')[1]}</span>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">{t("media.opportunities")}</h4>
                      {plan.features.map((feature: string, index: number) => (
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Foreign Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("media.foreignPartnersTitle")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {foreignPartners(tObj).map((partner: any, index: number) => (
              <Card
                key={index}
                className="bg-gradient-to-r from-blue-50 to-purple-50"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <MediaImg
                      src={m("umumiy.logo")}
                      alt={partner.name}
                      className="h-14 w-auto shrink-0 object-contain"
                    />
                    <div>
                      <h3 className="font-bold text-xl mb-2">{partner.name}</h3>
                      <p className="text-gray-600 mb-3">
                        {partner.description}
                      </p>
                      <div className="flex items-center gap-2 text-green-600">
                        <Award className="h-5 w-5" />
                        <span className="font-medium">
                          {partner.partnership}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">{t("media.contactUs")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <Globe className="h-8 w-8 mb-2" />
              <a href="https://taplink.cc/uzgrow" className="hover:underline">
                taplink.cc/uzgrow
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 mb-2" />
              <span>{t("contact.email")}</span>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 mb-2" />
              <span>+998 93 435-23-13</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-2" />
              <span>
                GROW AGRO TEAM OFFICE
              </span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Phone className="h-4 w-4 mr-2" />
              {t("media.callNow")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Mail className="h-4 w-4 mr-2" />
              {t("media.freeConsultation")}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            "{t("media.footerDesc")}"
          </p>
          <p className="text-sm text-gray-500">{t("media.respectfully")}</p>
        </div>
      </div>
    </section>
  );
}
