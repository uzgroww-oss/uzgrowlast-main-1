import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StatusMessage } from "@/components/status-message";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <StatusMessage kind="notFound" />
      <Footer />
    </main>
  );
}
