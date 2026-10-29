import { MEDIA } from "@/lib/media-registry";
import { NEW_KEY } from "@/lib/added-items";
import { GALLERY } from "@/lib/gallery-items";
import { CROPS } from "@/lib/crops";

/**
 * Saytdagi TAKRORLANUVCHI KARTALAR ro'yxati.
 *
 * Karta — bu bir butun element: jamoa a'zosi, loyiha, issiqxona turi va h.k.
 * Uning rasmi va barcha matnlari birga yashaydi, shuning uchun admin panelda
 * ham bitta joyda ko'rsatiladi va bitta tugma bilan butunlay o'chiriladi.
 */
export interface Collection {
  key: string;
  /** lib/page-map.ts dagi sahifa kaliti */
  page: string;
  title: string;
  /** Tarjimadagi ildiz yo'li, masalan "team.members" */
  basePath: string;
  kind: "array" | "object";
  /** Obyekt turi uchun element kalitlari (tartibi muhim) */
  keys?: string[];
  /** Karta nomi sifatida ko'rsatiladigan maydon */
  labelField: string;
  /** Shu kartaga tegishli rasm id lari */
  mediaFor?: (itemKey: string, index: number) => string[];
  /**
   * Admin yangi karta qo'sha oladimi. Qo'shilgan kartaning tuzilishi
   * to'plamdagi birinchi elementdan olinadi (lib/added-items.ts).
   */
  addable?: {
    /** "+ Yangi loyiha qo'shish" tugmasidagi so'z */
    noun: string;
    /** Yangi kartaning rasm joylari (registrda bo'lmasa ham ishlaydi) */
    media?: (itemKey: string, index: number) => string[];
  };
}

const exact = (id: string) => (MEDIA.some((m) => m.id === id) ? [id] : []);
const withPrefix = (prefix: string) =>
  MEDIA.filter((m) => m.id.startsWith(prefix)).map((m) => m.id);

export const COLLECTIONS: Collection[] = [
  {
    key: "homeSteps",
    page: "bosh",
    title: "Qanday ishlaymiz — bosqichlar",
    basePath: "homeBlocks.steps",
    kind: "array",
    labelField: "title",
    addable: { noun: "bosqich" },
  },
  {
    // Yangi ekin qo'shilmaydi: har birining sahifa manzili kodda (lib/crops.ts)
    key: "crops",
    page: "ekinlar",
    title: "Ekinlar",
    basePath: "cropsPage.items",
    kind: "array",
    labelField: "name",
    mediaFor: (_k, i) => (CROPS[i] ? exact(`ekinlar.${CROPS[i].code}`) : []),
  },
  {
    key: "servicesPageItems",
    page: "xizmatlar-sahifa",
    title: "Xizmatlar",
    basePath: "servicesPage.items",
    kind: "array",
    labelField: "title",
    addable: { noun: "xizmat" },
  },
  {
    key: "galleryItems",
    page: "gallery",
    title: "Galereya rasmlari",
    basePath: "galleryPage.items",
    kind: "array",
    labelField: "title",
    mediaFor: (_k, i) => (GALLERY[i] ? exact(`gallery.${GALLERY[i].id}`) : []),
    addable: { noun: "rasm", media: (_k, i) => [`gallery.add${i}`] },
  },
  {
    key: "mapCountries",
    page: "bosh",
    title: "Xaritadagi davlatlar",
    basePath: "map.countries",
    kind: "array",
    labelField: "name",
  },
  {
    key: "team",
    page: "rahbariyat",
    title: "Jamoa a'zolari",
    basePath: "team.members",
    kind: "object",
    keys: [
      "rustamjon",
      "alisher",
      "abdulloh",
      "nafosat",
      "dilnoza",
      "sardor",
    ],
    labelField: "name",
    mediaFor: (key) => exact(`rahbariyat.avatar.${key}`),
    addable: {
      noun: "jamoa a'zosi",
      media: (key) => [`rahbariyat.avatar.${key}`],
    },
  },
  {
    key: "projects",
    page: "loyihalar",
    title: "Loyihalar",
    basePath: "projects.items",
    kind: "array",
    labelField: "title",
    // Loyiha rasmlari 1 dan boshlab raqamlangan
    mediaFor: (_k, i) => withPrefix(`loyihalar.item${i + 1}.`),
    addable: {
      noun: "loyiha",
      // Sayt yangi loyiha uchun 5 ta rasm joyini o'qiydi (components/projects.tsx)
      media: (_k, i) => [0, 1, 2, 3, 4].map((n) => `loyihalar.item${i + 1}.${n}`),
    },
  },
  {
    key: "greenhouse",
    page: "issiqxona-turlari",
    title: "Issiqxona turlari",
    basePath: "greenhouse",
    kind: "object",
    keys: ["vertical", "mini", "oddiy", "gektar"],
    labelField: "title",
    mediaFor: (key) => withPrefix(`issiqxona.${key}.`),
  },
  {
    key: "international",
    page: "xalqaro",
    title: "Xalqaro loyihalar",
    basePath: "internationalPage.projects",
    kind: "array",
    labelField: "title",
    mediaFor: (_k, i) => exact(`xalqaro.project.${i}`),
    addable: { noun: "loyiha", media: (_k, i) => [`xalqaro.project.${i}`] },
  },
  {
    key: "techCards",
    page: "jixozlar",
    title: "Texnologiya kartalari",
    basePath: "technology",
    kind: "object",
    keys: ["heating", "ventilation", "shelving", "irrigation", "automation"],
    labelField: "title",
    mediaFor: (_k, i) => exact(`jixozlar.tech.${i}`),
  },
  {
    key: "heroSlides",
    page: "bosh",
    title: "Bosh ekran slaydlari",
    basePath: "hero.slides",
    kind: "object",
    keys: ["slide1", "slide2", "slide3", "slide4"],
    labelField: "author",
  },
  {
    key: "privacySections",
    page: "maxfiylik",
    title: "Bo'limlar",
    basePath: "privacy.sections",
    kind: "array",
    labelField: "title",
    addable: { noun: "bo'lim" },
  },
  {
    key: "termsSections",
    page: "shartlar",
    title: "Bo'limlar",
    basePath: "terms.sections",
    kind: "array",
    labelField: "title",
    addable: { noun: "bo'lim" },
  },
  {
    key: "mediaGeo",
    page: "media",
    title: "Geografik qamrov",
    basePath: "media.geographicCoverage",
    kind: "array",
    labelField: "country",
    addable: { noun: "davlat" },
  },
  {
    key: "mediaPlans",
    page: "media",
    title: "Hamkorlik tariflari",
    basePath: "media.partnershipPlans",
    kind: "array",
    labelField: "name",
    addable: { noun: "tarif" },
  },
  {
    key: "mediaPartners",
    page: "media",
    title: "Xorijiy hamkorlar",
    basePath: "media.foreignPartners",
    kind: "array",
    labelField: "name",
    addable: { noun: "hamkor" },
  },
  {
    key: "agroServices",
    page: "agro",
    title: "Xizmatlar",
    basePath: "agro.services.items",
    kind: "array",
    labelField: "title",
    addable: { noun: "xizmat" },
  },
  {
    key: "agroTech",
    page: "agro",
    title: "Texnologiyalar",
    basePath: "agro.technologies.items",
    kind: "array",
    labelField: "name",
    addable: { noun: "texnologiya" },
  },
  {
    key: "agroBenefits",
    page: "agro",
    title: "Afzalliklar",
    basePath: "agro.benefits.items",
    kind: "array",
    labelField: "title",
    addable: { noun: "afzallik" },
  },
  {
    key: "investorStats",
    page: "investorlar",
    title: "Raqamlar",
    basePath: "investor.hero.stats",
    kind: "array",
    labelField: "label",
    addable: { noun: "raqam" },
  },
  {
    key: "investorBenefits",
    page: "investorlar",
    title: "Afzalliklar",
    basePath: "investor.benefits.items",
    kind: "array",
    labelField: "title",
    addable: { noun: "afzallik" },
  },
  {
    key: "investorModels",
    page: "investorlar",
    title: "Hamkorlik modellari",
    basePath: "investor.models.items",
    kind: "array",
    labelField: "title",
    addable: { noun: "model" },
  },
  {
    key: "investorProcess",
    page: "investorlar",
    title: "Ish jarayoni",
    basePath: "investor.process.items",
    kind: "array",
    labelField: "title",
    addable: { noun: "bosqich" },
  },
  {
    key: "techBenefits",
    page: "texnologiya",
    title: "Afzalliklar",
    basePath: "techPage.benefits",
    kind: "array",
    labelField: "label",
    addable: { noun: "afzallik" },
  },
  {
    key: "techList",
    page: "texnologiya",
    title: "Texnologiyalar",
    basePath: "techPage.technologies.items",
    kind: "array",
    labelField: "title",
    addable: { noun: "texnologiya" },
  },
];

/** Kalit yo'li biror kartaga tegishlimi? Tegishli bo'lsa o'sha karta yo'li. */
export function cardPathOf(path: string): string | null {
  for (const c of COLLECTIONS) {
    if (!path.startsWith(c.basePath + ".")) continue;
    const rest = path.slice(c.basePath.length + 1);
    const itemKey = rest.split(".")[0];
    if (
      c.kind === "object" &&
      c.keys &&
      !c.keys.includes(itemKey) &&
      !NEW_KEY.test(itemKey)
    )
      continue;
    return `${c.basePath}.${itemKey}`;
  }
  return null;
}
