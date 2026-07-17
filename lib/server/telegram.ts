import type { Lead } from "./leads";

// Telegram javob bermay qolsa murojaat javobi osilib qolmasligi kerak
const TIMEOUT_MS = 8000;

// TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID berilmagan bo'lsa jimgina o'tkazib yuboriladi —
// lead baribir saqlanadi.
export async function notifyTelegram(lead: Lead): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text = [
    "🌱 <b>UZ GROW — yangi murojaat</b>",
    "",
    `👤 <b>Ism:</b> ${escapeHtml(lead.name)}`,
    `📞 <b>Telefon:</b> ${escapeHtml(lead.phone)}`,
    `✉️ <b>Email:</b> ${escapeHtml(lead.email)}`,
    `🛠 <b>Xizmat:</b> ${escapeHtml(lead.service || "-")}`,
    "",
    `💬 ${escapeHtml(lead.message)}`,
    "",
    `🌐 Til: ${lead.lang} | 🕒 ${new Date(lead.createdAt).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`,
  ].join("\n");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      signal: controller.signal,
    });

    if (!res.ok) {
      // Noto'g'ri token yoki chat ID jimgina o'tib ketmasligi uchun
      // Telegram'ning o'z xato matnini logga yozamiz
      const detail = await res.text().catch(() => "");
      console.error(
        `Telegram sendMessage ${res.status}: ${detail.slice(0, 500)}`,
      );
      return false;
    }
    return true;
  } catch (error) {
    const reason =
      error instanceof Error && error.name === "AbortError"
        ? `javob ${TIMEOUT_MS}ms ichida kelmadi`
        : error;
    console.error("Telegram notify failed:", reason);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
