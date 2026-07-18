"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Award,
  Briefcase,
  ChevronDown,
  Download,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaImg } from "@/components/ui/media-img";

/**
 * "200,000+ obunachi" kabi yutuqni raqam va izohga ajratadi.
 * Raqam bilan boshlanmasa null qaytadi — bunday yutuq statistika kartasi
 * bo'lib chiqmaydi, faqat ro'yxatda qoladi.
 */
function parseStat(text: string): { value: string; label: string } | null {
  const match = text.match(/^([\d\s.,]+\+?)\s+(.+)$/);
  if (!match) return null;
  const label = match[2].trim();
  return {
    value: match[1].trim(),
    label: label.charAt(0).toUpperCase() + label.slice(1),
  };
}

/** Oynadagi bitta yopiladigan bo'lim */
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  // Yopiq holda ochiladi — oyna ixcham bo'lsin, kerakli bo'limni admin ochadi
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/40 transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="flex-1 font-semibold text-foreground text-sm">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="px-4 pb-4 sm:pl-16">{children}</div>}
    </div>
  );
}

export function TeamMemberModal({
  member,
  coverSrc,
  brand,
  t,
  onClose,
}: {
  member: any;
  coverSrc: string;
  brand: string;
  t: (key: string) => string;
  onClose: () => void;
}) {
  // Klaviatura bilan ishlaydiganlar uchun Esc, va orqa fon aylanmasin
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const achievements: string[] = member.achievements ?? [];
  const education: string[] = member.education ?? [];
  const skills: string[] = member.skills ?? [];
  const tel = String(member.phone ?? "").replace(/\s/g, "");

  // Statistika kartalari mavjud ma'lumotdan yig'iladi — alohida maydon kerak emas
  const stats = [
    ...achievements.map(parseStat).filter(Boolean).slice(0, 2),
    member.experience
      ? { value: member.experience, label: t("team.experience") }
      : null,
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={member.name}
        className="bg-background rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Muqova */}
        <div className="relative h-32 sm:h-40 bg-muted">
          <MediaImg
            src={coverSrc}
            alt=""
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center shadow-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sarlavha: faqat AVATAR muqova ustiga chiqadi, ism esa oq fonda
            qoladi — aks holda matn rasm ustida o'qilmay qoladi */}
        <div className="px-6">
          <div className="flex items-end gap-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 -mt-12 sm:-mt-14 rounded-full ring-4 ring-background bg-muted overflow-hidden shrink-0">
              {member.avatar ? (
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="112px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-10 h-10 text-muted-foreground/50" />
                </div>
              )}
            </div>

            <div className="min-w-0 pb-1">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                {member.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {member.position}
                </span>
                <span className="text-xs text-muted-foreground">· {brand}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Haqida */}
          {member.bio && (
            <div className="rounded-xl bg-primary/5 border-l-4 border-primary p-4">
              <p className="text-sm font-semibold text-foreground mb-1.5">
{t("common.about")}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </div>
          )}

          {/* Raqamlar */}
          {stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border p-3 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bo'limlar */}
          <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
            {education.length > 0 && (
              <Section icon={GraduationCap} title={t("team.education")}>
                <ul className="space-y-1">
                  {education.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {member.experience && (
              <Section icon={Briefcase} title={t("team.experience")}>
                <p className="text-sm text-muted-foreground">
                  {member.experience}
                </p>
              </Section>
            )}

            {achievements.length > 0 && (
              <Section icon={Award} title={t("team.achievements")}>
                <ul className="space-y-1.5">
                  {achievements.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {skills.length > 0 && (
              <Section icon={Lightbulb} title={t("team.skills")}>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {(member.email || member.phone || member.location) && (
              <Section icon={Phone} title={t("team.contact")}>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${tel}`}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      {member.phone}
                    </a>
                  )}
                  {member.location && (
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {member.location}
                    </span>
                  )}
                </div>
              </Section>
            )}
          </div>
        </div>

        {/* Pastki harakatlar: eng o'ngdagisi asosiy */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4 flex flex-col sm:flex-row gap-2">
          {member.resume && (
            <Button variant="outline" className="sm:flex-1 gap-2" asChild>
              <a href={member.resume} download>
                <Download className="w-4 h-4" />
                {t("common.downloadResume")}
              </a>
            </Button>
          )}
          {member.email && (
            <Button
              variant="outline"
              className="sm:flex-1 gap-2 border-primary/40 text-primary hover:bg-primary/5"
              asChild
            >
              <a href={`mailto:${member.email}`}>
                <Mail className="w-4 h-4" />
                {t("common.sendEmail")}
              </a>
            </Button>
          )}
          {member.phone && (
            <Button className="sm:flex-1 gap-2" asChild>
              <a href={`tel:${tel}`}>
                <Phone className="w-4 h-4" />
                {t("common.makeCall")}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
