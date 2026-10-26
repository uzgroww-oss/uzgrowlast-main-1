/**
 * Telefon raqamlari tarjima faylida (va admin panelda) "+998555152223"
 * ko'rinishida saqlanadi. Bu yerda ular ko'rsatish va havola uchun
 * bir xil formatga keltiriladi — shunda admin raqamni o'zgartirsa
 * header, footer va aloqa bo'limi birdan yangilanadi.
 */

const digits = (phone: string) => phone.replace(/\D/g, "");

/** "+998555152223" -> "+998 55 515 22 23". Boshqa uzunlikdagini o'zgartirmaydi */
export function formatPhone(phone: string): string {
  const d = digits(phone);
  if (d.length === 12 && d.startsWith("998")) {
    return `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
  }
  return phone.trim();
}

export const telHref = (phone: string) => `tel:+${digits(phone)}`;

/** WhatsApp havolasi raqamni "+" va bo'shliqlarsiz talab qiladi */
export const whatsappHref = (phone: string) => `https://wa.me/${digits(phone)}`;
