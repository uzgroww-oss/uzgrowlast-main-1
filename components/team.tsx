"use client";

import { useState } from "react";
import { SmartImage as Image } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Lightbulb,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  Download,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";
import { TeamMemberModal } from "@/components/team-member-modal";

export function Team() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const { t, tList } = useLanguage();
  const { m } = useMedia();

  // A'zolar admin paneldagi "Jamoa" sahifasidan boshqariladi: o'chirilganlari
  // chiqmaydi, yangi qo'shilganlari (new1, new2...) ham shu ro'yxatga tushadi.
  // Surati har doim "jamoa.avatar.<kalit>" da.
  const teamMembers = tList("team.members").map(({ key, value }) => ({
    ...value,
    avatar: m(`jamoa.avatar.${key}`) || null,
    id: key,
  }));

  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-[#24B14B]/10 text-primary px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            {t("team.title")}
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("team.subtitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("team.description")}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 mb-16">
          {teamMembers.map((member: any) => (
            <button
              key={member.id}
              type="button"
              onClick={() => setSelectedMember(member)}
              className="group bg-white border border-border p-3 sm:p-6 text-center min-w-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-green"
            >
              {/* Surat */}
              <div className="relative mx-auto mb-3 sm:mb-4 w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-primary/10 ring-4 ring-primary/10 group-hover:ring-brand-green/40 transition-all">
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="144px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-primary/60" />
                  </div>
                )}
              </div>

              <h3 className="text-[15px] sm:text-lg font-bold text-foreground break-words">{member.name}</h3>
              <p className="text-brand-green font-medium text-xs sm:text-sm mt-1">{member.position}</p>
              {member.experience && (
                <p className="mt-2.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  {member.experience}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Tanlangan a'zo oynasi */}
        {selectedMember && (
          <TeamMemberModal
            member={selectedMember}
            coverSrc={m("rahbariyat.cover")}
            brand={t("footer.brandName")}
            t={t}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </div>
    </section>
  );
}
