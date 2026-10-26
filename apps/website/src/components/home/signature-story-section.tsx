"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Coffee, Award } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { ScrollReveal, ScrollRevealText } from "@/components/ui/scroll-reveal";

export function SignatureStorySection() {
  const { language } = useLanguage();

  const features = [
    {
      icon: Coffee,
      title: language === "th" ? "คัดสรร" : "Carefully",
      subtitle: language === "th" ? "เมล็ดพิเศษ" : "Selected Beans",
    },
    {
      icon: Flame,
      title: language === "th" ? "คั่วสดใหม่" : "Freshly Roasted",
      subtitle: language === "th" ? "ควบคุมความร้อนระดับวินาที" : "Second-Precision Control",
    },
    {
      icon: Sparkles,
      title: language === "th" ? "รสชาติเข้มลึก" : "Deep Roast",
      subtitle: language === "th" ? "หอมละมุน" : "Aromatic Finish",
    },
    {
      icon: Award,
      title: language === "th" ? "คุณภาพระดับ" : "Uncompromising",
      subtitle: language === "th" ? "พรีเมียม" : "Premium Quality",
    },
  ];

  return (
    <section id="story" className="relative scroll-mt-20 w-full bg-[#fbf9f5] dark:bg-[#0f0c0a] text-stone-900 dark:text-white py-16 sm:py-24 overflow-hidden border-b border-stone-200/70 dark:border-white/10 transition-colors duration-300">
      {/* Subtle organic watermark text in top right like the screenshot */}
      <div className="absolute top-6 right-4 sm:right-12 select-none pointer-events-none opacity-[0.04] dark:opacity-[0.03] text-right font-black tracking-tight text-7xl sm:text-9xl leading-none">
        GOOD<br />COFFEE<br />BETTER<br />YOU
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Glass Cup with Steaming Black Coffee & Floating Beans */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-4">
            <ScrollReveal delay={0.1} yOffset={28} className="w-full flex items-center justify-center">
              {/* Background Aesthetic Cream & Coffee Waves matching screenshot */}
              <div className="relative w-full max-w-[560px] aspect-[4/3.8] flex items-center justify-center">
                
                {/* Organic curved shape background behind cup */}
                <div className="absolute inset-0 rounded-[44px] overflow-hidden bg-gradient-to-br from-[#f4ebe1] via-[#f7f2ea] to-[#eee5da] dark:from-[#211a14] dark:via-[#19140f] dark:to-[#120e0b] border border-[#e5d8cb] dark:border-white/10 shadow-xl shadow-stone-900/5">
                  {/* Organic wave accent arc */}
                  <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-white/70 dark:bg-white/[0.04] blur-xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#c69255]/10 dark:bg-[#c69255]/5 blur-2xl pointer-events-none" />
                  
                  {/* Micro Editorial Label inside card like screenshot */}
                  <div className="absolute top-8 left-8 space-y-1 select-none pointer-events-none hidden sm:block">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#a49182] dark:text-stone-400 block font-bold">
                      PURE BEANS
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#a49182] dark:text-stone-400 block font-bold">
                      BETTER DAYS
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8 space-y-0.5 select-none pointer-events-none hidden sm:block">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#b57a38] dark:text-[#d8a162] block font-bold">
                      BLACK COFFEE
                    </span>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-[#a49182] dark:text-stone-400 block">
                      ALWAYS A GOOD IDEA
                    </span>
                  </div>
                </div>

                {/* High-Resolution Transparent Coffee Cup & Floating Beans */}
                <div className="relative z-10 w-[95%] h-[95%] drop-shadow-[0_20px_35px_rgba(40,25,10,0.18)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform duration-700 ease-out">
                  <Image
                    src="/hero/coffee2.webp"
                    alt="Super Black Signature Hot Coffee"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-contain object-center"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Typography, Features Grid & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            
            {/* Super Header Tag */}
            <ScrollRevealText delay={0.05} yOffset={20}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-[#b57a38]/40 dark:bg-[#d8a162]/40" />
                <p className="text-sm font-semibold text-[#946025] dark:text-[#c69255]">{language === "th" ? "เรื่องราว" : "OUR STORY"}</p>
              </div>
            </ScrollRevealText>
            {/* Main Headline */}
            <ScrollRevealText delay={0.12} yOffset={24}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-semibold text-stone-950 dark:text-white tracking-tight leading-[1.2]">
                {language === "th" ? (
                  <>
                    เรื่องราวของเรา<br />
                    <span className="text-[#3a2b20] dark:text-[#f2ebe2]">เริ่มต้นจากกาแฟในทุกแก้ว</span>
                  </>
                ) : (
                  <>
                    Our Story,<br />
                    <span className="text-[#3a2b20] dark:text-[#f2ebe2]">Behind Every Cup</span>
                  </>
                )}
              </h2>
            </ScrollRevealText>

            {/* Subtitle Paragraph */}
            <ScrollRevealText delay={0.2} yOffset={20}>
              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal">
                {language === "th"
                  ? "กาแฟดำที่คัดสรรเมล็ดคุณภาพ คั่วสดใหม่ ให้รสชาติบริสุทธิ์ เข้มลึก หอมละมุนในทุกแก้ว เพื่อยกระดับทุกช่วงเวลาของการดื่มกาแฟของคุณ"
                  : "Handcrafted black coffee sourced from highland single-origin beans, roasted fresh to deliver pure depth, rich body, and aromatic indulgence in every cup."}
              </p>
            </ScrollRevealText>

            {/* 4 Feature Badges with Rounded Pedestals */}
            <ScrollReveal delay={0.28} yOffset={24} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 w-full">
                {features.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-stone-200/80 dark:border-white/10 shadow-xs">
                      <div className="w-12 h-12 rounded-full bg-[#f4ebe1] dark:bg-[#251e18] flex items-center justify-center text-[#3a2818] dark:text-[#dfc2a5] mb-2.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-stone-900 dark:text-white block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5 leading-snug">
                        {item.subtitle}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Bottom Actions */}
            <ScrollReveal delay={0.35} yOffset={20}>
              <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-8">
                {/* Primary Black Pill Button */}
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-stone-950 hover:bg-[#b57a38] text-white dark:bg-[#c69255] dark:hover:bg-[#d8a162] dark:text-stone-950 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg shadow-stone-900/10 active:scale-95 group"
                >
                  <span>{language === "th" ? "ดูสินค้าและเมนูกาแฟ" : "Explore Coffee Menu"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Secondary Underline Link */}
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 hover:text-[#b57a38] dark:hover:text-[#d8a162] transition-colors pb-0.5 border-b-2 border-stone-400 dark:border-stone-600 hover:border-[#b57a38] dark:hover:border-[#d8a162] group"
                >
                  <span>{language === "th" ? "เรียนรู้เรื่องกาแฟ" : "Learn Coffee Craft"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </div>
    </section>
  );
}
