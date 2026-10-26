"use client";

import { MediaImg } from "@/components/ui/media-img";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";
import { GALLERY } from "@/lib/gallery-items";


type TList = (path: string) => { index: number; value: any }[];

/** Rasmlar: matni tarjimadan, rasm va kategoriyasi lib/gallery-items.ts dan */
const getAllImages = (m: (id: string) => string, tList: TList) =>
  tList("galleryPage.items")
    .map(({ index, value }) => {
      const meta = GALLERY[index];
      return {
        id: meta?.id ?? 1000 + index,
        src: meta ? m(`gallery.${meta.id}`) : m(`gallery.add${index}`),
        title: (value?.title as string) ?? "",
        category: meta?.category ?? "Loyihalar",
        description: (value?.description as string) ?? "",
      };
    })
    // Rasmi o'chirilgan yoki hali yuklanmagan element ko'rsatilmaydi
    .filter((img) => img.src);

const categories = ["Barchasi", "Loyihalar", "Samarqand"];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const { t, tList } = useLanguage();
  const { m } = useMedia();
  const allImages = getAllImages(m, tList);
  const categoryLabel = (c: string) =>
    c === "Barchasi"
      ? t("common.all")
      : c === "Loyihalar"
        ? t("projects.gallery.projects")
        : t("projects.gallery.samarqand");
  const [selectedImage, setSelectedImage] = useState<
    ReturnType<typeof getAllImages>[0] | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages =
    selectedCategory === "Barchasi"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  const openImage = (image: ReturnType<typeof getAllImages>[0]) => {
    setSelectedImage(image);
    setCurrentIndex(filteredImages.findIndex((img) => img.id === image.id));
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <section className="py-10 lg:py-14 bg-background">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("projects.gallery.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("projects.gallery.description")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200",
              )}
            >
              {categoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              className="group cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => openImage(image)}
            >
              <div className="relative aspect-square overflow-hidden">
                <MediaImg
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {image.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabel(image.category)}
                    </Badge>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {allImages.length}
            </h3>
            <p className="text-gray-600">{t("projects.gallery.totalImages")}</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">39</h3>
            <p className="text-gray-600">{t("projects.gallery.projects")}</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Download className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">6</h3>
            <p className="text-gray-600">{t("projects.gallery.samarqand")}</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Share2 className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">15+</h3>
            <p className="text-gray-600">{t("contact.socialMedia")}</p>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Container */}
              <div className="bg-black rounded-2xl overflow-hidden">
                <div className="aspect-video md:aspect-auto md:h-[80vh]">
                  <MediaImg
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Image Info */}
                <div className="p-6 bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {selectedImage.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">
                          {categoryLabel(selectedImage.category)}
                        </Badge>
                        <span className="text-white/80 text-sm">
                          {currentIndex + 1} / {filteredImages.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/20"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Yuklab olish
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/20"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Ulashish
                      </Button>
                    </div>
                  </div>
                  <p className="text-white/80">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
