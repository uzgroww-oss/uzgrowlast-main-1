"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Award,
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
  const [apiMembers, setApiMembers] = useState<any[]>([]);
  const { t, tObj, tList } = useLanguage();
  const { m } = useMedia();

  // Admin panel orqali qo'shilgan a'zolar; bo'sh bo'lsa tarjimadagi jamoa ko'rsatiladi
  useEffect(() => {
    fetch("/api/team")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.members?.length) {
          setApiMembers(
            data.members.map((m: any) => ({
              ...m,
              avatar: m.avatar || null,
              achievements: [],
              education: [],
              location: "Toshkent, O'zbekiston",
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  const getTeamMembers = () => {
    // O'chirilgan a'zolar ro'yxatga tushmaydi
    const members = tList("team.members");
    if (members.length === 0) return [];

    // Suratlar admin paneldan almashtiriladi (lib/media-registry.ts)
    const avatarKeys = [
      "rustamjon",
      "alisher",
      "abdulloh",
      "bobgulbaxor",
      "nafosat",
      "dilnoza",
      "sardor",
    ];
    const avatars: Record<string, string> = Object.fromEntries(
      avatarKeys.map((key) => [key, m(`rahbariyat.avatar.${key}`)]),
    );

    return members.map(({ key, value }) => ({
      ...value,
      avatar: avatars[key] || null,
      id: key,
    }));
  };

  const teamMembers =
    apiMembers.length > 0 ? apiMembers : getTeamMembers();

  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-[#24B14B]/10 text-primary px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            {t("team.title")}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("team.subtitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("team.description")}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member: any, index: number) => (
            <Card
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
              onClick={() => setSelectedMember(member)}
            >
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-1 relative overflow-hidden">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#24B14B]/10 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary/60" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {member.position}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {member.bio}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{member.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {member.achievements?.length || 0}{" "}
                      {t("team.achievementsLabel")}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.skills
                    ?.slice(0, 3)
                    .map((skill: string, skillIndex: number) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
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
