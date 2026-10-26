import type { Metadata } from "next";

// Admin panel qidiruv tizimlariga ko'rinmasligi kerak
export const metadata: Metadata = {
  title: "Admin | UZ GROW",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
