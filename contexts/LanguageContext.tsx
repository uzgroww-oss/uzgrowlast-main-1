"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

export type Language = "uz" | "ru" | "en";

// Kalit biror tilda topilmasa shu tilga qaytiladi
const FALLBACK_LANG: Language = "uz";

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tObj: (key: string) => any;
  /** Karta admin paneldan o'chirilganmi? */
  isHidden: (path: string) => boolean;
  /**
   * Takrorlanuvchi to'plamni o'chirilgan kartalarsiz qaytaradi.
   * `index` — ASL tartib raqami: rasmlar tartib bo'yicha bog'langan
   * joylarda (loyihalar, xalqaro) u o'zgarmasligi kerak.
   */
  tList: (
    path: string,
    keys?: string[],
  ) => { key: string; index: number; value: any }[];
}

// Admin paneli shu obyektni "standart matn" sifatida ko'rsatadi
export const translations = {
  uz: {
    nav: {
      home: "Bosh sahifa",
      greenhouse: "Issiqxona turlari",
      projects: "Loyihalar",
      news: "Yangiliklar",
      team: "Jamoa",
      contact: "Aloqa",
      language: "Til tanlang",
    },
    common: {
      logoAlt: "UZ GROW Logo",
      about: "Haqida",
      portfolio: "Portfolio",
      mapAlt: "UZ GROW xarita",

      readMore: "Batafsil ma'lumot",
      contact: "Aloqa",
      email: "Email",
      phone: "Telefon",
      address: "Manzil",
      year: "Yil",
      location: "Joylashuv",
      size: "Maydon",
      category: "Kategoriya",
      all: "Barchasi",
      completed: "Tugallangan",
      inProgress: "Jarayonda",
      previous: "Oldingi",
      next: "Keyingi",
      call: "Qo'ng'iroq",
      downloadResume: "Rezyumeni yuklab olish",
      sendEmail: "Email yuborish",
      makeCall: "Qo'ng'iroq qilish",
      features: "Xususiyatlar",
    },
    hero: {
      title: "Zamonaviy Issiqxona Yechimlari",
      subtitle: "O'zbekistonning yetakchi agro-injiniring kompaniyasi",
      description:
        "Biz eng zamonaviy issiqxona texnologiyalarini joriy etamiz va qishloq xo'jaligini rivojlantiramiz",
      cta: "Bog'lanish",
      downloadCatalog: "Katalog yuklab olish",
      tagline: "9+ yil tajriba - 1500+ muvaffaqiyatli loyiha",
      stats: {
        experience: "Yil tajriba",
        projects: "Muvaffaqiyatli loyiha",
        specialists: "Mutaxassislar",
        countries: "Davlatlar",
      },
      slides: {
        slide1: {
          quote:
            "Biz har bir loyihani individual yondashuv bilan amalga oshiramiz va mijozlarimiz mamnuniyatini ta'minlaymiz.",
          author: "UZ GROW jamoasi",
          role: "Agro-injiniring bo'yicha mutaxassislar",
          cta: "Turnkey issiqxonalar",
        },
        slide2: {
          quote:
            "Zamonaviy texnologiyalar va tajribali mutaxassislar jamoasi bilan yuqori hosildorlikka erishishingizni kafolatlaymiz.",
          author: "Texnik bo'lim",
          role: "Loyihalash va qurish",
          cta: "Plastik issiqxonalar",
        },
        slide3: {
          quote:
            "Energiya tejamkor va avtomatlashtirilgan tizimlar orqali xarajatlarni kamaytirib, daromadni oshiring.",
          author: "Innovatsiya markazi",
          role: "Zamonaviy yechimlar",
          cta: "Shisha issiqxonalar",
        },
        slide4: {
          quote:
            "Loyihalashdan tortib to'liq ishga tushirishgacha - biz bilan hamkorlik qiling va natijaga erishing.",
          author: "— Xizmatlar bo'limi",
          role: "Kompleks yechimlar",
          cta: "Jihozlar va tizimlar",
        },
      },
    },
    about: {
      office: "UZ-GROW Office",
      aboutTitle: "About UZ GROW",

      tagline: "Biz haqimizda",
      headline: "9 yildan ortiq tajribaga ega kompanya 5 ta mamlakatda sizning yoningizda",
      descriptionText:
        "UZ GROW - zamonaviy issiqxona qurilishi va agro-injiniring sohasida faoliyat yurituvchi kompaniya. Bizning maqsadimiz - O'zbekistonda yuqori samaradorlikka ega, innovatsion va eksportbop issiqxona infratuzilmasini rivojlantirish.",
      aboutUsButton: "Biz haqimizda batafsil",
      experience: "Tajriba",
      projects: "Loyihalar",
      clients: "Mijozlar",
      countries: "Davlatlar",
      mission: "Missiya",
      missionDesc:
        "Mahalliy va xalqaro standartlarga mos, barqaror va rentabelli issiqxona loyihalarini amalga oshirish orqali mijozlar daromadini oshirish.",
      vision: "Vizyon",
      visionDesc:
        "Markaziy Osiyoda yetakchi agro-injiniring kompaniyaga aylanish va zamonaviy issiqxonalarni eksport qilish.",
      valuesTitle: "Qadriyatlar",
      valuesAndRules: {
        desc: "Bizning qadriyatlarimiz – bu bizning ishimiz, madaniyatimiz va kelajak yo'nalishimiz asosi.",
      },
      values: ["Sifat", "Innovatsiya", "Ishonch"],
      businessScopeTitle: "Faoliyat doirasi:",
      businessScopeDesc:
        "UZ-GROW — bu zamonaviy issiqxona yechimlari va agrotexnologiyalarni joriy etishga ixtisoslashgan professional kompaniya. Biz ko'p oraliqli plyonkali issiqxonalar, quyosh issiqxonalari, ekin ekish va ko'chat yetishtirish issiqxonalari, chorvachilik uchun mo'ljallangan issiqxonalar, gidroponika tizimlari hamda avtomatlashtirilgan boshqaruvga ega aqlli issiqxonalarni qurish bilan shug'ullanamiz. Shuningdek, issiqxona aksessuarlarini tayyorlash, turli murakkablikdagi issiqxona loyihalarini amalga oshirish va suvni tejovchi zamonaviy sug'orish tizimlarini joriy etish bo'yicha kompleks xizmatlarni taqdim etamiz.",
      professionalTeamTitle: "Professional jamoa:",
      professionalTeamDesc:
        "UZ-GROW jamoasi professional dizaynerlar, tajribali texnik muhandislar va malakali montaj mutaxassislaridan iborat. Biz loyihalashdan tortib o'rnatish va to'liq ishga tushirishgacha bo'lgan barcha jarayonlarni qat'iy nazorat ostida olib boramiz. Har bir detal yuqori sifat standartlariga mos bo'lishi ta'minlanadi, bu esa mijozlarimizga ishonchli va uzoq muddatli natija beradi.",
      descriptionTop:
        "Biz oddiy qishloq xo'jaligi kompaniyasi emasmiz — biz issiqxona muhandisligi, zamonaviy konstruksiyalar va yuqori samarali agro tizimlar yaratishga ixtisoslashgan jamoamiz. Bizning texnologiyalarimiz mijozlarning turli ehtiyojlariga moslashgan bo'lib, xoh aqlli (smart) issiqxona, xoh an'anaviy quyosh issiqxonasi bo'lsin — har bir loyiha uchun eng optimal yechimni taklif qilamiz. Ayniqsa, ko'p oraliqli issiqxonalarni loyihalashdagi tajribamiz yer maydonidan maksimal darajada samarali foydalanish imkonini beradi.",
      descriptionBottom:
        "Bizning asosiy maqsadimiz — mijozlarimizga yuqori sifatli, samarali va iqtisodiy jihatdan foydali agro yechimlar taqdim etish orqali ularning biznesini rivojlantirishdir. Biz hosildorlikni oshirish, xarajatlarni kamaytirish va barqaror daromadni ta'minlashga xizmat qiladigan tizimlarni yaratamiz. Bizni tanlash orqali siz oddiy xizmat emas, balki o'z ishiga mas'uliyat bilan yondashadigan professional jamoani tanlaysiz. Biz siz bilan uzoq muddatli hamkorlik qilishga, sizning loyihalaringizni muvaffaqiyatli amalga oshirishga va birgalikda yorqin kelajak yaratishga tayyormiz. Qayerda bo'lishingizdan qat'i nazar, biz siz uchun eng maqbul issiqxona yechimini taklif eta olamiz. Keling, birgalikda muvaffaqiyat sari harakat qilaylik!",
    },
    services: {
      title: "Xizmatlar",
      subtitle: "To'liq aylanma xizmatlar",
      description:
        "Loyihalashdan tortib to'liq ishga tushirishgacha - biz bilan hamkorlik qiling va natijaga erishing",
      engineering: "Injiniring",
      engineeringDesc: "Loyihalashdan boshlab to'liq ishga tushirishgacha",
      engineeringFullDesc:
        "Biz to'liq sikl asosida issiqxona quramiz. Natija: energiya tejamkor, yuqori hosildorlikka ega zamonaviy issiqxona",
      engineeringFeatures: [
        "Metall konstruksiya",
        "Polikarbonat yoki shisha qoplama",
        "Tomchilatib sug'orish",
        "Avtomatlashtirilgan boshqaruv",
      ],
      equipment: "Jihozlar",
      equipmentDesc: "Zamonaviy avtomatlashtirish va texnologiyalar",
      equipmentFullDesc:
        "Issiqxona uchun zarur bo'lgan barcha jihozlar va tizimlarni taqdim etamiz. Eng yuqori samaradorlik va ishonchlilik",
      equipmentFeatures: [
        "Iqlim nazorati tizimi",
        "Tomchilatib sug'orish",
        "O'g'itlash va sug'orish tizimi",
      ],
      consulting: "Konsalting",
      consultingDesc: "Professional maslahatlar va loyihalash",
      consultingFullDesc:
        "Bizning tajribali mutaxassislarimiz sizga eng yaxshi yechimlarni taklif qiladi. Loyihalashdan tortib to'liq ishga tushirishgacha",
      consultingFeatures: [
        "Tekshiruv va tahlil",
        "3D modellashtirish",
        "Texnik hujjatlar",
        "Eksport yo'nalishi",
        "Biznes model yaratish",
      ],
    },
    map: {
      badge: "Geografiya",
      title: "Loyihalar geografiyasi",
      subtitle: "O'zbekistondan boshlangan tajriba qo'shni davlatlarga yoyildi",
      hubName: "O'zbekiston",
      hubNote: "Bosh ofis — Toshkent",
      countries: [
        { code: "kz", name: "Qozog'iston", note: "Avtomatlashtirish tizimlari" },
        { code: "kg", name: "Qirg'iziston", note: "Issiqxona qurilishi" },
        { code: "tj", name: "Tojikiston", note: "Sug'orish tizimlari" },
        { code: "tm", name: "Turkmaniston", note: "Stellaj tizimlari" },
      ],
    },
    projects: {
      title: "Loyihalar",
      subtitle: "Muvaffaqiyatli issiqxona loyihalari",
      description: "Prezident tashriflari va qishloq xo'jaligi loyihalari",
      categories: {
        all: "Barchasi",
        presidential: "Prezident tashrifi",
        international: "Xalqaro hamkorlik",
        greenhouse: "Issiqxona",
        agriculture: "Qishloq xo'jaligi",
      },
      vodiy: {
        title: "Vodiy loyihalari",
        location: "Vodiy",
        size: "7 ta issiqxona",
        description:
          "Vodiy hududida qurilgan 7 ta zamonaviy issiqxona majmuasi. Turli o'lchamlarda va texnologiyalar bilan jihozlangan.",
        year: "2022-2024",
      },
      samarqand: {
        title: "Samarqand loyihalari",
        location: "Samarqand",
        size: "2 ta issiqxona",
        description:
          "Samarqand viloyatida qurilgan 2 ta yirik issiqxona. Prezident tashrifi va tadbirkorlar uchrashuvi uchun mo'ljallangan.",
        year: "2024",
      },
      international: {
        title: "Xalqaro loyihalar",
        location: "Xalqaro",
        size: "5 ta issiqxona",
        description:
          "Xalqaro mijozlar uchun qurilgan 5 ta issiqxona. Yevropa standartlariga mos zamonaviy yechimlar.",
        year: "2023-2024",
      },
      agriculture: {
        title: "Qishloq xo'jaligi loyihalari",
        location: "Qishloq xo'jaligi",
        size: "3 ta issiqxona",
        description:
          "Qishloq xo'jaligini rivojlantirish maqsadida qurilgan 3 ta issiqxona. Zamonaviy sug'orish va iqlimlashtirish tizimlari.",
        year: "2024",
      },
      viewProject: "Batafsil",
      gallery: {
        title: "Galereya",
        description:
          "Bizning loyihalarimiz, tadbirlarimiz va Prezident tashriflaridan lavhalar",
        totalImages: "Jami rasmlar",
        projects: "Loyihalar",
        samarqand: "Samarqand",
      },
      viewGallery: "Galereyani ko'rish",
      close: "Yopish",
      featured: "Mashhur",
      investment: "Investitsiya",
      technologies: "Texnologiyalar",
      projectDetails: "Loyiha ma'lumotlari",
      client: "Mijoz",
      status: "Holati",
      notFound: "Loyihalar topilmadi",
      tryDifferentSearch: "Qidiruv shartlarini o'zgartirib ko'ring",
      items: [
        {
          title: "Surxondaryo Agro Majmuasi",
          location: "Surxondaryo viloyati",
          size: "3 ta issiqxona",
          description:
            "Surxondaryo viloyatida qurilgan 3 ta zamonaviy issiqxona majmuasi. Prezident tashrifi uchun mo'ljallangan yirik loyiha. Eng ilg'or texnologiyalar bilan jihozlangan.",
          technologies: [
            "Polikarbonat",
            "Tomchilatib sug'orish",
            "Iqlim nazorati",
          ],
          client: "Surxondaryo viloyati hokimligi",
        },
        {
          title: "Andijon Vodiy Loyihasi",
          location: "Andijon vodiysi",
          size: "7 ta issiqxona",
          description:
            "Andijon vodiysida qurilgan 7 ta zamonaviy issiqxona majmuasi. Turli o'lchamlarda va eng ilg'or texnologiyalar bilan jihozlangan.",
          technologies: [
            "Polikarbonat",
            "Tomchilatib sug'orish",
            "Avtomatlashtirish",
          ],
          client: "Andijon viloyati hokimligi",
        },
        {
          title: "Samarqand Agro Majmuasi",
          location: "Samarqand viloyati",
          size: "2 ta issiqxona",
          description:
            "Samarqand viloyatida qurilgan 2 ta yirik issiqxona. Prezident tashrifi va tadbirkorlar uchrashuvi uchun mo'ljallangan. Zamonaviy avtomatlashtirish tizimlari bilan jihozlangan.",
          technologies: ["Shisha", "Iqlim nazorati", "Gidroponik"],
          client: "Samarqand viloyati hokimligi",
        },
        {
          title: "Xalqaro Agro Hamkorlik",
          location: "Toshkent, Almata",
          size: "3 ta loyiha",
          description:
            "Toshkent raqamli ta'lim platformasi va Olmaota issiqxona loyihalari. Xalqaro standartlarga mos ravishda qurilgan.",
          technologies: ["Aqlli issiqxona", "IoT", "AI monitoring"],
          client: "Xalqaro investorguruhlar",
        },
        {
          title: "Qashqadaryo Issiqxona Majmuasi",
          location: "Qashqadaryo viloyati",
          size: "3 gektar",
          description:
            "Qashqadaryoda qurilgan polikarbonat issiqxonalari majmui. Zamonaviy texnologiyalar bilan jihozlangan. Yil bo'yi samaradorlikni ta'minlaydi.",
          technologies: ["Polikarbonat", "Qayta ishlash", "Energiya tejash"],
          client: "Qashqadaryo fermerlari uyushmasi",
        },
        {
          title: "Termiz Angor",
          location: "Termiz shahri",
          size: "1.5 gektar",
          description:
            "Termiz shahrida qurilgan innovatsion issiqxona markazi. Yaqin Sharqdagi eng zamonaviy agrotexnologiyalar jamlanmasi.",
          technologies: ["Vertikal fermerlik", "LED yoritish", "Suv aylanma"],
          client: "Termiz shahar hokimligi",
        },
      ],
    },
    team: {
      title: "Bizning jamoa",
      subtitle: "Kuchli va tajribali mutaxassislar",
      description:
        "Bizning jamoamiz eng yuqori malakali mutaxassislardan iborat bo'lib, ular har kuni sizning muvaffaqiyatingiz uchun ishlaydi",
      ourTeam: "Bizning jamoa",
      experience: "Tajriba",
      achievements: "Yutuqlar",
      education: "Ta'lim",
      skills: "Ko'nikmalar",
      contact: "Aloqa",
      members: {
        rustamjon: {
          name: "Rustamjon Rahmonov",
          position: "Asoschi va Bosh Direktor",
          bio: "O'zbekistonlik innovator agrofaol va tadbirkor. 2017-yildan beri Markaziy Osiyo agrosektorida minglab fermerlar va agrobiznes vakillariga ma'lumot, ishonch va natija olib kelmoqda.",
          experience: "6+ yillik",
          achievements: [
            "200,000+ obunachi",
            "1500+ muvaffaqiyatli loyiha",
            "Xalqaro hamkorliklar",
          ],
          education: [
            "Qishloq xo'jaligi instituti",
            "Xalqaro biznes menejmenti",
          ],
          skills: ["Agrobiznes", "Innovatsiya", "Loyihalash", "Menejment"],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Toshkent, O'zbekiston",
          linkedin: "#",
          twitter: "#",
          resume: "/RESUME 2025 (3).docx",
        },
        alisher: {
          name: "Alisher Majidov",
          position: "Marketing Direktori",
          bio: "Marketing va brend strategiyalari bo'yicha mutaxassis. Kompaniya imidjini rivojlantirish va mijozlar bazasini kengaytirish uchun mas'ul.",
          experience: "6+ yillik",
          achievements: [
            "20+ marketing kampaniyasi",
            "Brendni rivojlantirish",
            "Mijozlar bazasi 3x o'sishi",
          ],
          education: ["Marketing", "Xalqaro biznes"],
          skills: [
            "Marketing strategiyasi",
            "SMM",
            "Kontent marketing",
            "Analitika",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Toshkent, O'zbekiston",
          linkedin: "#",
          twitter: "#",
        },
        abdulloh: {
          name: "Abdulloh Abdurasulov",
          position: "Texnik Direktor",
          bio: "Issiqxona qurilish va texnologiyalar bo'yicha mutaxassis. 6+ yillik tajriba bilan zamonaviy agrotexnologiyalarni joriy etmoqda.",
          experience: "6+ yillik",
          achievements: [
            "50+ issiqxona loyihasi",
            "Texnik innovatsiyalar",
            "Xalqaro sertifikatlar",
          ],
          education: ["Qurilish muhandisligi", "Avtomatlashtirish sistemlari"],
          skills: [
            "Issiqxona qurilish",
            "Avtomatlashtirish",
            "3D modellashtirish",
            "Texnik nazorat",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Toshkent, O'zbekiston",
          linkedin: "#",
          twitter: "#",
        },
        bobgulbaxor: {
          name: "Gulbaxor Karaboyeva",
          position: "Moliya Direktori",
          bio: "Moliya va menejment sohasida tajribali mutaxassis. Moliyaviy strategiyalarni ishlab chiqish va byudjet boshqaruvida keng tajribaga ega.",
          experience: "6+ yillik",
          achievements: [
            "Moliyaviy rejalashtirish",
            "Byudjet optimizatsiyasi",
            "Hisobot tayyorlash",
          ],
          education: ["Iqtisodiyot", "Moliya"],
          skills: [
            "Moliyaviy tahlil",
            "Excel",
            "1C:Buxgalteriya",
            "Byudjet rejalashtirish",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Toshkent, O'zbekiston",
          linkedin: "#",
          twitter: "#",
          resume: "/Rezyume_Karaboyeva_Gulbaxor_YAKUNIY_FINAL-1.docx",
        },
        nafosat: {
          name: "Nafosat Botirboyeva",
          position: "Moliyachi",
          bio: "Moliyaviy jarayonlar va hisobotlar bo'yicha mutaxassis.",
          experience: "3 yil",
          achievements: [
            "Hisobotlarni tayyorlash",
            "Pul oqimini yuritish",
            "Buxgalteriyani tiklash",
          ],
          education: [
            "Buxgalteriya kursi",
            "Yurist malaka kursi",
            "Inplus kursi",
          ],
          skills: ["1C", "Didox", "MyMehnat", "Hisobotlar"],
        },
        dilnoza: {
          name: "Dilnoza Rizqiyeva",
          position: "Buxgalter",
          bio: "Soliq va buxgalteriya hisobi bo'yicha katta mutaxassis.",
          experience: "9+ yil",
          achievements: [
            "Bosh buxgalter",
            "Soliq hisobotlari",
            "1C 8.3.0 mutaxassisi",
          ],
          education: ["Moliya Studiya - Buxgalteriya kursi (2021)"],
          skills: [
            "1C 8.3.0",
            "My.soliq.uz",
            "EDO / Didox",
            "Mehnat.uz",
            "Bank klient",
          ],
        },
        sardor: {
          name: "Sardor Abdutolipov",
          position: "Taminotchi",
          bio: "Xaridlar va biznes muzokaralar bo'yicha mutaxassis.",
          experience: "2+ yil",
          achievements: [
            "Xarid bo'limi rahbari",
            "Moliyaviy tahlil",
            "Marketing strategiyalari",
          ],
          education: [
            "Xalqaro Iqtisodiyot Biznes Banki — Moliyaviy analist (2028, tugallanmagan)",
          ],
          skills: [
            "Aktiv sotuvlar",
            "Biznes muzokaralar",
            "Moliyaviy menejment",
            "Marketing",
          ],
        },
      },
      achievementsLabel: "yutuq",
    },
    greenhouse: {
      title: "Issiqxona turlari",
      subtitle: "Har bir ekin uchun optimal yechim",
      description:
        "Turli xil issiqxona turlari bilan tanishing va siz uchun to'g'ri tanlov qiling",
      glass: {
        title: "Shisha issiqxona",
        description:
          "Yorug'likni yaxshi o'tkazadi, mustahkam lekin qurilish xarajati yuqori.",
        features: [
          "Maksimal yorug'lik",
          "Uzoq muddatli",
          "Yuqori samaradorlik",
        ],
        complexity: "Yuqori",
        durability: "20+ yil",
        cost: "Yuqori",
        maintenance: "Oson",
      },
      polycarbonate: {
        title: "Polikarbonat issiqxona",
        description: "Yengil, arzon va samaradorli. Ko'p yillar xizmat qiladi.",
        features: ["Yengil material", "Yaxshi izolyatsiya", "Tez o'rnatish"],
        complexity: "O'rtacha",
        durability: "10-15 yil",
        cost: "O'rtacha",
        maintenance: "Oson",
      },
      film: {
        title: "Plyonka issiqxona",
        description:
          "Soddadir, arzon va tez o'rnatiladi. Uzoq muddatga chidamaydi.",
        features: ["Arzon narx", "Tez o'rnatish", "Portativ"],
        complexity: "Past",
        durability: "5-8 yil",
        cost: "Past",
        maintenance: "Oson",
      },
      mini: {
        title: "Mini issiqxona",
        description:
          "Kichik hajmli, arzon va uy uchun ideal. Yangi boshlanuvchilar uchun.",
        features: ["Kichik hajm", "Uy uchun ideal", "Oson boshqarish"],
        complexity: "Past",
        durability: "3-5 yil",
        cost: "Past",
        maintenance: "Juda oson",
      },
      oddiy: {
        title: "Oddiy issiqxona",
        description:
          "Oddiy shaklda, arzon va ishonchasi oson. Kichik dehqonlar uchun.",
        features: ["Oddiy shakl", "Ishonchasi oson", "Ko'p material"],
        complexity: "Past",
        durability: "3-7 yil",
        cost: "Past",
        maintenance: "Oson",
      },
      gektar: {
        title: "Gektar issiqxona",
        description:
          "Katta maydonlar uchun, mustahkam konstruktsiya. Yuqori hosildorlik.",
        features: [
          "Katta maydon",
          "Mustahkam konstruktsiya",
          "Yuqori hosildorlik",
        ],
        complexity: "Yuqori",
        durability: "15-20 yil",
        cost: "Yuqori",
        maintenance: "Murakkab",
      },
      polikarbanat: {
        title: "Polikarbonat issiqxona",
        description:
          "Kengaytirilgan polikarbonat, yuqori izolyatsiya va mustahkamlik. Yirik loyihalar uchun.",
        features: [
          "Kengaytirilgan polikarbonat",
          "Yuqori izolyatsiya",
          "Katta maydonlar uchun",
        ],
        complexity: "Yuqori",
        durability: "15-20 yil",
        cost: "Yuqori",
        maintenance: "O'rtacha",
      },
      vertical: {
        title: "Issiqxona maxsulotlari",
        description:
          "Yangi, sifatli va ekologik toza issiqxona mahsulotlar. Har qanday mavsumda yetkazib beriladi.",
        features: [
          "Yangi va Tabiiy",
          "Yuqori sifat Kafolati",
          "Mavsumdan qat'i nazar yetkazib beriladi",
        ],
        complexity: "Yuqori",
        durability: "10-15 yil",
        cost: "Yuqori",
        maintenance: "Murakkab",
      },
      tunnel: {
        title: "Tunnel issiqxona",
        description:
          "Oddiy, arzon va tez o'rnatiladi. Yangi boshlanuvchilar uchun qulay.",
        features: ["Oddiy", "Arzon", "Tez o'rnatish"],
        complexity: "Past",
        durability: "5-8 yil",
        cost: "Past",
        maintenance: "Oson",
      },
      industrial: {
        title: "Sanoat issiqxonasi",
        description:
          "Katta maydonlar uchun, avtomatlashtirilgan, yuqori samaradorlik.",
        features: [
          "Katta maydonlar",
          "Avtomatlashtirilgan",
          "Yuqori samaradorlik",
        ],
        complexity: "Yuqori",
        durability: "25+ yil",
        cost: "Yuqori",
        maintenance: "Murakkab",
      },
      hydroponic: {
        title: "Gidroponik issiqxona",
        description:
          "Tuproqsiz o'stirish, yuqori hosildorlik, zamonaviy texnologiya.",
        features: [
          "Tuproqsiz o'stirish",
          "Yuqori hosildorlik",
          "Zamonaviy texnologiya",
        ],
        complexity: "Yuqori",
        durability: "15-20 yil",
        cost: "Yuqori",
        maintenance: "Murakkab",
      },
      comparison: {
        title: "Qiyosiy jadval",
        subtitle: "Issiqxona turlarini solishtiring",
        material: "Material",
        light: "Yorug'lik o'tkazuvchanligi",
        durability: "Chidamlilik",
        cost: "Xarajat",
        maintenance: "Xizmat ko'rsatish",
        serviceLife: "Xizmat muddati",
      },
      guide: {
        title: "To'g'ri Issiqxonani Qanday Tanlash?",
        beginners: "Boshlanuvchilar uchun",
        beginnersDesc:
          "Oddiy yoki Tunnel issiqxona - arzon va oson boshqariladi",
        professionals: "Professionallar uchun",
        professionalsDesc:
          "Polikarbonat yoki Shisha - uzoq muddatli va samarali",
        business: "Biznes uchun",
        businessDesc:
          "Sanoat, Gidroponik yoki Vertikal - maksimal samaradorlik",
        consult: "Mutaxassis bilan maslahatlashish",
      },
    },
    technology: {
      videoPlaceholder: "Video joylashtiring",

      title: "Texnologiya",
      subtitle: "Zamonaviy jihozlar va tizimlar",
      description: "Eng ilg'or agro-texnologiyalar bilan ta'minlaymiz",
      heating: {
        title: "Isitish tizimi",
        description:
          "Zamonaviy isitish tizimlari orqali optimal haroratni ta'minlash va energiya tejash.",
      },
      ventilation: {
        title: "Ventilyatsiya va sovutish",
        description:
          "Avtomatlashtirilgan ventilyatsiya va sovutish tizimlari yordamida iqlimni nazorat qilish.",
      },
      shelving: {
        title: "Stelaj tizimi",
        description:
          "Vertikal stelajlar orqali joydan samarali foydalanish va hosildorlikni oshirish.",
      },
      irrigation: {
        title: "Sug'orish tizimi",
        description:
          "Tomchilatib sug'orish va gidroponika tizimlari yordamida suvni 90% gacha tejash.",
      },
      automation: {
        title: "Avtomatlashtirish",
        description:
          "IoT sensorlar va AI algoritmlari yordamida iqlimni avtomatik boshqarish.",
      },
    },
    contact: {
      title: "Aloqa",
      subtitle: "Biz bilan bog'laning",
      formTitle: "Xabar yuborish",
      name: "Ism",
      namePlaceholder: "Ismingizni kiriting",
      phone: "Telefon",
      phonePlaceholder: "+998 XX XXX XX XX",
      email: "Email",
      emailPlaceholder: "email@example.com",
      service: "Xizmat turi",
      servicePlaceholder: "Xizmatni tanlang",
      message: "Xabar",
      messagePlaceholder: "Xabaringizni yozing...",
      send: "Yuborish",
      sending: "Yuborilmoqda...",
      success: "Xabar yuborildi!",
      successMessage: "Tez orada siz bilan bog'lanamiz",
      newMessage: "Yangi xabar",
      errorTitle: "Xatolik yuz berdi",
      errorMessage:
        "Xabar yuborilmadi. Iltimos, qayta urinib ko'ring yoki telefon orqali bog'laning.",
      successHeader: "📧 Ma'lumotlar qabul qilindi!",
      successSubheader: "Sizning xabaringiz UZ GROW jamoasiga yetkazildi.",
      locationCity: "Toshkent, O'zbekiston",
      coordinatesLabel: "Koordinatalar",
      addressCopied: "Manzil nusxalandi!",
      infoTitle: "Aloqa ma'lumotlari",
      workingHours: "Ish vaqti",
      workingHoursDesc: "Biz bilan bog'laning",
      monday: "Dushanba",
      friday: "Juma",
      saturday: "Shanba",
      sunday: "Yakshanba",
      closed: "Dam olish kuni",
      socialMedia: "Ijtimoiy tarmoqlar",
      followUs: "Ijtimoiy tarmoqlarda bizga qo'shiling",
      location: "Manzil",
      getDirections: "Yo'nalishni olish",
      copyAddress: "Manzilni nusxalash",
      address:
        "Toshkent shahri, Sirg'ali tumani, Nomdanak ko'chasi, Ziyokor 6/9",
      phoneLabel: "Telefon",
      emailLabel: "Email",
      companyPhone: "+998555152223",
      companyPhone2: "+998994352313",
      companyEmail: "uzgrrow@gmail.com",
      website: "https://www.uzgrow.uz/",
      locationUrl:
        "https://yandex.ru/navi?rtext=41.202864,69.235732~41.202625,69.235384&rtt=auto",
      socialLinks: {
        facebook: "https://www.facebook.com/share/1DePjLwX79/",
        instagram:
          "https://www.instagram.com/uz.grow?igsh=MXMwN3lzaW95NTN1YQ==",
        telegram: "http://@Uz_Grow",
        youtube: "https://youtube.com/@rustamjonrakhmonov?si=9-OxlFiY0B875tD9",
        tiktok: "https://www.tiktok.com/@uz.grow",
      },
      services: {
        turnkey: "Turnkey issiqxona qurish",
        engineering: "Agro-injiniring",
        equipment: "Jihozlar",
        consulting: "Agro-konsalting",
        investment: "Investitsiya",
      },
    },
    footer: {
      brandName: "GROW AGRO TEAM",
      brandTagline: "QURILISH KOMPANIYASI",
      brandDescription:
        "O'zbekistonda zamonaviy issiqxona qurish va qurilish xizmatlari. Biz bilan kelajak bugun boshlanadi.",
      contact: "Aloqa",
      services: "Xizmatlar",
      company: "Kompaniya",
      help: "Yordam",
      team: "Jamoa",
      allRightsReserved: "Barcha huquqlar himoyalangan",
      links: {
        services: [
          { label: "Issiqxona turlari", href: "/issiqxona-turlari" },
          { label: "Loyihalar", href: "/loyihalar" },
          { label: "Jihozlar", href: "/jixozlar" },
          { label: "Texnologiya", href: "/texnologiya" },
        ],
        company: [
          { label: "Biz haqimizda", href: "/haqimizda" },
          { label: "Jamoa", href: "/rahbariyat" },
          { label: "Xalqaro hamkorlik", href: "/xalqaro-hamkorlik" },
          { label: "Media hamkorlik", href: "/media-hamkorlik" },
        ],
        help: [
          { label: "Bog'lanish", href: "/aloqa" },
          { label: "Galereya", href: "/gallery" },
          { label: "Maxfiylik siyosati", href: "/maxfiylik-siyosati" },
          { label: "Foydalanish shartlari", href: "/foydanalish-shartlari" },
        ],
      },
    },
  
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
      title: "UZ GROW Hamkorlik Taklifi",
      professionalism: "Bizning Professionalligimiz",
      realSector: "Real sektorni bilish",
      realSectorDesc: "Agrosektor bilan 9+ yillik bevosita tajriba. Fermerlar, eksportyorlar, ishlab chiqaruvchilar bilan to'g'ridan-to'g'ri ishlash",
      trustBrand: "Ishonchga asoslangan brend",
      trustBrandDesc: "Halollik, amaliyotga asoslangan tahlil, real hayot voqealari sharhi. Brendlar va iste'molchilar o'rtasida ishonch ko'prigi",
      strongAudience: "Kuchli auditoriyaga ega bo'lish",
      strongAudienceDesc: "200,000+ obunachilar, 1.5-3 million oylik ko'rishlar",
      statsTitle: "Statistikalarimiz",
      totalReach: "Umumiy auditoriya qamrovi",
      audienceTitle: "Umumiy Auditoriya",
      geographicTitle: "Geografik Qamrov",
      tariffsTitle: "Reklama Tariflari",
      foreignPartnersTitle: "Xorijiy Hamkorlar",
      callNow: "Hoziroq Qo'ng'iroq Qiling",
      freeConsultation: "Bepul Konsultatsiya",
      footerDesc: "Bizga hoziroq qo'ng'iroq qiling va bepul konsultatsiya oling!",
      geographicCoverage: [
        { country: "O'zbekiston", description: "Barcha viloyatlar, asosan qishloq joylarda faol auditoriya", flag: "🇺🇿" },
        { country: "Qozog'iston", description: "Olmaota, Shymkent, Astana", flag: "🇰🇿" },
        { country: "Qirg'iston", description: "Video kontentga qiziqish katta", flag: "🇰🇬" },
        { country: "Rossiya", description: "Agrosanoat bilan bog'liq diasporalar", flag: "🇷🇺" },
        { country: "Tojikiston", description: "Texnologik intervyularga talab oshmoqda", flag: "🇹🇯" }
      ],
      partnershipPlans: [
        { name: "STANDART", duration: "3 OY", videos: 4, posts: 12, features: ["Stories, izohlar, statistika"] },
        { name: "PREMIUM", duration: "6 OY", videos: 8, posts: 24, features: ["Banner, pinned post, hisobot"] },
        { name: "VIP", duration: "12 OY", videos: 14, posts: 38, features: ["To'liq PR yordam, media-reja"] }
      ],
      foreignPartners: [
        { name: "Dunyodagi Qishloq xo'jaligi", description: "eng kuchli agroekspo o'tkazadigan sohasida xalqaro agroekspolar kompaniyalardan biri!", partnership: "2022-yildan buyon hamkorlikda" }
      ]
    },
    privacy: {
      title: "Maxfiylik siyosati",
      lastUpdated: "Oxirgi yangilanish: 5-aprel, 2026-yil",
      sections: [
        {
          title: "1. Ma'lumotlar to'plami",
          content: "UZ GROW sifatida biz sizdan quyidagi shaxsiy ma'lumotlarni to'plamiz:",
          items: [
            "Ism, familiya, telefon raqami, email manzili",
            "Kompaniya ma'lumotlari va manzili",
            "Loyiha talablari va texnik xususiyatlari",
            "Ishonch telefon raqami va qo'shimcha kontaktlar",
            "Ijtimoiy tarmoqlardagi profilingiz ma'lumotlari (faqat izoh bilan)"
          ]
        },
        {
          title: "2. Ma'lumotlardan foydalanish maqsadi",
          content: "Biz to'plagan ma'lumotlarni quyidagi maqsadlarda ishlatamiz:",
          items: [
            "Xizmatlarimizni taqdim etish va yaxshilash",
            "Mijozlar bilan aloqa o'rnatish va saqlash",
            "Loyihalarni loyihalash va amalga oshirish",
            "Shartnoma va huquqiy majburiyatlarni bajarish",
            "Xizmatlarimiz sifatini nazorat qilish",
            "Marketing va reklama maqsadlarida (faqat roziligiz bilan)"
          ]
        },
        {
          title: "3. Ma'lumotlarni ochiqlash va ulashish",
          content: "Biz sizning shaxsiy ma'lumotlaringizni quyidagilar bilan bo'lishishimiz mumkin:",
          items: [
            "Hamkor kompanilar va pudratchilar (loyiha ijrosi uchun)",
            "Huquqiy organlar (qonun talabiga ko'ra)",
            "Moliyaviy muassasalar (to'lov va soliq maqsadlarida)",
            "Sizning roziligiz bilan boshqa uchinchi shaxslar"
          ]
        },
        {
          title: "4. Ma'lumotlarni saqlash muddati",
          content: "Biz sizning ma'lumotlaringizni quyidagi muddatlar davomida saqlaymiz:",
          items: [
            "Kontakt ma'lumotlari - shartnoma muddati davomida + 5 yil",
            "Loyiha hujjatlari - 10 yil",
            "Moliyaviy ma'lumotlar - 7 yil",
            "Ijtimoiy media ma'lumotlari - 3 yil"
          ],
          footer: "Muddat tugagach, ma'lumotlar xavfsiz ravishda o'chiriladi."
        },
        {
          title: "5. Ma'lumotlarni himoya qilish",
          content: "Biz quyidagi choralarni ko'ramiz:",
          items: [
            "SSL shifrlash texnologiyasidan foydalanamiz",
            "Serverlarni muntazam ravishda yangilaymiz",
            "Xodimlar maxfiylik shartnomasini imzolaydilar",
            "Kirish huquqini cheklaymiz",
            "Muntazam xavfsizlik tekshiruvlarini o'tkazamiz"
          ]
        },
        {
          title: "6. Huquqlaringiz",
          content: "Siz quyidagi huquqlarga egasiz:",
          items: [
            "O'z ma'lumotlaringizni ko'rish huquqi",
            "Noto'g'ri ma'lumotlarni to'g'rilash huquqi",
            "Ma'lumotlarni o'chirish huquqi (ma'lum shartlar asosida)",
            "Ma'lumotlarni ko'chirish huquqi (portability)",
            "Qayta ishlashga qarshi etiroz bildirish huquqi"
          ]
        }
      ],
      note: "Eslatma: Biz hech qachon sizning shaxsiy ma'lumotlaringizni uchinchi shaxslarga sotmaymiz yoki qonunga zid ravishda ulashmaymiz.",
      contact: {
        title: "7. Aloqa ma'lumotlari",
        description: "Maxfiylik siyosati bo'yicha savollaringiz bo'lsa, biz bilan quyidagi manzillar orqali bog'laning:"
      }
    },
    terms: {
      title: "Foydalanish shartlari",
      lastUpdated: "Oxirgi yangilanish: 5-aprel, 2026-yil",
      sections: [
        {
          title: "1. Umumiy qoidalar",
          content: "UZ GROW veb-saytidan foydalanish quyidagi shartlarga bo'ysunadi:",
          items: [
            "Siz 18 yoshga to'lgan va huquqiy jihatdan to'liq qobiliyatli bo'lishingiz kerak",
            "Veb-saytdan faqat qonunga zid ravishda foydalanishingiz mumkin",
            "Boshqa foydalanuvchilarning huquqlariga hurmat ko'rsating",
            "Shaxsiy ma'lumotlaringizni to'g'ri kiritishingiz kerak",
            "Bizning xizmatlarimizdan qonunga zid foydalanmang"
          ]
        },
        {
          title: "2. Xizmatlar",
          content: "UZ GROW quyidagi xizmatlarni taqdim etadi:",
          items: [
            "Issiqxona loyihalash va qurish bo'yicha konsalting",
            "Agro-injiniring xizmatlari",
            "Texnik yechimlar va maslahatlar",
            "Loyihalarni boshqarish",
            "Materiallar va uskunalar tanlash"
          ],
          note: "Eslatma: Biz xizmatlarni bajarish kafolatini bermaymiz, faqat maslahat va konsalting xizmatlarini ko'rsatamiz."
        },
        {
          title: "3. To'lovlar",
          content: "To'lov shartlari va tartibi:",
          items: [
            "Konsalting xizmatlari oldindan to'lanadi",
            "To'lov naqd pul yoki bank orqali amalga oshiriladi",
            "To'lov qilingan xizmatlar qaytarilmaydi",
            "Qo'shimcha xizmatlar uchun alohida to'lov talab qilinadi",
            "Barcha to'lovlar hujjatlashtiriladi"
          ]
        },
        {
          title: "4. Mas'uliyatni cheklash",
          content: "UZ GROW quyidagi holatlarda mas'uliyatni cheklaydi:",
          items: [
            "Force majeure holatlarida (tabiiy ofatlar, urushlar)",
            "Mijoz tomonidan noto'g'ri ma'lumot berilganda",
            "Uchinchi tomonlar aybiganda",
            "Qonun o'zgarishi sababli",
            "Texnik nosozliklar tufayli (bizning aybimiz bo'lmasa)"
          ]
        },
        {
          title: "5. Intellektual mulk",
          content: "Veb-sayt materiallari bizning intellektual mulkimiz:",
          items: [
            "Barcha matnlar, rasmlar, dizaynlar bizga tegishli",
            "Ruxsatsiz foydalanish taqiqlanadi",
            "Materiallardan tijorat maqsadida foydalanish mumkin emas",
            "Bizning roziligiz bilan qayta nashr qilish mumkin"
          ]
        },
        {
          title: "6. Shartnomani bekor qilish",
          content: "Quyidagi holatlarda shartnoma bekor qilinadi:",
          items: [
            "Ikkala tomon ham rozilik bildirganda",
            "Bir tomon shartlarni buzganda",
            "Qonunga zid faoliyat qilganda",
            "15 kun oldin xabardor qilganda"
          ]
        },
        {
          title: "7. Nizolarni hal qilish",
          content: "Barcha nizolar quyidagi tartibda hal qilinadi:",
          items: [
            "Suhbat orqali kelishuvga harakat qilish",
            "Tegishli vositalar orqali hal qilish",
            "Toshkent shahar sudiga murojaat qilish",
            "O'zbekiston Respublikasi qonunlari asosida"
          ]
        },
        {
          title: "8. Qo'shimcha shartlar",
          items: [
            "Bu shartnoma O'zbekiston Respublikasi qonunlariga muvofiq tuzilgan",
            "Shartnomaga o'zgartirish kiritish huquqi bizda saqlanadi",
            "Veb-saytdan foydalanish bilan siz ushbu shartlarni qabul qilasiz",
            "Savollaringiz bo'lsa biz bilan bog'laning"
          ],
          companyName: "UZ GROW Agro-Injiniring kompaniyasi"
        }
      ]
    },
    internationalPage: {
      title: "Xalqaro Hamkorlik",
      description: "Markaziy Osiyo mamlakatlari bilan olib borilayotgan qo'shma loyihalar va xalqaro hamkorlik dasturlari",
      projects: [
        {
          title: "Qozog'iston Avtomatlashtirish Hamkorligi",
          description: "Markaziy Osiyo mamlakatlari o'rtasida qayta tiklanuvchi energiya manbalarini rivojlantirish bo'yicha qo'shma loyiha",
          country: "Qozog'iston",
          status: "Faol",
          timeline: "2024-2026"
        },
        {
          title: "Tojikiston Sug'orish Tizimi",
          description: "Zamonaviy sug'orish texnologiyalarini joriy etish orqali qishloq xo'jaligini rivojlantirish dasturi",
          country: "Tojikiston",
          status: "Jarayonda",
          timeline: "2024-2025"
        },
        {
          title: "Qirg'iziston Issiqxona",
          description: "Raqamli ta'lim platformalarini yaratish va o'qituvchilar malakasini oshirish bo'yicha xalqaro loyiha",
          country: "Qirg'iziston",
          status: "Rejalashtirilgan",
          timeline: "2025-2027"
        },
        {
          title: "Turkmaniston Stelaj Tizimi",
          description: "Xalqaro transport yo'llarini rivojlantirish va savdo aloqalarini kengaytirish bo'yicha strategik loyiha",
          country: "Turkmaniston",
          status: "Faol",
          timeline: "2024-2028"
        }
      ]
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
    agro: {
      hero: {
        badge: "Agro-injiniring",
        title: "Agro-injiniring",
        desc: "Zamonaviy texnologiyalar va avtomatlashtirish yechimlari bilan qishloq xo'jaligini kelajasiga o'tkazing",
      },
      services: {
        title: "Bizning agro-injiniring xizmatlarimiz",
        desc: "Qishloq xo'jaligida eng zamonaviy texnologiyalarni qo'llaymiz",
        items: [
          {
            title: "Avtomatlashtirish tizimlari",
            description: "Issiqxonalarni to'liq avtomatlashtirish, iqlim nazorati va sug'orish tizimlari",
            features: ["Smart Climate Control", "Auto Irrigation", "Remote Monitoring", "Data Analytics"],
          },
          {
            title: "Gidroponik yechimlar",
            description: "Tuproqsiz ekin yetishtirish texnologiyalari va suv tejash tizimlari",
            features: ["Hydroponic Systems", "Nutrient Management", "Water Recycling", "LED Lighting"],
          },
          {
            title: "Iqlim nazorati",
            description: "Harorat, namlik va stelaj tizimlarini avtomatik nazorat qilish tizimlari",
            features: ["Temperature Control", "Humidity Management", "Shelving Systems", "Ventilation"],
          },
          {
            title: "Ma'lumotlar analitika",
            description: "Ekinlar holatini kuzatish va hosildorlikni bashorat qilish tizimlari",
            features: ["Real-time Monitoring", "Predictive Analytics", "Yield Forecasting", "Quality Control"],
          },
        ],
      },
      technologies: {
        title: "Ishlatiladigan texnologiyalar",
        desc: "Eng so'nggi va ishonchli texnologiyalardan foydalanamiz",
        items: [
          { name: "IoT Sensorlar", description: "Harorat, namlik, yorug'lik va tuproq namligini o'lchaydigan zamonaviy sensorlar" },
          { name: "Cloud Platform", description: "Barcha ma'lumotlarni bulutda saqlash va uzoqdan boshqarish imkoniyati" },
          { name: "AI Analytics", description: "Sun'iy intellekt yordamida hosildorlikni bashorat qilish va optimal yechimlar" },
          { name: "Mobile Apps", description: "Mobil ilovalar orqali issiqxonani smartfondan boshqarish" },
        ],
      },
      benefits: {
        title: "Agro-injiniring afzalliklari",
        desc: "Texnologiyalarni joriy etishning asosiy afzalliklari",
        items: [
          { title: "Hosildorlikni oshirish", description: "Zamonaviy texnologiyalar yordamida hosildorlik 30-50% ga oshadi" },
          { title: "Resurslarni tejash", description: "Avtomatlashtirish suv va energiya sarfini 40% ga kamaytiradi" },
          { title: "Ishchi kuchini tejash", description: "Avtomatlashtirish inson mehnatini 70% ga kamaytiradi" },
          { title: "Sifatni yaxshilash", description: "Nazorat tizimlari mahsulot sifatini 25% ga yaxshilaydi" },
        ],
      },
      process: {
        desc: "Biz bilan qanday ishlash mumkin",
        steps: ["Tahlil va loyiha", "Texnologiyani tanlash", "O'rnatish va sozlash", "Qo'llab-quvvatlash"],
        start: "Boshlash",
      },
    },
    investor: {
      hero: {
        badge: "Investorlar uchun",
        title: "Agro-sanoat investitsiya imkoniyati",
        desc: "UZ GROW yuqori rentabelli issiqxona loyihalarini amalga oshirish bo'yicha hamkorlik taklif qiladi.",
        pdf: "PDF prezentatsiya",
        contact: "Bog'lanish",
        stats: [
          { value: "$2M+", label: "Jami investitsiya" },
          { value: "35%", label: "O'rtacha ROI" },
          { value: "15+", label: "Investor" },
          { value: "100%", label: "Muvaffaqiyat" },
        ],
      },
      benefits: {
        title: "Investitsiya afzalliklari",
        desc: "Issiqxona loyihalariga investitsiya qilishning asosiy sabablari",
        items: [
          { title: "Yuqori ROI", description: "Issiqxona loyihalarida yuqori ichki rentabellik darajasi (IRR) va tez qaytim." },
          { title: "Tez aylanma", description: "Yil davomida bir necha marta hosil olish imkoniyati va tez aylanuvchi mahsulot." },
          { title: "Oziq-ovqat xavfsizligi", description: "O'zbekistonda oziq-ovqat xavfsizligini ta'minlashga hissa qo'shish." },
          { title: "Eksport salohiyati", description: "Xalqaro bozorlarga eksport qilish imkoniyati va valyuta daromadi." },
          { title: "ESG yondashuv", description: "Ekologik, ijtimoiy va boshqaruv standartlariga mos investitsiya." },
        ],
      },
      models: {
        title: "Investitsiya modellari",
        desc: "Sizning maqsadlaringizga mos variantni tanlang",
        popular: "Mashhur",
        minInvestment: "Min. investitsiya",
        period: "Qaytim muddati",
        readMore: "Batafsil ma'lumot",
        items: [
          { title: "To'liq loyiha", description: "0 dan tayyor issiqxonagacha - to'liq investitsiya loyihasi", period: "3-5 yil" },
          { title: "Hamkorlik", description: "Mavjud loyihaga qo'shilish va foiz olish", period: "2-4 yil" },
          { title: "Franchayzing", description: "UZ GROW brendi ostida mustaqil issiqxona", period: "3-5 yil" },
        ],
      },
      process: {
        title: "Investitsiya jarayoni",
        items: [
          { step: 1, title: "Murojaat", desc: "Ariza qoldiring" },
          { step: 2, title: "Tahlil", desc: "Loyihani o'rganish" },
          { step: 3, title: "Shartnoma", desc: "Kelishuv imzolash" },
          { step: 4, title: "Daromad", desc: "Foyda olish" },
        ],
      },
      cta: {
        title: "Investitsiya imkoniyatlarini muhokama qilaylik",
        desc: "Bizning mutaxassislarimiz sizga eng mos investitsiya modelini tanlashda yordam beradi.",
      },
    },
    techPage: {
      hero: {
        badge: "Texnologiya",
        title: "Zamonaviy issiqxona texnologiyalari",
        desc: "Eng so'nggi innovatsiyalar va texnologiyalar yordamida yuqori samaradorlikka erishish.",
      },
      benefits: [
        { label: "Hosildorlik oshishi" },
        { label: "Suv tejash" },
        { label: "Energiya tejash" },
        { label: "Kamroq kasallik" },
      ],
      technologies: {
        title: "Biz foydalanadigan texnologiyalar",
        desc: "Har bir issiqxona loyihasi uchun eng mos texnologiyalarni tanlaymiz",
        items: [
          {
            title: "Iqlim nazorati",
            description: "Avtomatlashtirilgan isitish va sovutish tizimi orqali optimal harorat va namlikni saqlash.",
            features: ["Harorat sensori", "Avtomatik ventilyatsiya", "Namlik nazorati", "Iqlim ma'lumotlari"],
          },
          {
            title: "Tomchilatib sug'orish",
            description: "Suv va o'g'itlarni to'g'ridan-to'g'ri ildizga yetkazish orqali 40% gacha suv tejash.",
            features: ["Aniq dozalash", "Suv tejash", "Avtomatik jadval", "Sensor monitoring"],
          },
          {
            title: "CO₂ tizimi",
            description: "Karbonat angidrid darajasini nazorat qilish orqali fotosintezni tezlashtirish.",
            features: ["CO₂ generatori", "Avtomatik nazorat", "Sensor tizimi", "Xavfsizlik"],
          },
          {
            title: "Avtomatlashtirish",
            description: "Barcha tizimlarni markaziy boshqaruv paneli orqali masofadan nazorat qilish.",
            features: ["Mobil ilova", "Real-time monitoring", "Ogohlantirish tizimi", "Ma'lumot tahlili"],
          },
          {
            title: "Hydroponika",
            description: "Tuproqsiz yetishtirish texnologiyasi - yuqori hosildorlik, kam joy.",
            features: ["NFT tizimi", "DWC tizimi", "Aeroponika", "Vertikal ferma"],
          },
        ],
      },
      video: {
        title: "Texnologiyalarimiz amalda",
        desc: "Video orqali issiqxona texnologiyalarimiz bilan tanishing",
        subtitle: "Texnologiyalar haqida video",
      },
    },
},

  // ─────────────────────────────────────────────────────────────────
  // RUSSIAN
  // ─────────────────────────────────────────────────────────────────
  ru: {
    nav: {
      home: "Главная",
      greenhouse: "Типы теплиц",
      projects: "Проекты",
      news: "Новости",
      team: "Команда",
      contact: "Контакты",
      language: "Выберите язык",
    },
    common: {
      logoAlt: "Логотип UZ GROW",
      about: "О себе",
      portfolio: "Портфолио",
      mapAlt: "Карта UZ GROW",

      readMore: "Подробнее",
      contact: "Контакты",
      email: "Email",
      phone: "Телефон",
      address: "Адрес",
      year: "Год",
      location: "Местоположение",
      size: "Площадь",
      category: "Категория",
      all: "Все",
      completed: "Завершено",
      inProgress: "В процессе",
      previous: "Предыдущий",
      next: "Следующий",
      call: "Звонок",
      downloadResume: "Скачать резюме",
      sendEmail: "Отправить Email",
      makeCall: "Позвонить",
      features: "Особенности",
    },
    hero: {
      title: "Современные тепличные решения",
      subtitle: "Ведущая агроинжиниринговая компания Узбекистана",
      description:
        "Мы внедряем самые современные тепличные технологии и развиваем сельское хозяйство",
      cta: "Связаться",
      downloadCatalog: "Скачать каталог",
      tagline: "9+ лет опыта - 1500+ успешных проектов",
      stats: {
        experience: "Лет опыта",
        projects: "Успешных проектов",
        specialists: "Специалистов",
        countries: "Страны",
      },
      slides: {
        slide1: {
          quote:
            "Мы реализуем каждый проект с индивидуальным подходом и обеспечиваем удовлетворённость клиентов.",
          author: "Команда UZ GROW",
          role: "Специалисты по агроинжинирингу",
          cta: "Теплицы под ключ",
        },
        slide2: {
          quote:
            "Гарантируем достижение высокой урожайности с современными технологиями и опытной командой.",
          author: "Технический отдел",
          role: "Проектирование и строительство",
          cta: "Пластиковые теплицы",
        },
        slide3: {
          quote:
            "Снижайте затраты и увеличивайте доход с энергоэффективными и автоматизированными системами.",
          author: "Инновационный центр",
          role: "Современные решения",
          cta: "Стеклянные теплицы",
        },
        slide4: {
          quote:
            "От проектирования до полной реализации — сотрудничайте с нами и достигайте результатов.",
          author: "— Отдел услуг",
          role: "Комплексные решения",
          cta: "Оборудование и системы",
        },
      },
    },
    about: {
      office: "Офис UZ-GROW",
      aboutTitle: "О UZ GROW",

      tagline: "О нас",
      headline: "Компания с опытом более 9 лет рядом с вами в 5 странах",
      descriptionText:
        "UZ GROW — компания, работающая в сфере современного тепличного строительства и агроинжиниринга. Наша цель — развитие высокоэффективной, инновационной и экспортно-ориентированной тепличной инфраструктуры в Узбекистане.",
      aboutUsButton: "Подробнее о нас",
      experience: "Опыт",
      projects: "Проекты",
      clients: "Клиенты",
      countries: "Страны",
      mission: "Миссия",
      missionDesc:
        "Повышение доходов клиентов за счет реализации устойчивых и рентабельных тепличных проектов, соответствующих местным и международным стандартам.",
      vision: "Видение",
      visionDesc:
        "Стать ведущей агроинжиниринговой компанией в Центральной Азии и экспортировать современные теплицы.",
      valuesTitle: "Ценности",
      valuesAndRules: {
        desc: "Наши ценности — это основа нашей работы, нашей культуры и нашего будущего направления.",
      },
      values: ["Качество", "Инновации", "Доверие"],
      businessScopeTitle: "Сфера деятельности:",
      businessScopeDesc:
        "UZ-GROW — профессиональная компания, специализирующаяся на современных тепличных решениях и внедрении агротехнологий. Мы занимаемся строительством многопролетных пленочных теплиц, солнечных теплиц, теплиц для посева и выращивания рассады, теплиц для животноводства, систем гидропоники и умных теплиц с автоматизированным управлением. Также мы предоставляем комплексные услуги по изготовлению тепличных аксессуаров, реализации тепличных проектов различной сложности и внедрению современных водосберегающих систем орошения.",
      professionalTeamTitle: "Профессиональная команда:",
      professionalTeamDesc:
        "Команда UZ-GROW состоит из профессиональных дизайнеров, опытных технических инженеров и квалифицированных специалистов по монтажу. Мы ведем строгий контроль над всеми процессами от проектирования до монтажа и полного ввода в эксплуатацию. Каждая деталь обеспечивается в соответствии с высокими стандартами качества, что гарантирует нашим клиентам надёжный и долгосрочный результат.",
      descriptionTop:
        "Мы не обычная сельскохозяйственная компания — мы команда, специализирующаяся на тепличном инжиниринге, современных конструкциях и создании высокоэффективных агросистем. Наши технологии адаптированы к различным потребностям клиентов, будь то умная (smart) теплица или традиционная солнечная теплица — для каждого проекта мы предлагаем наиболее оптимальное решение. В частности, наш опыт проектирования многопролётных теплиц позволяет максимально эффективно использовать земельную площадь.",
      descriptionBottom:
        "Наша основная цель — развитие бизнеса наших клиентов путём предоставления высококачественных, эффективных и экономически выгодных агрорешений. Мы создаём системы, которые служат повышению урожайности, снижению затрат и обеспечению стабильного дохода. Выбирая нас, вы выбираете не просто услугу, а профессиональную команду, ответственно подходящую к своему делу. Мы готовы к долгосрочному сотрудничеству с вами, успешной реализации ваших проектов и совместному созданию яркого будущего. Где бы вы ни находились, мы можем предложить вам наиболее подходящее тепличное решение. Давайте вместе двигаться к успеху!",
    },
    services: {
      title: "Услуги",
      subtitle: "Полный цикл услуг",
      description:
        "От проектирования до полной реализации — сотрудничайте с нами и достигайте результатов",
      engineering: "Инжиниринг",
      engineeringDesc: "От проектирования до полной реализации",
      engineeringFullDesc:
        "Мы строим теплицы по полному циклу. Результат: энергосберегающая, высокопроизводительная современная теплица",
      engineeringFeatures: [
        "Металлическая конструкция",
        "Покрытие из поликарбоната или стекла",
        "Капельное орошение",
        "Автоматизированное управление",
      ],
      equipment: "Оборудование",
      equipmentDesc: "Современная автоматизация и технологии",
      equipmentFullDesc:
        "Мы предоставляем всё необходимое оборудование и системы для теплиц. Максимальная эффективность и надёжность",
      equipmentFeatures: [
        "Система контроля климата",
        "Капельное орошение",
        "Система удобрения и полива",
      ],
      consulting: "Консалтинг",
      consultingDesc: "Профессиональные консультации и проектирование",
      consultingFullDesc:
        "Наши опытные специалисты предложат вам лучшие решения. От проектирования до полной реализации",
      consultingFeatures: [
        "Обследование и анализ",
        "3D моделирование",
        "Техническая документация",
        "Экспортные направления",
        "Создание бизнес-модели",
      ],
    },
    map: {
      badge: "География",
      title: "География проектов",
      subtitle: "Опыт, начатый в Узбекистане, распространился на соседние страны",
      hubName: "Узбекистан",
      hubNote: "Главный офис — Ташкент",
      countries: [
        { code: "kz", name: "Казахстан", note: "Системы автоматизации" },
        { code: "kg", name: "Кыргызстан", note: "Строительство теплиц" },
        { code: "tj", name: "Таджикистан", note: "Системы орошения" },
        { code: "tm", name: "Туркменистан", note: "Стеллажные системы" },
      ],
    },
    projects: {
      title: "Проекты",
      subtitle: "Успешные тепличные проекты",
      description: "Президентские визиты и сельскохозяйственные проекты",
      categories: {
        all: "Все",
        presidential: "Президентский визит",
        international: "Международное сотрудничество",
        greenhouse: "Теплица",
        agriculture: "Сельское хозяйство",
      },
      vodiy: {
        title: "Проекты Водий",
        location: "Водий",
        size: "7 теплиц",
        description:
          "Комплекс из 7 современных теплиц, построенных в регионе Водий. Оснащены различными размерами и технологиями.",
        year: "2022-2024",
      },
      samarqand: {
        title: "Проекты Самарканда",
        location: "Самарканд",
        size: "2 теплицы",
        description:
          "2 крупные теплицы, построенные в Самаркандской области. Предназначены для президентских визитов и встреч с предпринимателями.",
        year: "2024",
      },
      international: {
        title: "Международные проекты",
        location: "Международный",
        size: "5 теплиц",
        description:
          "5 теплиц, построенных для международных клиентов. Современные решения по европейским стандартам.",
        year: "2023-2024",
      },
      agriculture: {
        title: "Сельскохозяйственные проекты",
        location: "Сельское хозяйство",
        size: "3 теплицы",
        description:
          "3 теплицы, построенные для развития сельского хозяйства. Современные системы орошения и климат-контроля.",
        year: "2024",
      },
      viewProject: "Подробнее",
      gallery: {
        title: "Галерея",
        description: "Наши проекты, мероприятия и визиты Президента",
        totalImages: "Всего изображений",
        projects: "Проекты",
        samarqand: "Самарканд",
      },
      viewGallery: "Смотреть галерею",
      close: "Закрыть",
      featured: "Популярный",
      investment: "Инвестиции",
      technologies: "Технологии",
      projectDetails: "Детали проекта",
      client: "Клиент",
      status: "Статус",
      notFound: "Проекты не найдены",
      tryDifferentSearch: "Попробуйте изменить условия поиска",
      items: [
        {
          title: "Сурхандарьинский Агрокомплекс",
          location: "Сурхандарьинская область",
          size: "3 теплицы",
          description:
            "Комплекс из 3 современных теплиц, построенных в Сурхандарьинской области. Крупный проект для президентского визита. Оснащён передовыми технологиями.",
          technologies: [
            "Поликарбонат",
            "Капельное орошение",
            "Климат-контроль",
          ],
          client: "Хокимият Сурхандарьинской области",
        },
        {
          title: "Андижанский Долинный Проект",
          location: "Андижанская долина",
          size: "7 теплиц",
          description:
            "Комплекс из 7 современных теплиц, построенных в Андижанской долине. Различные размеры, оснащены передовыми технологиями.",
          technologies: ["Поликарбонат", "Капельное орошение", "Автоматизация"],
          client: "Хокимият Андижанской области",
        },
        {
          title: "Самаркандский Агрокомплекс",
          location: "Самаркандская область",
          size: "2 теплицы",
          description:
            "2 крупные теплицы, построенные в Самаркандской области. Предназначены для президентского визита и встреч с предпринимателями. Оснащены современными системами автоматизации.",
          technologies: ["Стекло", "Климат-контроль", "Гидропоника"],
          client: "Хокимият Самаркандской области",
        },
        {
          title: "Международное Агро Сотрудничество",
          location: "Ташкент, Алматы",
          size: "3 проекта",
          description:
            "Цифровая образовательная платформа в Ташкенте и тепличные проекты в Алматы. Построены в соответствии с международными стандартами.",
          technologies: ["Умная теплица", "IoT", "AI мониторинг"],
          client: "Международные инвесторы",
        },
        {
          title: "Кашкадарьинский Тепличный Комплекс",
          location: "Кашкадарьинская область",
          size: "3 гектара",
          description:
            "Комплекс поликарбонатных теплиц, построенных в Кашкадарье. Оснащён современными технологиями. Обеспечивает эффективность круглый год.",
          technologies: ["Поликарбонат", "Переработка", "Энергосбережение"],
          client: "Ассоциация фермеров Кашкадарьи",
        },
        {
          title: "Термезский Виноградник",
          location: "Город Термез",
          size: "1.5 гектара",
          description:
            "Инновационный тепличный центр, построенный в городе Термез. Собрание самых современных агротехнологий Ближнего Востока.",
          technologies: [
            "Вертикальное земледелие",
            "LED освещение",
            "Водооборот",
          ],
          client: "Хокимият города Термез",
        },
      ],
    },
    team: {
      title: "Наша команда",
      subtitle: "Сильные и опытные специалисты",
      description:
        "Наша команда состоит из высококвалифицированных специалистов, которые каждый день работают ради вашего успеха",
      ourTeam: "Наша команда",
      experience: "Опыт",
      achievements: "Достижения",
      education: "Образование",
      skills: "Навыки",
      contact: "Контакты",
      members: {
        rustamjon: {
          name: "Рустамжон Рахмонов",
          position: "Основатель и Генеральный Директор",
          bio: "Узбекский инноватор и аграрный предприниматель. С 2017 года приносит информацию, доверие и результаты тысячам фермеров и агробизнес-предпринимателей в Центральной Азии.",
          experience: "6+ лет",
          achievements: [
            "200 000+ подписчиков",
            "1500+ успешных проектов",
            "Международные партнёрства",
          ],
          education: [
            "Институт сельского хозяйства",
            "Международный бизнес-менеджмент",
          ],
          skills: ["Агробизнес", "Инновации", "Проектирование", "Менеджмент"],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Ташкент, Узбекистан",
          linkedin: "#",
          twitter: "#",
          resume: "/RESUME 2025 (3).docx",
        },
        alisher: {
          name: "Алишер Мажидов",
          position: "Директор по маркетингу",
          bio: "Специалист по маркетингу и брендовым стратегиям. Отвечает за развитие имиджа компании и расширение клиентской базы.",
          experience: "6+ лет",
          achievements: [
            "20+ маркетинговых кампаний",
            "Развитие бренда",
            "Рост клиентской базы в 3 раза",
          ],
          education: ["Маркетинг", "Международный бизнес"],
          skills: [
            "Маркетинговая стратегия",
            "SMM",
            "Контент-маркетинг",
            "Аналитика",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Ташкент, Узбекистан",
          linkedin: "#",
          twitter: "#",
        },
        abdulloh: {
          name: "Абдуллох Абдурасулов",
          position: "Технический Директор",
          bio: "Специалист по строительству теплиц и технологиям. Внедряет современные агротехнологии с опытом более 6 лет.",
          experience: "6+ лет",
          achievements: [
            "50+ тепличных проектов",
            "Технические инновации",
            "Международные сертификаты",
          ],
          education: ["Строительная инженерия", "Системы автоматизации"],
          skills: [
            "Строительство теплиц",
            "Автоматизация",
            "3D моделирование",
            "Технический надзор",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Ташкент, Узбекистан",
          linkedin: "#",
          twitter: "#",
        },
        bobgulbaxor: {
          name: "Гулбахор Карабоева",
          position: "Финансовый Директор",
          bio: "Опытный специалист в области финансов и менеджмента. Обширный опыт в разработке финансовых стратегий и управлении бюджетом.",
          experience: "6+ лет",
          achievements: [
            "Финансовое планирование",
            "Оптимизация бюджета",
            "Подготовка отчётности",
          ],
          education: ["Экономика", "Финансы"],
          skills: [
            "Финансовый анализ",
            "Excel",
            "1C:Бухгалтерия",
            "Бюджетное планирование",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Ташкент, Узбекистан",
          linkedin: "#",
          twitter: "#",
          resume: "/Rezyume_Karaboyeva_Gulbaxor_YAKUNIY_FINAL-1.docx",
        },
        nafosat: {
          name: "Нафосат Ботирбоева",
          position: "Финансист",
          bio: "Специалист по финансовым процессам и отчётности.",
          experience: "3 года",
          achievements: [
            "Подготовка отчётов",
            "Ведение денежных потоков",
            "Восстановление бухгалтерии",
          ],
          education: [
            "Курс бухгалтерии",
            "Курс повышения квалификации юриста",
            "Курс Inplus",
          ],
          skills: ["1C", "Didox", "MyMehnat", "Отчёты"],
        },
        dilnoza: {
          name: "Дильноза Ризкиева",
          position: "Бухгалтер",
          bio: "Старший специалист по налоговому и бухгалтерскому учёту.",
          experience: "9+ лет",
          achievements: [
            "Главный бухгалтер",
            "Налоговые отчёты",
            "Специалист 1C 8.3.0",
          ],
          education: ["Moliya Studiya - Курс бухгалтерии (2021)"],
          skills: [
            "1C 8.3.0",
            "My.soliq.uz",
            "EDO / Didox",
            "Mehnat.uz",
            "Банк-клиент",
          ],
        },
        sardor: {
          name: "Сардор Абдутолипов",
          position: "Управляющий делами",
          bio: "Специалист по закупкам и бизнес-переговорам.",
          experience: "2+ года",
          achievements: [
            "Руководитель отдела закупок",
            "Финансовый анализ",
            "Маркетинговые стратегии",
          ],
          education: [
            "Международный эконом-бизнес банк — Финансовый аналитик (2028, не завершено)",
          ],
          skills: [
            "Активные продажи",
            "Бизнес-переговоры",
            "Финансовый менеджмент",
            "Маркетинг",
          ],
        },
      },
      achievementsLabel: "достижение",
    },
    greenhouse: {
      title: "Типы теплиц",
      subtitle: "Оптимальное решение для каждой культуры",
      description:
        "Ознакомьтесь с различными типами теплиц и выберите правильное решение для себя",
      glass: {
        title: "Стеклянная теплица",
        description:
          "Хорошо пропускает свет, прочная, но высокая стоимость строительства.",
        features: [
          "Максимальное освещение",
          "Долговечная",
          "Высокая эффективность",
        ],
        complexity: "Высокая",
        durability: "20+ лет",
        cost: "Высокая",
        maintenance: "Простое",
      },
      polycarbonate: {
        title: "Поликарбонатная теплица",
        description: "Лёгкая, доступная, хорошая изоляция. Служит много лет.",
        features: ["Лёгкий материал", "Хорошая изоляция", "Быстрая установка"],
        complexity: "Средняя",
        durability: "10-15 лет",
        cost: "Средняя",
        maintenance: "Простое",
      },
      film: {
        title: "Плёночная теплица",
        description: "Простая, доступная, быстрая установка, но недолговечная.",
        features: ["Дешевизна", "Быстрая установка", "Переносная"],
        complexity: "Низкая",
        durability: "5-8 лет",
        cost: "Низкая",
        maintenance: "Лёгкое",
      },
      mini: {
        title: "Мини-теплица",
        description:
          "Маленькая, доступная, идеальна для дома. Отлично для начинающих.",
        features: ["Маленький размер", "Идеальна для дома", "Простая сборка"],
        complexity: "Низкая",
        durability: "3-5 лет",
        cost: "Низкая",
        maintenance: "Очень лёгкое",
      },
      oddiy: {
        title: "Обычная теплица",
        description:
          "Обычная форма, доступная, простая в обслуживании. Отлично для небольших участков.",
        features: ["Обычная форма", "Простое обслуживание", "Много материалов"],
        complexity: "Низкая",
        durability: "3-7 лет",
        cost: "Низкая",
        maintenance: "Лёгкое",
      },
      gektar: {
        title: "Гектарная теплица",
        description:
          "Для больших площадей, надёжная конструкция, высокая урожайность.",
        features: [
          "Большая площадь",
          "Надёжная конструкция",
          "Высокая урожайность",
        ],
        complexity: "Высокая",
        durability: "15-20 лет",
        cost: "Высокая",
        maintenance: "Сложное",
      },
      polikarbanat: {
        title: "Поликарбонатная теплица (расширенная)",
        description:
          "Усовершенствованный поликарбонат, высокая изоляция и прочность. Для крупных проектов.",
        features: [
          "Усовершенствованный поликарбонат",
          "Высокая изоляция",
          "Для больших площадей",
        ],
        complexity: "Высокая",
        durability: "15-20 лет",
        cost: "Высокая",
        maintenance: "Умеренное",
      },
      vertical: {
        title: "Продукция теплиц",
        description:
          "Свежая, качественная и экологически чистая тепличная продукция. Доставляется в любой сезон.",
        features: [
          "Свежее и натуральное",
          "Гарантия высокого качества",
          "Доставка в любой сезон",
        ],
        complexity: "Высокая",
        durability: "10-15 лет",
        cost: "Высокая",
        maintenance: "Сложное",
      },
      tunnel: {
        title: "Туннельная теплица",
        description:
          "Простая, доступная, быстрая установка. Удобна для начинающих.",
        features: ["Простая", "Доступная", "Быстрая установка"],
        complexity: "Низкая",
        durability: "5-8 лет",
        cost: "Низкая",
        maintenance: "Лёгкое",
      },
      industrial: {
        title: "Промышленная теплица",
        description:
          "Для больших площадей, автоматизированная, высокая эффективность.",
        features: [
          "Большие площади",
          "Автоматизированная",
          "Высокая эффективность",
        ],
        complexity: "Высокая",
        durability: "25+ лет",
        cost: "Высокая",
        maintenance: "Сложное",
      },
      hydroponic: {
        title: "Гидропонная теплица",
        description:
          "Беспочвенное выращивание, высокая урожайность, современная технология.",
        features: [
          "Беспочвенное выращивание",
          "Высокая урожайность",
          "Современная технология",
        ],
        complexity: "Высокая",
        durability: "15-20 лет",
        cost: "Высокая",
        maintenance: "Сложное",
      },
      comparison: {
        title: "Сравнительная таблица",
        subtitle: "Сравните типы теплиц",
        material: "Материал",
        light: "Светопропускаемость",
        durability: "Прочность",
        cost: "Стоимость",
        maintenance: "Обслуживание",
        serviceLife: "Срок службы",
      },
      guide: {
        title: "Как выбрать правильную теплицу?",
        beginners: "Для начинающих",
        beginnersDesc:
          "Обычная или туннельная теплица — доступная и простая в управлении",
        professionals: "Для профессионалов",
        professionalsDesc:
          "Поликарбонат или стекло — долговечные и эффективные",
        business: "Для бизнеса",
        businessDesc:
          "Промышленная, гидропонная или вертикальная — максимальная эффективность",
        consult: "Консультация со специалистом",
      },
    },
    technology: {
      videoPlaceholder: "Разместить видео",

      title: "Технология",
      subtitle: "Современное оборудование и системы",
      description: "Мы предоставляем самые передовые агротехнологии",
      heating: {
        title: "Система отопления",
        description:
          "Современные системы отопления для обеспечения оптимальной температуры и экономии энергии.",
      },
      ventilation: {
        title: "Вентиляция и охлаждение",
        description:
          "Автоматизированные системы вентиляции и охлаждения для контроля климата.",
      },
      shelving: {
        title: "Система стеллажей",
        description:
          "Вертикальные стеллажи для эффективного использования пространства и повышения урожайности.",
      },
      irrigation: {
        title: "Система орошения",
        description:
          "Системы капельного орошения и гидропоники для экономии до 90% воды.",
      },
      automation: {
        title: "Автоматизация",
        description:
          "IoT датчики и алгоритмы AI для автоматического управления климатом.",
      },
    },
    contact: {
      title: "Контакты",
      subtitle: "Свяжитесь с нами",
      formTitle: "Отправить сообщение",
      name: "Имя",
      namePlaceholder: "Введите ваше имя",
      phone: "Телефон",
      phonePlaceholder: "+998 XX XXX XX XX",
      email: "Email",
      emailPlaceholder: "email@example.com",
      service: "Тип услуги",
      servicePlaceholder: "Выберите услугу",
      message: "Сообщение",
      messagePlaceholder: "Напишите ваше сообщение...",
      send: "Отправить",
      sending: "Отправка...",
      success: "Сообщение отправлено!",
      successMessage: "Мы свяжемся с вами в ближайшее время",
      newMessage: "Новое сообщение",
      errorTitle: "Произошла ошибка",
      errorMessage:
        "Сообщение не отправлено. Пожалуйста, попробуйте ещё раз или свяжитесь по телефону.",
      successHeader: "📧 Данные приняты!",
      successSubheader: "Ваше сообщение доставлено команде UZ GROW.",
      locationCity: "Ташкент, Узбекистан",
      coordinatesLabel: "Координаты",
      addressCopied: "Адрес скопирован!",
      infoTitle: "Контактная информация",
      workingHours: "Время работы",
      workingHoursDesc: "Свяжитесь с нами",
      monday: "Понедельник",
      friday: "Пятница",
      saturday: "Суббота",
      sunday: "Воскресенье",
      closed: "Выходной",
      socialMedia: "Социальные сети",
      followUs: "Присоединяйтесь к нам в социальных сетях",
      location: "Адрес",
      getDirections: "Построить маршрут",
      copyAddress: "Скопировать адрес",
      address: "г. Ташкент, Сиргалинский район, ул. Номданак, Зиёкор 6/9",
      phoneLabel: "Телефон",
      emailLabel: "Эл. почта",
      companyPhone: "+998555152223",
      companyPhone2: "+998994352313",
      companyEmail: "uzgrrow@gmail.com",
      website: "https://www.uzgrow.uz/",
      locationUrl:
        "https://yandex.ru/navi?rtext=41.202864,69.235732~41.202625,69.235384&rtt=auto",
      socialLinks: {
        facebook: "https://www.facebook.com/share/1DePjLwX79/",
        instagram:
          "https://www.instagram.com/uz.grow?igsh=MXMwN3lzaW95NTN1YQ==",
        telegram: "http://@Uz_Grow",
        youtube: "https://youtube.com/@rustamjonrakhmonov?si=9-OxlFiY0B875tD9",
        tiktok: "https://www.tiktok.com/@uz.grow",
      },
      services: {
        turnkey: "Строительство теплиц под ключ",
        engineering: "Агроинжиниринг",
        equipment: "Оборудование",
        consulting: "Агроконсалтинг",
        investment: "Инвестиции",
      },
    },
    footer: {
      brandName: "GROW AGRO TEAM",
      brandTagline: "СТРОИТЕЛЬНАЯ КОМПАНИЯ",
      brandDescription:
        "Современное строительство теплиц и строительные услуги в Узбекистане. Будущее начинается сегодня вместе с нами.",
      contact: "Контакты",
      services: "Услуги",
      company: "Компания",
      help: "Помощь",
      team: "Команда",
      allRightsReserved: "Все права защищены",
      links: {
        services: [
          { label: "Типы теплиц", href: "/issiqxona-turlari" },
          { label: "Проекты", href: "/loyihalar" },
          { label: "Оборудование", href: "/jixozlar" },
          { label: "Технологии", href: "/texnologiya" },
        ],
        company: [
          { label: "О нас", href: "/haqimizda" },
          { label: "Команда", href: "/rahbariyat" },
          { label: "Международное сотрудничество", href: "/xalqaro-hamkorlik" },
          { label: "Медиа-партнёрство", href: "/media-hamkorlik" },
        ],
        help: [
          { label: "Контакты", href: "/aloqa" },
          { label: "Галерея", href: "/gallery" },
          { label: "Политика конфиденциальности", href: "/maxfiylik-siyosati" },
          { label: "Условия использования", href: "/foydanalish-shartlari" },
        ],
      },
    },
  
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
      title: "Партнерское предложение UZ GROW",
      professionalism: "Наш профессионализм",
      realSector: "Знание реального сектора",
      realSectorDesc: "9+ лет прямого опыта в агросекторе. Прямая работа с фермерами, экспортерами и производителями",
      trustBrand: "Бренд, основанный на доверии",
      trustBrandDesc: "Честность, анализ на основе практики, обзор реальных жизненных событий. Мост доверия между брендами и потребителями",
      strongAudience: "Наличие сильной аудитории",
      strongAudienceDesc: "200,000+ подписчиков, 1.5-3 миллиона просмотров в месяц",
      statsTitle: "Наша статистика",
      totalReach: "Общий охват аудитории",
      audienceTitle: "Общая аудитория",
      geographicTitle: "Географический охват",
      tariffsTitle: "Рекламные тарифы",
      foreignPartnersTitle: "Иностранные партнеры",
      callNow: "Позвоните сейчас",
      freeConsultation: "Бесплатная консультация",
      footerDesc: "Позвоните нам прямо сейчас и получите бесплатную консультацию!",
      geographicCoverage: [
        { country: "Узбекистан", description: "Все области, активная аудитория преимущественно в сельской местности", flag: "🇺🇿" },
        { country: "Казахстан", description: "Алматы, Шымкент, Астана", flag: "🇰🇿" },
        { country: "Кыргызстан", description: "Большой интерес к видеоконтенту", flag: "🇰🇬" },
        { country: "Россия", description: "Диаспоры, связанные с агропромышленностью", flag: "🇷🇺" },
        { country: "Таджикистан", description: "Растет спрос на технологические интервью", flag: "🇹🇯" }
      ],
      partnershipPlans: [
        { name: "СТАНДАРТ", duration: "3 МЕСЯЦА", videos: 4, posts: 12, features: ["Stories, комментарии, статистика"] },
        { name: "ПРЕМИУМ", duration: "6 МЕСЯЦЕВ", videos: 8, posts: 24, features: ["Баннер, закрепленный пост, отчет"] },
        { name: "VIP", duration: "12 МЕСЯЦЕВ", videos: 14, posts: 38, features: ["Полная PR-поддержка, медиа-план"] }
      ],
      foreignPartners: [
        { name: "Мировое сельское хозяйство", description: "Одна из сильнейших компаний в сфере международных агровыставок!", partnership: "Сотрудничество с 2022 года" }
      ]
    },
    privacy: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: 5 апреля 2026 г.",
      sections: [
        {
          title: "1. Сбор данных",
          content: "В UZ GROW мы собираем от вас следующие личные данные:",
          items: [
            "Имя, фамилия, номер телефона, адрес электронной почты",
            "Данные компании и адрес",
            "Требования к проекту и технические характеристики",
            "Номер телефона доверия и дополнительные контакты",
            "Информация о вашем профиле в социальных сетях (только по согласованию)"
          ]
        },
        {
          title: "2. Цель использования данных",
          content: "Мы используем собранную информацию для следующих целей:",
          items: [
            "Предоставление и улучшение наших услуг",
            "Установление и поддержание связи с клиентами",
            "Проектирование и реализация проектов",
            "Выполнение контрактных и юридических обязательств",
            "Контроль качества наших услуг",
            "В маркетинговых и рекламных целях (только с вашего согласия)"
          ]
        },
        {
          title: "3. Раскрытие и передача данных",
          content: "Мы можем делиться вашими личными данными со следующими сторонами:",
          items: [
            "Партнерские компании и подрядчики (для выполнения проекта)",
            "Юридические органы (по требованию закона)",
            "Финансовые учреждения (для целей оплаты и налогообложения)",
            "Другие третьи стороны с вашего согласия"
          ]
        },
        {
          title: "4. Срок хранения данных",
          content: "Мы храним ваши данные в течение следующих периодов:",
          items: [
            "Контактные данные - в течение срока действия договора + 5 лет",
            "Проектная документация - 10 лет",
            "Финансовые данные - 7 лет",
            "Данные социальных сетей - 3 года"
          ],
          footer: "По истечении срока данные надежно удаляются."
        },
        {
          title: "5. Защита данных",
          content: "Мы принимаем следующие меры:",
          items: [
            "Используем технологию шифрования SSL",
            "Регулярно обновляем серверы",
            "Сотрудники подписывают соглашение о конфиденциальности",
            "Ограничиваем права доступа",
            "Проводим регулярные проверки безопасности"
          ]
        },
        {
          title: "6. Ваши права",
          content: "Вы имеете следующие права:",
          items: [
            "Право на просмотр своих данных",
            "Право на исправление неверных данных",
            "Право на удаление данных (на определенных условиях)",
            "Право на переносимость данных (portability)",
            "Право возражать против обработки"
          ]
        }
      ],
      note: "Примечание: Мы никогда не продаем ваши личные данные третьим лицам и не передаем их в нарушение закона.",
      contact: {
        title: "7. Контактная информация",
        description: "Если у вас есть вопросы по политике конфиденциальности, свяжитесь с нами по следующим адресам:"
      }
    },
    terms: {
      title: "Условия использования",
      lastUpdated: "Последнее обновление: 5 апреля 2026 г.",
      sections: [
        {
          title: "1. Общие положения",
          content: "Использование веб-сайта UZ GROW регулируется следующими условиями:",
          items: [
            "Вам должно быть не менее 18 лет, и вы должны быть полностью дееспособны",
            "Вы можете использовать веб-сайт только в соответствии с законом",
            "Уважайте права других пользователей",
            "Вы должны вводить свои личные данные правильно",
            "Не используйте наши услуги вопреки закону"
          ]
        },
        {
          title: "2. Услуги",
          content: "UZ GROW предоставляет следующие услуги:",
          items: [
            "Консалтинг по проектированию и строительству теплиц",
            "Услуги агроинжиниринга",
            "Технические решения и консультации",
            "Управление проектами",
            "Выбор материалов и оборудования"
          ],
          note: "Примечание: Мы не даем гарантии выполнения услуг, мы предоставляем только консультационные услуги."
        },
        {
          title: "3. Платежи",
          content: "Условия и порядок оплаты:",
          items: [
            "Консалтинговые услуги оплачиваются авансом",
            "Оплата производится наличными или через банк",
            "Оплаченные услуги не подлежат возврату",
            "Для дополнительных услуг требуется отдельная оплата",
            "Все платежи документируются"
          ]
        },
        {
          title: "4. Ограничение ответственности",
          content: "UZ GROW ограничивает ответственность в следующих случаях:",
          items: [
            "При форс-мажорных обстоятельствах (стихийные бедствия, войны)",
            "При предоставлении клиентом неверной информации",
            "По вине третьих лиц",
            "В связи с изменением законодательства",
            "Из-за технических неисправностей (не по нашей вине)"
          ]
        },
        {
          title: "5. Интеллектуальная собственность",
          content: "Материалы сайта являются нашей интеллектуальной собственностью:",
          items: [
            "Все тексты, изображения, дизайн принадлежат нам",
            "Несанкционированное использование запрещено",
            "Использование материалов в коммерческих целях не допускается",
            "Перепечатка возможна только с нашего согласия"
          ]
        },
        {
          title: "6. Расторжение договора",
          content: "Договор расторгается в следующих случаях:",
          items: [
            "При согласии обеих сторон",
            "При нарушении условий одной из сторон",
            "При ведении деятельности, противоречащей закону",
            "При уведомлении за 15 дней"
          ]
        },
        {
          title: "7. Разрешение споров",
          content: "Все споры решаются в следующем порядке:",
          items: [
            "Попытка достижения соглашения путем переговоров",
            "Решение через соответствующие инструменты",
            "Обращение в Ташкентский городской суд",
            "На основании законов Республики Узбекистан"
          ]
        },
        {
          title: "8. Дополнительные условия",
          items: [
            "Настоящий договор составлен в соответствии с законами Республики Узбекистан",
            "Мы оставляем за собой право вносить изменения в договор",
            "Используя веб-сайт, вы принимаете эти условия",
            "Свяжитесь с нами, если у вас есть вопросы"
          ],
          companyName: "Агроинжиниринговая компания UZ GROW"
        }
      ]
    },
    internationalPage: {
      title: "Международное сотрудничество",
      description: "Совместные проекты и программы международного сотрудничества со странами Центральной Азии",
      projects: [
        {
          title: "Сотрудничество по автоматизации в Казахстане",
          description: "Совместный проект по развитию возобновляемых источников энергии между странами Центральной Азии",
          country: "Казахстан",
          status: "Активен",
          timeline: "2024-2026"
        },
        {
          title: "Система орошения в Таджикистане",
          description: "Программа развития сельского хозяйства путем внедрения современных технологий орошения",
          country: "Таджикистан",
          status: "В процессе",
          timeline: "2024-2025"
        },
        {
          title: "Теплица в Кыргызстане",
          description: "Международный проект по созданию цифровых образовательных платформ и повышению квалификации учителей",
          country: "Кыргызстан",
          status: "Запланировано",
          timeline: "2025-2027"
        },
        {
          title: "Стеллажная система в Туркменистане",
          description: "Стратегический проект по развитию международных транспортных путей и расширению торговых связей",
          country: "Туркменистан",
          status: "Активен",
          timeline: "2024-2028"
        }
      ]
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
    agro: {
      hero: {
        badge: "Агро-инжиниринг",
        title: "Агро-инжиниринг",
        desc: "Перенесите сельское хозяйство в будущее с помощью современных технологий и решений по автоматизации",
      },
      services: {
        title: "Наши агро-инжиниринговые услуги",
        desc: "Мы применяем самые современные технологии в сельском хозяйстве",
        items: [
          {
            title: "Системы автоматизации",
            description: "Полная автоматизация теплиц, климат-контроль и системы полива",
            features: [
              "Умный климат-контроль",
              "Автоматический полив",
              "Удалённый мониторинг",
              "Аналитика данных",
            ],
          },
          {
            title: "Гидропонные решения",
            description: "Технологии выращивания без почвы и системы экономии воды",
            features: [
              "Гидропонные системы",
              "Управление питанием растений",
              "Рециркуляция воды",
              "Светодиодное освещение",
            ],
          },
          {
            title: "Климат-контроль",
            description: "Системы автоматического контроля температуры, влажности и стеллажных систем",
            features: [
              "Контроль температуры",
              "Управление влажностью",
              "Стеллажные системы",
              "Вентиляция",
            ],
          },
          {
            title: "Аналитика данных",
            description: "Системы мониторинга состояния посевов и прогнозирования урожайности",
            features: [
              "Мониторинг в реальном времени",
              "Прогнозная аналитика",
              "Прогнозирование урожайности",
              "Контроль качества",
            ],
          },
        ],
      },
      technologies: {
        title: "Используемые технологии",
        desc: "Мы используем самые современные и надежные технологии",
        items: [
          { name: "IoT Сенсоры", description: "Современные датчики, измеряющие температуру, влажность, освещенность и влажность почвы" },
          { name: "Облачная платформа", description: "Возможность хранения всех данных в облаке и удаленного управления" },
          { name: "AI Аналитика", description: "Прогнозирование урожайности и оптимальные решения с использованием искусственного интеллекта" },
          { name: "Мобильные приложения", description: "Управление теплицей со смартфона через мобильные приложения" },
        ],
      },
      benefits: {
        title: "Преимущества агро-инжиниринга",
        desc: "Основные преимущества внедрения технологий",
        items: [
          { title: "Повышение урожайности", description: "С помощью современных технологий урожайность увеличивается на 30-50%" },
          { title: "Экономия ресурсов", description: "Автоматизация снижает потребление воды и энергии на 40%" },
          { title: "Экономия рабочей силы", description: "Автоматизация сокращает человеческий труд на 70%" },
          { title: "Улучшение качества", description: "Системы контроля улучшают качество продукции на 25%" },
        ],
      },
      process: {
        desc: "Как с нами работать",
        steps: ["Анализ и проект", "Выбор технологии", "Установка и настройка", "Поддержка"],
        start: "Начать",
      },
    },
    investor: {
      hero: {
        badge: "Для инвесторов",
        title: "Инвестиционные возможности в агропромышленности",
        desc: "UZ GROW предлагает сотрудничество по реализации высокорентабельных тепличных проектов.",
        pdf: "PDF презентация",
        contact: "Связаться",
        stats: [
          { value: "$2M+", label: "Общие инвестиции" },
          { value: "35%", label: "Средний ROI" },
          { value: "15+", label: "Инвесторов" },
          { value: "100%", label: "Успех" },
        ],
      },
      benefits: {
        title: "Преимущества инвестиций",
        desc: "Основные причины инвестирования в тепличные проекты",
        items: [
          { title: "Высокий ROI", description: "Высокая внутренняя норма доходности (IRR) и быстрая окупаемость в тепличных проектах." },
          { title: "Быстрый оборот", description: "Возможность получения урожая несколько раз в год и быстрооборачиваемый продукт." },
          { title: "Продовольственная безопасность", description: "Вклад в обеспечение продовольственной безопасности в Узбекистане." },
          { title: "Экспортный потенциал", description: "Возможность экспорта на международные рынки и валютный доход." },
          { title: "ESG подход", description: "Инвестиции, соответствующие экологическим, социальным и управленческим стандартам." },
        ],
      },
      models: {
        title: "Инвестиционные модели",
        desc: "Выберите вариант, соответствующий вашим целям",
        popular: "Популярный",
        minInvestment: "Мин. инвестиция",
        period: "Срок окупаемости",
        readMore: "Подробнее",
        items: [
          { title: "Полный проект", description: "От 0 до готовой теплицы - полный инвестиционный проект", period: "3-5 лет" },
          { title: "Сотрудничество", description: "Присоединение к существующему проекту и получение процентов", period: "2-4 года" },
          { title: "Франчайзинг", description: "Независимая теплица под брендом UZ GROW", period: "3-5 лет" },
        ],
      },
      process: {
        title: "Инвестиционный процесс",
        items: [
          { step: 1, title: "Обращение", desc: "Оставьте заявку" },
          { step: 2, title: "Анализ", desc: "Изучение проекта" },
          { step: 3, title: "Договор", desc: "Подписание соглашения" },
          { step: 4, title: "Доход", desc: "Получение прибыли" },
        ],
      },
      cta: {
        title: "Давайте обсудим инвестиционные возможности",
        desc: "Наши специалисты помогут вам выбрать наиболее подходящую инвестиционную модель.",
      },
    },
    techPage: {
      hero: {
        badge: "Технология",
        title: "Современные тепличные технологии",
        desc: "Достижение высокой эффективности с помощью последних инноваций и технологий.",
      },
      benefits: [
        { label: "Повышение урожайности" },
        { label: "Экономия воды" },
        { label: "Экономия энергии" },
        { label: "Меньше болезней" },
      ],
      technologies: {
        title: "Технологии, которые мы используем",
        desc: "Мы подбираем наиболее подходящие технологии для каждого тепличного проекта",
        items: [
          {
            title: "Климат-контроль",
            description: "Поддержание оптимальной температуры и влажности с помощью автоматизированной системы отопления и охлаждения.",
            features: ["Датчик температуры", "Автоматическая вентиляция", "Контроль влажности", "Климатические данные"],
          },
          {
            title: "Капельное орошение",
            description: "Экономия воды до 40% за счет подачи воды и удобрений непосредственно к корням.",
            features: ["Точная дозировка", "Экономия воды", "Автоматический график", "Мониторинг датчиков"],
          },
          {
            title: "Система CO₂",
            description: "Ускорение фотосинтеза за счет контроля уровня углекислого газа.",
            features: ["Генератор CO₂", "Автоматический контроль", "Система датчиков", "Безопасность"],
          },
          {
            title: "Автоматизация",
            description: "Удаленный контроль всех систем через центральную панель управления.",
            features: ["Мобильное приложение", "Мониторинг в реальном времени", "Система оповещения", "Анализ данных"],
          },
          {
            title: "Гидропоника",
            description: "Технология выращивания без почвы - высокая урожайность, мало места.",
            features: ["Система NFT", "Система DWC", "Аэропоника", "Вертикальная ферма"],
          },
        ],
      },
      video: {
        title: "Наши технологии в действии",
        desc: "Познакомьтесь с нашими тепличными технологиями через видео",
        subtitle: "Видео о технологиях",
      },
    },
},

  // ─────────────────────────────────────────────────────────────────
  // ENGLISH
  // ─────────────────────────────────────────────────────────────────
  en: {
    nav: {
      home: "Home",
      greenhouse: "Greenhouse Types",
      projects: "Projects",
      news: "News",
      team: "Team",
      contact: "Contact",
      language: "Choose Language",
    },
    common: {
      logoAlt: "UZ GROW Logo",
      about: "About",
      portfolio: "Portfolio",
      mapAlt: "UZ GROW Location Map",

      readMore: "Read More",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      address: "Address",
      year: "Year",
      location: "Location",
      size: "Size",
      category: "Category",
      all: "All",
      completed: "Completed",
      inProgress: "In Progress",
      previous: "Previous",
      next: "Next",
      call: "Call",
      downloadResume: "Download Resume",
      sendEmail: "Send Email",
      makeCall: "Make a call",
      features: "Features",
    },
    hero: {
      title: "Modern Greenhouse Solutions",
      subtitle: "Leading agro-engineering company in Uzbekistan",
      description:
        "We implement the most modern greenhouse technologies and develop agriculture",
      cta: "Contact Us",
      downloadCatalog: "Download Catalog",
      tagline: "9+ years experience - 1500+ successful projects",
      stats: {
        experience: "Years experience",
        projects: "Successful projects",
        specialists: "Specialists",
        countries: "Countries",
      },
      slides: {
        slide1: {
          quote:
            "We implement each project with an individual approach and ensure customer satisfaction.",
          author: "UZ GROW Team",
          role: "Agro-engineering Specialists",
          cta: "Turnkey Greenhouses",
        },
        slide2: {
          quote:
            "Achieve high yields with modern technologies and an experienced team of specialists.",
          author: "Technical Department",
          role: "Design and Construction",
          cta: "Plastic Greenhouses",
        },
        slide3: {
          quote:
            "Reduce costs and increase revenue with energy-efficient and automated systems.",
          author: "Innovation Center",
          role: "Modern Solutions",
          cta: "Glass Greenhouses",
        },
        slide4: {
          quote:
            "From design to full implementation - partner with us and achieve results.",
          author: "— Services Department",
          role: "Integrated Solutions",
          cta: "Equipment and Systems",
        },
      },
    },
    about: {
      office: "UZ-GROW Office",
      aboutTitle: "About UZ GROW",

      tagline: "About Us",
      headline: "Company with over 9 years of experience by your side in 5 countries",
      descriptionText:
        "UZ GROW is a company operating in the field of modern greenhouse construction and agro-engineering. Our goal is to develop highly efficient, innovative and export-oriented greenhouse infrastructure in Uzbekistan.",
      aboutUsButton: "Learn More About Us",
      experience: "Experience",
      projects: "Projects",
      clients: "Clients",
      countries: "Countries",
      mission: "Mission",
      missionDesc:
        "Increasing customer income through the implementation of sustainable and profitable greenhouse projects that meet local and international standards.",
      vision: "Vision",
      visionDesc:
        "To become a leading agro-engineering company in Central Asia and export modern greenhouses.",
      valuesTitle: "Values",
      valuesAndRules: {
        desc: "Our values are the foundation of our work, our culture and our future direction.",
      },
      values: ["Quality", "Innovation", "Trust"],
      businessScopeTitle: "Business Scope:",
      businessScopeDesc:
        "UZ-GROW is a professional company specialized in implementing modern greenhouse solutions and agrotechnologies. We are engaged in the construction of multi-span film greenhouses, solar greenhouses, planting and seedling greenhouses, livestock greenhouses, hydroponics systems, and smart greenhouses with automated control. We also provide comprehensive services for the preparation of greenhouse accessories, implementation of greenhouse projects of varying complexity, and introduction of modern water-saving irrigation systems.",
      professionalTeamTitle: "Professional Team:",
      professionalTeamDesc:
        "The UZ-GROW team consists of professional designers, experienced technical engineers, and qualified mounting specialists. We lead all processes from design to installation and full commissioning under strict control. Every detail is ensured to meet high quality standards, providing our clients with reliable and long-term results.",
      descriptionTop:
        "We are not an ordinary agricultural company — we are a team specialized in greenhouse engineering, modern constructions, and creating high-efficiency agro systems. Our technologies are adapted to various client needs, whether it's a smart greenhouse or a traditional solar greenhouse — we offer the most optimal solution for every project. In particular, our experience in designing multi-span greenhouses allows for the most efficient use of land area.",
      descriptionBottom:
        "Our main goal is to develop our customers' business by providing high-quality, efficient, and economically beneficial agro solutions. We create systems that serve to increase yields, reduce costs, and ensure stable income. By choosing us, you select not a simple service, but a professional team that approaches its work responsibly. We are ready for long-term cooperation with you, successful implementation of your projects, and creating a bright future together. Wherever you are, we can offer the most suitable greenhouse solution. Let's move towards success together!",
    },
    services: {
      title: "Services",
      subtitle: "Full cycle services",
      description:
        "From design to full implementation - partner with us and achieve results",
      engineering: "Engineering",
      engineeringDesc: "From design to full implementation",
      engineeringFullDesc:
        "We build greenhouses on a full cycle basis. Result: energy-efficient, high-yield modern greenhouse",
      engineeringFeatures: [
        "Metal construction",
        "Polycarbonate or glass covering",
        "Drip irrigation",
        "Automated control",
      ],
      equipment: "Equipment",
      equipmentDesc: "Modern automation and technologies",
      equipmentFullDesc:
        "We provide all necessary equipment and systems for greenhouses. Maximum efficiency and reliability",
      equipmentFeatures: [
        "Climate control system",
        "Drip irrigation",
        "Fertilization and irrigation system",
      ],
      consulting: "Consulting",
      consultingDesc: "Professional consulting and design",
      consultingFullDesc:
        "Our experienced specialists offer you the best solutions. From design to full implementation.",
      consultingFeatures: [
        "Inspection and analysis",
        "3D modeling",
        "Technical documentation",
        "Export directions",
        "Business model creation",
      ],
    },
    map: {
      badge: "Geography",
      title: "Project geography",
      subtitle: "Experience that began in Uzbekistan has spread to neighbouring countries",
      hubName: "Uzbekistan",
      hubNote: "Head office — Tashkent",
      countries: [
        { code: "kz", name: "Kazakhstan", note: "Automation systems" },
        { code: "kg", name: "Kyrgyzstan", note: "Greenhouse construction" },
        { code: "tj", name: "Tajikistan", note: "Irrigation systems" },
        { code: "tm", name: "Turkmenistan", note: "Shelving systems" },
      ],
    },
    projects: {
      title: "Projects",
      subtitle: "Successful greenhouse projects",
      description: "Presidential visits and agricultural projects",
      categories: {
        all: "All",
        presidential: "Presidential Visit",
        international: "International Cooperation",
        greenhouse: "Greenhouse",
        agriculture: "Agriculture",
      },
      vodiy: {
        title: "Vodiy Projects",
        location: "Vodiy",
        size: "7 greenhouses",
        description:
          "A complex of 7 modern greenhouses built in the Vodiy region. Equipped with various sizes and technologies.",
        year: "2022-2024",
      },
      samarqand: {
        title: "Samarkand Projects",
        location: "Samarkand",
        size: "2 greenhouses",
        description:
          "2 large greenhouses built in the Samarkand region. Designed for presidential visits and meetings with entrepreneurs.",
        year: "2024",
      },
      international: {
        title: "International Projects",
        location: "International",
        size: "5 greenhouses",
        description:
          "5 greenhouses built for international clients. Modern solutions according to European standards.",
        year: "2023-2024",
      },
      agriculture: {
        title: "Agriculture Projects",
        location: "Agriculture",
        size: "3 greenhouses",
        description:
          "3 greenhouses built for agricultural development. Modern irrigation and climate control systems.",
        year: "2024",
      },
      viewProject: "View Details",
      gallery: {
        title: "Gallery",
        description: "Our projects, events and Presidential visits",
        totalImages: "Total Images",
        projects: "Projects",
        samarqand: "Samarkand",
      },
      viewGallery: "View Gallery",
      close: "Close",
      featured: "Featured",
      investment: "Investment",
      technologies: "Technologies",
      projectDetails: "Project Details",
      client: "Client",
      status: "Status",
      notFound: "No projects found",
      tryDifferentSearch: "Try changing the search criteria",
      items: [
        {
          title: "Surkhandarya Agro Complex",
          location: "Surkhandarya Region",
          size: "3 greenhouses",
          description:
            "A complex of 3 modern greenhouses built in Surkhandarya Region. A major project designed for the Presidential visit. Equipped with the most advanced technologies.",
          technologies: ["Polycarbonate", "Drip Irrigation", "Climate Control"],
          client: "Surkhandarya Region Administration",
        },
        {
          title: "Andijan Valley Project",
          location: "Andijan Valley",
          size: "7 greenhouses",
          description:
            "A complex of 7 modern greenhouses built in Andijan Valley. Various sizes, equipped with advanced technologies.",
          technologies: ["Polycarbonate", "Drip Irrigation", "Automation"],
          client: "Andijan Region Administration",
        },
        {
          title: "Samarkand Agro Complex",
          location: "Samarkand Region",
          size: "2 greenhouses",
          description:
            "2 large greenhouses built in Samarkand Region. Designed for presidential visits and entrepreneur meetings. Equipped with modern automation systems.",
          technologies: ["Glass", "Climate Control", "Hydroponic"],
          client: "Samarkand Region Administration",
        },
        {
          title: "International Agro Partnership",
          location: "Tashkent, Almaty",
          size: "3 projects",
          description:
            "Digital education platform in Tashkent and greenhouse projects in Almaty. Built according to international standards.",
          technologies: ["Smart Greenhouse", "IoT", "AI Monitoring"],
          client: "International Investor Groups",
        },
        {
          title: "Kashkadarya Greenhouse Complex",
          location: "Kashkadarya Region",
          size: "3 hectares",
          description:
            "A polycarbonate greenhouse complex built in Kashkadarya. Equipped with modern technologies. Ensures year-round efficiency.",
          technologies: ["Polycarbonate", "Recycling", "Energy Saving"],
          client: "Kashkadarya Farmers' Association",
        },
        {
          title: "Termez Grape Garden",
          location: "Termez City",
          size: "1.5 hectares",
          description:
            "An innovative greenhouse center built in Termez City. A collection of the most modern agrotechnologies of the Near East.",
          technologies: ["Vertical Farming", "LED Lighting", "Water Recycling"],
          client: "Termez City Administration",
        },
      ],
    },
    team: {
      title: "Our Team",
      subtitle: "Strong and experienced specialists",
      description:
        "Our team consists of the highest qualified specialists who work every day for your success",
      ourTeam: "Our Team",
      experience: "Experience",
      achievements: "Achievements",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
      members: {
        rustamjon: {
          name: "Rustamjon Rahmonov",
          position: "Founder and CEO",
          bio: "Uzbek innovator and agricultural entrepreneur. Since 2017, he has been bringing information, trust and results to thousands of farmers and agricultural entrepreneurs in Central Asia.",
          experience: "6+ years",
          achievements: [
            "200,000+ subscribers",
            "1500+ successful projects",
            "International partnerships",
          ],
          education: [
            "Agricultural Institute",
            "International business management",
          ],
          skills: ["Agribusiness", "Innovation", "Design", "Management"],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Tashkent, Uzbekistan",
          linkedin: "#",
          twitter: "#",
          resume: "/RESUME 2025 (3).docx",
        },
        alisher: {
          name: "Alisher Majidov",
          position: "Marketing Director",
          bio: "Specialist in marketing and brand strategies. Responsible for developing the company's image and expanding the client base.",
          experience: "6+ years",
          achievements: [
            "20+ marketing campaigns",
            "Brand development",
            "3x client base growth",
          ],
          education: ["Marketing", "International business"],
          skills: [
            "Marketing strategy",
            "SMM",
            "Content marketing",
            "Analytics",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Tashkent, Uzbekistan",
          linkedin: "#",
          twitter: "#",
        },
        abdulloh: {
          name: "Abdulloh Abdurasulov",
          position: "Technical Director",
          bio: "Specialist in greenhouse construction and technologies. Implementing modern agro-technologies with 6+ years of experience.",
          experience: "6+ years",
          achievements: [
            "50+ greenhouse projects",
            "Technical innovations",
            "International certificates",
          ],
          education: ["Construction Engineering", "Automation Systems"],
          skills: [
            "Greenhouse construction",
            "Automation",
            "3D modeling",
            "Technical supervision",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Tashkent, Uzbekistan",
          linkedin: "#",
          twitter: "#",
        },
        bobgulbaxor: {
          name: "Gulbaxor Karaboyeva",
          position: "Financial Director",
          bio: "Experienced specialist in finance and management. Extensive experience in developing financial strategies and budget management.",
          experience: "6+ years",
          achievements: [
            "Financial planning",
            "Budget optimisation",
            "Reporting preparation",
          ],
          education: ["Economics", "Finance"],
          skills: [
            "Financial analysis",
            "Excel",
            "1C:Accounting",
            "Budget planning",
          ],
          email: "uzgrrow@gmail.com",
          phone: "+998 88 507 00 70",
          location: "Tashkent, Uzbekistan",
          linkedin: "#",
          twitter: "#",
          resume: "/Rezyume_Karaboyeva_Gulbaxor_YAKUNIY_FINAL-1.docx",
        },
        nafosat: {
          name: "Nafosat Botirboyeva",
          position: "Financier",
          bio: "Specialist in financial processes and reporting.",
          experience: "3 years",
          achievements: [
            "Preparation of reports",
            "Cash flow management",
            "Accounting restoration",
          ],
          education: [
            "Accounting course",
            "Lawyer qualification course",
            "Inplus course",
          ],
          skills: ["1C", "Didox", "MyMehnat", "Reports"],
        },
        dilnoza: {
          name: "Dilnoza Rizqiyeva",
          position: "Accountant",
          bio: "Senior specialist in tax and accounting.",
          experience: "9+ years",
          achievements: [
            "Chief Accountant",
            "Tax reports",
            "1C 8.3.0 specialist",
          ],
          education: ["Moliya Studiya - Accounting course (2021)"],
          skills: [
            "1C 8.3.0",
            "My.soliq.uz",
            "EDO / Didox",
            "Mehnat.uz",
            "Bank client",
          ],
        },
        sardor: {
          name: "Sardor Abdutolipov",
          position: "Operations Manager",
          bio: "Specialist in procurement and business negotiations.",
          experience: "2+ years",
          achievements: [
            "Head of procurement department",
            "Financial analysis",
            "Marketing strategies",
          ],
          education: [
            "International Economic Business Bank — Financial analyst (2028, in progress)",
          ],
          skills: [
            "Active sales",
            "Business negotiations",
            "Financial management",
            "Marketing",
          ],
        },
      },
      achievementsLabel: "achievement",
    },
    greenhouse: {
      title: "Greenhouse Types",
      subtitle: "Optimal solution for each crop",
      description:
        "Familiarize yourself with different types of greenhouses and choose the right solution for you",
      glass: {
        title: "Glass Greenhouse",
        description: "Passes light well, durable but high construction cost.",
        features: ["Maximum light", "Long-lasting", "High efficiency"],
        complexity: "High",
        durability: "20+ years",
        cost: "High",
        maintenance: "Easy",
      },
      polycarbonate: {
        title: "Polycarbonate Greenhouse",
        description:
          "Lightweight, affordable, good insulation. Serves for many years.",
        features: [
          "Lightweight material",
          "Good insulation",
          "Quick installation",
        ],
        complexity: "Medium",
        durability: "10-15 years",
        cost: "Medium",
        maintenance: "Easy",
      },
      film: {
        title: "Film Greenhouse",
        description: "Simple, affordable, quick installation, but not durable.",
        features: ["Cheap", "Quick installation", "Portable"],
        complexity: "Low",
        durability: "5-8 years",
        cost: "Low",
        maintenance: "Easy",
      },
      mini: {
        title: "Mini Greenhouse",
        description: "Small, affordable, ideal for home. Great for beginners.",
        features: ["Small size", "Ideal for home", "Simple assembly"],
        complexity: "Low",
        durability: "3-5 years",
        cost: "Low",
        maintenance: "Very easy",
      },
      oddiy: {
        title: "Simple Greenhouse",
        description:
          "Simple shape, affordable, easy to maintain. Great for small plots.",
        features: ["Simple shape", "Easy maintenance", "Lots of materials"],
        complexity: "Low",
        durability: "3-7 years",
        cost: "Low",
        maintenance: "Easy",
      },
      gektar: {
        title: "Hectare Greenhouse",
        description: "For large areas, reliable construction, high yield.",
        features: ["Large area", "Reliable construction", "High yield"],
        complexity: "High",
        durability: "15-20 years",
        cost: "High",
        maintenance: "Complex",
      },
      polikarbanat: {
        title: "Polycarbonate Greenhouse (Advanced)",
        description:
          "Advanced polycarbonate, high insulation and durability. For large-scale projects.",
        features: [
          "Advanced polycarbonate",
          "High insulation",
          "For large areas",
        ],
        complexity: "High",
        durability: "15-20 years",
        cost: "High",
        maintenance: "Moderate",
      },
      vertical: {
        title: "Greenhouse Products",
        description:
          "Fresh, high-quality and ecologically clean greenhouse products. Delivered in any season.",
        features: [
          "Fresh and Natural",
          "High Quality Guarantee",
          "Delivered regardless of season",
        ],
        complexity: "High",
        durability: "10-15 years",
        cost: "High",
        maintenance: "Complex",
      },
      tunnel: {
        title: "Tunnel Greenhouse",
        description:
          "Simple, affordable, quick installation. Great for beginners.",
        features: ["Simple", "Affordable", "Quick installation"],
        complexity: "Low",
        durability: "5-8 years",
        cost: "Low",
        maintenance: "Easy",
      },
      industrial: {
        title: "Industrial Greenhouse",
        description: "For large areas, automated, high efficiency.",
        features: ["Large areas", "Automated", "High efficiency"],
        complexity: "High",
        durability: "25+ years",
        cost: "High",
        maintenance: "Complex",
      },
      hydroponic: {
        title: "Hydroponic Greenhouse",
        description: "Soilless cultivation, high yield, modern technology.",
        features: ["Soilless cultivation", "High yield", "Modern technology"],
        complexity: "High",
        durability: "15-20 years",
        cost: "High",
        maintenance: "Complex",
      },
      comparison: {
        title: "Comparison Table",
        subtitle: "Compare greenhouse types",
        material: "Material",
        light: "Light transmittance",
        durability: "Durability",
        cost: "Cost",
        maintenance: "Maintenance",
        serviceLife: "Service life",
      },
      guide: {
        title: "How to Choose the Right Greenhouse?",
        beginners: "For beginners",
        beginnersDesc:
          "Simple or tunnel greenhouse - affordable and easy to manage",
        professionals: "For professionals",
        professionalsDesc: "Polycarbonate or glass - durable and efficient",
        business: "For business",
        businessDesc: "Industrial, hydroponic or vertical - maximum efficiency",
        consult: "Consultation with specialist",
      },
    },
    technology: {
      videoPlaceholder: "Place video",

      title: "Technology",
      subtitle: "Modern equipment and systems",
      description: "We provide the most advanced agro-technologies",
      heating: {
        title: "Heating System",
        description:
          "Modern heating systems to ensure optimal temperature and energy savings.",
      },
      ventilation: {
        title: "Ventilation and Cooling",
        description:
          "Automated ventilation and cooling systems for climate control.",
      },
      shelving: {
        title: "Shelving System",
        description:
          "Vertical shelving for efficient space utilization and increased yields.",
      },
      irrigation: {
        title: "Irrigation System",
        description:
          "Drip irrigation and hydroponic systems to save up to 90% water.",
      },
      automation: {
        title: "Automation",
        description:
          "IoT sensors and AI algorithms for automatic climate control.",
      },
    },
    contact: {
      title: "Contact",
      subtitle: "Get in touch with us",
      formTitle: "Send Message",
      name: "Name",
      namePlaceholder: "Enter your name",
      phone: "Phone",
      phonePlaceholder: "+998 XX XXX XX XX",
      email: "Email",
      emailPlaceholder: "email@example.com",
      service: "Service Type",
      servicePlaceholder: "Select a service",
      message: "Message",
      messagePlaceholder: "Write your message...",
      send: "Send",
      sending: "Sending...",
      success: "Message sent!",
      successMessage: "We'll contact you soon",
      newMessage: "New Message",
      errorTitle: "Something went wrong",
      errorMessage:
        "Your message was not sent. Please try again or contact us by phone.",
      successHeader: "📧 Data received!",
      successSubheader: "Your message has been delivered to the UZ GROW team.",
      locationCity: "Tashkent, Uzbekistan",
      coordinatesLabel: "Coordinates",
      addressCopied: "Address copied!",
      infoTitle: "Contact Information",
      workingHours: "Working Hours",
      workingHoursDesc: "Get in touch with us",
      monday: "Monday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      socialMedia: "Social Media",
      followUs: "Follow us on social media",
      location: "Location",
      getDirections: "Get Directions",
      copyAddress: "Copy Address",
      address: "Tashkent city, Sirgali district, Nomdanak street, Ziyokor 6/9",
      phoneLabel: "Phone",
      emailLabel: "Email",
      companyPhone: "+998555152223",
      companyPhone2: "+998994352313",
      companyEmail: "uzgrrow@gmail.com",
      website: "https://www.uzgrow.uz/",
      locationUrl:
        "https://yandex.ru/navi?rtext=41.202864,69.235732~41.202625,69.235384&rtt=auto",
      socialLinks: {
        facebook: "https://www.facebook.com/share/1DePjLwX79/",
        instagram:
          "https://www.instagram.com/uz.grow?igsh=MXMwN3lzaW95NTN1YQ==",
        telegram: "http://@Uz_Grow",
        youtube: "https://youtube.com/@rustamjonrakhmonov?si=9-OxlFiY0B875tD9",
        tiktok: "https://www.tiktok.com/@uz.grow",
      },
      services: {
        turnkey: "Turnkey Greenhouse Construction",
        engineering: "Agro-engineering",
        equipment: "Equipment",
        consulting: "Agro-consulting",
        investment: "Investment",
      },
    },
    footer: {
      brandName: "GROW AGRO TEAM",
      brandTagline: "CONSTRUCTION COMPANY",
      brandDescription:
        "Modern greenhouse construction and building services in Uzbekistan. The future starts today with us.",
      contact: "Contact",
      services: "Services",
      company: "Company",
      help: "Help",
      team: "Team",
      allRightsReserved: "All rights reserved",
      links: {
        services: [
          { label: "Greenhouse types", href: "/issiqxona-turlari" },
          { label: "Projects", href: "/loyihalar" },
          { label: "Equipment", href: "/jixozlar" },
          { label: "Technology", href: "/texnologiya" },
        ],
        company: [
          { label: "About us", href: "/haqimizda" },
          { label: "Team", href: "/rahbariyat" },
          {
            label: "International partnership",
            href: "/xalqaro-hamkorlik",
          },
          { label: "Media partnership", href: "/media-hamkorlik" },
        ],
        help: [
          { label: "Contact", href: "/aloqa" },
          { label: "Gallery", href: "/gallery" },
          { label: "Privacy policy", href: "/maxfiylik-siyosati" },
          { label: "Terms of use", href: "/foydanalish-shartlari" },
        ],
      },
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
      respectfully: "Respectfully, UZ GROW team!",
      title: "UZ GROW Partnership Proposal",
      professionalism: "Our Professionalism",
      realSector: "Knowing the Real Sector",
      realSectorDesc: "9+ years of direct experience in the agro-sector. Working directly with farmers, exporters, and manufacturers.",
      trustBrand: "Trust-based Brand",
      trustBrandDesc: "Honesty, analysis based on practice, review of real-life events. A bridge of trust between brands and consumers.",
      strongAudience: "Having a Strong Audience",
      strongAudienceDesc: "200,000+ subscribers, 1.5-3 million monthly views.",
      statsTitle: "Our Statistics",
      totalReach: "Total Audience Reach",
      audienceTitle: "General Audience",
      geographicTitle: "Geographic Coverage",
      tariffsTitle: "Advertising Tariffs",
      foreignPartnersTitle: "Foreign Partners",
      callNow: "Call Now",
      freeConsultation: "Free Consultation",
      footerDesc: "Call us right now and get a free consultation!",
      geographicCoverage: [
        { country: "Uzbekistan", description: "All regions, active audience mainly in rural areas", flag: "🇺🇿" },
        { country: "Kazakhstan", description: "Almaty, Shymkent, Astana", flag: "🇰🇿" },
        { country: "Kyrgyzstan", description: "Great interest in video content", flag: "🇰🇬" },
        { country: "Russia", description: "Diasporas related to agribusiness", flag: "🇷🇺" },
        { country: "Tajikistan", description: "Increasing demand for technological interviews", flag: "🇹🇯" }
      ],
      partnershipPlans: [
        { name: "STANDARD", duration: "3 MONTHS", videos: 4, posts: 12, features: ["Stories, comments, statistics"] },
        { name: "PREMIUM", duration: "6 MONTHS", videos: 8, posts: 24, features: ["Banner, pinned post, report"] },
        { name: "VIP", duration: "12 MONTHS", videos: 14, posts: 38, features: ["Full PR support, media plan"] }
      ],
      foreignPartners: [
        { name: "World Agriculture", description: "One of the strongest companies in the field of international agro-expos!", partnership: "In partnership since 2022" }
      ]
    },
    process: {
      title: "Our process",
    },
    investment: {
      roi: "Expected ROI",
    },
    ceo: {
      management: "Management",
      role: "CEO",
      experience: "Experience",
      projects: "Projects",
      subscribers: "Subscribers",
      skills: "Skills",
      education: "Education",
      contactDirector: "Contact the director",
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
      viewGallery: "View gallery",
      visitStats: "Visit statistics",
      enterpriseCount: "Number of enterprises",
      jobs: "Jobs",
      additionalResources: "Additional resources",
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: April 5, 2026",
      sections: [
        {
          title: "1. Data Collection",
          content: "At UZ GROW, we collect the following personal data from you:",
          items: [
            "First name, last name, phone number, email address",
            "Company information and address",
            "Project requirements and technical specifications",
            "Helpline phone number and additional contacts",
            "Social media profile information (only with consent)"
          ]
        },
        {
          title: "2. Purpose of Data Use",
          content: "We use the collected information for the following purposes:",
          items: [
            "Providing and improving our services",
            "Establishing and maintaining contact with customers",
            "Designing and implementing projects",
            "Fulfilling contractual and legal obligations",
            "Controlling the quality of our services",
            "For marketing and advertising purposes (only with your consent)"
          ]
        },
        {
          title: "3. Disclosure and Sharing of Data",
          content: "We may share your personal data with the following parties:",
          items: [
            "Partner companies and contractors (for project execution)",
            "Legal authorities (as required by law)",
            "Financial institutions (for payment and tax purposes)",
            "Other third parties with your consent"
          ]
        },
        {
          title: "4. Data Retention Period",
          content: "We keep your data for the following periods:",
          items: [
            "Contact information - during the contract period + 5 years",
            "Project documents - 10 years",
            "Financial data - 7 years",
            "Social media data - 3 years"
          ],
          footer: "After the period expires, the data will be securely deleted."
        },
        {
          title: "5. Data Protection",
          content: "We take the following measures:",
          items: [
            "We use SSL encryption technology",
            "We regularly update servers",
            "Employees sign a confidentiality agreement",
            "We restrict access rights",
            "We conduct regular security audits"
          ]
        },
        {
          title: "6. Your Rights",
          content: "You have the following rights:",
          items: [
            "Right to view your data",
            "Right to correct incorrect data",
            "Right to delete data (under certain conditions)",
            "Right to data portability",
            "Right to object to processing"
          ]
        }
      ],
      note: "Note: We never sell your personal data to third parties or share it in violation of the law.",
      contact: {
        title: "7. Contact Information",
        description: "If you have questions about the privacy policy, please contact us at the following addresses:"
      }
    },
    terms: {
      title: "Terms of Use",
      lastUpdated: "Last Updated: April 5, 2026",
      sections: [
        {
          title: "1. General Provisions",
          content: "The use of the UZ GROW website is subject to the following conditions:",
          items: [
            "You must be at least 18 years old and fully legally capable",
            "You may only use the website in accordance with the law",
            "Respect the rights of other users",
            "You must enter your personal data correctly",
            "Do not use our services contrary to the law"
          ]
        },
        {
          title: "2. Services",
          content: "UZ GROW provides the following services:",
          items: [
            "Consulting on greenhouse design and construction",
            "Agro-engineering services",
            "Technical solutions and advice",
            "Project management",
            "Selection of materials and equipment"
          ],
          note: "Note: We do not guarantee the performance of services, we only provide advice and consulting services."
        },
        {
          title: "3. Payments",
          content: "Payment terms and procedure:",
          items: [
            "Consulting services are paid in advance",
            "Payment is made in cash or via bank",
            "Paid services are non-refundable",
            "Separate payment is required for additional services",
            "All payments are documented"
          ]
        },
        {
          title: "4. Limitation of Liability",
          content: "UZ GROW limits liability in the following cases:",
          items: [
            "In case of force majeure (natural disasters, wars)",
            "When the customer provides incorrect information",
            "Through the fault of third parties",
            "Due to changes in legislation",
            "Due to technical failures (if not our fault)"
          ]
        },
        {
          title: "5. Intellectual Property",
          content: "Website materials are our intellectual property:",
          items: [
            "All texts, images, designs belong to us",
            "Unauthorized use is prohibited",
            "Use of materials for commercial purposes is not permitted",
            "Reprinting is possible only with our consent"
          ]
        },
        {
          title: "6. Termination of Contract",
          content: "The contract is terminated in the following cases:",
          items: [
            "When both parties agree",
            "When one party violates the terms",
            "When conducting activities contrary to the law",
            "When notified 15 days in advance"
          ]
        },
        {
          title: "7. Dispute Resolution",
          content: "All disputes are resolved in the following order:",
          items: [
            "Trying to reach an agreement through conversation",
            "Resolution through appropriate tools",
            "Appealing to the Tashkent City Court",
            "Based on the laws of the Republic of Uzbekistan"
          ]
        },
        {
          title: "8. Additional Terms",
          items: [
            "This agreement is drawn up in accordance with the laws of the Republic of Uzbekistan",
            "We reserve the right to make changes to the agreement",
            "By using the website you accept these terms",
            "Contact us if you have any questions"
          ],
          companyName: "UZ GROW Agro-Engineering Company"
        }
      ]
    },
    internationalPage: {
      title: "International Cooperation",
      description: "Joint projects and international cooperation programs with Central Asian countries",
      projects: [
        {
          title: "Kazakhstan Automation Partnership",
          description: "Joint project on the development of renewable energy sources among Central Asian countries",
          country: "Kazakhstan",
          status: "Active",
          timeline: "2024-2026"
        },
        {
          title: "Tajikistan Irrigation System",
          description: "Agricultural development program through the implementation of modern irrigation technologies",
          country: "Tajikistan",
          status: "In Progress",
          timeline: "2024-2025"
        },
        {
          title: "Kyrgyzstan Greenhouse",
          description: "International project to create digital education platforms and improve teacher qualifications",
          country: "Kyrgyzstan",
          status: "Planned",
          timeline: "2025-2027"
        },
        {
          title: "Turkmanistan Shelving System",
          description: "Strategic project on the development of international transport routes and expansion of trade relations",
          country: "Turkmanistan",
          status: "Active",
          timeline: "2024-2028"
        }
      ]
    },

    agro: {
      hero: {
        badge: "Agro-engineering",
        title: "Agro-engineering",
        desc: "Take agriculture to the future with modern technologies and automation solutions",
      },
      services: {
        title: "Our Agro-engineering Services",
        desc: "We apply the most modern technologies in agriculture",
        items: [
          {
            title: "Automation Systems",
            description: "Full automation of greenhouses, climate control, and irrigation systems",
            features: ["Smart Climate Control", "Auto Irrigation", "Remote Monitoring", "Data Analytics"],
          },
          {
            title: "Hydroponic Solutions",
            description: "Soilless cultivation technologies and water-saving systems",
            features: ["Hydroponic Systems", "Nutrient Management", "Water Recycling", "LED Lighting"],
          },
          {
            title: "Climate Control",
            description: "Automatic control systems for temperature, humidity, and shelving systems",
            features: ["Temperature Control", "Humidity Management", "Shelving Systems", "Ventilation"],
          },
          {
            title: "Data Analytics",
            description: "Monitoring systems for crop status and yield prediction",
            features: ["Real-time Monitoring", "Predictive Analytics", "Yield Forecasting", "Quality Control"],
          },
        ],
      },
      technologies: {
        title: "Technologies Used",
        desc: "We use the latest and most reliable technologies",
        items: [
          { name: "IoT Sensors", description: "Modern sensors measuring temperature, humidity, light, and soil moisture" },
          { name: "Claud Platform", description: "Ability to store all data in the cloud and manage remotely" },
          { name: "AI Analytics", description: "Yield prediction and optimal solutions using artificial intelligence" },
          { name: "Mobile Apps", description: "Greenhouse management from a smartphone via mobile applications" },
        ],
      },
      benefits: {
        title: "Agro-engineering Benefits",
        desc: "Main advantages of implementing technologies",
        items: [
          { title: "Increase Yield", description: "Yield increases by 30-50% with the help of modern technologies" },
          { title: "Resource Saving", description: "Automation reduces water and energy consumption by 40%" },
          { title: "Labor Saving", description: "Automation reduces human labor by 70%" },
          { title: "Quality Improvement", description: "Control systems improve product quality by 25%" },
        ],
      },
      process: {
        desc: "How to work with us",
        steps: ["Analysis and Project", "Technology Selection", "Installation and Setup", "Support"],
        start: "Get Started",
      },
    },
    investor: {
      hero: {
        badge: "For Investors",
        title: "Agribusiness Investment Opportunity",
        desc: "UZ GROW offers cooperation in implementing high-yield greenhouse projects.",
        pdf: "PDF presentation",
        contact: "Contact",
        stats: [
          { value: "$2M+", label: "Total Investment" },
          { value: "35%", label: "Average ROI" },
          { value: "15+", label: "Investors" },
          { value: "100%", label: "Success" },
        ],
      },
      benefits: {
        title: "Investment Benefits",
        desc: "Main reasons for investing in greenhouse projects",
        items: [
          { title: "High ROI", description: "High internal rate of return (IRR) and fast payback in greenhouse projects." },
          { title: "Fast Turnover", description: "Possibility of harvesting several times a year and fast-moving product." },
          { title: "Food Security", description: "Contribution to ensuring food security in Uzbekistan." },
          { title: "Export Potential", description: "Possibility of exporting to international markets and foreign currency income." },
          { title: "ESG Approach", description: "Investments meeting ecological, social, and governance standards." },
        ],
      },
      models: {
        title: "Investment Models",
        desc: "Choose the option that fits your goals",
        popular: "Popular",
        minInvestment: "Min. Investment",
        period: "Payback Period",
        readMore: "More Info",
        items: [
          { title: "Full Project", description: "From 0 to a ready greenhouse - full investment project", period: "3-5 years" },
          { title: "Partnership", description: "Joining an existing project and receiving interest", period: "2-4 years" },
          { title: "Franchising", description: "Independent greenhouse under the UZ GROW brand", period: "3-5 years" },
        ],
      },
      process: {
        title: "Investment Process",
        items: [
          { step: 1, title: "Application", desc: "Submit an application" },
          { step: 2, title: "Analysis", desc: "Project study" },
          { step: 3, title: "Contract", desc: "Signing an agreement" },
          { step: 4, title: "Profit", desc: "Receiving profit" },
        ],
      },
      cta: {
        title: "Let's discuss investment opportunities",
        desc: "Our specialists will help you choose the most suitable investment model.",
      },
    },
    techPage: {
      hero: {
        badge: "Technology",
        title: "Modern Greenhouse Technologies",
        desc: "Achieving high efficiency with the latest innovations and technologies.",
      },
      benefits: [
        { label: "Yield Increase" },
        { label: "Water Saving" },
        { label: "Energy Saving" },
        { label: "Less Disease" },
      ],
      technologies: {
        title: "Technologies We Use",
        desc: "We select the most suitable technologies for each greenhouse project",
        items: [
          {
            title: "Climate Control",
            description: "Maintaining optimal temperature and humidity through an automated heating and cooling system.",
            features: ["Temperature sensor", "Automatic ventilation", "Humidity control", "Climate data"],
          },
          {
            title: "Drip Irrigation",
            description: "Water savings of up to 40% by delivering water and fertilizers directly to the roots.",
            features: ["Precise dosing", "Water saving", "Automatic schedule", "Sensor monitoring"],
          },
          {
            title: "CO₂ System",
            description: "Accelerating photosynthesis by controlling carbon dioxide levels.",
            features: ["CO₂ generatori", "Automatic control", "Sensor system", "Safety"],
          },
          {
            title: "Automation",
            description: "Remote control of all systems through a central control panel.",
            features: ["Mobile app", "Real-time monitoring", "Warning system", "Data analysis"],
          },
          {
            title: "Hydroponics",
            description: "Soilless cultivation technology - high yield, low space.",
            features: ["NFT system", "DWC system", "Aeroponika", "Vertical farm"],
          },
        ],
      },
      video: {
        title: "Our Technologies in Action",
        desc: "Get to know our greenhouse technologies through video",
        subtitle: "Video about technologies",
      },
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// MDH (sobiq ittifoq) davlatlari — rus tili ko'rsatiladi
const CIS_COUNTRIES = [
  "RU", "BY", "KZ", "KG", "TJ", "TM", "AZ", "AM", "MD", "UA", "GE",
];

// Davlat kodi → til: UZ → uz, MDH → ru, qolganlar → en
function langFromCountry(code: string): Language {
  if (code === "UZ") return "uz";
  if (CIS_COUNTRIES.includes(code)) return "ru";
  return "en";
}

// IP aniqlanmasa brauzer tilidan taxmin qilinadi
function langFromBrowser(): Language {
  const l = (navigator.language || "").toLowerCase();
  if (l.startsWith("uz")) return "uz";
  const ruLangs = ["ru", "be", "kk", "ky", "tg", "tk", "az", "hy", "uk"];
  if (ruLangs.some((p) => l.startsWith(p))) return "ru";
  return "en";
}

type Overrides = Partial<Record<Language, Record<string, string>>>;

/**
 * "projects.items.0.title" kabi yo'l bo'yicha qiymatni almashtiradi.
 * Yo'l mavjud bo'lmasa (masalan kodda kalit o'chirilgan, lekin eski
 * override qolib ketgan) — jimgina o'tkazib yuboriladi.
 */
const RESERVED_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function setByPath(root: any, path: string, value: string): void {
  const keys = path.split(".");
  if (keys.some((k) => RESERVED_KEYS.has(k))) return;
  let node = root;
  for (let i = 0; i < keys.length - 1; i++) {
    node = node?.[keys[i]];
    if (typeof node !== "object" || node === null) return;
  }
  const last = keys[keys.length - 1];
  // Faqat mavjud matnni almashtiramiz — yangi kalit qo'shilmaydi
  if (typeof node?.[last] === "string") node[last] = value;
}

/**
 * Standart tarjimalar ustiga admin o'zgarishlarini qo'yadi.
 * Nusxa ko'chiriladi, shunda `translations` obyektining o'zi buzilmaydi.
 */
function applyOverrides(base: any, entries?: Record<string, string>): any {
  if (!entries || Object.keys(entries).length === 0) return base;
  const merged = structuredClone(base);
  for (const [path, value] of Object.entries(entries)) {
    setByPath(merged, path, value);
  }
  return merged;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("uz");
  const [overrides, setOverrides] = useState<Overrides>({});
  const [hidden, setHidden] = useState<Set<string>>(() => new Set());

  // Admin paneldan o'zgartirilgan matnlar. Yuklanmasa yoki xato bo'lsa,
  // sayt koddagi standart matnlar bilan ishlayveradi.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.ok) return;
        if (data.content) setOverrides(data.content);
        if (Array.isArray(data.hidden)) setHidden(new Set(data.hidden));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Til yordamchi texnologiyalar va qidiruv tizimlariga to'g'ri ko'rinsin
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    // Foydalanuvchi qo'lda tanlagan til har doim ustun
    const savedLang = localStorage.getItem("language");
    if (
      savedLang &&
      (savedLang === "uz" || savedLang === "ru" || savedLang === "en")
    ) {
      setCurrentLang(savedLang as Language);
      return;
    }

    // Avto-aniqlash: IP orqali davlat (localStorage'ga yozilmaydi —
    // qo'lda tanlash bo'lmaguncha har tashrifda qayta aniqlanadi)
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    const applyCountry = (code: string | undefined) => {
      if (cancelled) return;
      const c = (code || "").toUpperCase();
      setCurrentLang(c.length === 2 ? langFromCountry(c) : langFromBrowser());
    };

    fetch("https://api.country.is", { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => applyCountry(data?.country))
      .catch(() =>
        fetch("https://ipwho.is/?fields=country_code", {
          signal: controller.signal,
        })
          .then((r) => r.json())
          .then((data) => applyCountry(data?.country_code))
          .catch(() => {
            if (!cancelled) setCurrentLang(langFromBrowser());
          }),
      )
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem("language", lang);
  };

  // Har bir til uchun birlashtirilgan matnlar. Til yoki override
  // o'zgarmaguncha qayta hisoblanmaydi.
  const active = useMemo(
    () => applyOverrides(translations[currentLang], overrides[currentLang]),
    [currentLang, overrides],
  );
  const fallback = useMemo(
    () =>
      applyOverrides(translations[FALLBACK_LANG], overrides[FALLBACK_LANG]),
    [overrides],
  );

  const lookup = (source: any, key: string): any => {
    let value = source;
    for (const k of key.split(".")) {
      value = value?.[k];
    }
    return value;
  };

  const tObj = (key: string): any => {
    const value = lookup(active, key);
    // Kalit joriy tilda yo'q bo'lsa o'zbekchasi ko'rsatiladi — ekranga
    // kalitning o'zi ("investment.roi") chiqib qolmasligi uchun
    if (value === undefined && currentLang !== FALLBACK_LANG) {
      return lookup(fallback, key);
    }
    return value;
  };

  const t = (key: string): string => {
    const value = tObj(key);
    if (typeof value === "string") return value;
    return key;
  };

  const isHidden = (path: string) => hidden.has(path);

  const tList = (path: string, keys?: string[]) => {
    const source = tObj(path);
    if (!source || typeof source !== "object") return [];

    const entries: { key: string; index: number; value: any }[] = [];
    if (Array.isArray(source)) {
      source.forEach((value, index) =>
        entries.push({ key: String(index), index, value }),
      );
    } else {
      const order = keys ?? Object.keys(source);
      order.forEach((key, index) => {
        if (source[key] !== undefined)
          entries.push({ key, index, value: source[key] });
      });
    }

    return entries.filter((e) => !hidden.has(`${path}.${e.key}`));
  };

  return (
    <LanguageContext.Provider
      value={{ currentLang, setLanguage, t, tObj, isHidden, tList }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
