"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type State = "idle" | "loading" | "done";

/**
 * Sahifalar orasidagi o'tish chizig'i (ekran tepasida, sariq).
 *
 * Next.js'da havola bosilganda yangi sahifa tayyor bo'lguncha eski sahifa
 * hech qanday belgisiz turaveradi — sekin internetda foydalanuvchi "bosilmadi"
 * deb o'ylaydi. Shu sababli sayt ichidagi har qanday havola bosilishi bilan
 * chiziq paydo bo'ladi va manzil o'zgargach yakunlanadi.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Sayt ichidagi havolalar bosilganini kuzatadi
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Shu sahifaning o'zi yoki faqat #langar — o'tish yo'q
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      clearTimers();
      setState("loading");
      // Biror sabab bilan o'tish bo'lmasa, chiziq abadiy qolib ketmasin
      timers.current.push(setTimeout(() => setState("idle"), 15000));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Yangi sahifa ochildi — chiziq oxirigacha to'lib, yo'qoladi
  useEffect(() => {
    setState((s) => (s === "loading" ? "done" : s));
  }, [pathname]);

  useEffect(() => {
    if (state !== "done") return;
    clearTimers();
    timers.current.push(setTimeout(() => setState("idle"), 600));
  }, [state]);

  useEffect(() => clearTimers, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        data-state={state}
        className="nav-progress h-full bg-brand-yellow shadow-[0_0_8px_rgba(255,193,7,0.7)]"
        style={{
          width: state === "idle" ? "0%" : state === "loading" ? "85%" : "100%",
          opacity: state === "loading" ? 1 : state === "done" ? 0 : 0,
        }}
      />
    </div>
  );
}
