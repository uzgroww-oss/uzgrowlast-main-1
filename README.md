# UZ GROW - Agro-Injiniring Corporate Website

A modern, production-ready, multi-language corporate website for UZ GROW, a leading greenhouse construction and agro-engineering company in Uzbekistan.

## Features

### Core Features
- **Multi-language Support**: Full support for Uzbek, Russian, and English
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Built with shadcn/ui components and Lucide React icons
- **Interactive Components**: Auto-rotating image sliders, video backgrounds
- **SEO Optimized**: Complete meta tags, sitemap, and robots.txt
- **Performance Optimized**: Next.js 16.2.0 with App Router

### Technical Features
- **Framework**: Next.js 16.2.0 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Lucide React
- **State Management**: React Context API
- **Image/Video**: Cloudinary integration + Next/Image
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel-ready

## Project Structure

```
src/
app/
  layout.tsx              # Root layout with providers
  page.tsx                # Home page
  about/page.tsx          # About page
  services/page.tsx       # Services page
  issiqxona-turlari/page.tsx # Greenhouse types page
  loyihalar/page.tsx      # Projects page
  rahbariyat/page.tsx     # Team page
  aloqa/page.tsx          # Contact page
  globals.css             # Global styles

components/
  header.tsx              # Navigation header
  footer.tsx              # Footer component
  services.tsx            # Services with image slider
  about.tsx               # About section
  team.tsx                # Team member profiles
  projects.tsx            # Projects gallery
  contact.tsx             # Contact form
  hero.tsx                # Hero section with video
  greenhouse-types.tsx    # Greenhouse types comparison
  ui/                     # shadcn/ui components

contexts/
  LanguageContext.tsx     # Multi-language context

lib/
  utils.ts                # Utility functions

public/
  images/                 # Static images
  team/                   # Team member photos
  robots.txt              # SEO robots file
  sitemap.xml             # SEO sitemap
```

## Key Components

### Header Component
- Sticky navigation with scroll effects
- Responsive mobile menu
- Language switcher (UZ | RU | EN)
- Contact information display

### Services Component
- 3 main services (Engineering, Equipment, Consulting)
- Interactive service selection tabs
- Auto-rotating image slider (3-second intervals)
- Service features and descriptions

### Hero Component
- Fullscreen autoplay muted loop video background
- Dynamic content slider with testimonials
- Call-to-action buttons
- Statistics bar

### Team Component
- 6 team member profiles
- Professional avatars and bios
- Skills, achievements, and contact info
- Social media links

### Projects Component
- Filterable project gallery
- Categories: Presidential, International, Greenhouse
- Image carousel for each project
- Project details and descriptions

### Contact Component
- Functional contact form with validation
- EmailJS integration for form submission
- Contact information display
- Interactive map integration

## Multi-language System

The website uses React Context for internationalization:

```typescript
// Language Context
const { currentLang, setLanguage, t } = useLanguage();

// Translation usage
<h1>{t("hero.title")}</h1>
<p>{t("services.engineeringDesc")}</p>
```

### Supported Languages
- **Uzbek (uz)**: Default language
- **Russian (ru)**: Complete translation
- **English (en)**: Complete translation

### Translation Coverage
- Navigation menu items
- Service descriptions and features
- Team member information
- Contact form labels
- Project categories and descriptions
- UI elements and buttons

## Performance Optimizations

### Image Optimization
- Next.js Image component with lazy loading
- Cloudinary URL optimization
- Responsive image sizes
- Blur data URLs for placeholders

### Code Splitting
- Dynamic imports for large components
- Route-based code splitting
- Optimized bundle size

### SEO Features
- Complete meta tags for all pages
- OpenGraph support
- Multi-language hreflang tags
- Structured data markup
- XML sitemap
- Robots.txt optimization

## Getting Started

### Prerequisites
- Node.js 19+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd UZ GROW-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_CLOUDINARY_URL=https://res.cloudinary.com/dnqi0bdjk
NEXT_PUBLIC_SITE_URL=https://uzgrow.uz
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

## Build and Deployment

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to production:
```bash
vercel --prod
```

3. Set up custom domain:
```bash
vercel domains add uzgrow.uz
```

## Tech Stack Details

### Frontend Framework
- **Next.js 16.2.0**: React framework with App Router
- **TypeScript**: Type-safe development
- **React 19**: Latest React version

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **Lucide React**: Icon library

### State Management
- **React Context API**: Global state management
- **localStorage**: Language preference persistence

### Analytics & Monitoring
- **Vercel Analytics**: Performance monitoring
- **Google Analytics**: User behavior tracking

### External Services
- **Cloudinary**: Image and video hosting
- **EmailJS**: Contact form submissions
- **Yandex Maps**: Location display

## Browser Support

- Chrome 90+
- Firefox 89+
- Safari 14+
- Edge 90+

## Performance Metrics

- **Lighthouse Score**: 90+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## Security Features

- Content Security Policy (CSP)
- XSS protection
- HTTPS enforcement
- Input validation
- Secure headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary and belongs to UZ GROW company.

## Contact

- **Website**: [https://uzgrow.uz](https://uzgrow.uz)
- **Email**: uzgrrow@gmail.com
- **Phone**: +998 55 515 22 23
- **Address**: Toshkent, O'zbekiston

---

Built with passion by UZ GROW team © 2026
