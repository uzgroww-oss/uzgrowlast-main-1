/**
 * Texnik kalitlarni ("team.members.rustamjon.bio") odam tushunadigan
 * nomga aylantiradi ("Qisqacha ma'lumot").
 *
 * Admin sayt tuzilishini emas, matnning o'zini ko'rishi kerak.
 */

const LABELS: Record<string, string> = {
  // Umumiy
  title: "Sarlavha",
  subtitle: "Ostki sarlavha",
  headline: "Bosh sarlavha",
  tagline: "Shior",
  description: "Tavsif",
  desc: "Tavsif",
  content: "Matn",
  body: "Matn",
  label: "Nomi",
  name: "Nomi",
  text: "Matn",
  note: "Izoh",
  value: "Qiymat",
  cta: "Tugma matni",
  button: "Tugma",

  // Odam
  position: "Lavozim",
  role: "Roli",
  bio: "Qisqacha ma'lumot",
  experience: "Tajriba",
  achievements: "Yutuqlar",
  education: "Ta'lim",
  skills: "Ko'nikmalar",
  author: "Muallif",
  quote: "Iqtibos",

  // Aloqa
  email: "Email",
  phone: "Telefon",
  address: "Manzil",
  location: "Joylashuv",
  website: "Veb-sayt",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  telegram: "Telegram",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
  resume: "Rezyume havolasi",

  // Loyiha / mahsulot
  client: "Buyurtmachi",
  size: "Hajmi",
  status: "Holati",
  timeline: "Muddati",
  year: "Yili",
  country: "Davlat",
  flag: "Bayroq",
  investment: "Investitsiya",
  technologies: "Texnologiyalar",
  features: "Xususiyatlar",
  complexity: "Murakkabligi",
  durability: "Chidamliligi",
  cost: "Narxi",
  maintenance: "Xizmat ko'rsatish",
  serviceLife: "Xizmat muddati",
  material: "Material",
  light: "Yorug'lik",

  // Tarif / reja
  duration: "Muddat",
  videos: "Videolar soni",
  posts: "Postlar soni",
  partnership: "Hamkorlik",
  period: "Davr",
  step: "Bosqich",


  // Menyu va umumiy so'zlar
  home: "Bosh sahifa",
  news: "Yangiliklar",
  team: "Jamoa",
  contact: "Aloqa",
  language: "Til",
  greenhouse: "Issiqxona",
  projects: "Loyihalar",
  portfolio: "Portfolio",
  logoAlt: "Logotip tavsifi",
  mapAlt: "Xarita tavsifi",
  readMore: "Batafsil",
  all: "Hammasi",
  category: "Turkum",
  completed: "Tugallangan",
  inProgress: "Jarayonda",
  previous: "Oldingi",
  next: "Keyingi",
  call: "Qo'ng'iroq",
  badge: "Yorliq",
  downloadResume: "Rezyume yuklab olish",
  downloadCatalog: "Katalog yuklab olish",
  sendEmail: "Email yuborish",
  makeCall: "Qo'ng'iroq qilish",
  viewGallery: "Galereyani ko'rish",
  lastUpdated: "Oxirgi yangilanish",

  // Kompaniya
  mission: "Missiya",
  vision: "Vizyon",
  values: "Qadriyatlar",
  office: "Ofis",
  clients: "Mijozlar",
  countries: "Davlatlar",
  regions: "Viloyatlar",
  specialists: "Mutaxassislar",
  subscribers: "Obunachilar",
  businessScope: "Faoliyat doirasi",
  professionalTeam: "Professional jamoa",
  aboutUsButton: "«Biz haqimizda» tugmasi",
  descriptionText: "Tavsif matni",
  descriptionTop: "Yuqoridagi tavsif",
  descriptionBottom: "Pastdagi tavsif",

  // Xizmatlar
  engineering: "Injiniring",
  equipment: "Jihozlar",
  consulting: "Konsalting",
  turnkey: "Kalit taslim",

  // Loyiha turkumlari
  presidential: "Prezident loyihalari",
  international: "Xalqaro",
  agriculture: "Qishloq xo'jaligi",

  // Aloqa
  formTitle: "Forma sarlavhasi",
  workingHours: "Ish vaqti",
  socialMedia: "Ijtimoiy tarmoqlar",
  followUs: "Bizni kuzating",
  getDirections: "Yo'nalish olish",
  copyAddress: "Manzilni nusxalash",
  monday: "Dushanba",
  friday: "Juma",
  saturday: "Shanba",
  sunday: "Yakshanba",
  closed: "Yopiq",


  // Loyihalar bo'limi
  viewProject: "Loyihani ko'rish",
  projectDetails: "Loyiha tafsilotlari",
  totalImages: "Jami rasmlar",
  featured: "Tanlangan",
  close: "Yopish",
  notFound: "Topilmadi",
  tryDifferentSearch: "Boshqacha qidirib ko'ring",
  gallery: "Galereya",
  samarqand: "Samarqand",

  // Jamoa
  ourTeam: "Bizning jamoa",
  achievementsLabel: "Yutuqlar yorlig'i",
  contactDirector: "Rahbar bilan bog'lanish",
  management: "Rahbariyat",

  // Issiqxona qo'llanmasi
  comparison: "Taqqoslash",
  guide: "Qo'llanma",
  beginners: "Yangi boshlovchilar",
  professionals: "Professionallar",
  business: "Biznes",
  consult: "Maslahat",

  // Aloqa xabarlari
  successMessage: "Muvaffaqiyat matni",
  successHeader: "Muvaffaqiyat sarlavhasi",
  successSubheader: "Muvaffaqiyat ostki sarlavhasi",
  newMessage: "Yangi xabar tugmasi",
  errorTitle: "Xato sarlavhasi",
  errorMessage: "Xato matni",
  addressCopied: "Manzil nusxalandi",
  locationCity: "Shahar",
  coordinatesLabel: "Koordinatalar",
  phoneLabel: "Telefon yorlig'i",
  emailLabel: "Email yorlig'i",
  companyPhone: "Kompaniya telefoni",
  companyPhone2: "Qo'shimcha telefon",
  companyEmail: "Kompaniya emaili",
  locationUrl: "Xarita havolasi",
  infoTitle: "Ma'lumot sarlavhasi",
  workingHoursDesc: "Ish vaqti tavsifi",

  // Media / hamkorlik
  ageGroup: "Yosh guruhi",
  gender: "Jinsi",
  women: "Ayollar",
  men: "Erkaklar",
  video: "Video",
  post: "Post",
  opportunities: "Imkoniyatlar",
  contactUs: "Biz bilan bog'laning",
  respectfully: "Hurmat bilan",
  professionalism: "Professionallik",
  realSector: "Real sektor",
  trustBrand: "Ishonchli brend",
  strongAudience: "Kuchli auditoriya",
  statsTitle: "Statistika sarlavhasi",
  totalReach: "Umumiy qamrov",
  audienceTitle: "Auditoriya sarlavhasi",
  geographicTitle: "Geografiya sarlavhasi",
  tariffsTitle: "Tariflar sarlavhasi",
  foreignPartnersTitle: "Xorijiy hamkorlar sarlavhasi",
  callNow: "Hoziroq qo'ng'iroq",
  freeConsultation: "Bepul konsultatsiya",
  footerDesc: "Pastki qism matni",
  brandName: "Brend nomi",
  brandTagline: "Brend shiori",
  brandDescription: "Brend tavsifi",
  allRightsReserved: "Huquqlar himoyalangan",
  help: "Yordam",
  company: "Kompaniya",
  services: "Xizmatlar",
  videoPlaceholder: "Video o'rni",
  investments: "Investitsiyalar",
  users: "Foydalanuvchilar",
  population: "Aholi",
  growth: "O'sish",
  enterprises: "Korxonalar",
  enterpriseCount: "Korxonalar soni",
  budget: "Byudjet",
  specialty: "Ixtisoslik",
  jobs: "Ish o'rinlari",
  visitStats: "Tashrif statistikasi",
  additionalResources: "Qo'shimcha resurslar",
  roi: "Kutilgan ROI",

  // Forma
  placeholder: "Ko'rsatma matni",
  send: "Yuborish tugmasi",
  sending: "Yuborilmoqda",
  success: "Muvaffaqiyat xabari",
  message: "Xabar",
  service: "Xizmat",
};

/** Ko'plikdagi maydonlar uchun element nomi: features.0 → "Xususiyat 1" */
const ITEM_LABELS: Record<string, string> = {
  features: "Xususiyat",
  items: "Element",
  skills: "Ko'nikma",
  achievements: "Yutuq",
  education: "Ta'lim",
  sections: "Bo'lim",
  slides: "Slayd",
  stats: "Raqam",
  values: "Qadriyat",
  benefits: "Afzallik",
  technologies: "Texnologiya",
  projects: "Loyiha",
  members: "A'zo",
  links: "Havola",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "camelCase" → "Camel case" — lug'atda yo'q kalitlar uchun zaxira */
function humanize(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  return capitalize(spaced);
}

/**
 * Kalit yo'lidan ko'rinadigan nom yasaydi.
 * `scope` berilsa (karta ichidasiz), karta yo'li olib tashlanadi.
 */
export function fieldLabel(path: string, scope?: string): string {
  let rest = path;
  if (scope && path.startsWith(scope + ".")) {
    rest = path.slice(scope.length + 1);
  }

  const parts = rest.split(".");
  const last = parts[parts.length - 1];

  // Raqam bilan tugasa — ro'yxat elementi: "Xususiyat 2"
  if (/^\d+$/.test(last) && parts.length >= 2) {
    const parent = parts[parts.length - 2];
    const singular = ITEM_LABELS[parent] ?? LABELS[parent] ?? humanize(parent);
    return `${singular} ${Number(last) + 1}`;
  }

  // "namePlaceholder" kabi qo'shma nomlar
  if (last.endsWith("Placeholder")) {
    const base = last.slice(0, -"Placeholder".length);
    const baseLabel = LABELS[base] ?? humanize(base);
    return `${baseLabel} — ko'rsatma matni`;
  }
  if (last.endsWith("FullDesc")) {
    const base = last.slice(0, -"FullDesc".length);
    const baseLabel = LABELS[base] ?? humanize(base);
    return `${baseLabel} — to'liq tavsifi`;
  }
  if (last.endsWith("Desc") || last.endsWith("Description")) {
    const base = last.replace(/(Desc|Description)$/, "");
    const baseLabel = LABELS[base] ?? humanize(base);
    return `${baseLabel} — tavsifi`;
  }
  if (last.endsWith("Title")) {
    const base = last.slice(0, -"Title".length);
    const baseLabel = LABELS[base] ?? humanize(base);
    return `${baseLabel} — sarlavhasi`;
  }

  return LABELS[last] ?? humanize(last);
}
