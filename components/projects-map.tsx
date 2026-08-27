"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Minimize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MAP_COUNTRIES, MAP_CONTEXT, MAP_VIEW } from "@/lib/map-data";

/**
 * Loyihalar geografiyasi — O'zbekistondan qo'shni davlatlarga tortilgan
 * chiziqlar bilan xarita. Nuqtaga bosilsa o'sha davlatga yaqinlashadi.
 *
 * Ma'lumot admin paneldan boshqariladi: `map.countries` ro'yxatidagi
 * nom va izoh tahrirlanadi, kerak bo'lmagan davlat butunlay o'chiriladi.
 * `code` maydoni ataylab tahrirlanmaydi (lib/content-schema.ts) — u
 * koddagi koordinatalar jadvaliga bog'lanadi.
 */

const HUB = "uz";
const ZOOM = 2.8;
const DURATION = 600;

/**
 * Yorliq joylashuvi. Toshkent va Dushanbe juda yaqin, shuning uchun
 * ularning yozuvlari qo'lda ajratiladi — aks holda ustma-ust tushadi.
 */
const LABEL: Record<string, { dx: number; dy: number }> = {
  uz: { dx: 0, dy: -26 },
  tj: { dx: 30, dy: 24 },
  kz: { dx: 0, dy: -20 },
  kg: { dx: 0, dy: -20 },
  tm: { dx: 0, dy: -20 },
};
const labelOf = (code: string) => LABEL[code] ?? { dx: 0, dy: -20 };

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const FULL: Box = { x: 0, y: 0, w: MAP_VIEW.w, h: MAP_VIEW.h };

/** Tanlangan nuqta atrofidagi ko'rinish. Xarita chetidan chiqib ketmaydi. */
function boxAround(cx: number, cy: number): Box {
  const w = MAP_VIEW.w / ZOOM;
  const h = MAP_VIEW.h / ZOOM;
  return {
    w,
    h,
    x: Math.max(0, Math.min(cx - w / 2, MAP_VIEW.w - w)),
    y: Math.max(0, Math.min(cy - h / 2, MAP_VIEW.h - h)),
  };
}

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Ikki ko'rinish orasida silliq o'tish.
 *
 * viewBox ni CSS bilan animatsiya qilib bo'lmaydi, shuning uchun u
 * kadrma-kadr o'zgartiriladi. Foydalanuvchi tizimda harakatni kamaytirishni
 * so'ragan bo'lsa — darhol o'tadi, animatsiyasiz.
 */
function useViewBox(target: Box): Box {
  const [view, setView] = useState<Box>(target);
  const current = useRef<Box>(target);
  const frame = useRef(0);

  // Har kadrda o'qish uchun oxirgi holat alohida saqlanadi
  current.current = view;

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setView(target);
      return;
    }

    const from = current.current;
    const startedAt = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - startedAt) / DURATION, 1);
      const k = easeInOut(t);
      setView({
        x: from.x + (target.x - from.x) * k,
        y: from.y + (target.y - from.y) * k,
        w: from.w + (target.w - from.w) * k,
        h: from.h + (target.h - from.h) * k,
      });
      if (t < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
    // Faqat maqsad o'zgarganda qayta ishga tushadi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.x, target.y, target.w, target.h]);

  return view;
}

/**
 * Ikki nuqta orasidagi yoy. To'g'ri chiziq quruq ko'rinadi, yoy esa
 * "tarqalish" hissini beradi.
 */
function arc(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = (x1 + x2) / 2 + dy * 0.16;
  const cy = (y1 + y2) / 2 - dx * 0.16;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function ProjectsMap() {
  const { t, tList } = useLanguage();
  const [focus, setFocus] = useState<string | null>(null);

  const hub = MAP_COUNTRIES[HUB];

  const countries = tList("map.countries")
    .map((entry) => {
      const v = entry.value as { code?: string; name?: string; note?: string };
      const geo = v?.code ? MAP_COUNTRIES[v.code] : undefined;
      return geo ? { ...v, code: v.code as string, geo, key: entry.key } : null;
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const focused = focus ? MAP_COUNTRIES[focus] : null;
  const target = focused ? boxAround(focused.x, focused.y) : FULL;
  const view = useViewBox(target);

  // Yaqinlashganda yozuv va nuqtalar kattalashib ketmasin — ular teskari
  // nisbatda kichraytiriladi, shunda o'lchami doim bir xil ko'rinadi
  const k = MAP_VIEW.w / view.w;
  const s = (n: number) => n / k;

  const toggle = useCallback(
    (code: string) => setFocus((cur) => (cur === code ? null : code)),
    [],
  );

  if (!hub) return null;

  const all = [
    {
      code: HUB,
      name: t("map.hubName"),
      note: t("map.hubNote"),
      geo: hub,
      key: HUB,
      isHub: true,
    },
    ...countries.map((c) => ({ ...c, isHub: false })),
  ];

  return (
    <section className="py-12 lg:py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t("map.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {t("map.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("map.subtitle")}
          </p>
        </div>

        <div className="relative rounded-2xl bg-background border border-border p-3 sm:p-6 shadow-sm">
          {focus ? (
            <button
              type="button"
              onClick={() => setFocus(null)}
              className="absolute right-4 top-4 z-10 flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-background/90 backdrop-blur text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              {t("map.reset")}
            </button>
          ) : (
            <span className="absolute right-4 top-4 z-10 hidden text-xs text-muted-foreground sm:block">
              {t("map.zoomHint")}
            </span>
          )}

          <svg
            viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
            className="w-full h-auto"
            role="img"
            aria-label={t("map.title")}
          >
            <defs>
              <linearGradient id="uzgrow-link" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#24B14B" stopOpacity="0.15" />
                <stop offset="55%" stopColor="#24B14B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#24B14B" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Qo'shni davlatlar — kontekst uchun, xira */}
            <g className="fill-muted-foreground/10 stroke-muted-foreground/20">
              {MAP_CONTEXT.map((d, i) => (
                <path key={i} d={d} vectorEffect="non-scaling-stroke" />
              ))}
            </g>

            {/* Loyiha bor davlatlar */}
            <g className="stroke-primary/40">
              {countries.map((c) => (
                <path
                  key={`shape-${c.key}`}
                  d={c.geo.path}
                  className={focus === c.code ? "fill-primary/25" : "fill-primary/12"}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path
                d={hub.path}
                className="fill-primary/25"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Chiziqlar: O'zbekistondan har bir davlatga */}
            <g fill="none" strokeLinecap="round">
              {countries.map((c, i) => {
                const d = arc(hub.x, hub.y, c.geo.x, c.geo.y);
                const dim = focus !== null && focus !== c.code;
                return (
                  <g key={`link-${c.key}`} opacity={dim ? 0.25 : 1}>
                    <path d={d} stroke="url(#uzgrow-link)" strokeWidth={s(2.2)} />
                    {/* Chiziq bo'ylab yuguruvchi nuqta — "tarmoq" hissi */}
                    <circle r={s(4)} fill="#24B14B" className="uzgrow-pulse-dot">
                      <animateMotion
                        dur="3.2s"
                        begin={`${i * 0.55}s`}
                        repeatCount="indefinite"
                        path={d}
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </circle>
                  </g>
                );
              })}
            </g>

            {/* Nuqtalar va nomlar — bosilsa yaqinlashadi */}
            <g>
              {all.map((c) => {
                const off = labelOf(c.code);
                const active = focus === c.code;
                return (
                  <g
                    key={`dot-${c.key}`}
                    onClick={() => toggle(c.code)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(c.code);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${c.name} — ${active ? t("map.reset") : t("map.zoomHint")}`}
                    className="cursor-pointer outline-none"
                  >
                    {/* Bosish maydoni nuqtadan kattaroq — telefonda tegish qulay bo'lsin */}
                    <circle cx={c.geo.x} cy={c.geo.y} r={s(22)} fill="transparent" />
                    <circle
                      cx={c.geo.x}
                      cy={c.geo.y}
                      r={s(c.isHub ? 18 : 11)}
                      className={active ? "fill-primary/35" : "fill-primary/20"}
                    />
                    {c.isHub && (
                      <circle
                        cx={c.geo.x}
                        cy={c.geo.y}
                        r={s(18)}
                        className="fill-primary/25 uzgrow-pulse-ring"
                      />
                    )}
                    <circle
                      cx={c.geo.x}
                      cy={c.geo.y}
                      r={s(c.isHub ? 9 : 6)}
                      className="fill-primary"
                    />
                    <text
                      x={c.geo.x + s(off.dx)}
                      y={c.geo.y + s(off.dy)}
                      textAnchor="middle"
                      className="fill-foreground"
                      stroke="var(--background)"
                      strokeWidth={s(3.5)}
                      paintOrder="stroke"
                      style={{
                        fontSize: s(c.isHub ? 16 : 14),
                        fontWeight: c.isHub ? 700 : 600,
                      }}
                    >
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Ro'yxat — bosilsa xarita o'sha davlatga yaqinlashadi */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {all.map((c) => (
            <button
              key={`card-${c.key}`}
              type="button"
              onClick={() => toggle(c.code)}
              className={`rounded-xl border p-3 text-left transition-colors ${
                focus === c.code
                  ? "border-primary bg-primary/10"
                  : c.isHub
                    ? "border-primary/30 bg-primary/5 hover:border-primary/60"
                    : "border-border bg-background hover:border-primary/40"
              }`}
            >
              <p className="text-sm font-semibold text-foreground">{c.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.note}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
