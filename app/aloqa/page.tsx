"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Users,
  Download,
  ExternalLink,
  MessageCircle,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapEmbed } from "@/components/ui/map-embed";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { mediaIds, useMedia } from "@/contexts/MediaContext";

const getContactInfo = (t: (key: string) => string) => [
  {
    icon: Phone,
    title: t("contact.phone"),
    value: "+998555152223",
    href: "tel:+998555152223",
  },
  {
    icon: Send,
    title: "WhatsApp",
    value: "+998994352313",
    href: "https://wa.me/+998555152223",
  },
  {
    icon: Mail,
    title: t("contact.email"),
    value: "uzgrrow@gmail.com",
    href: "mailto:uzgrrow@gmail.com",
  },
  {
    icon: MapPin,
    title: t("contact.location"),
    value: "GROW AGRO TEAM OFFICE",
    href: "https://yandex.ru/navi?rtext=41.202864,69.235732~41.202625,69.235384&rtt=auto",
  },
];

export default function AloqaPage() {
  const { t, currentLang } = useLanguage();
  const { mList } = useMedia();
  const contactInfo = getContactInfo(t);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [currentBgImage, setCurrentBgImage] = useState(0);

  // Fon slaydlari — admin paneldan almashtiriladi
  const backgroundImages = mList(mediaIds("aloqa.background", 4));

  // Change background image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.subject,
          message: formData.message,
          lang: currentLang,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setIsSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Contact form submit failed:", error);
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen relative"
      style={{
        backgroundImage: `url("${backgroundImages[currentBgImage]}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />
      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="pt-12 lg:pt-16 pb-10 lg:pb-14 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 sm:px-4 py-2 bg-[#24B14B]/10 text-primary rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                {t("contact.title")}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">
                {t("contact.subtitle")}
              </h1>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t("contact.infoTitle")}
                </h2>

                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#24B14B]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Social Links */}
                <div className="pt-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    {t("contact.socialMedia")}
                  </h3>
                  <div className="flex gap-3">
                    {[
                      {
                        name: "Telegram",
                        href: "http://@Uz_Grow",
                        icon: MessageCircle,
                      },
                      {
                        name: "Instagram",
                        href: "https://www.instagram.com/uz.grow?igsh=MXMwN3lzaW95NTN1YQ==",
                        icon: Instagram,
                      },
                      {
                        name: "YouTube",
                        href: "https://youtube.com/@rustamjonrakhmonov?si=9-OxlFiY0B875tD9",
                        icon: Youtube,
                      },
                      {
                        name: "Facebook",
                        href: "https://www.facebook.com/people/uzgrow/61555877069972/?rdid=DcrSKZ6JcT9V7Tj3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DePjLwX79%2F",
                        icon: Facebook,
                      },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#24B14B] hover:text-primary-foreground transition-all"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {t("contact.formTitle")}
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    {t("contact.formDescription")}
                  </p>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-[#24B14B]/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {t("contact.success")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("contact.successMessage")}
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {t("contact.name")} *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            placeholder={t("contact.namePlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {t("contact.phone")} *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder={t("contact.phonePlaceholder")}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {t("contact.email")}
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder={t("contact.emailPlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {t("contact.service")}
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          >
                            <option value="">
                              {t("contact.servicePlaceholder")}
                            </option>
                            <option value="consultation">
                              {t("contact.services.consulting")}
                            </option>
                            <option value="project">
                              {t("contact.services.project")}
                            </option>
                            <option value="investment">
                              {t("contact.services.investment")}
                            </option>
                            <option value="partnership">
                              {t("contact.services.partnership")}
                            </option>
                            <option value="other">
                              {t("contact.services.other")}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("contact.message")}
                        </label>
                        <textarea
                          rows={5}
                          name="message"
                          required
                          minLength={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                          placeholder={t("contact.messagePlaceholder")}
                        />
                      </div>

                      {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <p className="text-sm text-red-800">
                            <strong>{t("contact.errorTitle")}</strong>
                            <br />
                            {t("contact.errorMessage")}
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className={cn(
                          "w-full rounded-full gap-2 text-sm sm:text-base",
                          isLoading && "opacity-70 cursor-not-allowed",
                        )}
                      >
                        {isLoading ? (
                          <>
                            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            {t("contact.sending")}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {t("contact.send")}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("Map")}
              </h2>
              <p className="text-muted-foreground">{t("Adress on Map")}</p>
            </div>

            {/* Interactive Map */}
            <div className="aspect-[21/9] bg-card rounded-3xl overflow-hidden border-2 border-border relative">
              <MapEmbed
                src="https://yandex.ru/map-widget/v1/?ll=69.290768%2C41.243647&z=16&pt=69.290768%2C41.243647%2Cpmrdm1&source=constructor"
                title={t("common.mapAlt")}
              />

              {/* Map Actions */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    window.open(
                      "https://yandex.ru/navi?rtext=41.243647,69.290768&rtt=auto",
                      "_blank",
                    )
                  }
                  className="bg-background/90 backdrop-blur-sm hover:bg-background"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {t("contact.getDirections")}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const address =
                      "GROW AGRO TEAM OFFICE";
                    navigator.clipboard.writeText(address);
                    alert(t("contact.addressCopied"));
                  }}
                  className="bg-background/90 backdrop-blur-sm hover:bg-background"
                >
                  {t("contact.copyAddress")}
                </Button>
              </div>
            </div>

            {/* Location Details */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    {t("contact.location")}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("contact.locationDetails")}
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    {t("contact.workingHours")}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("contact.monday")} - {t("contact.friday")}: 9:00 - 18:00
                  <br />
                  {t("contact.saturday")}: 9:00 - 15:00
                  <br />
                  {t("contact.sunday")}: {t("contact.closed")}
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    {t("contact.callUs")}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  +998555152223
                  <br />
                  +998994352313 (WhatsApp)
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
