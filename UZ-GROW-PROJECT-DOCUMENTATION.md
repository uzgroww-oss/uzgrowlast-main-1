# UZ GROW Web Sayt - To'liq Loyiqa Hujjati

## Table of Contents

1. [Loyiha Umumiy Ma'lumotlari](#loyiha-umumiy-malumotlari)
2. [Texnologiya Stack](#texnologiya-stack)
3. [Arxitektura](#arxitektura)
4. [Fayl Strukturasi](#fayl-strukturasi)
5. [Komponentlar Tavsifi](#komponentlar-tavsifi)
6. [Multi-Language Tizimi](#multi-language-tizimi)
7. [Media Va Assetlar](#media-va-assetlar)
8. [UI/UX Design](#uiux-design)
9. [API Va Data Manbalari](#api-va-data-manbalari)
10. [Performance Optimizatsiyasi](#performance-optimizatsiyasi)
11. [Deployment](#deployment)

---

## Loyiha Umumiy Ma'lumotlari

### **Kompaniya Ma'lumotlari:**

- **Nomi:** UZ GROW Quruvchi Firmasi
- **Soxasi:** Issiqxona qurilishi, agro-injiniring, konsalting
- **Target:** O'zbekiston fermerlari va agrobiznes vakillari
- **Tillari:** O'zbek, Rus, Ingliz
- **Manzil:** Toshkent, O'zbekiston

### **Loyiha Maqsadi:**

Zamonaviy, responsive va multi-language veb-sayt orqali kompaniya xizmatlarini ko'rsatish, potensial mijozlar bilan aloqa o'rnatish va professional imij yaratish.

---

## Texnologiya Stack

### **Frontend Framework:**

```json
{
  "framework": "Next.js 16.2.0",
  "router": "App Router",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "ui": "Shadcn/ui + Lucide React"
}
```

### **Development Tools:**

```json
{
  "bundler": "Turbopack",
  "linter": "ESLint",
  "formatter": "Prettier",
  "packageManager": "npm"
}
```

---

## Arxitektura

### **Component Architecture:**

```
App Layout (root)
  Header (navigation, language switcher)
    Navigation Menu
    Language Switcher
    Mobile Menu
  Main Content
    Hero Section (video background)
    Services Section (image sliders)
    About Section (team, achievements)
    Projects Section (filterable gallery)
    Team Section (member profiles)
    Contact Section (form, info)
  Footer (links, social, copyright)
```

### **State Management:**

```typescript
// React Context API
LanguageContext: {
  language: 'uz' | 'ru' | 'en'
  setLanguage: (lang) => void
  t: (key: string) => string
}

// Local State
useState: activeService, activeImage, mobileMenu
useEffect: auto-rotate, language persistence
```

---

## Fayl Strukturasi

```
src/
app/
  globals.css              # Global styles, Tailwind config
  layout.tsx               # Root layout with providers
  page.tsx                 # Home page
  about/page.tsx           # About page
  services/page.tsx        # Services page
  issiqxona-turlari/page.tsx # Greenhouse types page
  loyihalar/page.tsx       # Projects page
  rahbariyat/page.tsx      # Team page
  aloqa/page.tsx           # Contact page

components/
  header.tsx               # Navigation header
  footer.tsx               # Footer component
  services.tsx             # Services with image slider
  about.tsx                # About section
  team.tsx                 # Team member profiles
  projects.tsx             # Projects gallery
  greenhouse-types.tsx     # Greenhouse types
  contact.tsx              # Contact form

contexts/
  LanguageContext.tsx      # Multi-language context

lib/
  utils.ts                 # Utility functions
  constants.ts             # App constants

types/
  index.ts                 # TypeScript types

images/
  team/                    # Team member photos
    1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg
  projects/                # Project images
  services/                # Service images

public/
  favicon.ico
  robots.txt
```

---

## Komponentlar Tavsifi

### **Header Component (`components/header.tsx`)**

```typescript
// Features:
- Logo and company name
- Navigation menu (Home, Services, Projects, Team, Contact)
- Language switcher (UZ, RU, EN)
- Mobile responsive menu
- Contact info (phone, email)
- Sticky navigation on scroll

// Structure:
<header className="bg-white shadow-sm sticky top-0 z-50">
  <nav className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      {/* Desktop Navigation */}
      {/* Language Switcher */}
      {/* Mobile Menu Button */}
    </div>
  </nav>
</header>
```

### **Services Component (`components/services.tsx`)**

```typescript
// Features:
- 3 main services (Engineering, Equipment, Consulting)
- Interactive service selection
- Auto-rotating image slider (5 images per service)
- Service descriptions and features
- Responsive card layout

// State Management:
const [activeService, setActiveService] = useState(0)
const [activeImage, setActiveImage] = useState(0)

// Auto-rotate Effect:
useEffect(() => {
  const interval = setInterval(() => {
    setActiveImage((prev) => (prev + 1) % 5)
  }, 3000)
  return () => clearInterval(interval)
}, [activeService])

// Image Sources:
- Service 0: /images/1.jpg, /images/2.jpg, /images/3.jpg, /images/4.jpg, /images/5.jpg
- Service 1: Same images (shared)
- Service 2: Same images (shared)
```

### **Team Component (`components/team.tsx`)**

```typescript
// Team Members Data:
const teamMembers = [
  {
    id: 1,
    name: "Rustamjon Rahmonov",
    position: "Asoschi va Bosh Direktor",
    avatar: "/images/team/1.jpg",
    bio: "O'zbekistonlik innovator agrofaol va tadbirkor...",
    experience: "4+ yillik",
    achievements: ["150,000+ obunachi", "2000+ muvaffaqiyatli loyiha"],
    // ... more data
  },
  // 4 more members with avatars 2.jpg, 3.jpg, 4.jpg, 5.jpg
]

// Features:
- Professional team member cards
- Avatar images from /images/team/
- Detailed profiles with skills and experience
- Responsive grid layout
- Social media links
```

### **About Component (`components/about.tsx`)**

```typescript
// Features:
- Company story and statistics
- Hero video background (4K quality)
- Team achievements
- Responsive layout
- Call-to-action buttons

// Video Configuration:
<video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="https://res.cloudinary.com/dnqi0bdjk/video/upload/v1775302096/FeHK2XpaBormS6BB4RJX_r_jqxaZ8CwE_xchfqo.mp4?w_1920&h_1080&f_auto&c_limit&cs_srgb&dpr_auto&fl_lossy" />
</video>
```

---

## Multi-Language Tizimi

### **LanguageContext Structure:**

```typescript
interface LanguageContextType {
  language: 'uz' | 'ru' | 'en'
  setLanguage: (lang: 'uz' | 'ru' | 'en') => void
  t: (key: string) => string
}

// Translation Keys Structure:
translations = {
  uz: {
    nav: { home: "Bosh sahifa", services: "Xizmatlar", ... },
    services: {
      engineering: "Injiniring",
      engineeringDesc: "Loyihalashdan to'liq amalga oshirishgacha",
      engineeringFeatures: ["Metal konstruktsiya", "Polikarbonat yoki shisha", ...],
      // ... all service translations
    },
    // ... complete translations for all components
  },
  ru: { /* Russian translations */ },
  en: { /* English translations */ }
}
```

### **Translation Coverage:**

- **Navigation:** All menu items
- **Services:** Titles, descriptions, features
- **Team:** Positions, skills, achievements
- **About:** Company story, statistics
- **Contact:** Form labels, placeholders
- **Greenhouse Types:** All 7 types with full details
- **Projects:** Categories, descriptions
- **UI Elements:** Buttons, labels, messages

---

## Media Va Assetlar

### **Cloudinary Integration:**

```typescript
// Video URLs:
const videos = {
  heroVideo:
    "https://res.cloudinary.com/dnqi0bdjk/video/upload/v1775302096/FeHK2XpaBormS6BB4RJX_r_jqxaZ8CwE_xchfqo.mp4",
  presidentialVideo:
    "https://res.cloudinary.com/dnqi0bdjk/video/upload/v1775302121/video_2026-04-04_10-35-19_r8tdyl.mp4",
};

// Image URLs:
const images = {
  service:
    "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775469212/37_2_ggepkx.jpg",
  team: "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775469214/38_2_wy9ces.jpg",
};
```

### **Local Asset Structure:**

```
images/
team/
  1.jpg    # Rustamjon Rahmonov
  2.jpg    # Azizbek Karimov
  3.jpg    # Abdulloh Abdurasulov
  4.jpg    # Alisher Majidov
  5.jpg    # Gulbaxor Karaboyeva

# Service Slider Images (shared across all services)
1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg

# Project Images
projects/
  presidential/
  international/
  greenhouse/
  agriculture/
```

---

## UI/UX Design

### **Color Palette:**

```css
:root {
  /* Primary Brand Colors */
  --primary: #22c55e; /* UZ GROW Green */
  --primary-foreground: #ffffff;

  /* Secondary Colors */
  --secondary: #f3f4f6;
  --secondary-foreground: #1f2937;

  /* Neutral Colors */
  --background: #ffffff;
  --foreground: #1f2937;
  --muted: #f9fafb;
  --muted-foreground: #6b7280;
  --border: #e5e7eb;
  --accent: #fbbf24; /* Yellow accent */
}
```

### **Typography:**

```css
/* Font Family */
font-family: 'Inter', system-ui, sans-serif;

/* Type Scale */
text-xs: 0.75rem    (12px)
text-sm: 0.875rem   (14px)
text-base: 1rem     (16px)
text-lg: 1.125rem   (18px)
text-xl: 1.25rem    (20px)
text-2xl: 1.5rem    (24px)
text-3xl: 1.875rem  (30px)
text-4xl: 2.25rem   (36px)
text-5xl: 3rem      (48px)
```

### **Responsive Breakpoints:**

```css
/* Mobile First Approach */
sm: 640px    /* Small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Small desktops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large desktops */
```

---

## API Va Data Manbalari

### **Mock Data Structure:**

```typescript
// Services Data
const services = [
  {
    id: 0,
    icon: Building2,
    title: "Injiniring",
    shortDesc: "Loyihalashdan to'liq amalga oshirishgacha",
    description: "Issiqxonalarni to'liq aylanma asosida quramiz...",
    features: [
      "Metal konstruktsiya",
      "Polikarbonat yoki shisha",
      "Tomchilatib sug'orish",
      "Avtomatlashtirilgan boshqaruv",
    ],
    image: "/images/1.jpg",
  },
  // Equipment and Consulting services...
];

// Team Data
const teamMembers = [
  {
    id: 1,
    name: "Rustamjon Rahmonov",
    position: "Asoschi va Bosh Direktor",
    avatar: "/images/team/1.jpg",
    bio: "O'zbekistonlik innovator agrofaol va tadbirkor...",
    experience: "4+ yillik",
    achievements: [
      "150,000+ obunachi",
      "2000+ muvaffaqiyatli loyiha",
      "Xalqaro hamkorliklar",
    ],
    education: ["Qishloq xo'jaligi instituti", "Xalqaro biznes menejmenti"],
    skills: ["Agrobiznes", "Innovatsiya", "Loyihalash", "Menejment"],
    contact: {
      email: "rustamjon@uzgrow.uz",
      phone: "+998 90 123-45-71",
      location: "Toshkent, O'zbekiston",
    },
  },
  // 4 more team members...
];

// Greenhouse Types Data
const greenhouseTypes = [
  {
    id: 1,
    title: "Shisha issiqxona",
    description: "Yorug'likni yaxshi o'tkazadi, mustahkam...",
    features: ["Maksimal yorug'lik", "Uzoq muddatli", "Yuqori samaradorlik"],
    complexity: "Yuqori",
    durability: "20+ yil",
    cost: "Yuqori",
    maintenance: "Oson",
    color: "bg-blue-500",
    icon: Glasses,
  },
  // 6 more greenhouse types including mini, oddiy, gektar, polikarbanat...
];

// Projects Data
const projects = [
  {
    id: 1,
    title: "Vodiy loyihasi",
    category: "presidential",
    location: "Vodiy",
    size: "7 issiqxona",
    description: "Vodiy mintaqasida qurilgan 7 ta zamonaviy issiqxona...",
    images: ["/images/projects/vodiy-1.jpg", "/images/projects/vodiy-2.jpg"],
    year: "2024",
  },
  // More projects with presidential, international, greenhouse, agriculture categories...
];
```

### **External URLs:**

```typescript
// Cloudinary URLs
const cloudinaryAssets = {
  videos: {
    hero: "https://res.cloudinary.com/dnqi0bdjk/video/upload/v1775302096/FeHK2XpaBormS6BB4RJX_r_jqxaZ8CwE_xchfqo.mp4",
    presidential:
      "https://res.cloudinary.com/dnqi0bdjk/video/upload/v1775302121/video_2026-04-04_10-35-19_r8tdyl.mp4",
  },
  images: {
    service1:
      "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775469212/37_2_ggepkx.jpg",
    service2:
      "https://res.cloudinary.com/dnqi0bdjk/image/upload/v1775469214/38_2_wy9ces.jpg",
  },
};

// Social Media URLs
const socialLinks = {
  instagram: "https://www.instagram.com/uz.grow?igsh=MXMwN3lzaW95NTN1YQ==",
  facebook: "https://www.facebook.com/share/1DePjLwX79/",
  youtube: "https://youtube.com/@rustamjonrakhmonov?si=9-OxlFiY0B875tD9",
  telegram: "http://@Uz_Grow",
};

// Contact Information
const contactInfo = {
  phone: "+998 55 515 22 33",
  email: "uzgrrow@gmail.com",
  address: "Toshkent, O'zbekiston",
};
```

---

## Performance Optimizatsiyasi

### **Image Optimization:**

```typescript
// Next.js Image Component
<Image
  src="/hero-image.jpg"
  alt="UZ GROW Services"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>

// Cloudinary Optimization
const optimizedImageUrl = (base_url) =>
  `${base_url}?w_800&h_600&f_auto&c_limit&cs_srgb&dpr_auto&fl_lossy`
```

### **Code Splitting:**

```typescript
// Dynamic Imports for Large Components
const Services = dynamic(() => import('@/components/services'), {
  loading: () => <div>Loading services...</div>,
  ssr: false
})

const Projects = dynamic(() => import('@/components/projects'), {
  loading: () => <div>Loading projects...</div>
})
```

### **SEO Optimization:**

```typescript
// Metadata Configuration
export const metadata = {
  title: "UZ GROW - Issiqxona Qurilishi",
  description:
    "O'zbekistonda zamonaviy issiqxona qurilishi va agro-injiniring xizmatlari",
  keywords: ["issiqxona", "qurilish", "agro-injiniring", "UZ GROW"],
  openGraph: {
    title: "UZ GROW Quruvchi Firmasi",
    description: "Professional issiqxona qurilishi xizmatlari",
    images: ["/og-image.jpg"],
  },
  alternates: {
    languages: {
      "uz-UZ": "/uz",
      "ru-RU": "/ru",
      "en-US": "/en",
    },
  },
};
```

---

## Deployment

### **Production Build:**

```bash
# Build Commands
npm run build          # Production build
npm run start          # Start production server
npm run lint           # Code quality check
npm run type-check     # TypeScript validation
```

### **Environment Variables:**

```bash
# .env.local
NEXT_PUBLIC_CLOUDINARY_URL=https://res.cloudinary.com/dnqi0bdjk
NEXT_PUBLIC_SITE_URL=https://uzgrow.uz
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
```

### **Vercel Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Custom Domain
vercel domains add uzgrow.uz
```

### **Performance Monitoring:**

```typescript
// Lighthouse Configuration
module.exports = {
  extends: "@lhci/default-config",
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "npm run start",
      url: ["http://localhost:3000"],
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
  },
};
```

---

## Qo'shimcha Ma'lumotlar

### **Cross-Browser Compatibility:**

- Chrome 90+
- Firefox 89+
- Safari 14+
- Edge 90+

### **Accessibility Features:**

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Focus management
- Semantic HTML5 elements

### **Security Measures:**

- Content Security Policy (CSP)
- XSS protection
- HTTPS enforcement
- Input validation
- Secure headers

### **Analytics Integration:**

```typescript
// Google Analytics
import { Analytics } from "@vercel/analytics/react";

// Custom Events
const trackEvent = (action: string, category: string, label?: string) => {
  gtag("event", action, {
    event_category: category,
    event_label: label,
  });
};
```

---

## Test Coverage

### **Unit Tests:**

```typescript
// Component Testing
import { render, screen } from '@testing-library/react'
import { Services } from '@/components/services'

test('renders service cards', () => {
  render(<Services />)
  expect(screen.getByText('Injiniring')).toBeInTheDocument()
})
```

### **E2E Tests:**

```typescript
// Playwright Configuration
import { test, expect } from "@playwright/test";

test("navigation works correctly", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Xizmatlar");
  await expect(page).toHaveURL("/xizmatlar");
});
```

---

## Xulosa

UZ GROW veb-sayti - bu zamonaviy, professional va to'liq funksional loyiha bo'lib, O'zbekistonning yetakchi issiqxona qurilish kompaniyasining xizmatlarini ko'rsatish uchun mo'ljallangan. Loyiha eng yuqori texnologik standartlar, responsive design va multi-language qo'llab-quvvatlash bilan amalga oshirilgan.

**Asosiy xususiyatlar:**

- 3 tilda to'liq qo'llab-quvvatlash (UZ, RU, EN)
- Mobile-first responsive design
- Auto-rotating image sliders
- 4K video backgroundlar
- Professional team profiles
- Filterable project gallery
- SEO optimization
- High performance
- Accessibility compliance

Loyiha production muhitida ishga tushirishga tayyor va barcha zamonaviy web development best practices ga mos keladi.
