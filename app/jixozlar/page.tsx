import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Technology } from "@/components/technology"

export const metadata = {
  title: 'Jixozlar - UZ GROW | Zamonaviy texnologiyalar va uskunalar',
  description: 'UZ GROW texnologiyalari. Zamonaviy issiqxona texnologiyalari, avtomatlashtirish tizimlari, iqlim nazorati va agro-uskunalar.',
  keywords: 'UZ GROW texnologiyalari, issiqxona texnologiyalari, avtomatlashtirish, iqlim nazorati, agro-uskunalar',
  openGraph: {
    title: 'Jixozlar - UZ GROW | Zamonaviy texnologiyalar va uskunalar',
    description: 'UZ GROW texnologiyalari. Zamonaviy issiqxona texnologiyalari va avtomatlashtirish tizimlari.',
    images: ['/images/logo.png'],
  },
}

export default function TechnologyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Technology />
      <Footer />
    </main>
  )
}
