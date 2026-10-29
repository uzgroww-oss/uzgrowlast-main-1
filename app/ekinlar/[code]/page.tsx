import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CropDetail } from "@/components/crops";
import { CROPS, cropByCode } from "@/lib/crops";

type Params = { params: Promise<{ code: string }> };

// Sahifalar build paytida tayyorlanadi; ro'yxatda yo'q manzil — 404
export const dynamicParams = false;

export function generateStaticParams() {
  return CROPS.map((c) => ({ code: c.code }));
}

export async function generateMetadata({ params }: Params) {
  const crop = cropByCode((await params).code);
  if (!crop) return {};
  return pageMeta({
    path: `/ekinlar/${crop.code}`,
    title: crop.title,
    description: crop.description,
  });
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
