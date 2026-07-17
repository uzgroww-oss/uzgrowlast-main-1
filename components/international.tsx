"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { mediaIds, useMedia } from "@/contexts/MediaContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Plane, Users, Handshake } from "lucide-react";

const getProjectImages = (mList: (ids: string[]) => string[]) =>
  mList(mediaIds("xalqaro.project", 4));

const projectIcons = [
  <Globe key="globe" className="h-5 w-5" />,
  <Plane key="plane" className="h-5 w-5" />,
  <Users key="users" className="h-5 w-5" />,
  <Handshake key="handshake" className="h-5 w-5" />,
];

const projectBudgets = ["$2.5M", "$1.8M", "$1.2M", "$3.0M"];

export function International() {
  const { t, tObj } = useLanguage();
  const { m, mList } = useMedia();
  const projectImages = getProjectImages(mList);
  const internationalProjects = tObj("internationalPage.projects") || [];

  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img
              src={m("umumiy.logo")}
              alt={t("common.logoAlt")}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("internationalPage.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("internationalPage.description")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">15+</h3>
            <p className="text-gray-600">{t("about.countries")}</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Handshake className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">50+</h3>
            <p className="text-gray-600">{t("about.projects")}</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
            <p className="text-gray-600">{t("about.clients")}</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Plane className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">$25M+</h3>
            <p className="text-gray-600">{t("hero.stats.projects")}</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {internationalProjects.map((project: any, index: number) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={projectImages[index]}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    className="bg-blue-600 text-white border-none"
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-600">{projectIcons[index]}</div>
                    <span className="text-sm font-medium text-gray-500">
                      {project.country}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2 text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                   <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-400 uppercase">{t("common.year")}</span>
                    <span className="font-medium">{project.timeline}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-semibold text-gray-400 uppercase">Budget</span>
                    <span className="font-medium text-blue-600">{projectBudgets[index]}</span>
                  </div>
                </div>
                <div className="mt-6">
                   <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                    {t("common.readMore")} в†’
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
