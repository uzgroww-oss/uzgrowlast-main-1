"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Lock,
  RefreshCw,
  Inbox,
  Newspaper,
  Plus,
  Trash2,
  Pencil,
  X,
  LogOut,
  FileText,
  Menu,
  Download,
  Search,
  Check,
  HardDrive,
  AlertCircle,
} from "lucide-react";
import { translations } from "@/contexts/LanguageContext";
import { apiError } from "@/lib/admin-errors";
import { ContentPagesNav, ContentTab, ContentToolbar } from "./content-tab";
import { ContentProvider, useContentStore } from "./content-store";
import { UploadField } from "./upload-field";

/* ---------- Turlari ---------- */

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  lang: string;
  createdAt: string;
  /** undefined — bazada "ko'rildi" ustuni hali qo'shilmagan */
  handled?: boolean;
}

type NewsLang = "uz" | "ru" | "en";

interface NewsItem {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
  i18n?: Partial<Record<"ru" | "en", { title?: string; body?: string }>>;
}

interface StoredFile {
  name: string;
  size: number;
  createdAt: string;
  url: string;
  used: boolean;
  recent: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
}

const authHeader = (password: string) => ({ Authorization: `Bearer ${password}` });

/* ---------- Asosiy sahifa ---------- */

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sessiya davomida parolni eslab qolish
  useEffect(() => {
    const saved = sessionStorage.getItem("uzgrow_admin_pw");
    if (saved) {
      setPassword(saved);
      verify(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verify = async (pw: string, e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", { headers: authHeader(pw) });
      const data = await res.clone().json().catch(() => null);

      // Faqat aniq tasdiq kirishga ruxsat beradi — server xatosi (500) yoki
      // kutilmagan javob "kirdim" deb hisoblanmasligi kerak
      if (res.ok && data?.ok === true) {
        sessionStorage.setItem("uzgrow_admin_pw", pw);
        setAuthed(true);
        return;
      }

      sessionStorage.removeItem("uzgrow_admin_pw");
      setError(res.status === 401 ? "Parol noto'g'ri" : await apiError(res));
    } catch {
      setError("Serverga ulanib bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("uzgrow_admin_pw");
    setAuthed(false);
    setPassword("");
  };

  if (!authed) {
    return (
      <main className="admin-ui min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <form
          onSubmit={(e) => verify(password, e)}
          className="bg-background rounded-2xl p-8 shadow-lg w-full max-w-sm space-y-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">UZ GROW Admin</h1>
              <p className="text-xs text-muted-foreground">Parolni kiriting</p>
            </div>
          </div>
          <Input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Lock className="w-4 h-4 mr-2" />
            )}
            Kirish
          </Button>
        </form>
      </main>
    );
  }

  return (
    <ContentProvider password={password}>
      <Dashboard password={password} onLogout={logout} />
    </ContentProvider>
  );
}

/* ---------- Dashboard qobig'i ---------- */

type Section = "content" | "leads" | "news" | "files";

const SECTIONS: { key: Section; label: string; icon: typeof Inbox }[] = [
  { key: "content", label: "Sahifa matnlari", icon: FileText },
  { key: "leads", label: "Murojaatlar", icon: Inbox },
  { key: "news", label: "Yangiliklar", icon: Newspaper },
  { key: "files", label: "Fayllar ombori", icon: HardDrive },
];

function Dashboard({
  password,
  onLogout,
}: {
  password: string;
  onLogout: () => void;
}) {
  const [section, setSection] = useState<Section>("content");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { changeCount } = useContentStore();

  const active = SECTIONS.find((s) => s.key === section)!;

  // Saqlanmagan matnlar bilan chiqib ketilmasin
  const safeLogout = () => {
    if (
      changeCount > 0 &&
      !window.confirm(
        `${changeCount} ta o'zgarish saqlanmagan va yo'qoladi.\n\nBaribir chiqasizmi?`,
      )
    )
      return;
    onLogout();
  };

  return (
    <div className="admin-ui min-h-screen bg-muted/30">
      {/* Mobil menyu ochiq bo'lganda orqa fon */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Chap menyu: katta ekranda doim ochiq, mobilda faqat tugma bosilganda */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] bg-background border-r border-border flex-col lg:flex ${
          mobileOpen ? "flex" : "hidden"
        }`}
      >
        <div className="h-14 flex items-center gap-2 px-4 border-b border-border shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="UZ GROW" className="h-7 w-auto" />
          <span className="font-semibold text-foreground text-sm flex-1">
            Boshqaruv paneli
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
            aria-label="Menyuni yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1 shrink-0">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                setSection(s.key);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                section === s.key
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <s.icon className="w-4 h-4 shrink-0" />
              {s.label}
            </button>
          ))}
        </nav>

        {/* Sahifalar ro'yxati faqat matn bo'limida */}
        {section === "content" && (
          <div className="flex-1 overflow-y-auto px-3 pb-3 min-h-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground px-3 py-2">
              Sahifalar
            </p>
            <ContentPagesNav onNavigate={() => setMobileOpen(false)} />
          </div>
        )}
        {section !== "content" && <div className="flex-1" />}

        <div className="p-3 border-t border-border shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={safeLogout}
            className="w-full justify-start text-muted-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Chiqish
          </Button>
        </div>
      </aside>

      {/* Asosiy qism */}
      <div className="lg:pl-72">
        {/* Balandligi qat'iy emas: telefonda asboblar ikki qatorga tushadi */}
        <header className="sticky top-0 z-20 min-h-14 py-2 flex items-center gap-3 px-4 border-b border-border bg-background/95 backdrop-blur">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground self-start mt-2"
            aria-label="Menyuni ochish"
          >
            <Menu className="w-5 h-5" />
          </button>
          {section === "content" ? (
            <ContentToolbar />
          ) : (
            <h1 className="font-semibold text-foreground">{active.label}</h1>
          )}
        </header>

        <main className="p-4 lg:p-6 max-w-6xl">
          {section === "content" && <ContentTab />}
          {section === "leads" && <LeadsTab password={password} />}
          {section === "news" && <NewsTab password={password} />}
          {section === "files" && <FilesTab password={password} />}
        </main>
      </div>
    </div>
  );
}

/* ---------- Murojaatlar ---------- */

/** Formadan kelgan xizmat kodi ("partnership") -> o'zbekcha nomi */
function serviceLabel(service: string): string {
  const map = translations.uz.contact.services as Record<string, string>;
  return map[service] ?? service;
}

type LeadFilter = "all" | "new" | "done";

function LeadsTab({ password }: { password: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LeadFilter>("all");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", { headers: authHeader(password) });
      if (!res.ok) throw new Error(await apiError(res));
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Xato bo'lsa ekranda ko'rsatadi; muvaffaqiyatli bo'lsa ro'yxatni yangilaydi */
  const run = async (request: Promise<Response>) => {
    setError("");
    try {
      const res = await request;
      if (!res.ok) throw new Error(await apiError(res));
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik");
    }
  };

  const removeOne = (id: string, name: string) => {
    if (!window.confirm(`«${name}» murojaatini o'chirasizmi?`)) return;
    run(fetch(`/api/contact/${id}`, { method: "DELETE", headers: authHeader(password) }));
  };

  const removeAll = () => {
    if (
      !window.confirm(
        `BARCHA ${leads.length} ta murojaat butunlay o'chiriladi va qaytarib bo'lmaydi.\n\nDavom etamizmi?`,
      )
    )
      return;
    run(fetch("/api/contact", { method: "DELETE", headers: authHeader(password) }));
  };

  const toggleHandled = (lead: Lead) =>
    run(
      fetch(`/api/contact/${lead.id}`, {
        method: "PATCH",
        headers: { ...authHeader(password), "Content-Type": "application/json" },
        body: JSON.stringify({ handled: !lead.handled }),
      }),
    );

  // "Ko'rildi" ustuni bazada bormi (eski bazada yo'q bo'lishi mumkin)
  const statusSupported = leads.some((l) => l.handled !== undefined);
  const newCount = leads.filter((l) => l.handled === false).length;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (filter === "new" && l.handled !== false) return false;
      if (filter === "done" && l.handled !== true) return false;
      if (!q) return true;
      return [l.name, l.phone, l.email, l.message, serviceLabel(l.service)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [leads, query, filter]);

  // Excel to'g'ri ochishi uchun: UTF-8 BOM va nuqtali vergul ajratgich
  const exportCsv = () => {
    const cell = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = [
      ["Sana", "Ism", "Telefon", "Email", "Xizmat", "Til", "Xabar", "Holat"],
      ...visible.map((l) => [
        formatDate(l.createdAt),
        l.name,
        l.phone,
        l.email,
        serviceLabel(l.service),
        (l.lang || "").toUpperCase(),
        l.message,
        l.handled === undefined ? "" : l.handled ? "Ko'rilgan" : "Yangi",
      ]),
    ];
    const csv = "﻿" + rows.map((r) => r.map(cell).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `murojaatlar-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Jami: <strong className="text-foreground">{leads.length}</strong> ta
          {statusSupported && newCount > 0 && (
            <>
              {" · "}
              <strong className="text-primary">{newCount}</strong> ta yangi
            </>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Yangilash
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={visible.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Excel (CSV)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={removeAll}
            disabled={loading || leads.length === 0}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hammasini o'chirish
          </Button>
        </div>
      </div>

      {error && <ErrorBox text={error} />}

      {!loading && leads.length > 0 && !statusSupported && (
        <div className="text-sm bg-amber-50 border border-amber-300 rounded-lg p-4 text-amber-900">
          <p className="font-medium">«Ko'rildi» belgisi hali yoqilmagan</p>
          <p className="mt-1 text-amber-800">
            Supabase → SQL Editor'da quyidagi qatorni bir marta ishga tushiring:
          </p>
          <code className="block mt-2 p-2 rounded bg-white/70 text-xs break-all select-all">
            alter table public.leads add column if not exists handled boolean not null default false;
          </code>
        </div>
      )}

      {leads.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ism, telefon yoki xabar bo'yicha qidirish..."
              className="pl-9 h-9"
            />
          </div>
          {statusSupported && (
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(
                [
                  ["all", "Hammasi"],
                  ["new", "Yangi"],
                  ["done", "Ko'rilgan"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 h-9 text-xs font-medium ${
                    filter === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">
          <Loader2 className="w-6 h-6 mx-auto animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        !error && <EmptyState icon={Inbox} text="Hozircha murojaatlar yo'q" />
      ) : visible.length === 0 ? (
        <EmptyState icon={Search} text="Mos murojaat topilmadi" />
      ) : (
        visible.map((lead) => (
          <div
            key={lead.id}
            className={`bg-background rounded-xl border p-5 sm:p-6 ${
              lead.handled === false ? "border-primary/40" : "border-border"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                {lead.name}
                {lead.handled === false && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-medium">
                    yangi
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {formatDate(lead.createdAt)} · {(lead.lang || "").toUpperCase()}
                </span>
                {lead.handled !== undefined && (
                  <button
                    type="button"
                    onClick={() => toggleHandled(lead)}
                    className={`inline-flex items-center gap-1 text-xs rounded-md border px-2 h-7 ${
                      lead.handled
                        ? "border-border text-muted-foreground hover:bg-muted"
                        : "border-primary text-primary hover:bg-primary/5"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {lead.handled ? "Ko'rilgan" : "Ko'rildi deb belgilash"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeOne(lead.id, lead.name)}
                  aria-label="O'chirish"
                  title="Bu murojaatni o'chirish"
                  className="text-muted-foreground hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground space-y-1 mb-3">
              <p>
                📞{" "}
                <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} className="hover:text-primary">
                  {lead.phone}
                </a>
                {lead.email && (
                  <>
                    {" · "}✉️{" "}
                    <a href={`mailto:${lead.email}`} className="hover:text-primary">
                      {lead.email}
                    </a>
                  </>
                )}
              </p>
              {lead.service && <p>🛠 {serviceLabel(lead.service)}</p>}
            </div>
            <p className="text-foreground text-sm whitespace-pre-wrap">{lead.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

/* ---------- Yangiliklar ---------- */

const emptyNewsForm = {
  title: { uz: "", ru: "", en: "" } as Record<NewsLang, string>,
  body: { uz: "", ru: "", en: "" } as Record<NewsLang, string>,
  imageUrl: "",
  /** "YYYY-MM-DD"; bo'sh — bugungi sana */
  date: "",
};

const NEWS_LANGS: { key: NewsLang; label: string }[] = [
  { key: "uz", label: "O'zbekcha *" },
  { key: "ru", label: "Ruscha" },
  { key: "en", label: "Inglizcha" },
];

/** ISO vaqtni Toshkent bo'yicha "YYYY-MM-DD" ga aylantiradi */
const toDateInput = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { timeZone: "Asia/Tashkent" });

function NewsTab({ password }: { password: string }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyNewsForm);
  const [lang, setLang] = useState<NewsLang>("uz");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (!res.ok) throw new Error(await apiError(res));
      const data = await res.json();
      setItems(data.news || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setForm(emptyNewsForm);
    setEditingId(null);
    setLang("uz");
  };

  const setText = (field: "title" | "body", value: string) =>
    setForm((f) => ({ ...f, [field]: { ...f[field], [lang]: value } }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // O'zbekcha majburiy — boshqa til tanlangan bo'lsa ham shuni tekshiramiz
    if (form.title.uz.trim().length < 3 || form.body.uz.trim().length < 10) {
      setLang("uz");
      setError("O'zbekcha sarlavha (kamida 3 belgi) va matn (kamida 10 belgi) majburiy");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(editingId ? `/api/news/${editingId}` : "/api/news", {
        method: editingId ? "PUT" : "POST",
        headers: { ...authHeader(password), "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.uz,
          body: form.body.uz,
          imageUrl: form.imageUrl,
          date: form.date || undefined,
          i18n: {
            ru: { title: form.title.ru, body: form.body.ru },
            en: { title: form.title.en, body: form.body.en },
          },
        }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      reset();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Bu yangilikni o'chirishni tasdiqlaysizmi?")) return;
    setError("");
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: authHeader(password),
      });
      if (!res.ok) throw new Error(await apiError(res));
      if (editingId === id) reset();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "O'chirishda xatolik");
    }
  };

  const startEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setLang("uz");
    setForm({
      title: { uz: item.title, ru: item.i18n?.ru?.title ?? "", en: item.i18n?.en?.title ?? "" },
      body: { uz: item.body, ru: item.i18n?.ru?.body ?? "", en: item.i18n?.en?.body ?? "" },
      imageUrl: item.imageUrl,
      date: toDateInput(item.createdAt),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={submit}
        className="bg-background rounded-xl border border-border p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            {editingId ? (
              <>
                <Pencil className="w-4 h-4" /> Yangilikni tahrirlash
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Yangi yangilik qo'shish
              </>
            )}
          </h3>
          {editingId && (
            <Button type="button" variant="ghost" size="sm" onClick={reset}>
              <X className="w-4 h-4 mr-1" /> Bekor qilish
            </Button>
          )}
        </div>

        {/* Til tanlash: o'zbekcha majburiy, qolganlari ixtiyoriy */}
        <div>
          <div className="flex rounded-lg border border-border overflow-hidden w-fit">
            {NEWS_LANGS.map((l) => (
              <button
                key={l.key}
                type="button"
                onClick={() => setLang(l.key)}
                className={`px-3 h-9 text-xs font-medium ${
                  lang === l.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                {l.label}
                {l.key !== "uz" && form.title[l.key] && " ✓"}
              </button>
            ))}
          </div>
          {lang !== "uz" && (
            <p className="text-xs text-muted-foreground mt-1.5">
              Bo'sh qoldirilsa, saytning shu tilida o'zbekcha matn ko'rsatiladi
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Sarlavha {lang === "uz" && "*"}
          </label>
          <Input
            value={form.title[lang]}
            onChange={(e) => setText("title", e.target.value)}
            placeholder="Yangilik sarlavhasi"
            maxLength={200}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Matn {lang === "uz" && "*"}
          </label>
          <Textarea
            value={form.body[lang]}
            onChange={(e) => setText("body", e.target.value)}
            placeholder="Yangilik matni..."
            rows={6}
          />
        </div>

        <div className="grid sm:grid-cols-[1fr_auto] gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Rasm (ixtiyoriy)
            </label>
            <UploadField
              value={form.imageUrl}
              onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              password={password}
              imagesOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Sana
            </label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="h-8 text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">Bo'sh — bugun</p>
          </div>
        </div>

        {error && <ErrorBox text={error} />}
        <Button type="submit" disabled={saving} className="h-11">
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : editingId ? (
            <Pencil className="w-4 h-4 mr-2" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          {editingId ? "Saqlash" : "Qo'shish"}
        </Button>
      </form>

      {loading ? (
        <div className="py-16 text-center">
          <Loader2 className="w-6 h-6 mx-auto animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={Newspaper} text="Hozircha yangiliklar yo'q" />
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="bg-background rounded-xl border border-border p-5 sm:p-6 flex gap-4"
          >
            {item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt=""
                className="w-24 h-24 rounded-lg object-cover shrink-0 hidden sm:block"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(item)} aria-label="Tahrirlash">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(item.id)}
                    aria-label="O'chirish"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {formatDate(item.createdAt)}
                {" · "}
                UZ{item.i18n?.ru?.title ? " · RU" : ""}
                {item.i18n?.en?.title ? " · EN" : ""}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2 whitespace-pre-line">
                {item.body}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ---------- Fayllar ombori ---------- */

const mb = (bytes: number) => (bytes / 1048576).toFixed(1);

function FilesTab({ password }: { password: string }) {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/storage", { headers: authHeader(password) });
      if (!res.ok) throw new Error(await apiError(res));
      setFiles((await res.json()).files ?? []);
      setSelected(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unused = files.filter((f) => !f.used && !f.recent);
  const total = files.reduce((n, f) => n + f.size, 0);
  const unusedSize = unused.reduce((n, f) => n + f.size, 0);

  const toggle = (name: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const removeSelected = async () => {
    const names = [...selected];
    if (
      !window.confirm(
        `${names.length} ta fayl ombordan butunlay o'chiriladi.\n\nUlar saytning hech qayerida ishlatilmayapti, lekin o'chirilgach qaytarib bo'lmaydi. Davom etamizmi?`,
      )
    )
      return;
    setDeleting(true);
    setError("");
    setDone("");
    try {
      const res = await fetch("/api/storage", {
        method: "DELETE",
        headers: { ...authHeader(password), "Content-Type": "application/json" },
        body: JSON.stringify({ names }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      const { deleted } = await res.json();
      setDone(`${deleted} ta fayl o'chirildi`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "O'chirishda xatolik");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-xl border border-border p-5 text-sm text-muted-foreground space-y-1">
        <p>
          Omborda: <strong className="text-foreground">{files.length}</strong> ta fayl,{" "}
          <strong className="text-foreground">{mb(total)} MB</strong> (bepul tarif chegarasi — 1024 MB)
        </p>
        <p>
          Hech qayerda ishlatilmayotgan:{" "}
          <strong className="text-foreground">{unused.length}</strong> ta,{" "}
          <strong className="text-foreground">{mb(unusedSize)} MB</strong>
        </p>
        <p className="text-xs">
          Rasm almashtirilganda eskisi omborda qoladi. Bu yerda faqat saytda ham, yangiliklarda
          ham ishlatilmayotgan va 1 kundan eski fayllar ko'rsatiladi.
        </p>
      </div>

      {error && <ErrorBox text={error} />}
      {done && (
        <p className="text-sm text-green-700 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
          <Check className="w-4 h-4" /> {done}
        </p>
      )}

      {loading ? (
        <div className="py-16 text-center">
          <Loader2 className="w-6 h-6 mx-auto animate-spin text-muted-foreground" />
        </div>
      ) : unused.length === 0 ? (
        <EmptyState icon={HardDrive} text="Ishlatilmayotgan fayl yo'q — ombor toza" />
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSelected(
                  selected.size === unused.length ? new Set() : new Set(unused.map((f) => f.name)),
                )
              }
            >
              {selected.size === unused.length ? "Tanlovni bekor qilish" : "Hammasini tanlash"}
            </Button>
            <Button
              size="sm"
              onClick={removeSelected}
              disabled={selected.size === 0 || deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Tanlanganlarni o'chirish ({selected.size})
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {unused.map((f) => (
              <label
                key={f.name}
                className={`bg-background rounded-xl border p-2 cursor-pointer ${
                  selected.has(f.name) ? "border-red-500 ring-2 ring-red-200" : "border-border"
                }`}
              >
                <div className="aspect-video rounded-lg bg-muted overflow-hidden mb-2">
                  {/\.(mp4|webm)$/i.test(f.name) ? (
                    <video src={f.url} className="w-full h-full object-cover" muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={selected.has(f.name)}
                    onChange={() => toggle(f.name)}
                  />
                  <span>{mb(f.size)} MB</span>
                  <span className="ml-auto">{f.createdAt ? toDateInput(f.createdAt) : ""}</span>
                </div>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Yordamchi ---------- */

function ErrorBox({ text }: { text: string }) {
  return (
    <p className="text-sm text-red-600 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
      <AlertCircle className="w-4 h-4 shrink-0" /> {text}
    </p>
  );
}

function EmptyState({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground">
      <Icon className="w-10 h-10 mx-auto mb-3 opacity-40" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
