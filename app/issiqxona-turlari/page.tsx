import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GreenhouseTypes } from "@/components/greenhouse-types"

export const metadata = {
  title: 'Issiqxona turlari - UZ GROW | 7 xil issiqxona turlari va tanlash qo\'llanmasi',
  description: 'UZ GROW issiqxona turlari. Oddiy, shisha, polikarbonat, tunnel, sanoat, gidroponik va vertikal issiqxonalar. Narxlar, xususiyatlari va tanlash bo\'yicha maslahatlar.',
  keywords: 'issiqxona turlari, polikarbonat issiqxona, gidroponik issiqxona, tunnel issiqxona, issiqxona narxlari, issiqxona qurish',
  openGraph: {
    title: 'Issiqxona turlari - UZ GROW | 7 xil issiqxona turlari va tanlash qo\'llanmasi',
    description: 'UZ GROW issiqxona turlari. Oddiy, shisha, polikarbonat, tunnel, sanoat, gidroponik va vertikal issiqxonalar.',
    images: ['/images/logo.png'],
  },
}

export default function GreenhouseTypesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <GreenhouseTypes />
      <Footer />
    </main>
  )
}
