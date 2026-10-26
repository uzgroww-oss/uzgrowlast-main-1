# UZ GROW — korporativ sayt

Issiqxona qurish va agro-injiniring kompaniyasi UZ GROW sayti: https://www.uzgrow.uz

- **Texnologiyalar:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Ma'lumotlar va fayllar:** Supabase (Postgres + Storage)
- **Hosting:** Vercel (`main` branch'ga push qilinganda avtomatik deploy)
- **Tillar:** o'zbek, rus, ingliz — brauzerda almashtiriladi (URL o'zgarmaydi)

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # keyin qiymatlarni to'ldiring
npm run dev                  # http://localhost:3000
```

| Buyruq | Vazifasi |
| --- | --- |
| `npm run dev` | Ishlab chiqish rejimi |
| `npm run build` | Production build |
| `npm run start` | Build qilingan saytni ishga tushirish |
| `npm run lint` | ESLint tekshiruvi |

## Muhit o'zgaruvchilari

To'liq izohlar `.env.example` da. Qisqacha:

| O'zgaruvchi | Majburiy | Vazifasi |
| --- | --- | --- |
| `SUPABASE_URL` | ha | Supabase loyiha manzili |
| `SUPABASE_SERVICE_ROLE_KEY` | ha | Yashirin server kaliti — hech qachon brauzerga, git'ga yoki chatga chiqarmang |
| `ADMIN_PASSWORD` | ha | `/admin` paroli. Bo'sh bo'lsa admin API yopiq (503) |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | yo'q | Saytdan kelgan murojaatlarni Telegram'ga yuborish |
| `NEXT_PUBLIC_SITE_URL` | yo'q | Asosiy manzil (default `https://www.uzgrow.uz`) — canonical, sitemap, OG uchun |

`.env.local` git'ga tushmaydi. Vercel'da xuddi shu qiymatlar
**Project → Settings → Environment Variables** bo'limida turishi kerak.

## Supabase

1. `supabase/schema.sql` ni Supabase **SQL Editor** da bir marta ishga tushiring.
2. **Storage** da `media` nomli **public** bucket yarating.
3. `https://<sayt>/api/health` ni oching — "HAMMASI ISHLAYAPTI" chiqishi kerak.

Bepul Supabase loyihasi 7 kun so'rovsiz qolsa pauza qilinadi. Buning oldini
olish uchun `.github/workflows/keep-alive.yml` kuniga 2 marta va
`vercel.json` dagi cron kuniga 1 marta `/api/health` ga murojaat qiladi.

## Kontent qanday tuzilgan

Saytdagi matn va rasmlarning **standart qiymatlari kodda** turadi, admin
panelda o'zgartirilgani esa **Supabase'da faqat farq** sifatida saqlanadi.
Shu sababli baza bo'sh bo'lsa ham sayt to'liq ishlaydi.

| Nima | Standart qiymat | O'zgartirishlar |
| --- | --- | --- |
| Matnlar (3 tilda) | `contexts/LanguageContext.tsx` | `content_overrides` jadvali |
| Rasmlar / video | `lib/media-registry.ts` | `media_overrides` jadvali |
| Yangiliklar, jamoa, murojaatlar | — | `news`, `team_members`, `leads` jadvallari |

Admin panel (`/admin`) sahifalar bo'yicha guruhlangan: qaysi kalit qaysi
sahifada ko'rinishi `lib/page-map.ts` da, kartochkalar ro'yxati
`lib/collections.ts` da, maydon nomlari `lib/field-labels.ts` da.

Server tomonda Supabase javoblari `lib/server/cache.ts` orqali qisqa muddat
keshlanadi va baza vaqtincha javob bermasa oxirgi ma'lum qiymat qaytariladi.

### Rasmlar

- Sayt rasmlari `public/images/` va `public/images/site/` da (tashqi
  hosting yo'q).
- Admin yuklagan fayllar to'g'ridan-to'g'ri brauzerdan Supabase Storage'ga
  ketadi (`/api/upload/sign` imzolangan havola beradi), shuning uchun Vercel'ning
  4.5 MB so'rov chegarasi ta'sir qilmaydi. Katta rasmlar yuklashdan oldin
  brauzerda siqiladi.

## SEO

- Har sahifa metadatasi `lib/seo.ts` dagi `pageMeta()` orqali beriladi:
  sarlavha, tavsif, o'z canonical manzili va 1200×630 ulashish rasmi
  (`public/images/og.jpg`).
- `"use client"` sahifalarda metadata o'sha papkadagi `layout.tsx` da.
- `sitemap.xml` va `robots.txt` kod orqali yaratiladi (`app/sitemap.ts`,
  `app/robots.ts`). Yangi ommaviy sahifa qo'shilsa, uni `lib/seo.ts` dagi
  `PUBLIC_ROUTES` ga yozing.

## Papkalar

```
app/                 sahifalar va API (app/api/*)
  admin/             admin panel
components/          sahifa bo'limlari (hero, projects, footer, ...)
  ui/                shadcn/ui asosiy komponentlari
contexts/            til (LanguageContext) va media (MediaContext)
lib/                 umumiy yordamchilar
  server/            faqat serverda ishlaydigan kod (Supabase, kesh, auth)
public/images/       sayt rasmlari
supabase/            ma'lumotlar bazasi sxemasi
```
