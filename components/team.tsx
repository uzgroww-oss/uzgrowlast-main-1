"use client";

import { useState } from "react";
import { SmartImage as Image } from "@/components/ui/smart-image";
import { MediaImg } from "@/components/ui/media-img";
import {
  Briefcase,
  Building2,
  ChartNoAxesColumnIncreasing,
  Coins,
  Globe,
  HardHat,
  Megaphone,
  Package,
  PencilRuler,
  ShoppingCart,
  Sprout,
  User,
  UserRound,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMedia } from "@/contexts/MediaContext";
import { TeamMemberModal } from "@/components/team-member-modal";

// Bo'lim ikonkasi a'zo kaliti bo'yicha; yangi qo'shilganlarga Briefcase
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  ilyos: Globe,
  alisher: Megaphone,
  dilnoza: Coins,
  vasila: ShoppingCart,
  sardor: Package,
  abdulloh: ChartNoAxesColumnIncreasing,
  abdurashid: PencilRuler,
  elmurod: HardHat,
};

const FADE =
  "linear-gradient(to right, transparent, #000 16%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 12%)";

function Avatar({ member, sizes }: { member: any; sizes: string }) {
  return member.avatar ? (
    <Image src={member.avatar} alt={member.name} fill className="object-cover object-top" sizes={sizes} />
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <User className="w-12 h-12 text-primary/60" />
    </div>
  );
}

export function Team() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const { t, tList } = useLanguage();
  const { m } = useMedia();

  // A'zolar admin paneldagi "Jamoa" sahifasidan boshqariladi: o'chirilganlari
  // chiqmaydi, yangi qo'shilganlari (new1, new2...) ham shu ro'yxatga tushadi.
  // Surati har doim "jamoa.avatar.<kalit>" da. Ro'yxatdagi birinchisi — asoschi.
  const [founder, ...members] = tList("team.members").map(({ key, value }) => ({
    ...value,
    avatar: m(`jamoa.avatar.${key}`) || null,
    id: key,
  }));

  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-[#eef7ef] via-white to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Sarlavha */}
        <div className="text-center mb-8 lg:mb-10">
          <p className="flex items-center justify-center gap-2.5 sm:gap-4 text-brand-green font-bold uppercase tracking-wide text-xs sm:text-lg whitespace-nowrap">
            <span className="h-0.5 w-8 sm:w-20 bg-brand-green" />
            {t("team.title")}
            <span className="h-0.5 w-8 sm:w-20 bg-brand-green" />
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mt-2">
            {t("team.subtitle")}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground mt-3">
            {t("team.description")}
          </p>
        </div>

      </div>

      {/* Asoschi — butun kenglikdagi band, chetlarida issiqxonalar */}
      {founder && (
        <div
          className="relative mb-6 lg:mb-8 bg-[#f4faf5] bg-cover bg-center"
          style={{ backgroundImage: `url(${m("jamoa.founderBg")})` }}
        >
          <button
            type="button"
            onClick={() => setSelectedMember(founder)}
            className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center md:items-end justify-center pt-6 md:pt-4 pb-6 md:pb-0 text-left cursor-pointer"
          >
            <MediaImg
              src={m("jamoa.founder")}
              alt={founder.name}
              className="relative z-10 w-64 sm:w-72 lg:w-[330px] h-auto shrink-0"
              style={{
                // Surat foniga chetlari sezilmay qo'shilib ketadi
                maskImage: FADE,
                WebkitMaskImage: FADE,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
            <div className="md:-ml-8 md:mb-6 md:self-center bg-white/85 backdrop-blur-sm rounded-[28px] shadow-[0_10px_40px_rgba(13,31,14,0.12)] px-6 py-5 md:pl-14 md:pr-10 md:py-7 max-w-lg w-full">
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-foreground">
                {founder.name}
              </h2>
              <span className="mt-3 inline-flex items-center gap-3 rounded-full bg-[#17702f] text-white pl-5 pr-8 py-2 text-base sm:text-xl">
                <UserRound className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                {founder.position}
              </span>
              {founder.role && (
                <p className="mt-3.5 flex items-center gap-3 text-foreground/85 sm:text-lg">
                  <Building2 className="w-5 h-5 shrink-0 text-muted-foreground" />
                  {founder.role}
                </p>
              )}
              {founder.experience && (
                <p className="mt-2 flex items-center gap-3 text-foreground/85 sm:text-lg">
                  <Sprout className="w-5 h-5 shrink-0 text-brand-green" />
                  {founder.experience} {t("team.founderExperience")}
                </p>
              )}
            </div>
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-8">
        {/* Bo'lim boshliqlari */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12">
          {members.map((member: any) => {
            const Icon = ICONS[member.id] ?? Briefcase;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMember(member)}
                className="group bg-white border border-border rounded-[20px] shadow-sm p-3 sm:p-5 text-center min-w-0 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-green"
              >
                <div className="relative mb-3 w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-primary/10 border-4 border-white ring-2 ring-brand-green/30 shadow-[0_0_0_6px_rgba(36,177,75,0.08)]">
                  <Avatar member={member} sizes="160px" />
                </div>
                <h3 className="font-heading text-[15px] sm:text-xl font-bold text-foreground break-words">
                  {member.name}
                </h3>
                <span className="mt-2 w-full max-w-[15rem] flex items-center gap-2 sm:gap-3 rounded-full bg-[#1d7a35] text-white px-3 sm:px-5 py-1.5 text-left">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 shrink-0" />
                  <span className="text-[11px] sm:text-sm leading-tight font-medium">
                    {member.position}
                  </span>
                </span>
                {member.experience && (
                  <p className="mt-2.5 inline-flex items-center gap-1.5 text-xs sm:text-base text-foreground/80">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {member.experience} {t("team.experienceSuffix")}
                  </p>
                )}
              </button>
            );
          })}
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
