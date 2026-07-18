"use client";

import { MediaImg } from "@/components/ui/media-img";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";

export function AboutDetailed() {
  const { t } = useLanguage();
  const { m } = useMedia();

  return (
    <section id="haqimizda" className="py-10 lg:py-14 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
          {/* Image Section */}
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-gray-200 shadow-sm">
            <MediaImg
              src={m("haqimizda.image")}
              alt="UZ-GROW Office"
              className="w-full h-full object-cover"
            />
            
          </div>

          {/* Right Content Section */}
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <h4 className="text-gray-400 text-3xl font-light tracking-tight uppercase opacity-50">
                {t("about.tagline")}
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-[#009944] leading-tight">
                {t("about.headline")}
              </h2>
              <div className="w-full h-[2px] bg-[#009944] mt-2 mb-6" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#009944] mb-2">
                  {t("about.businessScopeTitle")}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {t("about.businessScopeDesc")}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#009944] mb-2">
                  {t("about.professionalTeamTitle")}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {t("about.professionalTeamDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text Content */}
        <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed max-w-none">
          <p>{t("about.descriptionTop")}</p>
          <p>{t("about.descriptionBottom")}</p>
        </div>
      </div>
    </section>
  );
}
