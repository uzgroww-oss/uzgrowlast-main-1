import { notFound } from "next/navigation";
import { buildMeta } from "@/lib/seo";
import { isLocale } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CropDetail } from "@/components/crops";
import { CROPS, cropByCode } from "@/lib/crops";

type Params = { params: Promise<{ code: string; lang: string }> };

// Sahifalar build paytida tayyorlanadi; ro'yxatda yo'q manzil — 404
export const dynamicParams = false;

export function generateStaticParams() {
  return CROPS.map((c) => ({ code: c.code }));
}

export async function generateMetadata({ params }: Params) {
  const { code, lang } = await params;
  const crop = cropByCode(code);
  if (!crop) return {};
  return buildMeta(
    { path: `/ekinlar/${crop.code}`, title: crop.title, description: crop.description },
    isLocale(lang) ? lang : "uz",
  );
}

export default async function CropPage({ params }: Params) {
  const { code } = await params;
  if (!cropByCode(code)) notFound();
  return (
    <main className="min-h-screen">
      <Header />
      <CropDetail code={code} />
      <Footer />
    </main>
  );
}
