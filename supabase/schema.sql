-- UZ GROW — Supabase sxemasi
-- Supabase dashboard → SQL Editor ga shu faylni to'liq qo'yib, "Run" bosing.
-- Qayta ishga tushirish xavfsiz: hamma narsa "if not exists" bilan.

-- ---------- Murojaatlar (aloqa formasi) ----------
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text not null default '',
  service    text not null default '',
  message    text not null,
  lang       text not null default 'uz',
  ip         text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ---------- Yangiliklar ----------
create table if not exists public.news (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text not null,
  image_url  text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_created_at_idx on public.news (created_at desc);

-- ---------- Jamoa a'zolari ----------
create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  position   text not null,
  bio        text not null default '',
  avatar     text not null default '',
  experience text not null default '',
  email      text not null default '',
  phone      text not null default '',
  skills     text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_created_at_idx on public.team_members (created_at);

-- ---------- Sahifa matnlari (admin o'zgartirgan tarjimalar) ----------
-- Faqat FARQLAR saqlanadi: kalit bu yerda bo'lmasa, koddagi standart matn ishlatiladi.
create table if not exists public.content_overrides (
  lang       text not null check (lang in ('uz', 'ru', 'en')),
  key        text not null,
  value      text not null,
  updated_at timestamptz not null default now(),
  primary key (lang, key)
);

-- ---------- Rasm/video manzillari ----------
create table if not exists public.media_overrides (
  id         text primary key,
  url        text not null,
  updated_at timestamptz not null default now()
);

-- ---------- Xavfsizlik ----------
-- RLS yoqiladi va anon/authenticated uchun HECH QANDAY siyosat berilmaydi.
-- Natija: ommaviy kalit bilan bu jadvallarga umuman kirib bo'lmaydi.
-- Sayt ularga faqat server tomondan, service_role kaliti bilan murojaat qiladi
-- (service_role RLS ni chetlab o'tadi).
alter table public.leads             enable row level security;
alter table public.news              enable row level security;
alter table public.team_members      enable row level security;
alter table public.content_overrides enable row level security;
alter table public.media_overrides   enable row level security;

-- ---------- Fayllar uchun ombor ----------
-- "media" bucket'i SQL orqali emas, dashboard yoki API orqali yaratiladi
-- (Storage → New bucket → nomi "media", "Public bucket" belgilanadi).
-- storage sxemasiga SQL Editor'dan yozish ruxsat xatosi berishi mumkin,
-- va u xato butun skriptni bekor qilib yuboradi.
