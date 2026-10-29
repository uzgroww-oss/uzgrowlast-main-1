"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image + yuklanish foni. Rasm kelguncha o'rnida miltillovchi fon
 * (`.img-ph`), manzil almashsa (slayder) fon qaytadan ko'rinadi.
 */
export function SmartImage({ className, onLoad, onError, src, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const key = typeof src === "string" ? src : "";

  useEffect(() => {
    setLoaded(false);
  }, [key]);

  return (
    <Image
      src={src}
      className={cn(className, !loaded && "img-ph")}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setLoaded(true);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
