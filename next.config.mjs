/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // /about va /services — /haqimizda va /xizmatlar ning eski, takroriy
  // nusxalari. Ularga eski havolalar bo'lishi mumkin, shuning uchun
  // o'chirilmaydi, balki doimiy (308) yo'naltiriladi.
  async redirects() {
    return [
      { source: "/about", destination: "/haqimizda", permanent: true },
      { source: "/services", destination: "/xizmatlar", permanent: true },
    ];
  },
  images: {
    // Next rasmlarni ekran o'lchamiga qarab kichraytiradi va WebP/AVIF beradi.
    // Ayniqsa public/images ichidagi 6-7 MB lik fayllar uchun muhim.
    formats: ["image/avif", "image/webp"],
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
