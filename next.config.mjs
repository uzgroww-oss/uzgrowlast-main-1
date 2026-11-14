/**
 * Xavfsizlik sarlavhalari — har bir sahifaga qo'shiladi.
 *
 * CSP ataylab keng: Next.js ichki skriptlari, admin yuklagan Supabase
 * rasmlari/videolari, Yandex xaritasi va til aniqlash (country.is) ishlashi
 * kerak. Asosiy foydasi — sayt begona saytga yashirin joylanmaydi
 * (frame-ancestors), plaginlar va begona form manzillari bloklanadi.
 */
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-src https:",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // /about va /services — /haqimizda va /xizmatlar ning eski, takroriy
  // nusxalari. Ularga eski havolalar bo'lishi mumkin, shuning uchun
  // o'chirilmaydi, balki doimiy (308) yo'naltiriladi.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/about", destination: "/haqimizda", permanent: true },
      { source: "/services", destination: "/xizmatlar", permanent: true },
      // O'zbekcha — prefikssiz. /uz/... nusxa bo'lib qolmasin
      { source: "/uz", destination: "/", permanent: true },
      { source: "/uz/:path*", destination: "/:path*", permanent: true },
    ];
  },
  // Sahifalar app/[lang]/ ichida. Prefikssiz manzil o'zbekcha sahifaga
  // ichkaridan ulanadi (/aloqa -> /uz/aloqa); brauzerdagi manzil o'zgarmaydi.
  // afterFiles: public/ fayllari va /api, /admin avval tekshiriladi.
  async rewrites() {
    return {
      afterFiles: [
        { source: "/", destination: "/uz" },
        {
          source: "/:path((?!ru(?:/|$)|en(?:/|$)|uz(?:/|$)|api(?:/|$)|admin(?:/|$)|_next/|_vercel/).+)",
          destination: "/uz/:path",
        },
      ],
    };
  },
  images: {
    // Next rasmlarni ekran o'lchamiga qarab kichraytiradi va WebP/AVIF beradi.
    // Ayniqsa public/images ichidagi 6-7 MB lik fayllar uchun muhim.
    formats: ["image/avif", "image/webp"],
    // Kichraytirilgan nusxa 31 kun saqlanadi — Vercel'da qayta ishlash
    // limiti tez tugamasin (standart 4 soat)
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
      },
      {
        // Admin paneldan yuklangan rasm va videolar
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

export default nextConfig
