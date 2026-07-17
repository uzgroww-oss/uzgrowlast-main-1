"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Award,
  Target,
  Lightbulb,
  Users,
  Globe,
  Heart,
  Star,
  Quote,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

const ceoData = {
  uz: {
    name: "Rustamjon Rahmonov",
    title: "Asoschi va Bosh Direktor",
    company: "UZ GROW Agro-Injiniring",
    experience: "9+ yillik",
    bio: "O'zbekistonlik innovator agrofaol va tadbirkor. 2017-yildan beri Markaziy Osiyo agrosektorida minglab fermerlar va agrobiznes vakillariga ma'lumot, ishonch va natija olib kelmoqda. Zamonaviy texnologiyalar va an'anaviy bilimlarni birlashtirib, qishloq xo'jaligini rivojlantirishga hissa qo'shmoqda.",
    vision:
      "O'zbekistonni Markaziy Osiyoning qishloq xo'jaligi markaziga aylantirish, mahalliy fermerlarni global miqyosda raqobatbardosh qilish va yashil texnologiyalar orqali oziq-ovqat xavfsizligini ta'minlash.",
    achievements: [
      "150,000+ obunachi ijtimoiy tarmoqlarda",
      "2000+ muvaffaqiyatli loyiha",
      "9+ yillik tajriba",
      "Xalqaro hamkorliklar",
      "Innovatsion yechimlar",
    ],
    education: [
      "Qishloq xo'jaligi instituti",
      "Xalqaro biznes menejmenti",
      "Agro-texnologiyalar bo'yicha sertifikatlar",
    ],
    skills: [
      "Agro-injiniring",
      "Biznes strategiyasi",
      "Innovatsiyalar",
      "Xalqaro hamkorlik",
      "Raqamli marketing",
    ],
    philosophy:
      "Har bir fermer muvaffaqiyatli bo'lganda, butun mamlakat gullab-yashnaydi. Biz shu yo'lda katta oilamizni shakllantirmoqdamiz.",
    quote:
      "Agro-biznes - bu faqat pul topish emas, balki millionlab insonlar hayotini yaxshilash, mamlakat oziq-ovqat mustaqilligini ta'minlash va kelajak avlodlari uchun yashil Yer yaratishdir.",
    contact: {
      email: "ceo@uzgrow.uz",
      phone: "+998 99 435-23-13",
      linkedin: "linkedin.com/in/rustamjon-rahmonov",
      telegram: "@rustamjon_ceo",
    },
  },
  ru: {
    name: "Рустамджон Рахмонов",
    title: "Основатель и Генеральный директор",
    company: "UZ GROW Агро-инжиниринг",
    experience: "9+ лет",
    bio: "Узбекский инноватор, агроактивист и предприниматель. С 2017 года доставляет информацию, доверие и результаты тысячам фермеров и представителей агробизнеса в агросекторе Центральной Азии. Объединяя современные технологии и традиционные знания, вносит вклад в развитие сельского хозяйства.",
    vision:
      "Превратить Узбекистан в центр сельского хозяйства Центральной Азии, сделать местных фермеров конкурентоспособными на глобальном уровне и обеспечить продовольственную безопасность через зеленые технологии.",
    achievements: [
      "150,000+ подписчиков в соцсетях",
      "2000+ успешных проектов",
      "9+ лет опыта",
      "Международные партнерства",
      "Инновационные решения",
    ],
    education: [
      "Институт сельского хозяйства",
      "Международный бизнес-менеджмент",
      "Сертификаты по агротехнологиям",
    ],
    skills: [
      "Агро-инжиниринг",
      "Бизнес-стратегия",
      "Инновации",
      "Международное сотрудничество",
      "Цифровой маркетинг",
    ],
    philosophy:
      "Когда каждый фермер успешен, процветает вся страна. Мы формируем большую семью на этом пути.",
    quote:
      "Агробизнес - это не только заработок денег, но и улучшение жизни миллионов людей, обеспечение продовольственной независимости страны и создание зеленой Земли для будущих поколений.",
    contact: {
      email: "ceo@uzgrow.uz",
      phone: "+998 93 435-23-13",
      linkedin: "linkedin.com/in/rustamjon-rahmonov",
      telegram: "@rustamjon_ceo",
    },
  },
  en: {
    name: "Rustamjon Rahmonov",
    title: "Founder & CEO",
    company: "UZ GROW Agro-Engineering",
    experience: "9+ years",
    bio: "Uzbekistani innovator, agro-activist and entrepreneur. Since 2017, has been delivering information, trust and results to thousands of farmers and agribusiness representatives in the Central Asian agro-sector. Combining modern technologies and traditional knowledge to contribute to agricultural development.",
    vision:
      "Transform Uzbekistan into the agricultural hub of Central Asia, make local farmers globally competitive, and ensure food security through green technologies.",
    achievements: [
      "150,000+ social media followers",
      "2000+ successful projects",
      "9+ years of experience",
      "International partnerships",
      "Innovative solutions",
    ],
    education: [
      "Agricultural Institute",
      "International Business Management",
      "Agro-technology certifications",
    ],
    skills: [
      "Agro-engineering",
      "Business Strategy",
      "Innovation",
      "International Partnerships",
      "Digital Marketing",
    ],
    philosophy:
      "When every farmer succeeds, the whole country flourishes. We are building a big family on this path.",
    quote:
      "Agribusiness is not just about making money, but about improving millions of lives, ensuring the country's food independence, and creating a green Earth for future generations.",
    contact: {
      email: "ceo@uzgrow.uz",
      phone: "+998 93 435-23-13",
      linkedin: "linkedin.com/in/rustamjon-rahmonov",
      telegram: "@rustamjon_ceo",
    },
  },
};

const languages = [
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function CEO() {
  const { t } = useLanguage();
  const [currentLang, setCurrentLang] = useState("uz");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const data = ceoData[currentLang as keyof typeof ceoData];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo.png"
              alt={t("common.logoAlt")}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("ceo.management")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bizning rahbarimiz - innovatsiya, tajriba va ishonch uyg'unligi
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${currentLang === lang.code
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main CEO Profile */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-xl border-0">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-16 h-16" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
                      <span className="text-sm font-medium">{t("ceo.role")}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    {data.experience}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {data.name}
                </h3>
                <p className="text-blue-600 font-medium mb-1">{data.title}</p>
                <p className="text-gray-600 text-sm mb-4">{data.company}</p>

                {/* Quick Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t("ceo.experience")}</span>
                    <span className="font-medium">{data.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t("ceo.projects")}</span>
                    <span className="font-medium">2000+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t("ceo.subscribers")}</span>
                    <span className="font-medium">150K+</span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    {data.contact.email}
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    {data.contact.phone}
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-6">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-blue-400" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Biography */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Biografiya
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleSection("bio")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedSection === "bio" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p
                  className={`text-gray-600 leading-relaxed ${expandedSection === "bio" ? "" : "line-clamp-3"}`}
                >
                  {data.bio}
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Viziyasi
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleSection("vision")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedSection === "vision" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p
                  className={`text-gray-600 leading-relaxed ${expandedSection === "vision" ? "" : "line-clamp-3"}`}
                >
                  {data.vision}
                </p>
              </CardContent>
            </Card>

            {/* Quote */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 italic leading-relaxed mb-4">
                      "{data.quote}"
                    </p>
                    <p className="text-sm text-gray-500">— {data.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Yutuqlar
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleSection("achievements")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedSection === "achievements" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${expandedSection === "achievements" ? "" : "max-h-32 overflow-hidden"}`}
                >
                  {data.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-600 text-sm">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Philosophy */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Filosofiya
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {data.philosophy}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills and Education */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Skills */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t("ceo.skills")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t("ceo.education")}</h3>
              </div>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-gray-600 text-sm">{edu}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">{t("ceo.contactDirector")}</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Agar siz loyihalarimiz haqida ko'proq ma'lumot olishmoqchi
            bo'lsangiz yoki hamkorlik qilishni istasangiz, bepul maslahat uchun
            murojaat qiling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email orqali bog'lanish
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Phone className="h-4 w-4 mr-2" />
              Qo'ng'iroq qilish
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
