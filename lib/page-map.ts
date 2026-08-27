/**
 * Saytdagi sahifalar va ularda ko'rinadigan matn bloklari.
 *
 * Tarjima kalitlari kodda mavzu bo'yicha guruhlangan (`hero`, `about`, ...),
 * lekin admin ularni SAHIFA bo'yicha ko'rishi kerak: "Bosh sahifa" tanlansa,
 * o'sha sahifadagi hamma narsa chiqsin. Shu moslik jadvali o'sha ishni qiladi.
 *
 * `prefixes` — blokka tegishli kalit yo'llari (aniq kalit yoki "about.values"
 * kabi boshlanish). `exclude` — ichidan chiqarib tashlanadigan qismlar.
 */

export interface ContentBlock {
  title: string;
  prefixes: string[];
  exclude?: string[];
  /** Bir nechta sahifada ko'rinadigan blok — admin buni bilib turishi kerak */
  shared?: boolean;
  hint?: string;
}

export interface PageDef {
  key: string;
  title: string;
  /** Saytdagi manzil. Umumiy/guruhlanmagan bo'limlarda bo'lmaydi. */
  path?: string;
  blocks: ContentBlock[];
}

export const PAGES: PageDef[] = [
  {
    key: "umumiy",
    title: "Umumiy (barcha sahifalarda)",
    blocks: [
      { title: "Yuqori menyu", prefixes: ["nav"] },
      { title: "Pastki qism (footer)", prefixes: ["footer"] },
      {
        title: "Aloqa ma'lumotlari",
        prefixes: [
          "contact.companyPhone",
          "contact.companyPhone2",
          "contact.companyEmail",
          "contact.address",
          "contact.website",
          "contact.socialMedia",
          "contact.socialLinks",
        ],
        shared: true,
        hint: "Menyu, footer va Aloqa sahifasida ko'rinadi",
      },
      {
        title: "Umumiy so'zlar (tugmalar, yorliqlar)",
        prefixes: ["common"],
        hint: "Butun sayt bo'ylab takrorlanadigan qisqa so'zlar",
      },
    ],
  },

  {
    key: "bosh",
    title: "Bosh sahifa",
    path: "/",
    blocks: [
      { title: "Bosh ekran (video va slaydlar)", prefixes: ["hero"] },
      {
        title: "Loyihalar xaritasi",
        prefixes: ["map"],
        hint: "Davlat nomi va izohi tahrirlanadi; kerak bo'lmagani o'chiriladi",
      },
      { title: "Xizmatlar bo'limi", prefixes: ["services"], shared: true },
      {
        title: "Biz haqimizda",
        prefixes: [
          "about.office",
          "about.aboutTitle",
          "about.tagline",
          "about.headline",
          "about.descriptionText",
          "about.aboutUsButton",
        ],
      },
      {
        title: "Raqamlar (tajriba, loyihalar, mijozlar)",
        prefixes: [
          "about.experience",
          "about.projects",
          "about.clients",
          "about.countries",
        ],
        shared: true,
      },
      {
        title: "Missiya va vizyon",
        prefixes: [
          "about.mission",
          "about.missionDesc",
          "about.vision",
          "about.visionDesc",
        ],
        shared: true,
        hint: "Menyudagi ochiluvchi oynada ham ko'rinadi",
      },
      {
        title: "Qadriyatlar",
        prefixes: ["about.valuesTitle", "about.values", "about.valuesAndRules"],
        shared: true,
        hint: "Menyudagi ochiluvchi oynada ham ko'rinadi",
      },
      {
        title: "Loyihalar bo'limi",
        prefixes: ["projects"],
        exclude: ["projects.gallery"],
        shared: true,
      },
      { title: "Texnologiya bo'limi", prefixes: ["technology"], shared: true },
      {
        title: "Aloqa formasi",
        prefixes: ["contact"],
        exclude: [
          "contact.companyPhone",
          "contact.companyPhone2",
          "contact.companyEmail",
          "contact.address",
          "contact.website",
          "contact.socialMedia",
          "contact.socialLinks",
        ],
        shared: true,
      },
    ],
  },

  {
    key: "haqimizda",
    title: "Biz haqimizda",
    path: "/haqimizda",
    blocks: [
      {
        title: "Sarlavha",
        prefixes: ["about.tagline", "about.headline"],
        shared: true,
      },
      {
        title: "Faoliyat doirasi",
        prefixes: ["about.businessScopeTitle", "about.businessScopeDesc"],
      },
      {
        title: "Professional jamoa",
        prefixes: ["about.professionalTeamTitle", "about.professionalTeamDesc"],
      },
      {
        title: "Tavsif matni",
        prefixes: ["about.descriptionTop", "about.descriptionBottom"],
      },
    ],
  },

  {
    key: "xizmatlar",
    title: "Xizmatlar",
    path: "/services",
    blocks: [{ title: "Xizmatlar", prefixes: ["services"], shared: true }],
  },

  {
    key: "loyihalar",
    title: "Loyihalar",
    path: "/loyihalar",
    blocks: [
      {
        title: "Sarlavha va kategoriyalar",
        prefixes: [
          "projects.title",
          "projects.subtitle",
          "projects.description",
          "projects.categories",
        ],
        shared: true,
      },
      {
        title: "Loyihalar ro'yxati",
        prefixes: ["projects.items"],
        shared: true,
      },
      {
        title: "Loyiha oynasi (tafsilotlar)",
        prefixes: ["projects"],
        exclude: [
          "projects.gallery",
          "projects.items",
          "projects.title",
          "projects.subtitle",
          "projects.description",
          "projects.categories",
        ],
        shared: true,
      },
    ],
  },

  {
    key: "gallery",
    title: "Galereya",
    path: "/gallery",
    blocks: [{ title: "Galereya", prefixes: ["projects.gallery"] }],
  },

  {
    key: "rahbariyat",
    title: "Jamoa",
    path: "/rahbariyat",
    blocks: [
      {
        title: "Sarlavha",
        prefixes: [
          "team.title",
          "team.subtitle",
          "team.description",
          "team.ourTeam",
        ],
      },
      {
        title: "Yorliqlar",
        prefixes: [
          "team.experience",
          "team.achievements",
          "team.achievementsLabel",
          "team.education",
          "team.skills",
          "team.contact",
        ],
      },
      {
        title: "Jamoa a'zolari",
        prefixes: ["team.members"],
        hint: "Admin paneldagi «Jamoa» bo'limiga a'zo qo'shilsa, shu ro'yxat o'rniga o'sha ko'rsatiladi",
      },
    ],
  },

  {
    key: "issiqxona-turlari",
    title: "Issiqxona turlari",
    path: "/issiqxona-turlari",
    blocks: [
      {
        title: "Sarlavha",
        prefixes: [
          "greenhouse.title",
          "greenhouse.subtitle",
          "greenhouse.description",
        ],
      },
      {
        title: "Turlari",
        prefixes: ["greenhouse"],
        exclude: [
          "greenhouse.title",
          "greenhouse.subtitle",
          "greenhouse.description",
          "greenhouse.comparison",
          "greenhouse.guide",
        ],
      },
      {
        title: "Taqqoslash va qo'llanma",
        prefixes: ["greenhouse.comparison", "greenhouse.guide"],
      },
    ],
  },

  {
    key: "jixozlar",
    title: "Jihozlar",
    path: "/jixozlar",
    blocks: [{ title: "Jihozlar", prefixes: ["technology"], shared: true }],
  },

  {
    key: "texnologiya",
    title: "Texnologiya sahifasi",
    path: "/texnologiya",
    blocks: [
      { title: "Sarlavha", prefixes: ["techPage.hero"] },
      { title: "Afzalliklar", prefixes: ["techPage.benefits"] },
      { title: "Texnologiyalar", prefixes: ["techPage.technologies"] },
      { title: "Video bo'limi", prefixes: ["techPage.video"] },
    ],
  },

  {
    key: "agro",
    title: "Agro-injiniring",
    path: "/agro-injiniring",
    blocks: [
      { title: "Sarlavha", prefixes: ["agro.hero"] },
      { title: "Xizmatlar", prefixes: ["agro.services"] },
      { title: "Texnologiyalar", prefixes: ["agro.technologies"] },
      { title: "Afzalliklar", prefixes: ["agro.benefits"] },
      { title: "Ish jarayoni", prefixes: ["agro.process"] },
    ],
  },

  {
    key: "investorlar",
    title: "Investorlar",
    path: "/investorlar",
    blocks: [
      { title: "Sarlavha va raqamlar", prefixes: ["investor.hero"] },
      { title: "Afzalliklar", prefixes: ["investor.benefits"] },
      { title: "Hamkorlik modellari", prefixes: ["investor.models"] },
      { title: "Ish jarayoni", prefixes: ["investor.process"] },
      { title: "Chaqiruv bo'limi", prefixes: ["investor.cta"] },
      { title: "Investitsiya", prefixes: ["investment"] },
    ],
  },

  {
    key: "xalqaro",
    title: "Xalqaro hamkorlik",
    path: "/xalqaro-hamkorlik",
    blocks: [
      {
        title: "Sarlavha",
        prefixes: ["internationalPage.title", "internationalPage.description"],
      },
      { title: "Loyihalar", prefixes: ["internationalPage.projects"] },
    ],
  },

  {
    key: "media",
    title: "Media hamkorlik",
    path: "/media-hamkorlik",
    blocks: [
      {
        title: "Sarlavha va professionallik",
        prefixes: [
          "media.title",
          "media.professionalism",
          "media.realSector",
          "media.realSectorDesc",
          "media.trustBrand",
          "media.trustBrandDesc",
          "media.strongAudience",
          "media.strongAudienceDesc",
        ],
      },
      {
        title: "Statistika",
        prefixes: [
          "media.statsTitle",
          "media.totalReach",
          "media.audienceTitle",
          "media.subscribers",
          "media.ageGroup",
          "media.gender",
          "media.women",
          "media.men",
          "media.regions",
        ],
      },
      {
        title: "Geografik qamrov",
        prefixes: ["media.geographicTitle", "media.geographicCoverage"],
      },
      {
        title: "Tariflar",
        prefixes: [
          "media.tariffsTitle",
          "media.partnershipPlans",
          "media.video",
          "media.post",
          "media.opportunities",
        ],
      },
      {
        title: "Xorijiy hamkorlar",
        prefixes: ["media.foreignPartnersTitle", "media.foreignPartners"],
      },
      {
        title: "Pastki chaqiruv",
        prefixes: [
          "media.contactUs",
          "media.respectfully",
          "media.callNow",
          "media.freeConsultation",
          "media.footerDesc",
        ],
      },
    ],
  },

  {
    key: "aloqa",
    title: "Aloqa",
    path: "/aloqa",
    blocks: [
      {
        title: "Aloqa formasi va ma'lumotlar",
        prefixes: ["contact"],
        shared: true,
      },
    ],
  },

  {
    key: "maxfiylik",
    title: "Maxfiylik siyosati",
    path: "/maxfiylik-siyosati",
    blocks: [{ title: "Maxfiylik siyosati", prefixes: ["privacy"] }],
  },

  {
    key: "shartlar",
    title: "Foydalanish shartlari",
    path: "/foydanalish-shartlari",
    blocks: [{ title: "Foydalanish shartlari", prefixes: ["terms"] }],
  },

  {
    key: "boshqa",
    title: "Boshqa (hozircha ishlatilmayapti)",
    blocks: [
      {
        title: "Saytda ko'rinmaydigan matnlar",
        prefixes: ["process", "ceo", "stats"],
        hint: "Bu matnlarni ishlatadigan bo'limlar hozir saytga ulanmagan",
      },
    ],
  },
];

/** Kalit yo'li blokka tegishlimi? */
export function blockMatches(block: ContentBlock, path: string): boolean {
  const hit = (p: string) => path === p || path.startsWith(p + ".");
  if (block.exclude?.some(hit)) return false;
  return block.prefixes.some(hit);
}
