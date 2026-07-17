import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssoDesignMedia } from "@/components/asso-design-media"

export const metadata = {
  title: 'Media hamkorlik - UZ GROW | AssoDesign Media hamkorligi',
  description: 'UZ GROW media hamkorlik taklifi. AssoDesign Media bilan reklama va marketing hamkorligi. Statistika, auditoriya, tariflar va aloqa.',
  keywords: 'UZ GROW media hamkorlik, AssoDesign Media, reklama, marketing, ijtimoiy tarmoqlar, statistika',
  openGraph: {
    title: 'Media hamkorlik - UZ GROW | AssoDesign Media hamkorligi',
    description: 'UZ GROW media hamkorlik taklifi. AssoDesign Media bilan reklama va marketing hamkorligi.',
    images: ['/images/logo.png'],
  },
}

export default function MediaPartnershipPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AssoDesignMedia />
      <Footer />
    </main>
  )
}
