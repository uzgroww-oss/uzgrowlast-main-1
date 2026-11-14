"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/i18n";

/**
 * next/link o'rnida: ichki manzilga joriy til prefiksini qo'shadi
 * ("/aloqa" -> "/ru/aloqa"). Fayllar (.pdf, .jpg), /api va tashqi
 * havolalarga tegilmaydi.
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { currentLang } = useLanguage();
  const local =
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("/api/") &&
    !/\.[a-z0-9]{2,5}$/i.test(href.split(/[?#]/)[0]);
  return <NextLink href={local ? localePath(href, currentLang) : href} {...rest} />;
}
