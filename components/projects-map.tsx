"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { MAP_COUNTRIES, MAP_CONTEXT, MAP_VIEW } from "@/lib/map-data";

/**
 * Loyihalar geografiyasi — O'zbekistondan qo'shni davlatlarga tortilgan
 * chiziqlar bilan xarita.
 *
 * Ma'lumot admin paneldan boshqariladi: `map.countries` ro'yxatidagi
 * nom va izoh tahrirlanadi, kerak bo'lmagan davlat esa butunlay
 * o'chiriladi (tList o'chirilganlarni chiqarib tashlaydi).
 *
 * `code` maydoni ataylab tahrirlanmaydi (lib/content-schema.ts) — u
 * koddagi koordinatalar jadvaliga bog'lanadi.
 */

const HUB = "uz";

/**
 * Ikki nuqta orasidagi yoy. To'g'ri chiziq quruq ko'rinadi, yoy esa
 * "tarqalish" hissini beradi. Boshqaruv nuqtasi chiziqqa perpendikulyar
 * siljitiladi.
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

  const hub = MAP_COUNTRIES[HUB];

  // O'chirilgan davlatlar ro'yxatga tushmaydi; kodi noma'lum bo'lsa ham
  // (masalan tarjimada xato) — jimgina o'tkazib yuboriladi
  const countries = tList("map.countries")
    .map((entry) => {
      const value = entry.value as { code?: string; name?: string; note?: string };
      const geo = value?.code ? MAP_COUNTRIES[value.code] : undefined;
      return geo ? { ...value, geo, key: entry.key } : null;
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  if (!hub) return null;

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
          <svg
            viewBox={`0 0 ${MAP_VIEW.w} ${MAP_VIEW.h}`}
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
            <g className="fill-muted-foreground/10 stroke-muted-foreground/20" strokeWidth="0.8">
              {MAP_CONTEXT.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>

            {/* Loyiha bor davlatlar */}
            <g className="stroke-primary/40" strokeWidth="1.1">
              {countries.map((c) => (
                <path key={`shape-${c.key}`} d={c.geo.path} className="fill-primary/12" />
              ))}
              <path d={hub.path} className="fill-primary/25" />
            </g>

            {/* Chiziqlar: O'zbekistondan har bir davlatga */}
            <g fill="none" strokeLinecap="round">
              {countries.map((c, i) => {
                const d = arc(hub.x, hub.y, c.geo.x, c.geo.y);
                return (
                  <g key={`link-${c.key}`}>
                    <path d={d} stroke="url(#uzgrow-link)" strokeWidth="2.2" />
                    {/* Chiziq bo'ylab yuguruvchi nuqta — "tarmoq" hissi.
                        Harakatni kamaytirish rejimida to'xtaydi (globals.css). */}
                    <circle r="4" fill="#24B14B" className="uzgrow-pulse-dot">
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

            {/* Davlat nuqtalari va nomlari */}
            <g>
              {countries.map((c) => (
                <g key={`dot-${c.key}`}>
                  <circle cx={c.geo.x} cy={c.geo.y} r="6" className="fill-primary" />
                  <circle cx={c.geo.x} cy={c.geo.y} r="11" className="fill-primary/20" />
                  <text
                    x={c.geo.x}
                    y={c.geo.y - 18}
                    textAnchor="middle"
                    className="fill-foreground"
                    style={{ fontSize: 14, fontWeight: 600 }}
                  >
                    {c.name}
                  </text>
                </g>
              ))}

              {/* Markaz — O'zbekiston */}
              <circle cx={hub.x} cy={hub.y} r="9" className="fill-primary" />
              <circle cx={hub.x} cy={hub.y} r="18" className="fill-primary/25 uzgrow-pulse-ring" />
              <text
                x={hub.x}
                y={hub.y + 34}
                textAnchor="middle"
                className="fill-foreground"
                style={{ fontSize: 16, fontWeight: 700 }}
              >
                {t("map.hubName")}
              </text>
            </g>
          </svg>
        </div>

        {/* Ro'yxat — xaritani o'qiy olmaganlar uchun ham, telefon uchun ham */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
            <p className="font-semibold text-foreground text-sm">{t("map.hubName")}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t("map.hubNote")}</p>
          </div>
          {countries.map((c) => (
            <div key={`card-${c.key}`} className="rounded-xl border border-border bg-background p-3">
              <p className="font-semibold text-foreground text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
