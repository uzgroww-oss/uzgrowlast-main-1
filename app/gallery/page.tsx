import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Gallery } from "@/components/gallery"

export const metadata = {
  title: 'Galereya - UZ GROW | Loyihalar, tadbirlar va Prezident tashriflari',
  description: 'UZ GROW kompaniyasining galereyasi. Loyihalarimiz, tadbirlarimiz, Prezident tashriflari va boshqa voqealarning foto va video lavhalari.',
  keywords: 'UZ GROW galereya, issiqxona loyihalari, Prezident tashrifi, Samarqand, agro-tadbirlar, foto galereya',
  openGraph: {
    title: 'Galereya - UZ GROW | Loyihalar, tadbirlar va Prezident tashriflari',
    description: 'UZ GROW kompaniyasining galereyasi. Loyihalarimiz, tadbirlarimiz, Prezident tashriflari va boshqa voqealarning foto va video lavhalari.',
    images: ['/images/logo.png'],
  },
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Gallery />
      <Footer />
    </main>
  )
}
