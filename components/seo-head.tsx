"use client";

import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  alternateUrls?: { [key: string]: string };
}

export function SEOHead({
  title = "UZ GROW - Agro-Injiniring | Issiqxona qurish va qishloq xo'jaligi yechimlari",
  description = "UZ GROW - O'zbekistonning yetakchi agro-injiniring kompaniyasi. Zamonaviy issiqxonalar, agrotexnologiyalar va qishloq xo'jaligi uchun kompleks yechimlar. 9+ yillik tajriba, 2000+ muvaffaqiyatli loyiha.",
  keywords = "issiqxona qurish, agro-injiniring, qishloq xo'jaligi, UZ GROW, issiqxona turlari, polikarbonat issiqxona, gidroponik, agrobiznes, O'zbekiston, Toshkent, issiqxona narxlari, qurilish materiallari",
  image = "/images/logo.png",
  url = "https://uzgrow.uz",
  type = "website",
  locale = "uz_UZ",
  alternateUrls = {
    uz: "https://uzgrow.uz",
    ru: "https://uzgrow.uz/ru",
    en: "https://uzgrow.uz/en",
  },
}: SEOHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="UZ GROW Agro-Injiniring" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="UZ GROW" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@UZ GROW" />
      <meta name="twitter:site" content="@UZ GROW" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Alternate Language URLs */}
      {Object.entries(alternateUrls).map(([lang, altUrl]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={altUrl} />
      ))}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "UZ GROW Agro-Injiniring",
            url: url,
            logo: image,
            description: description,
            address: {
              "@type": "PostalAddress",
              addressCountry: "UZ",
              addressLocality: "Toshkent",
              streetAddress: "Toshkent shahri, Sirg'ali tumani, Nomdanak ko'chasi, Ziyokor 6/9",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+999384352313",
              contactType: "customer service",
              email: "uzgrrow@gmail.com",
              availableLanguage: ["Uzbek", "Russian", "English"],
            },
            sameAs: [
              "https://www.facebook.com/uzgrow",
              "https://www.instagram.com/uzgrow",
              "https://www.linkedin.com/company/uzgrow",
              "https://www.youtube.com/c/uzgrow",
              "https://t.me/uzgrow",
            ],
            founder: {
              "@type": "Person",
              name: "Rustamjon Rahmonov",
              jobTitle: "CEO",
              url: "https://uzgrow.uz/ceo",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Issiqxona va qishloq xo'jaligi xizmatlari",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Issiqxona qurish",
                    description: "Turnkey issiqxona qurish xizmatlari",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Agro-injiniring",
                    description: "Qishloq xo'jaligi injiniring yechimlari",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Agro-konsalting",
                    description:
                      "Qishloq xo'jaligi bo'yicha konsalting xizmatlari",
                  },
                },
              ],
            },
            areaServed: [
              {
                "@type": "Country",
                name: "O'zbekiston",
              },
              {
                "@type": "Country",
                name: "Qozog'iston",
              },
              {
                "@type": "Country",
                name: "Qirg'iziston",
              },
              {
                "@type": "Country",
                name: "Tojikiston",
              },
              {
                "@type": "Country",
                name: "Turkmaniston",
              },
            ],
          }),
        }}
      />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="format-detection" content="telephone=no" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.facebook.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
    </Head>
  );
}
