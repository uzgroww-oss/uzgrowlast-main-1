"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, AlertCircle } from "lucide-react";

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm";

/**
 * Manzil maydoni + «Yuklash» tugmasi.
 *
 * Fayl tanlansa qurilmadan serverga yuklanadi va maydonga uning manzili
 * qo'yiladi. Manzilni qo'lda yozish ham mumkin — masalan Cloudinary havolasi.
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

  const upload = async (file: File) => {
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${password}` },
        body,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Yuklanmadi (${res.status})`);
      }
      onChange(data.url);
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
          Yuklash
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={imagesOnly ? ACCEPT.split(",").filter((t) => t.startsWith("image/")).join(",") : ACCEPT}
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
    </div>
  );
}
