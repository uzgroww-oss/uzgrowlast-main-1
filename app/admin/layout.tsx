import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

// Admin — sayt sahifalaridan (app/[lang]) alohida asosiy layout
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

// Admin panel qidiruv tizimlariga ko'rinmasligi kerak
export const metadata: Metadata = {
  title: "Admin | UZ-GROW",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
