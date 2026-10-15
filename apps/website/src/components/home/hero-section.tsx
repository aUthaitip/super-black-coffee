"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Coffee } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";

export function HeroSection() {
  const { language } = useLanguage();
  const { hero } = HOME_DATA;

  interface FeatureItem {
    id: string;
    title: string;
    desc: string;
    image: string;
    link: string;
    linkText: string;
  }

  const featureList: FeatureItem[] = [
    {
      id: "bolaven",
      title: language === "th" ? "ที่ราบสูงโบลาเวน" : "Bolaven Plateau",
      desc:
        language === "th"
          ? "แหล่งกำเนิดเมล็ดกาแฟสายพันธุ์พิเศษบนดินภูเขาไฟ สูงกว่า 1,200 เมตร"
          : "Volcanic mineral soil terroir over 1,200m altitude.",
      image: "/about/coffee-journey-transparent.webp",
      link: "/about",
      linkText: language === "th" ? "อ่านเรื่องราว" : "Read Story",
    },
    {
      id: "branches",
      title: language === "th" ? "คาเฟ่บรรยากาศอบอุ่น" : "Atmospheric Cafes",
      desc:
        language === "th"
          ? "ดีไซน์หรูหราโทนดำ พร้อมมุมพักผ่อนและจุดชาร์จ EV ครบครัน"
          : "Obsidian luxury ambiance with EV fast-chargers.",
      image: "/branches/branch-banner-ev-sunset.webp",
      link: "/branches",
      linkText: language === "th" ? "ค้นหาสาขา" : "Find Branch",
    },
    {
      id: "signature",
      title: language === "th" ? "ซิกเนเจอร์แบล็ค" : "Signature Roasts",
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
    <section className="relative -mt-16 w-full min-h-[92vh] lg:min-h-screen bg-[#0d0b09] overflow-hidden flex flex-col justify-between">
      {/* Split Grid: Left Canvas (54%) | Right Scenery (46%) */}
      <div className="absolute inset-0 z-0 flex flex-col lg:flex-row">
        {/* Left Warm Tone Canvas */}
        <div className="w-full lg:w-[54%] h-full bg-[#14100c] lg:bg-gradient-to-r lg:from-[#110e0b] lg:via-[#15110d] lg:to-[#1a1410] border-r border-white/5 relative z-10" />

        {/* Right Half: Cinematic High-Resolution Coffee Scenery */}
        <div className="relative w-full lg:w-[46%] h-full min-h-[450px] lg:min-h-full overflow-hidden">
          <Image
            src="/hero/superblackcoffee-sunset-cafe.webp"
            alt="Super Black Coffee Ambiance"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000 brightness-95"
          />

          {/* Smooth blend gradients: Left soft dark fade into canvas, bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14100c] via-black/20 to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      </div>

      {/* Main Content Container Layer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex-1 flex flex-col justify-center">
        
        {/* Left Side Content: Strictly contained within left canvas & vertically centered */}
        <div className="w-full lg:w-[52%] max-w-2xl text-left my-auto pt-16 sm:pt-20">
          {/* Clean Headline with Word Balancing & Emphasized Accent */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-medium tracking-tight text-white leading-[1.2] drop-shadow-sm">
            {language === "th" ? (
              <span className="block">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[68px] xl:text-[76px] font-bold text-[#b57a38] tracking-normal inline-block mr-2">
                  กาแฟดี
                </span>
                <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-medium">
                  ในทุกจังหวะ
                </span>
                <span className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-medium mt-1">
                  ของคุณ
                  <span className="text-[#b57a38] text-4xl sm:text-5xl md:text-6xl font-black tracking-widest inline-block ml-1">
                    ...
                  </span>
                </span>
              </span>
            ) : (
              <span className="block whitespace-nowrap">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[66px] font-bold text-[#b57a38] mr-2">
                  Great Coffee,
                </span>
                <span className="text-white">Every Moment.</span>
                <span className="text-[#b57a38] text-4xl sm:text-5xl md:text-6xl font-black tracking-widest inline-block ml-1">
                  ...
                </span>
              </span>
            )}
            <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[42px] font-normal text-stone-200">
              {hero.headingLine2[language]}
            </span>
          </h1>

          {/* Description - Enlarged for clearer readability */}
          <p className="mt-6 text-base sm:text-lg md:text-[19px] text-stone-200 font-normal leading-relaxed max-w-xl">
            {hero.description[language]}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="px-7 py-3.5 rounded-full bg-[#c69255] hover:bg-[#d8a162] text-stone-950 font-semibold text-sm sm:text-base tracking-wide transition-all shadow-lg shadow-[#c69255]/20 flex items-center gap-2 group active:scale-95"
            >
              <span>{hero.exploreMenuText[language]}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/branches"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm sm:text-base tracking-wide backdrop-blur-md transition-all flex items-center gap-2 active:scale-95"
            >
              <MapPin className="w-4 h-4 text-[#c69255]" />
              <span>{hero.findBranchText[language]}</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Right Floating Showcase Card matching screenshot */}
        <div className="pt-8 sm:pt-12 flex items-end justify-end">
          {/* Bottom Right Floating Card + Pagination Dots (Exactly matching screenshot) */}
          <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
            {/* The Floating Card with Auto-slide and Animated Transitions */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="w-full sm:w-[440px] bg-[#1a1511]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 hover:border-[#c69255]/50"
            >
              {/* Thumbnail Image with Key for Smooth Animation */}
              <div className="relative w-full sm:w-36 h-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-stone-900 border border-white/10">
                <Image
                  key={currentFeature.image}
                  src={currentFeature.image}
                  alt={currentFeature.title}
                  fill
                  className="object-cover object-center transition-all duration-700 animate-in fade-in"
                  sizes="(max-width: 640px) 100vw, 150px"
                />
              </div>

              {/* Text & Button with Key for Smooth Transition */}
              <div
                key={currentFeature.id}
                className="flex flex-col justify-between h-full w-full space-y-2.5 text-left animate-in fade-in slide-in-from-right-2 duration-300"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                    {currentFeature.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-normal line-clamp-2 mt-0.5 leading-relaxed">
                    {currentFeature.desc}
                  </p>
                </div>

                <Link
                  href={currentFeature.link}
                  className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-stone-100 hover:bg-[#c69255] text-stone-950 hover:text-stone-950 font-medium text-xs tracking-wide transition-colors self-start shadow-sm"
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
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeFeatureIndex === idx
                      ? "w-6 bg-[#c69255]"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
