import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectsMap } from "@/components/projects-map"
import { International } from "@/components/international"

export const metadata = pageMeta({
  path: "/xalqaro-hamkorlik",
  title: "Xalqaro hamkorlik - UZ GROW | Markaziy Osiyo loyihalari",
  description:
    "UZ GROW xalqaro loyihalari. Qozog'iston, Qirg'iziston, Tojikiston va boshqa Markaziy Osiyo davlatlaridagi issiqxona va agro-injiniring loyihalari.",
  keywords:
    "UZ GROW xalqaro loyihalari, Markaziy Osiyo, Qozog'iston issiqxonalari, Qirg'iziston agro-injiniring, xalqaro hamkorlik",
});

export default function InternationalPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <International />
      <ProjectsMap />
      <Footer />
    </main>
  )
}
