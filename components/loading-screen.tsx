"use client";

import { useMedia } from "@/contexts/MediaContext";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { m } = useMedia();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        if (onLoadingComplete) onLoadingComplete();
      }, 500);
    }, 1700);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!loading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background",
        fadeOut && "fade-out",
      )}
      role="status"
      aria-label="Sahifa yuklanmoqda"
    >
      {/* Yumshoq brend fon nuri */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo + aylanuvchi halqa */}
        <div className="loader-logo relative flex items-center justify-center">
          <div
            aria-hidden
            className="loader-ring absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-primary/15 border-t-primary"
          />
          <img
            src={m("umumiy.logo")}
            alt="UZ GROW"
            className="h-16 sm:h-20 w-auto object-contain px-4"
          />
        </div>

        {/* Progress chiziq */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-44 h-1 bg-primary/10 rounded-full overflow-hidden">
            <div className="loader-progress h-full rounded-full bg-primary" />
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase">
            Yuklanmoqda
          </span>
        </div>
      </div>
    </div>
  );
}
