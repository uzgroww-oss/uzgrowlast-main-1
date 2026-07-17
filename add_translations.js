const fs = require('fs');

const path = 'contexts/LanguageContext.tsx';
let content = fs.readFileSync(path, 'utf8');

const additions = {
  uz: `
    process: {
      title: "Ish jarayoni",
    },
    investment: {
      roi: "Kutilgan ROI",
    },
    media: {
      subscribers: "Obunachilar",
      ageGroup: "Yosh chegarasi",
      gender: "Jinsi",
      women: "Ayollar",
      men: "Erkaklar",
      regions: "Mintaqalar",
      video: "Video:",
      post: "Post:",
      opportunities: "Imkoniyatlar:",
      contactUs: "Biz Bilan Bog'lanish",
      respectfully: "Hurmat bilan, UZ GROW jamoasi!",
    },
    ceo: {
      management: "Rahbariyat",
      role: "CEO",
      experience: "Tajriba",
      projects: "Loyihalar",
      subscribers: "Obunachilar",
      skills: "Ko'nikmalar",
      education: "Ta'lim",
      contactDirector: "Rahbar bilan bog'lanish",
    },
    stats: {
      countries: "Mamlakatlar",
      projects: "Loyihalar",
      users: "Foydalanuvchilar",
      investments: "Investitsiyalar",
      regions: "Viloyatlar",
      population: "Aholi",
      growth: "O'sish",
      enterprises: "Korxonalar",
      budget: "Byudjet",
      specialty: "Ixtisoslik",
      viewGallery: "Galereyani ko'rish",
      visitStats: "Tashrif statistikasi",
      enterpriseCount: "Korxonalar soni",
      jobs: "Ish o'rinlari",
      additionalResources: "Qo'shimcha resurslar",
    },
`,
  ru: `
    process: {
      title: "Рабочий процесс",
    },
    investment: {
      roi: "Ожидаемый ROI",
    },
    media: {
      subscribers: "Подписчики",
      ageGroup: "Возрастная категория",
      gender: "Пол",
      women: "Женщины",
      men: "Мужчины",
      regions: "Регионы",
      video: "Видео:",
      post: "Пост:",
      opportunities: "Возможности:",
      contactUs: "Связаться с нами",
      respectfully: "С уважением, команда UZ GROW!",
    },
    ceo: {
      management: "Руководство",
      role: "CEO",
      experience: "Опыт",
      projects: "Проекты",
      subscribers: "Подписчики",
      skills: "Навыки",
      education: "Образование",
      contactDirector: "Связаться с руководителем",
    },
    stats: {
      countries: "Страны",
      projects: "Проекты",
      users: "Пользователи",
      investments: "Инвестиции",
      regions: "Регионы",
      population: "Население",
      growth: "Рост",
      enterprises: "Предприятия",
      budget: "Бюджет",
      specialty: "Специализация",
      viewGallery: "Посмотреть галерею",
      visitStats: "Статистика визитов",
      enterpriseCount: "Количество предприятий",
      jobs: "Рабочие места",
      additionalResources: "Дополнительные ресурсы",
    },
`,
  en: `
    process: {
      title: "Working Process",
    },
    investment: {
      roi: "Expected ROI",
    },
    media: {
      subscribers: "Subscribers",
      ageGroup: "Age Group",
      gender: "Gender",
      women: "Women",
      men: "Men",
      regions: "Regions",
      video: "Video:",
      post: "Post:",
      opportunities: "Opportunities:",
      contactUs: "Contact Us",
      respectfully: "Best regards, UZ GROW team!",
    },
    ceo: {
      management: "Management",
      role: "CEO",
      experience: "Experience",
      projects: "Projects",
      subscribers: "Subscribers",
      skills: "Skills",
      education: "Education",
      contactDirector: "Contact Director",
    },
    stats: {
      countries: "Countries",
      projects: "Projects",
      users: "Users",
      investments: "Investments",
      regions: "Regions",
      population: "Population",
      growth: "Growth",
      enterprises: "Enterprises",
      budget: "Budget",
      specialty: "Specialty",
      viewGallery: "View Gallery",
      visitStats: "Visit Statistics",
      enterpriseCount: "Number of Enterprises",
      jobs: "Jobs",
      additionalResources: "Additional Resources",
    },
`
};

// Also we need to add a few common ones to existing categories or a new one.
// We'll just add them to the common block for each language
const addToCommon = {
  uz: `
      logoAlt: "UZ GROW Logo",
      portfolio: "Portfolio",
      mapAlt: "UZ GROW xarita",
`,
  ru: `
      logoAlt: "Логотип UZ GROW",
      portfolio: "Портфолио",
      mapAlt: "Карта UZ GROW",
`,
  en: `
      logoAlt: "UZ GROW Logo",
      portfolio: "Portfolio",
      mapAlt: "UZ GROW Location Map",
`
};

const addToAbout = {
  uz: `
      office: "UZ-GROW Office",
      aboutTitle: "About UZ GROW",
`,
  ru: `
      office: "Офис UZ-GROW",
      aboutTitle: "О UZ GROW",
`,
  en: `
      office: "UZ-GROW Office",
      aboutTitle: "About UZ GROW",
`
};

const addToTechnology = {
  uz: `
      videoPlaceholder: "Video joylashtiring",
`,
  ru: `
      videoPlaceholder: "Разместить видео",
`,
  en: `
      videoPlaceholder: "Place video",
`
};


// Inject to 'common'
content = content.replace(/(uz: \{[\s\S]*?common: \{)/, '$1' + addToCommon.uz);
content = content.replace(/(ru: \{[\s\S]*?common: \{)/, '$1' + addToCommon.ru);
content = content.replace(/(en: \{[\s\S]*?common: \{)/, '$1' + addToCommon.en);

// Inject to 'about'
content = content.replace(/(uz: \{[\s\S]*?about: \{)/, '$1' + addToAbout.uz);
content = content.replace(/(ru: \{[\s\S]*?about: \{)/, '$1' + addToAbout.ru);
content = content.replace(/(en: \{[\s\S]*?about: \{)/, '$1' + addToAbout.en);

// Inject to 'technology'
content = content.replace(/(uz: \{[\s\S]*?technology: \{)/, '$1' + addToTechnology.uz);
content = content.replace(/(ru: \{[\s\S]*?technology: \{)/, '$1' + addToTechnology.ru);
content = content.replace(/(en: \{[\s\S]*?technology: \{)/, '$1' + addToTechnology.en);


// Inject additions to end of objects
content = content.replace(/(uz: \{[\s\S]*?footer: \{[\s\S]*?\},?\s*)(\},?\s*\/\/\s*─)/, '$1' + additions.uz + '$2');
content = content.replace(/(ru: \{[\s\S]*?footer: \{[\s\S]*?\},?\s*)(\},?\s*\/\/\s*─)/, '$1' + additions.ru + '$2');
content = content.replace(/(en: \{[\s\S]*?footer: \{[\s\S]*?\},?\s*)(\}\s*\};)/, '$1' + additions.en + '$2');

fs.writeFileSync(path, content);
console.log('LanguageContext updated successfully.');
