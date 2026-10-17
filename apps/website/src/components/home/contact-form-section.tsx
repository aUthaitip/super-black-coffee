"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { CONTACT_DATA } from "@/data/contact";
import { createContactSchema, ContactFormValues } from "@/lib/validations/contact";
import { ScrollReveal, ScrollRevealText } from "@/components/ui/scroll-reveal";

export function ContactFormSection() {
  const { language } = useLanguage();
  const contact = CONTACT_DATA;
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic schema reflecting current language
  const contactSchema = React.useMemo(() => createContactSchema(language), [language]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "general",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitted(true);
    reset();
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="relative z-10 py-24 sm:py-32 bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#c69255]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Editorial Info */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <ScrollRevealText delay={0.05} yOffset={24}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 dark:text-white tracking-tight leading-[1.2]">
                {contact.title[language]}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#b47836] dark:text-[#c69255] leading-relaxed font-bold">
                {contact.subtitle[language]}
              </p>
            </ScrollRevealText>

            {/* Direct Info Cards */}
            <ScrollReveal delay={0.18} yOffset={20}>
              <div className="space-y-4 pt-2">
                {contact.infoItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-black border border-stone-200 dark:border-white/10 hover:border-[#c69255] transition-colors shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#c69255]/10 border border-[#c69255]/30 flex items-center justify-center shrink-0 text-[#b47836] dark:text-[#c69255]">
                      {item.iconName === "Mail" && <Mail className="w-5 h-5" />}
                      {item.iconName === "Phone" && <Phone className="w-5 h-5" />}
                      {item.iconName === "MapPin" && <MapPin className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-mono block">{item.label}</span>
                      <span className="text-sm font-bold text-stone-900 dark:text-white">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: React Hook Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.25} yOffset={28}>
              <div className="rounded-3xl border border-stone-200 dark:border-white/15 bg-white dark:bg-white/10 p-6 sm:p-10 shadow-xl">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#c69255]/15 border border-[#c69255]/40 flex items-center justify-center mx-auto text-[#c69255]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                    {contact.successMessage.title[language]}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto font-medium">
                    {contact.successMessage.description[language]}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2 text-left">
                      <label htmlFor="name" className="text-sm font-bold text-stone-800 dark:text-white block">
                        {language === "th" ? "ชื่อ - นามสกุล" : "Full Name"}
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        placeholder={language === "th" ? "เช่น สมชาย กาแฟดี" : "e.g. John Doe"}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-black border text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none transition-colors ${
                          errors.name
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                            : "border-stone-200 dark:border-white/15 focus:border-[#c69255] focus:bg-white"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2 text-left">
                      <label htmlFor="phone" className="text-sm font-bold text-stone-800 dark:text-white block">
                        {language === "th" ? "เบอร์โทรศัพท์" : "Phone Number"}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        placeholder="08X-XXX-XXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-black border text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none transition-colors font-mono ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                            : "border-stone-200 dark:border-white/15 focus:border-[#c69255] focus:bg-white"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="email" className="text-sm font-bold text-stone-800 dark:text-white block">
                      {language === "th" ? "อีเมลติดต่อ" : "Email Address"}
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your.email@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-black border text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none transition-colors font-mono ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                          : "border-stone-200 dark:border-white/15 focus:border-[#c69255] focus:bg-white"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject Selection */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="subject" className="text-sm font-bold text-stone-800 dark:text-white block">
                      {language === "th" ? "เรื่องที่ต้องการติดต่อ" : "Inquiry Type"}
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        {...register("subject")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-black border border-stone-200 dark:border-white/15 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-[#c69255] transition-colors cursor-pointer appearance-none"
                      >
                        {contact.inquiryOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">
                            {opt.label[language]}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-400">
                        <svg className="w-4 h-4 fill-none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="message" className="text-sm font-bold text-stone-800 dark:text-white block">
                      {language === "th" ? "ข้อความของคุณ" : "Message"}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register("message")}
                      placeholder={language === "th" ? "ระบุรายละเอียดที่ต้องการสอบถาม..." : "Write your message here..."}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-black border text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                          : "border-stone-200 dark:border-white/15 focus:border-[#c69255] focus:bg-white"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-[#b57a38] text-white font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                      <span>{isSubmitting ? (language === "th" ? "กำลังส่ง..." : "Sending...") : (language === "th" ? "ส่งข้อความถึงเรา" : "Send Message")}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
