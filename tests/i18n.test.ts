// Ishga tushirish: npm test (Node 22.6+ TypeScript'ni o'zi o'qiydi)
import { test } from "node:test";
import assert from "node:assert/strict";
import { localePath, stripLocale, isLocale, PAGE_META_I18N } from "../lib/i18n.ts";

test("localePath: o'zbekcha prefikssiz, boshqalari prefiks bilan", () => {
  assert.equal(localePath("/", "uz"), "/");
  assert.equal(localePath("/aloqa", "uz"), "/aloqa");
  assert.equal(localePath("/", "ru"), "/ru");
  assert.equal(localePath("/aloqa", "ru"), "/ru/aloqa");
  assert.equal(localePath("/aloqa?ekin=pomidor", "en"), "/en/aloqa?ekin=pomidor");
  assert.equal(localePath("/#xizmatlar", "ru"), "/ru#xizmatlar");
  assert.equal(localePath("/?a=1", "en"), "/en?a=1");
});

test("stripLocale: manzildan tilni ajratadi", () => {
  assert.deepEqual(stripLocale("/ru/aloqa"), { lang: "ru", path: "/aloqa" });
  assert.deepEqual(stripLocale("/en"), { lang: "en", path: "/" });
  assert.deepEqual(stripLocale("/aloqa"), { lang: "uz", path: "/aloqa" });
  assert.deepEqual(stripLocale("/"), { lang: "uz", path: "/" });
  // "/rus-tili" — til prefiksi emas
  assert.deepEqual(stripLocale("/rus-tili"), { lang: "uz", path: "/rus-tili" });
});

test("localePath va stripLocale bir-birini qaytaradi", () => {
  for (const lang of ["uz", "ru", "en"] as const) {
    for (const p of ["/", "/aloqa", "/ekinlar/pomidor"]) {
      assert.deepEqual(stripLocale(localePath(p, lang)), { lang, path: p });
    }
  }
});

test("isLocale", () => {
  assert.ok(isLocale("ru"));
  assert.ok(!isLocale("de"));
  assert.ok(!isLocale(undefined));
});

test("har sahifaning ru va en sarlavhasi bor", () => {
  for (const [path, tr] of Object.entries(PAGE_META_I18N)) {
    for (const lang of ["ru", "en"] as const) {
      assert.ok(tr[lang]?.title, `${path} — ${lang} sarlavha yo'q`);
      assert.ok(tr[lang]?.description, `${path} — ${lang} tavsif yo'q`);
    }
  }
});
