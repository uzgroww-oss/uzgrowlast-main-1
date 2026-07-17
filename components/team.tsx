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

export function Team() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [apiMembers, setApiMembers] = useState<any[]>([]);
  const { t, tObj } = useLanguage();
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
    const membersData = tObj("team.members");
    if (!membersData || typeof membersData !== "object" || Array.isArray(membersData)) return [];

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

    return Object.entries(membersData).map(([key, data]: [string, any]) => ({
      ...data,
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

        {/* Selected Member Modal */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative p-6 border-b">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center"
                >
                  ×
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-1 relative overflow-hidden">
                    {selectedMember.avatar ? (
                      <Image
                        src={selectedMember.avatar}
                        alt={selectedMember.name}
                        fill
                        className="object-cover object-top"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#24B14B]/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-primary/60" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {selectedMember.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {selectedMember.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedMember.bio}
                      </p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {t("team.experience")}
                      </h4>
                      <p className="text-muted-foreground">
                        {selectedMember.experience}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        {t("team.achievements")}
                      </h4>
                      <div className="space-y-1">
                        {selectedMember.achievements?.map(
                          (achievement: string, index: number) => (
                            <div
                              key={index}
                              className="text-sm text-muted-foreground"
                            >
                              {achievement}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Education */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        {t("team.education")}
                      </h4>
                      <div className="space-y-1">
                        {selectedMember.education?.map(
                          (edu: string, index: number) => (
                            <div
                              key={index}
                              className="text-sm text-muted-foreground"
                            >
                              {edu}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        {t("team.skills")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills?.map(
                          (skill: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-[#24B14B]/10 text-primary rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {t("team.contact")}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {selectedMember.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {selectedMember.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {selectedMember.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            window.open(`mailto:${selectedMember.email}`)
                          }
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button
                          size="sm"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {t("common.call") || "Qo'ng'iroq"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Download */}
                {selectedMember.resume && (
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full gap-2" asChild>
                      <a href={selectedMember.resume} download>
                        <Download className="h-4 w-4" />
                        {t("common.downloadResume") || "Resume yuklab olish"}
                      </a>
                    </Button>
                  </div>
                )}

                {/* Contact Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <Button className="flex-1" onClick={() => window.open(`mailto:${selectedMember.email}`)}>
                    <Mail className="h-4 w-4 mr-2" />
                    {t("common.sendEmail") || "Email yuborish"}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => window.open(`tel:${selectedMember.phone}`)}>
                    <Phone className="h-4 w-4 mr-2" />
                    {t("common.makeCall") || "Qo'ng'iroq qilish"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
