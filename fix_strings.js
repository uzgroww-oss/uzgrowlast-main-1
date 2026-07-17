const fs = require('fs');

const fixFile = (path, replacements) => {
  let content = fs.readFileSync(path, 'utf8');
  let hasUseLanguage = content.includes('useLanguage');
  let isClient = content.includes('"use client"');
  
  if (!isClient) {
    content = '"use client";\n\n' + content;
  }
  
  if (!hasUseLanguage) {
    // Insert import after use client
    content = content.replace(/"use client";\n\n/, '"use client";\n\nimport { useLanguage } from "@/contexts/LanguageContext";\n');
  }

  // Find the component function and add hook if needed
  if (!content.includes('const { t } = useLanguage()')) {
    content = content.replace(/export (default )?function (\w+)\([^)]*\)\s*\{/, (match) => {
      return match + '\n  const { t } = useLanguage();';
    });
  }

  // Remove metadata to avoid Next.js build crash for client components
  content = content.replace(/export const metadata = \{[\s\S]*?\};\n/g, '');

  for (const [search, replace] of Object.entries(replacements)) {
    content = content.split(search).join(replace);
  }

  fs.writeFileSync(path, content);
  console.log('Fixed', path);
};

// 1. agro-injiniring
fixFile('app/agro-injiniring/page.tsx', {
  '>Ish jarayoni<': '>{t("process.title")}<'
});

// 2. investorlar
fixFile('app/investorlar/page.tsx', {
  '>Kutilgan ROI<': '>{t("investment.roi")}<'
});

// 3. texnologiya
fixFile('app/texnologiya/page.tsx', {
  '>Video joylashtiring<': '>{t("technology.videoPlaceholder")}<'
});

// 4. about-detailed.tsx
// I need to be careful with about-detailed.tsx since the previous replace might have messed it up.
// Let's reset it to be safe
let aboutDetailStr = fs.readFileSync('components/about-detailed.tsx', 'utf8');
aboutDetailStr = aboutDetailStr.replace(/<div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">\s*<p className="font-bold text-gray-900">\{t\("about\.office"\)\}<\/p>\s*<p className="text-sm text-gray-500">Tashkent, Uzbekistan<\/p>\s*<\/div>/g, '');
aboutDetailStr = aboutDetailStr.replace(/>UZ-GROW Office</, '>{t("about.office")}<');
fs.writeFileSync('components/about-detailed.tsx', aboutDetailStr);
console.log('Fixed components/about-detailed.tsx');


// 5. about.tsx
fixFile('components/about.tsx', {
  '>About UZ GROW<': '>{t("about.aboutTitle")}<'
});

// 6. ceo.tsx
fixFile('components/ceo.tsx', {
  '>Rahbariyat<': '>{t("ceo.management")}<',
  '>CEO<': '>{t("ceo.role")}<',
  '>Tajriba<': '>{t("ceo.experience")}<',
  '>Loyihalar<': '>{t("ceo.projects")}<',
  '>Obunachilar<': '>{t("ceo.subscribers")}<',
  ">Ko'nikmalar<": '>{t("ceo.skills")}<',
  ">Ta'lim<": '>{t("ceo.education")}<',
  ">Rahbar bilan bog'lanish<": '>{t("ceo.contactDirector")}<',
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 7. international.tsx
fixFile('components/international.tsx', {
  '>Mamlakatlar<': '>{t("stats.countries")}<',
  '>Loyihalar<': '>{t("stats.projects")}<',
  '>Foydalanuvchilar<': '>{t("stats.users")}<',
  '>Investitsiyalar<': '>{t("stats.investments")}<',
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 8. regional.tsx
fixFile('components/regional.tsx', {
  '>Viloyatlar<': '>{t("stats.regions")}<',
  '>Loyihalar<': '>{t("stats.projects")}<',
  '>Aholi<': '>{t("stats.population")}<',
  ">O'sish<": '>{t("stats.growth")}<',
  '>Korxonalar<': '>{t("stats.enterprises")}<',
  '>Byudjet<': '>{t("stats.budget")}<',
  '>Ixtisoslik:<': '>{t("stats.specialty")}:<',
  'Aholi:': '{t("stats.population")}:',
  'Loyihalar:': '{t("stats.projects")}:',
  'Byudjet:': '{t("stats.budget")}:',
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 9. samarqand-video.tsx
fixFile('components/samarqand-video.tsx', {
  ">Galereyani ko'rish<": '>{t("stats.viewGallery")}<',
  '>Tashrif statistikasi<': '>{t("stats.visitStats")}<',
  '>Korxonalar soni<': '>{t("stats.enterpriseCount")}<',
  ">Ish o'rinlari<": '>{t("stats.jobs")}<',
  '>Investitsiyalar<': '>{t("stats.investments")}<',
  ">Qo'shimcha resurslar<": '>{t("stats.additionalResources")}<',
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 10. asso-design-media.tsx
fixFile('components/asso-design-media.tsx', {
  '>Obunachilar<': '>{t("media.subscribers")}<',
  '>Yosh chegarasi<': '>{t("media.ageGroup")}<',
  '>Jinsi<': '>{t("media.gender")}<',
  '>Ayollar<': '>{t("media.women")}<',
  '>Erkaklar<': '>{t("media.men")}<',
  '>Mintaqalar<': '>{t("media.regions")}<',
  '>Video:<': '>{t("media.video")}<',
  '>Post:<': '>{t("media.post")}<',
  '>Imkoniyatlar:<': '>{t("media.opportunities")}<',
  ">Biz Bilan Bog'lanish<": '>{t("media.contactUs")}<',
  '>Hurmat bilan, UZ GROW jamoasi!<': '>{t("media.respectfully")}<',
  'uzgrrow@gmail.com': '{t("contact.email")}',
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 11. footer.tsx
fixFile('components/footer.tsx', {
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 12. header.tsx
fixFile('components/header.tsx', {
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 13. projects-old.tsx
fixFile('components/projects-old.tsx', {
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 14. projects.tsx
fixFile('components/projects.tsx', {
  '>Portfolio<': '>{t("common.portfolio")}<'
});

// 15. greenhouse-types.tsx
fixFile('components/greenhouse-types.tsx', {
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 16. gallery.tsx
fixFile('components/gallery.tsx', {
  'alt="UZ GROW Logo"': 'alt={t("common.logoAlt")}'
});

// 17. aloqa/page.tsx
fixFile('app/aloqa/page.tsx', {
  'title="UZ GROW Location Map"': 'title={t("common.mapAlt")}'
});

// 18. contact.tsx
fixFile('components/contact.tsx', {
  'title="UZ GROW Location Map"': 'title={t("common.mapAlt")}'
});
