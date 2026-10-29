"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AREA_OPTIONS,
  CROP_OPTIONS,
  METHOD_OPTIONS,
  REGION_OPTIONS,
  type BriefOption,
  type ProjectBrief,
} from "@/lib/project-brief";

const TEXT = {
  uz: {
    title: "Loyihangiz haqida",
    hint: "Ixtiyoriy — lekin to'ldirsangiz, muhandis birinchi qo'ng'iroqdayoq aniq taklif beradi",
    crops: "Nima yetishtirmoqchisiz?",
    method: "Yetishtirish usuli",
    region: "Hudud",
    area: "Taxminiy maydon",
    choose: "Tanlang",
  },
  ru: {
    title: "О вашем проекте",
    hint: "Необязательно — но так инженер сразу подготовит точное предложение",
    crops: "Что планируете выращивать?",
    method: "Способ выращивания",
    region: "Регион",
    area: "Примерная площадь",
    choose: "Выберите",
  },
  en: {
    title: "About your project",
    hint: "Optional — but it lets our engineer prepare an accurate offer right away",
    crops: "What do you plan to grow?",
    method: "Growing method",
    region: "Region",
    area: "Approximate area",
    choose: "Select",
  },
};

const selectClass =
  "w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all";

/**
 * Aloqa formalaridagi "Loyihangiz haqida" bo'limi. Barcha maydonlar
 * ixtiyoriy; tanlangan qiymatlar kod ko'rinishida yuboriladi va server
 * ularni o'zbekcha blok qilib murojaatga qo'shadi (lib/project-brief.ts).
 */
export function ProjectBriefFields({
  value,
  onChange,
}: {
  value: ProjectBrief;
  onChange: (next: ProjectBrief) => void;
}) {
  const { currentLang } = useLanguage();
  const tx = TEXT[currentLang] ?? TEXT.uz;
  const label = (o: BriefOption) => o.label[currentLang] ?? o.label.uz;

  const toggleCrop = (code: string) =>
    onChange({
      ...value,
      crops: value.crops.includes(code)
        ? value.crops.filter((c) => c !== code)
        : [...value.crops, code],
    });

  const select = (
    field: "method" | "region" | "area",
    title: string,
    options: BriefOption[],
  ) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{title}</label>
      <select
        value={value[field]}
        onChange={(e) => onChange({ ...value, [field]: e.target.value })}
        className={selectClass}
      >
        <option value="">{tx.choose}</option>
        {options.map((o) => (
          <option key={o.code} value={o.code}>
            {label(o)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <fieldset className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-4 sm:p-5 space-y-4">
      <legend className="px-2 text-sm font-semibold text-primary">{tx.title}</legend>
      <p className="text-xs text-muted-foreground -mt-2">{tx.hint}</p>

      <div>
        <p className="block text-sm font-medium text-foreground mb-2">{tx.crops}</p>
        <div className="flex flex-wrap gap-2">
          {CROP_OPTIONS.map((o) => {
            const on = value.crops.includes(o.code);
            return (
              <button
                key={o.code}
                type="button"
                onClick={() => toggleCrop(o.code)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-sm transition-colors ${
                  on
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary/50"
                }`}
              >
                {on && <Check className="w-3.5 h-3.5" />}
                {label(o)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {select("method", tx.method, METHOD_OPTIONS)}
        {select("region", tx.region, REGION_OPTIONS)}
        {select("area", tx.area, AREA_OPTIONS)}
      </div>
    </fieldset>
  );
}
