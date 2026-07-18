/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
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
