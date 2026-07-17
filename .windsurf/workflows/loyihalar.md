---
description: Project management workflow for UZ GROW website
---

# Loyihalar Boshqaruvi Ish Oqimi (Workflow)

## 1. Yangi Loyiha Qo'shish

### Qadam 1: Loyiha ma'lumotlarini tayyorlash

- Loyiha nomi
- Kategoriya (presidential, international, greenhouse, agriculture)
- Lokatsiya
- Hajmi (issiqxona soni)
- Tavsif
- Yil
- Rasmlar (2-3 ta)

### Qadam 2: Rasmlarni yuklash

// turbo

```bash
# Loyiha rasmlarini public/images/projects/ papkasiga yuklang
# Format: projects/[category]/[project-name]-[index].jpg
```

### Qadam 3: Loyiha ma'lumotlarini kiritish

`components/projects.tsx` faylida projects array ga yangi loyiha qo'shing:

```typescript
{
  id: nextId,
  title: "Loyiha nomi",
  category: "presidential", // yoki international, greenhouse, agriculture
  location: "Lokatsiya",
  size: "X ta issiqxona",
  description: "Loyiha haqida qisqacha tavsif...",
  images: [
    "/images/projects/[category]/[project-name]-1.jpg",
    "/images/projects/[category]/[project-name]-2.jpg"
  ],
  year: "2024"
}
```

### Qadam 4: Tarjimalarni qo'shish

`contexts/LanguageContext.tsx` faylida translations obyektiga yangi loyiha tarjimalarini qo'shing:

```typescript
// Uzbek
uz: {
  projects: {
    titles: {
      [projectId]: "Loyiha nomi (uzbekcha)"
    },
    descriptions: {
      [projectId]: "Loyiha tavsifi (uzbekcha)"
    }
  }
},

// Russian
ru: {
  projects: {
    titles: {
      [projectId]: "Название проекта (русский)"
    },
    descriptions: {
      [projectId]: "Описание проекта (русский)"
    }
  }
},

// English
en: {
  projects: {
    titles: {
      [projectId]: "Project Name (english)"
    },
    descriptions: {
      [projectId]: "Project description (english)"
    }
  }
}
```

## 2. Loyihani Tahrirlash

### Qadam 1: Loyihani topish

`components/projects.tsx` faylidan kerakli loyihani toping

### Qadam 2: Ma'lumotlarni yangilash

- Loyiha ma'lumotlarini yangilang
- Rasmlarni almashtirishingiz mumkin
- Kategoriyani o'zgartirishingiz mumkin

### Qadam 3: Tarjimalarni yangilash

`contexts/LanguageContext.tsx` faylida mos tarjimalarni yangilang

## 3. Loyihani O'chirish

### Qadam 1: Loyihani topish

`components/projects.tsx` faylidan loyihani toping

### Qadam 2: Ma'lumotlarni o'chirish

- Projects array dan loyihani o'chiring
- Rasmlarni `public/images/projects/` papkasidan o'chiring

### Qadam 3: Tarjimalarni tozalash

`contexts/LanguageContext.tsx` faylidan loyiha tarjimalarini o'chiring

## 4. Loyihalarni Filtrlash

Loyihalar avtomatik ravishda quyidagi kategoriyalar bo'yicha filtrlanadi:

- **Presidential**: Prezident loyihalari
- **International**: Xalqaro loyihalar
- **Greenhouse**: Issiqxona loyihalari
- **Agriculture**: Qishloq xo'jaligi loyihalari

## 5. Testlash

### Qadam 1: Lokal testlash

// turbo

```bash
npm run dev
```

### Qadam 2: Brauzerda tekshirish

- `http://localhost:3000/loyihalar` sahifasini oching
- Yangi/qo'shilgan loyiha ko'rsatilishini tekshiring
- Filtrlash ishlashini tekshiring
- Til almashtirishda tarjimalar to'g'ri chiqishini tekshiring

### Qadam 3: Responsive testlash

- Mobile view da tekshiring
- Tablet view da tekshiring
- Desktop view da tekshiring

## 6. Productionga yuklash

### Qadam 1: Kodni tekshirish

// turbo

```bash
npm run lint
npm run type-check
```

### Qadam 2: Build qilish

// turbo

```bash
npm run build
```

### Qadam 3: Productionga yuklash

// turbo

```bash
npm run start
```

## 7. Qo'shimcha Amallar

### Rasmlarni optimallashtirish

- Rasmlar 1920x1080 piksel gacha bo'lishi kerak
- WebP formatda saqlash tavsiya etiladi
- Rasmlar hajmi 500KB dan oshmasligi kerak

### SEO optimallashtirish

- Loyiha nomlarida kalit so'zlardan foydalaning
- Tavsiflarda 150-200 ta belgi bo'lishi kerak
- Alt text larni qo'shing

### Performance optimallashtirish

- Rasmlarni lazy loading qilish
- Image komponentidan foydalaning
- Next.js Image optimallashtirishdan foydalaning

## 8. Xatoliklarni Tuzatish

### Umumiy xatoliklar:

1. **Rasm yuklanmadi** - Rasm yo'lini tekshiring
2. **Tarjima ko'rsatilmayapti** - LanguageContext ni tekshiring
3. **Filtrlash ishlamayapti** - Category ni tekshiring
4. **Responsive ishlamayapti** - CSS klasslarini tekshiring

### Debug qilish:

- Browser console ni tekshiring
- Network tab da rasm yuklanishini tekshiring
- React Developer Tools dan state ni tekshiring
