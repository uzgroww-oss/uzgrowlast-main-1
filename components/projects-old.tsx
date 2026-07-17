"use client";

import { useState } from "react";
import { MapPin, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const projects = [
  // Vodiy loyihalari - bitta cardda birlashtirilgan
  {
    id: 1,
    title: "Vodiy loyihalari",
    location: "Vodiy",
    size: "7 ta issiqxona",
    category: "Prezident tashrifi",
    description:
      "Vodiy hududida qurilgan 7 ta zamonaviy issiqxona majmuasi. Turli o'lchamlarda va texnologiyalar bilan jihozlangan.",
    images: [
      "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775469212/37_2_ggepkx.jpg",
      "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775469212/32_2_n7x8lw.jpg",
      "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775469212/38_shg9uf.jpg",
      "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775468978/31_phdvd6.jpg",
      "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775468976/21_2_t9kklr.jpg",
      "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775468970/21_bv62xg.jpg",
    ],
    year: "2022-2024",
  },

  // Samarqand loyihalari - bitta cardda birlashtirilgan
  {
    id: 2,
    title: "Samarqand loyihalari",
    location: "Samarqand",
    size: "2 ta issiqxona",
    category: "Prezident tashrifi",
    description:
      "Samarqand viloyatida qurilgan 2 ta yirik issiqxona. Prezident tashrifi va tadbirkorlar uchrashuvi uchun mo'ljallangan.",
    images: [
      "/images/photo_2026-04-04_10-35-25.jpg",
      "/images/photo_2026-04-04_10-35-29.jpg",
    ],
    year: "2024",
  },

  // Xalqaro loyihalar - bitta cardda birlashtirilgan
  {
    id: 3,
    title: "Xalqaro loyihalar",
    location: "Buxoro, Toshkent, Olmaota",
    size: "3 ta loyiha",
    category: "Xalqaro loyihalar",
    description:
      "Buxoro xalqaro turizm markazi, Toshkent raqamli ta'lim platformasi va Olmaota issiqxona loyihalari.",
    images: ["/images/27.jpg", "/images/7.jpg", "/images/4.jpg"],
    year: "2024",
  },

  // Issiqxona turlari
  {
    id: 4,
    title: "Polikarbonat issiqxona majmui",
    location: "Qashqadaryo viloyati",
    size: "3 gektar",
    category: "Issiqxona turlari",
    description:
      "Qashqadaryoda qurilgan issiqxonalari majmui. Zamonaviy texnologiyalar bilan jihozlangan.",
    image: "/images/8.jpg",
    images: ["/images/8.jpg"],
    year: "2024",
  },
];

export function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    t("projects.categories.all"),
    t("projects.categories.president"),
    t("projects.categories.international"),
    t("projects.categories.greenhouse"),
  ];

  const filteredProjects =
    activeCategory === "Barchasi"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const nextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id,
    );
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const prevProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id,
    );
    const prevIndex =
      (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };

  return (
    <section id="loyihalar" className="py-10 lg:py-14 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo.png"
              alt={t("common.logoAlt")}
              className="h-16 w-auto"
            />
          </div>
          <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Bizning loyihalarimiz
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Har bir loyiha individual yondashuv asosida amalga oshiriladi
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-[#24B14B] text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card text-foreground hover:bg-card/80 border border-border",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid - Flashcard Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group perspective-1000"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={cn(
                  "relative h-80 rounded-2xl transition-all duration-500 transform-style-3d cursor-pointer",
                  hoveredProject === project.id ? "scale-[1.02]" : "",
                )}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
              >
                {/* Front Side */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-card border border-border shadow-lg backface-hidden">
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={
                        project.images
                          ? project.images[0]
                          : project.image || "/images/placeholder.jpg"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                      <span className="w-1 h-1 rounded-full bg-white/50" />
                      <span>{project.size}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-[#24B14B]/90 text-primary-foreground text-xs rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Effect */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-[#24B14B]/90 flex items-center justify-center transition-opacity duration-300",
                      hoveredProject === project.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  >
                    <div className="text-center text-white p-6">
                      <h3 className="text-xl font-bold mb-3">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full"
                      >
                        {t("projects.viewProject")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => {
            setSelectedProject(null);
            setCurrentImageIndex(0);
          }}
        >
          <div
            className="relative bg-card rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedProject(null);
                setCurrentImageIndex(0);
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="aspect-video relative">
              <img
                src={
                  selectedProject.images
                    ? selectedProject.images[currentImageIndex]
                    : selectedProject.image || "/images/placeholder.jpg"
                }
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) =>
                          (prev - 1 + selectedProject.images!.length) %
                          selectedProject.images!.length,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) => (prev + 1) % selectedProject.images!.length,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-4 py-1.5 bg-[#24B14B] text-primary-foreground text-sm rounded-full font-medium">
                  {selectedProject.category}
                </span>
                <span className="text-muted-foreground text-sm">
                  {selectedProject.year}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {selectedProject.title}
              </h2>
              <div className="flex items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedProject.location}</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
                <span>{selectedProject.size}</span>
              </div>
              <p className="text-foreground leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
