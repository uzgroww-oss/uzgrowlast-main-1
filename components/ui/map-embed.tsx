"use client";

import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapEmbedProps {
  src: string;
  title: string;
  hint?: string;
  className?: string;
}

// Iframe xarita scroll paytida zoom bo'lib ketmasligi uchun:
// bosilmaguncha pointer-events o'chiq turadi, tashqariga chiqqanda qayta qulflanadi
export function MapEmbed({ src, title, hint, className }: MapEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={cn("relative w-full h-full", className)}
      onMouseLeave={() => setActive(false)}
    >
      <iframe
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        className={cn("w-full h-full", !active && "pointer-events-none")}
        allowFullScreen
        loading="lazy"
        title={title}
      />
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={hint || "Xaritani faollashtirish"}
          className="absolute inset-0 flex items-end justify-center bg-transparent cursor-pointer group"
        >
          <span className="mb-3 flex items-center gap-2 px-4 h-9 rounded-full bg-background/90 backdrop-blur border border-border text-xs font-medium text-muted-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <MousePointerClick className="w-3.5 h-3.5" />
            {hint || "Xaritani boshqarish uchun bosing"}
          </span>
        </button>
      )}
    </div>
  );
}
