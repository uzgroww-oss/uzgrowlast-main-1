/**
 * Til va manzil qoidalari.
 *
 * O'zbekcha — asosiy til, prefikssiz: /aloqa
 * Ruscha va inglizcha — prefiks bilan: /ru/aloqa, /en/aloqa
 *
 * Ichkarida barcha sahifalar app/[lang]/ ostida turadi; prefikssiz
 * manzillar next.config.mjs dagi rewrite orqali /uz/... ga yo'naltiriladi.
 */

export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";

export const isLocale = (v: unknown): v is Locale =>
  typeof v === "string" && (LOCALES as readonly string[]).includes(v);

/** "/aloqa" + "ru" -> "/ru/aloqa"; o'zbekcha uchun o'zgarmaydi */
export function localePath(path: string, lang: Locale): string {
  if (lang === DEFAULT_LOCALE) return path || "/";
  if (!path || path === "/") return `/${lang}`;
  // "/?x=1" yoki "/#bo'lim" — bosh sahifa
  if (path[1] === "?" || path[1] === "#") return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** "/ru/aloqa" -> { lang: "ru", path: "/aloqa" } */
export function stripLocale(pathname: string): { lang: Locale; path: string } {
  const m = pathname.match(/^\/(ru|en|uz)(?=\/|$)/);
  if (!m) return { lang: DEFAULT_LOCALE, path: pathname || "/" };
  return { lang: m[1] as Locale, path: pathname.slice(m[0].length) || "/" };
}

/** OpenGraph uchun til kodi */
export const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/**
 * Sahifa sarlavhasi va tavsifining rus va ingliz tarjimalari.
 * O'zbekchasi har bir sahifaning o'z faylida (pageMeta chaqiruvida).
 * Yangi sahifa qo'shilsa, shu yerga ham yozing — aks holda ru/en
 * versiyada o'zbekcha sarlavha chiqadi.
 */
type Meta = { title: string; description: string };
export const PAGE_META_I18N: Record<string, Partial<Record<Locale, Meta>>> = {
  "/": {
    ru: {
      title: "UZ-GROW | Greenhouse Engineering",
      description:
        "UZ-GROW — Greenhouse Engineering: ведущая компания по проектированию и строительству современных теплиц в Узбекистане. Комплексные решения для сельского хозяйства. 9+ лет опыта, 1500+ успешных проектов.",
    },
    en: {
      title: "UZ-GROW | Greenhouse Engineering",
      description:
        "UZ-GROW — Greenhouse Engineering: a leading company designing and building modern greenhouses in Uzbekistan. Turnkey agricultural solutions. 9+ years of experience, 1500+ successful projects.",
    },
  },
  "/agro-injiniring": {
    ru: {
      title: "Агроинжиниринг | UZ-GROW",
      description:
        "Переведите сельское хозяйство в будущее с современными технологиями и автоматизацией. Агроинжиниринг UZ-GROW: проектирование, строительство и запуск.",
    },
    en: {
      title: "Agro-engineering | UZ-GROW",
      description:
        "Take your farm into the future with modern technology and automation. UZ-GROW agro-engineering: design, construction and commissioning.",
    },
  },
  "/aloqa": {
    ru: {
      title: "Контакты | UZ-GROW",
      description:
        "Свяжитесь с UZ-GROW: бесплатная консультация по строительству теплиц, оборудованию и агроконсалтингу. Телефон, WhatsApp, Telegram и электронная почта.",
    },
    en: {
      title: "Contact | UZ-GROW",
      description:
        "Contact UZ-GROW for a free consultation on greenhouse construction, equipment and agro-consulting. Phone, WhatsApp, Telegram and email.",
    },
  },
  "/ekinlar": {
    ru: {
      title: "Тепличные решения по культурам | UZ-GROW",
      description:
        "Какая теплица нужна для томатов, огурцов, клубники, зелени и рассады: оптимальная температура, влажность, способы выращивания и частые вопросы.",
    },
    en: {
      title: "Greenhouse solutions by crop | UZ-GROW",
      description:
        "Which greenhouse suits tomatoes, cucumbers, strawberries, leafy greens and seedlings: ideal temperature, humidity, growing methods and FAQs.",
    },
  },
  "/ekinlar/pomidor": {
    ru: {
      title: "Выращивание томатов в теплице | UZ-GROW",
      description: "Теплицы для томатов: климат, гидропоника, урожайность и сроки окупаемости.",
    },
    en: {
      title: "Growing tomatoes in a greenhouse | UZ-GROW",
      description: "Greenhouses for tomatoes: climate, hydroponics, yield and payback period.",
    },
  },
  "/ekinlar/bodring": {
    ru: {
      title: "Выращивание огурцов в теплице | UZ-GROW",
      description: "Теплицы для огурцов: климат, полив, урожайность и сроки окупаемости.",
    },
    en: {
      title: "Growing cucumbers in a greenhouse | UZ-GROW",
      description: "Greenhouses for cucumbers: climate, irrigation, yield and payback period.",
    },
  },
  "/ekinlar/qulupnay": {
    ru: {
      title: "Выращивание клубники в теплице | UZ-GROW",
      description: "Теплицы для клубники: подвесные системы, климат, урожайность и окупаемость.",
    },
    en: {
      title: "Growing strawberries in a greenhouse | UZ-GROW",
      description: "Greenhouses for strawberries: elevated systems, climate, yield and payback.",
    },
  },
  "/ekinlar/kokatlar": {
    ru: {
      title: "Выращивание зелени и салата на гидропонике | UZ-GROW",
      description: "Гидропонные теплицы для зелени и салата: круглогодичный урожай и быстрый оборот.",
    },
    en: {
      title: "Growing leafy greens and lettuce hydroponically | UZ-GROW",
      description: "Hydroponic greenhouses for greens and lettuce: year-round harvest and fast turnover.",
    },
  },
  "/ekinlar/kochat": {
    ru: {
      title: "Выращивание рассады в теплице | UZ-GROW",
      description: "Теплицы для рассады: климат-контроль, стеллажи, полив и подготовка к продаже.",
    },
    en: {
      title: "Growing seedlings in a greenhouse | UZ-GROW",
      description: "Seedling greenhouses: climate control, benches, irrigation and readiness for sale.",
    },
  },
  "/foydanalish-shartlari": {
    ru: {
      title: "Условия использования | UZ-GROW",
      description: "Условия и правила использования сайта UZ-GROW.",
    },
    en: {
      title: "Terms of Use | UZ-GROW",
      description: "Terms and rules for using the UZ-GROW website.",
    },
  },
  "/gallery": {
    ru: {
      title: "Галерея | UZ-GROW — проекты, мероприятия и визиты Президента",
      description:
        "Галерея компании UZ-GROW: фото и видео наших проектов, мероприятий и визитов Президента.",
    },
    en: {
      title: "Gallery | UZ-GROW — projects, events and Presidential visits",
      description:
        "UZ-GROW gallery: photos and videos of our projects, events and Presidential visits.",
    },
  },
  "/haqimizda": {
    ru: {
      title: "О нас | UZ-GROW",
      description:
        "Подробно о компании UZ-GROW: 9+ лет опыта, 1500+ успешных проектов и профессионализм.",
    },
    en: {
      title: "About us | UZ-GROW",
      description:
        "About UZ-GROW: 9+ years of experience, 1500+ successful projects and professional expertise.",
    },
  },
  "/investorlar": {
    ru: {
      title: "Инвесторам | UZ-GROW",
      description:
        "Инвестиции в агропромышленность. UZ-GROW предлагает партнёрство в высокорентабельных тепличных проектах.",
    },
    en: {
      title: "For investors | UZ-GROW",
      description:
        "Agro-industrial investment opportunity. UZ-GROW offers partnership in high-yield greenhouse projects.",
    },
  },
  "/issiqxona-turlari": {
    ru: {
      title: "Виды теплиц | UZ-GROW — 7 типов и как выбрать",
      description:
        "Виды теплиц UZ-GROW: плёночные, стеклянные, поликарбонатные, тоннельные, промышленные, гидропонные и вертикальные. Цены, особенности и советы по выбору.",
    },
    en: {
      title: "Greenhouse types | UZ-GROW — 7 types and how to choose",
      description:
        "UZ-GROW greenhouse types: film, glass, polycarbonate, tunnel, industrial, hydroponic and vertical. Prices, features and buying advice.",
    },
  },
  "/jixozlar": {
    ru: {
      title: "Оборудование | UZ-GROW — современные технологии",
      description:
        "Технологии UZ-GROW: современное тепличное оборудование, системы автоматизации, климат-контроль и агротехника.",
    },
    en: {
      title: "Equipment | UZ-GROW — modern technology",
      description:
        "UZ-GROW technology: modern greenhouse equipment, automation systems, climate control and agro-machinery.",
    },
  },
  "/loyihalar": {
    ru: {
      title: "Проекты | UZ-GROW — успешные тепличные проекты",
      description:
        "Успешные тепличные проекты компании UZ-GROW: визиты Президента, международное сотрудничество и современные агротехнологии.",
    },
    en: {
      title: "Projects | UZ-GROW — successful greenhouse projects",
      description:
        "UZ-GROW's successful greenhouse projects: Presidential visits, international cooperation and modern agro-technology.",
    },
  },
  "/maxfiylik-siyosati": {
    ru: {
      title: "Политика конфиденциальности | UZ-GROW",
      description:
        "Как сайт UZ-GROW собирает, использует и защищает персональные данные.",
    },
    en: {
      title: "Privacy Policy | UZ-GROW",
      description: "How the UZ-GROW website collects, uses and protects personal data.",
    },
  },
  "/media-hamkorlik": {
    ru: {
      title: "Медиа-партнёрство | UZ-GROW — AssoDesign Media",
      description:
        "Предложение о медиа-партнёрстве UZ-GROW: реклама и маркетинг с AssoDesign Media. Статистика, аудитория, тарифы и контакты.",
    },
    en: {
      title: "Media partnership | UZ-GROW — AssoDesign Media",
      description:
        "UZ-GROW media partnership: advertising and marketing with AssoDesign Media. Statistics, audience, rates and contacts.",
    },
  },
  "/rahbariyat": {
    ru: {
      title: "Руководство компании | UZ-GROW",
      description:
        "Команда UZ-GROW: основатель и руководители 8 отделов — агроинжиниринг, продажи, маркетинг, финансы и управление проектами.",
    },
    en: {
      title: "Company leadership | UZ-GROW",
      description:
        "The UZ-GROW team: the founder and heads of 8 departments — agro-engineering, sales, marketing, finance and project management.",
    },
  },
  "/texnologiya": {
    ru: {
      title: "Современные тепличные технологии | UZ-GROW",
      description:
        "Высокая эффективность с новейшими технологиями: климат-контроль, гидропоника, капельный полив и автоматизация.",
    },
    en: {
      title: "Modern greenhouse technology | UZ-GROW",
      description:
        "High efficiency with the latest technology: climate control, hydroponics, drip irrigation and automation.",
    },
  },
  "/xalqaro-hamkorlik": {
    ru: {
      title: "Международное сотрудничество | UZ-GROW — проекты в Центральной Азии",
      description:
        "Международные проекты UZ-GROW: теплицы и агроинжиниринг в Казахстане, Кыргызстане, Таджикистане и других странах Центральной Азии.",
    },
    en: {
      title: "International cooperation | UZ-GROW — Central Asia projects",
      description:
        "UZ-GROW international projects: greenhouses and agro-engineering in Kazakhstan, Kyrgyzstan, Tajikistan and across Central Asia.",
    },
  },
  "/xizmatlar": {
    ru: {
      title: "Услуги | UZ-GROW",
      description:
        "Услуги UZ-GROW: тепличный инжиниринг, поставка оборудования, системы капельного полива и агроконсалтинг. Проектирование и строительство под ключ.",
    },
    en: {
      title: "Services | UZ-GROW",
      description:
        "UZ-GROW services: greenhouse engineering, equipment supply, drip irrigation systems and agro-consulting. Turnkey design and construction.",
    },
  },
  "/yangiliklar": {
    ru: {
      title: "Новости | UZ-GROW",
      description: "Последние новости, проекты и объявления компании UZ-GROW.",
    },
    en: {
      title: "News | UZ-GROW",
      description: "The latest news, projects and announcements from UZ-GROW.",
    },
  },
};
