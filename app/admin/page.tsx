"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Lock,
  RefreshCw,
  Inbox,
  Newspaper,
  Users,
  Plus,
  Trash2,
  Pencil,
  X,
  LogOut,
  FileText,
  Menu,
} from "lucide-react";
import { ContentPagesNav, ContentTab, ContentToolbar } from "./content-tab";
import { ContentProvider } from "./content-store";
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
}

interface NewsItem {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar: string;
  experience: string;
  email: string;
  phone: string;
  skills: string[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
}

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
      const res = await fetch("/api/auth", {
        headers: { Authorization: `Bearer ${pw}` },
      });
      const data = await res.json().catch(() => null);

      // Faqat aniq tasdiq kirishga ruxsat beradi — server xatosi (500) yoki
      // kutilmagan javob "kirdim" deb hisoblanmasligi kerak
      if (res.ok && data?.ok === true) {
        sessionStorage.setItem("uzgrow_admin_pw", pw);
        setAuthed(true);
        return;
      }

      sessionStorage.removeItem("uzgrow_admin_pw");
      if (res.status === 401) {
        setError("Parol noto'g'ri");
      } else if (res.status === 429) {
        setError("Juda ko'p urinish. Biroz kutib, qaytadan urinib ko'ring");
      } else if (res.status === 503) {
        setError("ADMIN_PASSWORD sozlanmagan — serverga parol qo'shing");
      } else {
        setError(data?.error || `Server xatosi (${res.status})`);
      }
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
      <main className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
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
              <p className="text-xs text-muted-foreground">
                Parolni kiriting
              </p>
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

type Section = "content" | "leads" | "news" | "team";

const SECTIONS: { key: Section; label: string; icon: typeof Inbox }[] = [
  { key: "content", label: "Sahifa matnlari", icon: FileText },
  { key: "leads", label: "Murojaatlar", icon: Inbox },
  { key: "news", label: "Yangiliklar", icon: Newspaper },
  { key: "team", label: "Jamoa", icon: Users },
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

  const active = SECTIONS.find((s) => s.key === section)!;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobil menyu ochiq bo'lganda orqa fon */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Chap menyu */}
      {/* Katta ekranda doim ochiq, mobilda faqat tugma bosilganda */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-background border-r border-border flex-col lg:flex ${
          mobileOpen ? "flex" : "hidden"
        }`}
      >
        <div className="h-14 flex items-center gap-2 px-4 border-b border-border shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="UZ GROW" className="h-7 w-auto" />
          <span className="font-semibold text-foreground text-sm">
            Boshqaruv paneli
          </span>
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
            onClick={onLogout}
            className="w-full justify-start text-muted-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Chiqish
          </Button>
        </div>
      </aside>

      {/* Asosiy qism */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 h-14 flex items-center gap-3 px-4 border-b border-border bg-background/85 backdrop-blur">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
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
          {section === "team" && <TeamTab password={password} />}
        </main>
      </div>
    </div>
  );
}

/* ---------- Murojaatlar ---------- */

function LeadsTab({ password }: { password: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${password}` },
      });
      const data = await res.json();
      setLeads(data.leads || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Jami: <strong className="text-foreground">{leads.length}</strong> ta
        </p>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Yangilash
        </Button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">
          <Loader2 className="w-6 h-6 mx-auto animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <EmptyState icon={Inbox} text="Hozircha murojaatlar yo'q" />
      ) : (
        leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-background rounded-xl border border-border p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground">{lead.name}</h3>
              <span className="text-xs text-muted-foreground">
                {formatDate(lead.createdAt)} · {lead.lang.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1 mb-3">
              <p>
                📞{" "}
                <a href={`tel:${lead.phone}`} className="hover:text-primary">
                  {lead.phone}
                </a>
                {lead.email && (
                  <>
                    {" · "}✉️{" "}
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:text-primary"
                    >
                      {lead.email}
                    </a>
                  </>
                )}
              </p>
              {lead.service && <p>🛠 {lead.service}</p>}
            </div>
            <p className="text-foreground text-sm whitespace-pre-wrap">
              {lead.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

/* ---------- Yangiliklar ---------- */

const emptyNewsForm = { title: "", body: "", imageUrl: "" };

function NewsTab({ password }: { password: string }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyNewsForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setItems(data.news || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/news/${editingId}` : "/api/news";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Xatolik: ${res.status}`);
      }
      setForm(emptyNewsForm);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Bu yangilikni o'chirishni tasdiqlaysizmi?")) return;
    await fetch(`/api/news/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${password}` },
    });
    await load();
  };

  const startEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({ title: item.title, body: item.body, imageUrl: item.imageUrl });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Forma */}
      <form
        onSubmit={submit}
        className="bg-background rounded-xl border border-border p-6 space-y-4"
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditingId(null);
                setForm(emptyNewsForm);
              }}
            >
              <X className="w-4 h-4 mr-1" /> Bekor qilish
            </Button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Sarlavha *
          </label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Yangilik sarlavhasi"
            required
            minLength={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Matn *
          </label>
          <Textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            placeholder="Yangilik matni..."
            rows={5}
            required
            minLength={10}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Rasm havolasi (ixtiyoriy)
          </label>
          <UploadField
            value={form.imageUrl}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
            password={password}
            imagesOnly
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            Qurilmangizdan rasm yuklang yoki tayyor havolani joylashtiring
          </p>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
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

      {/* Ro'yxat */}
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
            className="bg-background rounded-xl border border-border p-6 flex gap-4"
          >
            {item.imageUrl && (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(item)}
                    aria-label="Tahrirlash"
                  >
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

/* ---------- Jamoa ---------- */

const emptyMemberForm = {
  name: "",
  position: "",
  bio: "",
  avatar: "",
  experience: "",
  email: "",
  phone: "",
  skills: "",
};

function TeamTab({ password }: { password: string }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyMemberForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setMembers(data.members || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const url = editingId ? `/api/team/${editingId}` : "/api/team";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Xatolik: ${res.status}`);
      }
      setForm(emptyMemberForm);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Bu jamoa a'zosini o'chirishni tasdiqlaysizmi?"))
      return;
    await fetch(`/api/team/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${password}` },
    });
    await load();
  };

  const startEdit = (m: TeamMember) => {
    setEditingId(m.id);
    setForm({
      name: m.name,
      position: m.position,
      bio: m.bio,
      avatar: m.avatar,
      experience: m.experience,
      email: m.email,
      phone: m.phone,
      skills: m.skills.join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground">
        Bu yerga a'zo qo'shilsa, saytdagi <strong>Jamoa</strong> bo'limida
        tarjima faylidagi standart a'zolar o'rniga shu ro'yxat ko'rsatiladi.
      </div>

      {/* Forma */}
      <form
        onSubmit={submit}
        className="bg-background rounded-xl border border-border p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            {editingId ? (
              <>
                <Pencil className="w-4 h-4" /> A'zoni tahrirlash
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Yangi a'zo qo'shish
              </>
            )}
          </h3>
          {editingId && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditingId(null);
                setForm(emptyMemberForm);
              }}
            >
              <X className="w-4 h-4 mr-1" /> Bekor qilish
            </Button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Ism familiya *
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ism Familiya"
              required
              minLength={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Lavozim *
            </label>
            <Input
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              placeholder="Masalan: Texnik direktor"
              required
              minLength={2}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Qisqacha bio
          </label>
          <Textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="A'zo haqida qisqacha..."
            rows={3}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Rasm havolasi
            </label>
            <UploadField
              value={form.avatar}
              onChange={(url) => setForm({ ...form, avatar: url })}
              password={password}
              imagesOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Tajriba
            </label>
            <Input
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
              placeholder="Masalan: 6+ yillik"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Telefon
            </label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+998 XX XXX XX XX"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Ko'nikmalar
          </label>
          <Input
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            placeholder="Agrobiznes, Menejment, Marketing"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            Vergul bilan ajrating
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
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

      {/* Ro'yxat */}
      {loading ? (
        <div className="py-16 text-center">
          <Loader2 className="w-6 h-6 mx-auto animate-spin text-muted-foreground" />
        </div>
      ) : members.length === 0 ? (
        <EmptyState
          icon={Users}
          text="API orqali qo'shilgan a'zolar yo'q — saytda standart jamoa ko'rsatilmoqda"
        />
      ) : (
        members.map((m) => (
          <div
            key={m.id}
            className="bg-background rounded-xl border border-border p-6 flex items-start gap-4"
          >
            {m.avatar ? (
              <img
                src={m.avatar}
                alt={m.name}
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary/60" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-foreground">{m.name}</h4>
                  <p className="text-sm text-primary">{m.position}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(m)}
                    aria-label="Tahrirlash"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(m.id)}
                    aria-label="O'chirish"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {m.bio && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {m.bio}
                </p>
              )}
              {m.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {m.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ---------- Yordamchi ---------- */

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
