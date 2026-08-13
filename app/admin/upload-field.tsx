"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, AlertCircle, CheckCircle2 } from "lucide-react";

const ACCEPT =
  "image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm";

/** Saytda 1920px dan kengroq rasm kerak emas */
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 0.82;

/**
 * Rasmni brauzerda siqadi.
 *
 * Ikki sababga ko'ra:
 *  1. Telefondagi surat 5-10 MB bo'ladi. Bunday fayl saytni sekinlashtiradi.
 *  2. Siqilgandan keyin fayl kichrayadi va yuklash tezroq bo'ladi.
 *
 * GIF siqilmaydi — u harakatli bo'lishi mumkin, canvas esa faqat birinchi
 * kadrni oladi va animatsiya yo'qoladi. Video ham tegilmaydi.
 * Agar siqish natijasi aslidan katta chiqsa, asl fayl qoladi.
 */
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;

  try {
    // from-image — telefonda olingan suratning aylanishi to'g'ri hisobga olinadi
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    // Siqib bo'lmadi — asl fayl bilan davom etamiz
    return file;
  }
}

const mb = (n: number) => (n / (1024 * 1024)).toFixed(1);

/**
 * Manzil maydoni + «Yuklash» tugmasi.
 *
 * Fayl SERVER ORQALI EMAS, brauzerdan to'g'ridan-to'g'ri Supabase omboriga
 * yuboriladi. Sabab: Vercel serverless funksiyaga 4.5 MB dan katta so'rovni
 * o'tkazmaydi va yuklash "jimgina" ishlamay qo'yadi. Server faqat qisqa
 * muddatli imzolangan havola beradi (/api/upload/sign).
 */
export function UploadField({
  value,
  onChange,
  password,
  placeholder = "https://... yoki fayl yuklang",
  className = "",
  imagesOnly = false,
}: {
  value: string;
  onChange: (url: string) => void;
  password: string;
  placeholder?: string;
  className?: string;
  imagesOnly?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const upload = async (original: File) => {
    setBusy(true);
    setError("");
    setNote("");

    try {
      const file = await compressImage(original);
      if (file !== original) {
        setNote(`siqildi: ${mb(original.size)} MB → ${mb(file.size)} MB`);
      }

      // 1) Serverdan ruxsat so'raymiz (parol shu yerda tekshiriladi)
      const signRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ type: file.type, size: file.size }),
      });
      const sign = await signRes.json().catch(() => null);
      if (!signRes.ok || !sign?.ok) {
        throw new Error(sign?.error || `Yuklashni boshlab bo'lmadi (${signRes.status})`);
      }

      // 2) Faylni to'g'ridan-to'g'ri Supabase omboriga yuboramiz
      const put = await fetch(sign.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!put.ok) {
        const detail = await put.text().catch(() => "");
        console.error("Supabase upload xatosi:", put.status, detail.slice(0, 300));
        throw new Error(`Fayl omborga yozilmadi (${put.status})`);
      }

      onChange(sign.publicUrl);
      setNote((n) => (n ? n + " · yuklandi" : "yuklandi"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yuklashda xatolik");
    } finally {
      setBusy(false);
      // Bir xil faylni qayta tanlash mumkin bo'lsin
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <div className="flex gap-1.5">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-xs h-8"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          title="Qurilmadan fayl yuklash"
          className="h-8 px-2.5 shrink-0 rounded-md border border-border bg-background hover:bg-muted disabled:opacity-50 flex items-center gap-1 text-xs"
        >
          {busy ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          {busy ? "Yuklanmoqda" : "Yuklash"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={
            imagesOnly
              ? ACCEPT.split(",").filter((t) => t.startsWith("image/")).join(",")
              : ACCEPT
          }
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" /> {error}
        </p>
      )}
      {!error && note && (
        <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 shrink-0" /> {note}
          <span className="text-muted-foreground">— «Saqlash» tugmasini bosing</span>
        </p>
      )}
    </div>
  );
}
