"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Search,
  Building2,
  Globe,
  Sprout,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { mediaIds, useMedia } from "@/contexts/MediaContext";

// Tilga bog'liq bo'lmagan ma'lumot: rasm, holat, yil, investitsiya.
// Rasmlar admin paneldan almashtirilgani uchun ro'yxat funksiya ichida quriladi.
const getStaticProjects = (
  mList: (ids: string[]) => string[],
) => [
  {
    id: 1,
    images: mList(mediaIds("loyihalar.item1", 5)),
    year: "2023",
    status: "completed",
    featured: true,
    category: "presidential",
    investment: "$1.2M",
  },
  {
    id: 2,
    images: mList(mediaIds("loyihalar.item2", 5)),
    year: "2022-2024",
    status: "completed",
    featured: false,
    category: "greenhouse",
    investment: "$2.5M",
  },
  {
    id: 3,
    images: mList(mediaIds("loyihalar.item3", 4)),
    year: "2024",
    status: "completed",
    featured: true,
    category: "presidential",
    investment: "$1.8M",
  },
  {
    id: 4,
    images: mList(mediaIds("loyihalar.item4", 5)),
    year: "2024",
    status: "in-progress",
    featured: false,
    category: "international",
    investment: "$3.2M",
  },
  {
    id: 5,
    images: mList(mediaIds("loyihalar.item5", 2)),
    year: "2024",
    status: "completed",
    featured: false,
    category: "greenhouse",
    investment: "$1.5M",
  },
  {
    id: 6,
    images: mList(mediaIds("loyihalar.item6", 5)),
    year: "2023",
    status: "completed",
    featured: false,
    category: "agriculture",
    investment: "$2.1M",
  },
];

export function Projects() {
  const { t, tList } = useLanguage();
  const { mList } = useMedia();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Merge static (images/status/year) with localized text from context
  // O'chirilgan loyihalar ro'yxatga tushmaydi. `index` — asl tartib raqami,
  // rasmlar shunga qarab bog'langan.
  const staticProjects = getStaticProjects(mList);
  const projects = tList("projects.items").map(({ index, value }) => ({
    ...staticProjects[index],
    ...value,
    // Filtr eng oxirida: yuqoridagi yoyishlar uni bekor qilib yubormasin
    images: (staticProjects[index]?.images ?? []).filter(Boolean),
  }));

  const categories = [
    { id: "all", label: t("projects.categories.all"), icon: Grid3X3 },
    { id: "presidential", label: t("projects.categories.presidential"), icon: Award },
    { id: "international", label: t("projects.categories.international"), icon: Globe },
    { id: "greenhouse", label: t("projects.categories.greenhouse"), icon: Sprout },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
    const matchesSearch =
      (project.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const nextProject = () => {
    if (!selectedProject) return;
    const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    setSelectedProject(filteredProjects[(idx + 1) % filteredProjects.length]);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (!selectedProject) return;
    const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    setSelectedProject(filteredProjects[(idx - 1 + filteredProjects.length) % filteredProjects.length]);
    setCurrentImageIndex(0);
  };

  return (
    <section className="py-10 lg:py-14 bg-linear-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Hero */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1.5 gap-2">
            <Building2 className="w-4 h-4" />
            {t("common.portfolio")}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {t("projects.title").split(" ")[0]}{" "}
            <span className="text-primary">{t("projects.title").split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-12 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={t("projects.categories.all") + "..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">{t("common.category")}:</span>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn("gap-2 transition-all duration-300", activeCategory === cat.id && "shadow-lg shadow-primary/20")}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={cn(
                  "group relative bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer",
                  project.featured && "ring-2 ring-primary/20"
                )}
                onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); }}
              >
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-[#24B14B] text-primary-foreground gap-1">
                      <Award className="w-3 h-3" />
                      {t("projects.featured")}
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={cn("gap-1", project.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white")}>
                    <div className="w-2 h-2 rounded-full bg-white" />
                    {project.status === "completed" ? t("common.completed") : t("common.inProgress")}
                  </Badge>
                </div>
                <div className="aspect-video relative overflow-hidden">
                  {/* Barcha rasm o'chirilgan bo'lsa massiv bo'sh bo'ladi */}
                  {project.images[0] && (
                    <Image
                      src={project.images[0]}
                      alt={project.title || ""}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{project.size}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="gap-1 group-hover:bg-[#24B14B] group-hover:text-primary-foreground transition-colors">
                      {t("projects.viewProject")}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-80 aspect-video relative rounded-xl overflow-hidden">
                    {project.images[0] && (
                      <Image src={project.images[0]} alt={project.title || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline" className="gap-1"><MapPin className="w-3 h-3" />{project.location}</Badge>
                      <Badge variant="outline">{project.size}</Badge>
                      <Badge variant="outline">{project.year}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).map((tech: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">{t("projects.investment")}:</span> {project.investment}
                      </div>
                      <Button size="sm" className="gap-1">
                        {t("projects.viewProject")}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("projects.notFound")}</h3>
            <p className="text-muted-foreground">{t("projects.tryDifferentSearch")}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => { setSelectedProject(null); setCurrentImageIndex(0); }}
        >
          <div
            className="relative bg-background rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => { setSelectedProject(null); setCurrentImageIndex(0); }}
              aria-label={t("projects.close")}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image gallery */}
            <div className="aspect-video relative">
              {selectedProject.images[currentImageIndex] && (
                <Image src={selectedProject.images[currentImageIndex]} alt={selectedProject.title || ""} fill className="object-cover" sizes="100vw" />
              )}
              {selectedProject.images.length > 1 && (
                <>
                  {/* Image counter */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm font-medium">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                  <button
                    onClick={() => setCurrentImageIndex((p) => (p - 1 + selectedProject.images.length) % selectedProject.images.length)}
                    aria-label="Oldingi rasm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((p) => (p + 1) % selectedProject.images.length)}
                    aria-label="Keyingi rasm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        aria-label={`Rasm ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${i === currentImageIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Meta badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="gap-1 bg-primary/10 text-primary">
                  <MapPin className="w-3 h-3" />{selectedProject.location}
                </Badge>
                {selectedProject.size && <Badge variant="outline">{selectedProject.size}</Badge>}
                <Badge variant="outline" className="gap-1">
                  <Calendar className="w-3 h-3" />{selectedProject.year}
                </Badge>
                {selectedProject.featured && (
                  <Badge className="bg-[#24B14B] text-primary-foreground gap-1">
                    <Award className="w-3 h-3" />{t("projects.featured")}
                  </Badge>
                )}
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{selectedProject.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{selectedProject.description}</p>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {(selectedProject.technologies || []).length > 0 && (
                  <div className="bg-muted/40 rounded-xl border border-border p-4">
                    <h4 className="font-semibold text-foreground mb-3">{t("projects.technologies")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.technologies || []).map((tech: string, i: number) => (
                        <Badge key={i} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-muted/40 rounded-xl border border-border p-4">
                  <h4 className="font-semibold text-foreground mb-3">{t("projects.projectDetails")}</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">{t("projects.client")}:</dt>
                      <dd className="font-medium text-right">{selectedProject.client}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">{t("projects.investment")}:</dt>
                      <dd className="font-medium text-right">{selectedProject.investment}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">{t("projects.status")}:</dt>
                      <dd className="font-medium text-right">
                        {selectedProject.status === "completed" ? t("common.completed") : t("common.inProgress")}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Footer: project nav + CTA */}
              <div className="flex items-center justify-between gap-3 pt-5 border-t border-border">
                <Button variant="outline" onClick={prevProject} aria-label={t("common.previous")} className="gap-1.5">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{t("common.previous")}</span>
                </Button>
                <Button asChild size="lg">
                  <a href="#aloqa" onClick={() => { setSelectedProject(null); setCurrentImageIndex(0); }}>
                    {t("common.contact")}
                  </a>
                </Button>
                <Button variant="outline" onClick={nextProject} aria-label={t("common.next")} className="gap-1.5">
                  <span className="hidden sm:inline">{t("common.next")}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
