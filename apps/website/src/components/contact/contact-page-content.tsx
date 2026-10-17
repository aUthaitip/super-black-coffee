"use client";

import React from "react";
import { ContactFormSection } from "@/components/home/contact-form-section";
import { useLanguage } from "@/i18n/language-provider";

export function ContactPageContent() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-white selection:bg-[#c69255] selection:text-white pb-28 transition-colors duration-300">
      {/* Header Banner */}
      <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-mono font-bold tracking-widest text-[#b47836] dark:text-[#d8a162] uppercase block mb-3">
          {language === "th" ? "ติดต่อเรา" : "CONTACT US"}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-950 dark:text-white tracking-tight">
          {language === "th" ? "ติดต่อ Super Black Coffee" : "Get in Touch With Us"}
        </h1>
        <p className="mt-4 text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {language === "th"
            ? "ยินดีให้คำปรึกษา สอบถามเรื่องแฟรนไชส์ เมนูกาแฟ หรือบริการจัดเลี้ยง"
            : "We're here to assist with franchise inquiries, specialty beans, or events."}
        </p>
      </section>

      {/* Main Interactive Contact Section */}
      <div className="relative z-10 -mt-8">
        <ContactFormSection />
      </div>
    </div>
  );
}
