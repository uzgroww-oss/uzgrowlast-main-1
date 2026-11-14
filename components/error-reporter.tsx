"use client";

import { useEffect } from "react";

/** Xato haqidagi xabarni serverga (Vercel loglariga) yuboradi */
export function reportError(message: string, extra?: string) {
  try {
    const body = JSON.stringify({
      message: message.slice(0, 500),
      extra: extra?.slice(0, 1000),
      url: window.location.href,
      ua: navigator.userAgent,
    });
    navigator.sendBeacon?.("/api/log", body) ||
      fetch("/api/log", { method: "POST", body, keepalive: true }).catch(() => {});
  } catch {}
}

/** Sahifadagi ushlanmagan xatolarni kuzatadi (layout'ga bir marta qo'yiladi) */
export function ErrorReporter() {
  useEffect(() => {
    let sent = 0;
    const onError = (e: ErrorEvent) => {
      // Brauzer kengaytmalari va begona skriptlar shovqinini yubormaymiz
      if (sent++ >= 5 || !e.filename?.startsWith(window.location.origin)) return;
      reportError(e.message, e.error?.stack);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      if (sent++ >= 5) return;
      const r = e.reason;
      reportError(String(r?.message ?? r), r?.stack);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
