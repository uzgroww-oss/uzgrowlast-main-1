"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  Loader2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Globe,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapEmbed } from "@/components/ui/map-embed";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export function Contact() {
  const { t, currentLang } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.phoneLabel"),
      value: t("contact.companyPhone"),
      href: `tel:${t("contact.companyPhone").replace(/\s/g, "")}`,
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: t("contact.companyPhone2"),
      href: `tel:${t("contact.companyPhone2").replace(/\s/g, "")}`,
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: Mail,
      label: t("contact.emailLabel"),
      value: t("contact.companyEmail"),
      href: `mailto:${t("contact.companyEmail")}`,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: MapPin,
      label: t("contact.address"),
      value: t("contact.address"),
      href: t("contact.locationUrl"),
      color: "bg-red-500/10 text-red-600",
    },
    {
      icon: Globe,
      label: "Website",
      value: t("contact.website"),
      href: t("contact.website"),
      color: "bg-purple-500/10 text-purple-600",
    },
  ];

  const serviceTypes = [
    t("contact.services.turnkey"),
    t("contact.services.engineering"),
    t("contact.services.equipment"),
    t("contact.services.consulting"),
    t("contact.services.investment"),
  ];

  const socials = [
    {
      icon: Youtube,
      label: "YouTube",
      href: t("contact.socialLinks.youtube"),
      color: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: t("contact.socialLinks.instagram"),
      color: "bg-pink-500/10 text-pink-600 hover:bg-pink-500/20",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: t("contact.socialLinks.facebook"),
      color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
    },
    {
      icon: MessageCircle,
      label: "Telegram",
      href: t("contact.socialLinks.telegram"),
      color: "bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20",
    },
    {
      icon: Music,
      label: "TikTok",
      href: t("contact.socialLinks.tiktok"),
      color: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang: currentLang }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setIsSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submit failed:", error);
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="aloqa" className="py-10 lg:py-14 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left: Form + Working Hours + Socials */}
          <div className="flex flex-col gap-6">
          <div className="bg-background rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {t("contact.formTitle")}
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("contact.name")}
                    </label>
                    <Input
                      name="name"
                      type="text"
                      placeholder={t("contact.namePlaceholder")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("contact.phone")}
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder={t("contact.phonePlaceholder")}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.email")}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.service")}
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("contact.servicePlaceholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.message")}
                  </label>
                  <Textarea
                    name="message"
                    placeholder={t("contact.messagePlaceholder")}
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800">
                      <strong>{t("contact.errorTitle")}</strong>
                      <br />
                      {t("contact.errorMessage")}
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t("contact.send")}
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("contact.success")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("contact.successMessage")}
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    <strong>{t("contact.successHeader") || "Ma'lumotlar qabul qilindi!"}</strong>
                    <br />
                    {t("contact.successSubheader") || "Sizning xabaringiz yuborildi."}
                  </p>
                </div>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  {t("contact.newMessage")}
                </Button>
              </div>
            )}
          </div>

          {/* Working Hours */}
          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {t("contact.workingHours")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("contact.workingHoursDesc")}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("contact.monday")}-{t("contact.friday")}
                </span>
                <span className="text-foreground font-medium">
                  9:00 - 18:00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("contact.saturday")}
                </span>
                <span className="text-foreground font-medium">
                  9:00 - 15:00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("contact.sunday")}
                </span>
                <span className="text-foreground font-medium">
                  {t("contact.closed")}
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-background rounded-xl p-6 border border-border flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {t("contact.socialMedia")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-border transition-all duration-200 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{social.label}</span>
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {t("contact.followUs")}
            </p>
          </div>
          </div>

          {/* Right: Contact Info + Map */}
          <div className="space-y-6">
            <div>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${info.color}`}
                    >
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {info.label}
                      </p>
                      <p className="text-foreground font-medium">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-background rounded-xl p-6 border border-border">
              <div className="space-y-4">
                {/* Interactive Map */}
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                  <MapEmbed
                    src="https://yandex.ru/map-widget/v1/?ll=69.290768%2C41.243647&z=16&pt=69.290768%2C41.243647%2Cpmrdm1&source=constructor"
                    title={t("common.mapAlt")}
                  />
                </div>

                {/* Location Details */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">
                        {t("footer.brandName")} Office
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("contact.locationCity") || "Tashkent, Uzbekistan"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("contact.coordinatesLabel") || "Koordinatalar"}: 41.243647, 69.290768
                      </p>
                    </div>
                  </div>

                  {/* Map Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          "https://yandex.ru/navi?rtext=41.243647,69.290768&rtt=auto",
                          "_blank",
                        )
                      }
                      className="flex-1"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t("contact.getDirections")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const address = t("contact.address");
                        navigator.clipboard.writeText(address);
                        alert(t("contact.addressCopied") || "Manzil nusxalandi!");
                      }}
                      className="flex-1"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {t("contact.copyAddress")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
