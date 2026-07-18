"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  AlertCircle,
} from "lucide-react";

const sectionIcons = [
  <Lock key="lock" className="w-6 h-6 text-blue-600" />,
  <Database key="database" className="w-6 h-6 text-green-600" />,
  <Eye key="eye" className="w-6 h-6 text-purple-600" />,
  <UserCheck key="user-check" className="w-6 h-6 text-orange-600" />,
  <Shield key="shield" className="w-6 h-6 text-red-600" />,
  <Shield key="shield-rights" className="w-6 h-6 text-indigo-600" />,
];

export default function PrivacyPolicyPage() {
  const { t, tObj, tList } = useLanguage();
  const privacyData = tObj("privacy") || {};
  const sections = tList("privacy.sections").map((e) => e.value);

  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {privacyData.title}
            </h1>
            <p className="text-xl text-gray-600">
              {privacyData.lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            {sections.map((section: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  {sectionIcons[index] || <Shield className="w-6 h-6 text-blue-600" />}
                  {section.title}
                </h2>
                {section.content && (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}
                {section.items && (
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                    {section.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.footer && (
                   <p className="text-gray-600 mt-4">
                    {section.footer}
                  </p>
                )}
                {index === 2 && (
                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong>Eslatma:</strong> {privacyData.note}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {privacyData.contact?.title}
              </h2>
              <p className="text-blue-800 leading-relaxed">
                {privacyData.contact?.description}
              </p>
              <div className="mt-4 space-y-2 text-blue-800">
                <p>
                  <strong>Email:</strong> privacy@uzgrow.uz
                </p>
                <p>
                  <strong>Telefon:</strong> +998 93 435-23-13
                </p>
                <p>
                  <strong>Manzil:</strong> {t("contact.address")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
