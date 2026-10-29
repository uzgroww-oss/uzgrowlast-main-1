/**
 * Ekinlar sahifalari (/ekinlar/<kod>) — tartib, rasm va qidiruv tizimi uchun matn.
 *
 * Sahifadagi asosiy matnlar tarjima faylida ("cropsPage.items", 3 tilda,
 * admin'dan tahrirlanadi). Bu yerdagi ro'yxat esa serverda ham o'qiladi:
 * sahifa manzillari, metadata va sitemap shundan quriladi. i-chi element
 * tarjimadagi i-chi ekinga mos keladi.
 */
export interface CropMeta {
  code: string;
  /** Standart rasm; admin "ekinlar.<kod>" orqali almashtiradi */
  image: string;
  title: string;
  description: string;
}

export const CROPS: CropMeta[] = [
  {
    code: "pomidor",
    image: "/images/site/ekin-tomat.jpg",
    title: "Issiqxonada pomidor yetishtirish | UZ GROW",
    description:
      "Pomidor uchun qanday issiqxona kerak: harorat, namlik, yorug'lik, substrat yoki tuproq, changlatish va ko'p beriladigan savollar.",
  },
  {
    code: "bodring",
    image: "/images/site/ekin-bodring.jpg",
    title: "Issiqxonada bodring yetishtirish | UZ GROW",
    description:
      "Bodring uchun issiqxona: qulay harorat va namlik, yiliga necha hosil, partenokarpik navlar va ko'p beriladigan savollar.",
  },
  {
    code: "qulupnay",
    image: "/images/site/ekin-qulupnay.jpg",
    title: "Issiqxonada qulupnay yetishtirish | UZ GROW",
    description:
      "Qulupnay uchun stellajli va vertikal issiqxona: tungi harorat, changlatish, qishki hosil va ko'p beriladigan savollar.",
  },
  {
    code: "kokatlar",
    image: "/images/site/ekin-sabzavot.jpg",
    title: "Gidroponikada ko'kat va salat yetishtirish | UZ GROW",
    description:
      "Ko'katlar va salat uchun gidroponik issiqxona: NFT va DWC tizimlari, yiliga 8–10 hosil, suv tejash va savollar.",
  },
  {
    code: "kochat",
    image: "/images/site/gallery-25.jpg",
    title: "Issiqxonada ko'chat yetishtirish | UZ GROW",
    description:
      "Ko'chatxona-issiqxona: kassetalar, stellajlar, tumanlatish, payvand ko'chat va ko'p beriladigan savollar.",
  },
];

export const cropByCode = (code: string) => CROPS.find((c) => c.code === code);
