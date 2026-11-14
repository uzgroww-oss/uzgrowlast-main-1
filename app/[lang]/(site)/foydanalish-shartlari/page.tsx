"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FileText, CheckCircle, AlertCircle, Scale, Users, Shield } from "lucide-react";

const sectionIcons = [
  <CheckCircle key="check" className="w-6 h-6 text-green-600" />,
  <Users key="users" className="w-6 h-6 text-blue-600" />,
  <Scale key="scale" className="w-6 h-6 text-purple-600" />,
  <Shield key="shield" className="w-6 h-6 text-red-600" />,
  <FileText key="file" className="w-6 h-6 text-indigo-600" />,
  <FileText key="file-exit" className="w-6 h-6 text-gray-600" />,
  <FileText key="file-court" className="w-6 h-6 text-orange-600" />,
];

export default function TermsOfServicePage() {
  const { t, tObj, tList } = useLanguage();
  const termsData = tObj("terms") || {};
  const sections = tList("terms.sections").map((e) => e.value);

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {termsData.title}
            </h1>
            <p className="text-xl text-gray-600">
              {termsData.lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            {sections.map((section: any, index: number) => (
              <div key={index} className={index === 7 ? "bg-green-50 rounded-2xl p-8 border border-green-200" : "bg-white rounded-2xl shadow-lg p-8 border border-gray-100"}>
                <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${index === 7 ? "text-green-900" : "text-gray-900"}`}>
                  {sectionIcons[index] || <FileText className="w-6 h-6" />}
                  {section.title || (index === 7 ? t("terms.sections.7.title") : "")}
                </h2>
                {section.content && (
                  <p className={`${index === 7 ? "text-green-800" : "text-gray-600"} leading-relaxed`}>
                    {section.content}
                  </p>
                )}
                {section.items && (
                  <ul className={`list-disc list-inside space-y-2 mt-4 ${index === 7 ? "text-green-800" : "text-gray-600"}`}>
                    {section.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.note && (
                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong>Eslatma:</strong> {section.note}
                      </p>
                    </div>
                  </div>
                )}
                {index === 7 && (
                   <div className="mt-6 pt-6 border-t border-green-300">
                    <p className="text-green-800 font-medium">
                      {section.companyName}
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      {t("contact.address")}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
