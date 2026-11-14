"use client";

import { useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StatusMessage } from "@/components/status-message";
import { reportError } from "@/components/error-reporter";

// Sahifada kutilmagan xato bo'lsa — oq ekran o'rniga tushunarli xabar
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    reportError(error.message || "render error", error.digest ?? error.stack);
  }, [error]);

  return (
    <main className="min-h-screen">
      <Header />
      <StatusMessage kind="error" onRetry={reset} />
      <Footer />
    </main>
  );
}
