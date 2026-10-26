import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "rasmlar/**"]),
  {
    rules: {
      // Loyiha ataylab oddiy <img> ishlatadi: rasmlar admin paneldan
      // istalgan manzildan kelishi mumkin, next/image esa domenlarni
      // oldindan ro'yxatga olishni talab qiladi.
      "@next/next/no-img-element": "off",
      // Eski kodda `any` ko'p — xato emas, ogohlantirish bo'lib tursin
      "@typescript-eslint/no-explicit-any": "warn",
      // O'zbekcha matnda apostrof ("o'zbek", "bo'lim") juda ko'p — JSX'da
      // u to'g'ri ko'rsatiladi, har birini &apos; ga almashtirish shart emas.
      "react/no-unescaped-entities": "off",
      // React Compiler uchun tavsiyalar. Kod ular bilan to'g'ri ishlaydi,
      // shuning uchun build'ni to'xtatmaydi — keyinchalik asta tuzatiladi.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
    },
  },
]);
