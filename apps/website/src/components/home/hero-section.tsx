"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";
import { ScrollReveal, ScrollRevealText } from "@/components/ui/scroll-reveal";

interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  link: string;
  linkText: string;
}

export function HeroSection() {
  const { language } = useLanguage();
  const { hero } = HOME_DATA;

  // Feature Showcase List for the bottom-right floating card
  const featureList: FeatureItem[] = [
    {
      id: "branches",
      title:
        language === "th"
          ? "สาขาและจุดบริการ EV Station"
          : "Branches & EV Station Hub",
      desc:
        language === "th"
          ? "แวะพักผ่อนกับกาแฟแก้วโปรด พร้อมจุดชาร์จรถยนต์ไฟฟ้า Ultra Fast EV Charger"
          : "Relax with your favorite cup while charging your vehicle fast.",
      image: "/branches/branch-banner-ev-sunset.webp",
      link: "/branches",
      linkText: language === "th" ? "ค้นหาสาขาใกล้คุณ" : "Find a Store",
    },
    {
      id: "franchise",
      title:
        language === "th"
          ? "ร่วมเติบโตกับ Super Black"
          : "Franchise Partnership",
      desc:
        language === "th"
          ? "โอกาสธุรกิจกาแฟสเปเชียลตี้คั่วสด ด้วยระบบสนับสนุนดิจิทัลเต็มรูปแบบ"
          : "Grow with modern specialty coffee systems & digital inventory support.",
      image: "/franchise/super-black-lifestyle-hub-models.webp",
      link: "/franchise",
      linkText: language === "th" ? "ดูแพ็กเกจแฟรนไชส์" : "View Packages",
    },
    {
      id: "menu",
      title:
        language === "th"
          ? "Super Black Specialty Roast"
          : "Super Black Roast Profile",
      desc:
        language === "th"
          ? "สูตรคั่วเข้มเฉพาะตัว บอดี้แน่น ผสานกลิ่นอายดาร์กช็อกโกแลตและคาราเมล"
          : "Second-precision roast with dark chocolate and caramel notes.",
      image: "/coffee/coffee-espresso.webp",
      link: "/menu",
      linkText: language === "th" ? "ดูเมนูทั้งหมด" : "Explore Menu",
    },
  ];

  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentFeature: FeatureItem = featureList[activeFeatureIndex] ?? (featureList[0] as FeatureItem);

  // Auto-slide showcase card every 4 seconds
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % featureList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, featureList.length]);

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#faf8f5] dark:bg-[#0d0b09] overflow-hidden flex flex-col justify-between transition-colors duration-300">
      {/* Split Grid: Left Canvas (54%) | Right Scenery (46%) */}
      <div className="absolute inset-0 z-0 flex flex-col lg:flex-row">
        {/* Left Warm Cream Tone Canvas */}
        <div className="w-full lg:w-[50%] h-full bg-[#f4ebe1] border-r border-[#e8ded3] dark:bg-[#14100c] dark:border-white/5 relative z-10 transition-colors duration-300" />

        {/* Right Half: Coffee Ingredients Showcase (hidden or background on smaller screens, prominent on lg) */}
        {/* ภาพ Hero ด้านขวา แสดงเต็มพื้นที่โดยไม่ลด Opacity */}
        <div className="relative w-full lg:w-[50%] h-full min-h-[300px] sm:min-h-[450px] lg:min-h-full overflow-hidden">
          <Image
            src="/hero/cafe&ev.jpg"
            alt="SUPER BLACK COFFEE"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center opacity-100 transition-transform duration-1000 hover:scale-105"
          />
        </div>
      </div>

      {/* Main Content Container Layer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 flex-1 flex flex-col justify-between">

        {/* Left Side Content: Strictly contained within left canvas & vertically centered */}
        <div className="w-full lg:w-[52%] max-w-2xl text-left my-auto pt-6 sm:pt-16 lg:pt-20">
          {/* Clean Headline with Word Balancing & Emphasized Accent */}
          <ScrollRevealText delay={0.05} yOffset={28}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-medium tracking-tight text-stone-900 dark:text-white leading-[1.2]">
              {language === "th" ? (
                <span className="block">
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] font-black text-[#b57a38] tracking-normal inline-block mr-2">
                    กาแฟออร์แกนิก
                  </span>
                  <span className="text-stone-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-bold">
                    จากไร่ปลูกเอง
                  </span>
                  <span className="block text-stone-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-bold mt-1">
                    สู่แก้วของคุณ
                    <span className="text-[#b57a38] text-4xl sm:text-5xl md:text-6xl font-black tracking-widest inline-block ml-1">
                      ...
                    </span>
                  </span>
                </span>
              ) : (
                <span className="block">
                  <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[68px] xl:text-[76px] font-black text-[#b57a38] tracking-normal inline-block mr-3">
                    Organic Coffee,
                  </span>
                  <span className="text-stone-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-bold">
                    From Our
                  </span>
                  <span className="block text-stone-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-bold mt-1">
                    Own Farm
                    <span className="text-[#b57a38] text-4xl sm:text-5xl md:text-6xl font-black tracking-widest inline-block ml-1">
                      ...
                    </span>
                  </span>
                </span>
              )}
              <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[42px] font-medium text-stone-700 dark:text-stone-200">
                {hero.headingLine2[language]}
              </span>
            </h1>
          </ScrollRevealText>

          {/* Description */}
          <ScrollRevealText delay={0.15} yOffset={20}>
            <p className="mt-6 text-base sm:text-lg md:text-[19px] text-stone-600 dark:text-stone-200 font-normal leading-relaxed max-w-xl">
              {hero.description[language]}
            </p>
          </ScrollRevealText>

          {/* Primary Action Buttons */}
          <ScrollReveal delay={0.25} yOffset={20}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/franchise"
                className="px-7 py-3.5 rounded-full bg-stone-950 hover:bg-[#b57a38] text-white dark:bg-[#c69255] dark:hover:bg-[#d8a162] dark:text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-stone-900/10 flex items-center gap-2 group active:scale-95"
              >
                <span>{hero.exploreMenuText[language]}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="px-7 py-3.5 rounded-full bg-[#b57a38] hover:bg-[#9e672b] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-[0_4px_20px_rgba(181,122,56,0.35)] transition-all flex items-center gap-2 active:scale-95"
              >
                <span>{hero.findBranchText[language]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Bar: Right Floating Showcase Card */}
        <div className="pt-8 sm:pt-12 flex items-end justify-start">
          <ScrollReveal delay={0.3} yOffset={24}>
            <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
              {/* The Floating Card with Auto-slide */}
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="w-full sm:w-[440px] bg-white/95 dark:bg-[#1a1511]/90 backdrop-blur-xl border border-stone-200 dark:border-white/15 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 hover:border-[#c69255]"
              >
                {/* Thumbnail Image */}
                <div className="relative w-full sm:w-36 h-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10">
                  <Image
                    key={currentFeature.image}
                    src={currentFeature.image}
                    alt={currentFeature.title}
                    fill
                    className="object-cover object-center transition-all duration-700 animate-in fade-in"
                    sizes="(max-width: 640px) 100vw, 150px"
                  />
                </div>

                {/* Text & Button */}
                <div
                  key={currentFeature.id}
                  className="flex flex-col justify-between h-full w-full space-y-2.5 text-left animate-in fade-in slide-in-from-right-2 duration-300"
                >
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white tracking-tight">
                      {currentFeature.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-semibold line-clamp-2 mt-0.5 leading-relaxed">
                      {currentFeature.desc}
                    </p>
                  </div>

                  <Link
                    href={currentFeature.link}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-stone-900 hover:bg-[#b57a38] text-white dark:bg-stone-100 dark:hover:bg-[#c69255] dark:text-stone-950 font-bold text-xs tracking-wide transition-colors self-start shadow-sm"
                  >
                    <span>{currentFeature.linkText}</span>
                  </Link>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2 pr-2">
                {featureList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFeatureIndex(idx)}
                    aria-label={`Show slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeFeatureIndex === idx
                        ? "w-6 bg-[#b57a38] dark:bg-[#c69255]"
                        : "w-2 bg-stone-400 dark:bg-white/30 hover:bg-stone-600 dark:hover:bg-white/60"
                      }`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
