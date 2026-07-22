"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Zap,
  Droplets,
  Thermometer,
  Wind,
  Database,
  Cloud,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";


export default function AgroEngineeringPage() {
  const { t, tObj } = useLanguage();

  const agroServicesItems = tObj("agro.services.items") || [];
  const agroServices = agroServicesItems.map((item: any, index: number) => ({
    ...item,
    icon: index === 0 ? <Cpu className="w-8 h-8" /> : 
          index === 1 ? <Droplets className="w-8 h-8" /> :
          index === 2 ? <Thermometer className="w-8 h-8" /> :
          <Database className="w-8 h-8" />,
    color: index === 0 ? "bg-blue-500" :
           index === 1 ? "bg-cyan-500" :
           index === 2 ? "bg-orange-500" :
           "bg-purple-500",
  }));

  const technologiesItems = tObj("agro.technologies.items") || [];
  const technologies = technologiesItems.map((tech: any, index: number) => ({
    ...tech,
    icon: index === 0 ? <Wind className="w-6 h-6" /> :
          index === 1 ? <Cloud className="w-6 h-6" /> :
          index === 2 ? <Lightbulb className="w-6 h-6" /> :
          <Cpu className="w-6 h-6" />,
  }));

  const benefitsItems = tObj("agro.benefits.items") || [];
  const benefits = benefitsItems.map((benefit: any, index: number) => ({
    ...benefit,
    icon: index === 0 ? <TrendingUp className="w-8 h-8 text-green-600" /> :
          index === 1 ? <Droplets className="w-8 h-8 text-blue-600" /> :
          index === 2 ? <Users className="w-8 h-8 text-purple-600" /> :
          <Target className="w-8 h-8 text-orange-600" />,
  }));

  const processSteps = tObj("agro.process.steps") || [];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t("agro.hero.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("agro.hero.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("agro.services.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("agro.services.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {agroServices.map((service: any, index: number) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.features && service.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6" variant="outline">
                    {t("common.readMore")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("agro.technologies.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("agro.technologies.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech: any, index: number) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("agro.benefits.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("agro.benefits.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit: any, index: number) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {benefit.stat}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">{t("common.process") || "Jarayon"}</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {t("agro.process.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step: string, index: number) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{step}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              <Shield className="w-4 h-4 mr-2" />
              {t("agro.process.start")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
