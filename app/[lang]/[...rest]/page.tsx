import { notFound } from "next/navigation";

// Mavjud bo'lmagan har qanday manzil — saytning o'z 404 sahifasi
// (sarlavha, menyu va tanlangan tilda xabar bilan)
export const dynamicParams = true;

export default function CatchAll() {
  notFound();
}
