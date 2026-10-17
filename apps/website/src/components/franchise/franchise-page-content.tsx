"use client";

import React from "react";
import { 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Layers, 
  GraduationCap, 
  HeartHandshake, 
  Sparkles 
} from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { 
  FRANCHISE_BENEFITS, 
  FRANCHISE_STEPS, 
} from "@/data/franchise";
import { ScrollReveal, ScrollRevealText } from "@/components/ui/scroll-reveal";
import { FranchiseCalculator } from "./franchise-calculator";

export function FranchisePageContent() {
  const { language } = useLanguage();

  const renderBenefitIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-[#c69255]" };
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp {...props} />;
      case "ShieldCheck":
        return <ShieldCheck {...props} />;
      case "Zap":
        return <Zap {...props} />;
      case "Layers":
        return <Layers {...props} />;
      case "GraduationCap":
        return <GraduationCap {...props} />;
      case "HeartHandshake":
        return <HeartHandshake {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0a0807] text-stone-900 dark:text-white transition-colors duration-300 pb-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-8 sm:pt-24 sm:pb-12 overflow-hidden text-center">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#c69255]/[0.08] dark:bg-[#c69255]/[0.05] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollRevealText delay={0.08} yOffset={24}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-stone-950 dark:text-white tracking-tight leading-[1.2] mb-6">
              {language === "th" ? (
                <>
                  มากกว่าร้านกาแฟ คือธุรกิจที่สร้าง{" "}
                  <span className="text-[#b47836] dark:text-[#c69255]">รายได้หลายทาง</span>
                </>
              ) : (
                <>
                  Beyond Specialty Coffee,{" "}
                  <span className="text-[#b47836] dark:text-[#c69255]">Multi-Stream Business</span>
                </>
              )}
            </h1>
          </ScrollRevealText>

          <ScrollRevealText delay={0.15} yOffset={20}>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal mb-0">
              {language === "th"
                ? "ผสานพลังกาแฟพรีเมียมเข้มข้น เข้ากับจุดชาร์จ Ultra Fast EV Station, ร้านอาหาร-เบเกอรี่ และศูนย์บริการรับส่งพัสดุครบวงจรในทำเลทองของคุณ"
                : "Combine specialty dark roast craft with ultra-fast EV charging hubs, artisanal bakery, and integrated postal express services in prime locations."}
            </p>
          </ScrollRevealText>

        </div>
      </section>

      {/* 2. KEY BENEFITS (ทำไมต้องเลือกเรา) */}
      <section className="py-14 sm:py-16 bg-stone-100/70 dark:bg-[#100d0a] border-y border-stone-200 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealText delay={0.05} yOffset={20}>
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-950 dark:text-white tracking-tight">
                {language === "th" ? "จุดเด่นและความคุ้มค่าของการลงทุน" : "Key Advantages & ROI"}
              </h2>
              <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
                {language === "th"
                  ? "สร้างความมั่นใจในทุกก้าวของการเติบโต ด้วยมาตรฐานการคัดสรรและทีมสนับสนุนมืออาชีพ"
                  : "Empowering partner growth with proven business infrastructure and end-to-end expertise."}
              </p>
            </div>
          </ScrollRevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FRANCHISE_BENEFITS.map((b, idx) => (
              <ScrollReveal
                key={idx}
                delay={0.08 + idx * 0.08}
                yOffset={24}
              >
                <div className="p-7 rounded-3xl bg-white dark:bg-[#16120e] border border-stone-200/80 dark:border-white/5 shadow-xs hover:border-[#c69255]/60 hover:shadow-lg transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#c69255]/15 dark:bg-[#c69255]/10 border border-[#c69255]/30 flex items-center justify-center mb-5">
                      {renderBenefitIcon(b.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-stone-950 dark:text-white mb-2">
                      {language === "th" ? b.titleTh : b.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                      {language === "th" ? b.descTh : b.descEn}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 5 STEPS TO FRANCHISE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealText delay={0.05} yOffset={20}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-950 dark:text-white tracking-tight">
              {language === "th" ? "5 ขั้นตอนสู่การเปิดสาขาของคุณ" : "5 Steps to Open Your Store"}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
              {language === "th"
                ? "กระบวนการชัดเจน โปร่งใส พร้อมทีมงานเคียงข้างดูแลตั้งแต่เริ่มต้นจนเปิดร้านสำเร็จ"
                : "A seamless, transparent process guided by our franchise management team."}
            </p>
          </div>
        </ScrollRevealText>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {FRANCHISE_STEPS.map((s, idx) => (
            <ScrollReveal
              key={s.step}
              delay={0.05 + idx * 0.1}
              yOffset={24}
              className="relative"
            >
              <div className="p-6 rounded-3xl bg-white dark:bg-[#14100c] border border-stone-200/80 dark:border-white/5 h-full flex flex-col justify-between shadow-xs hover:border-[#c69255] transition-all">
                <div>
                  <span className="text-2xl sm:text-3xl font-semibold font-mono text-[#b47836] dark:text-[#c69255] block mb-3">
                    {s.step}
                  </span>
                  <h3 className="text-sm font-bold text-stone-950 dark:text-white mb-2 leading-snug">
                    {language === "th" ? s.titleTh : s.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                    {language === "th" ? s.descTh : s.descEn}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. INVESTMENT CALCULATOR (คำนวณเงินลงทุน ก่อสร้างร้าน) */}
      <FranchiseCalculator language={language} />
    </div>
  );
}
