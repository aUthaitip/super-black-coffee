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
          ? "สาขาและสถานีชาร์จ iGreen+"
          : "Branches & iGreen+ Charging Stations",
      desc:
        language === "th"
          ? "แวะพักดื่มกาแฟแก้วโปรด พร้อมเติมพลังให้รถของคุณที่สถานีชาร์จ iGreen+"
          : "Enjoy your favourite coffee while recharging your vehicle at an iGreen+ charging station.",
      image: "/services/igreen-plus-ev-station.webp",
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
      image: "/model/model-m.webp",
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
      image: "/hero/coffee2.webp",
      link: "/menu",
      linkText: language === "th" ? "ดูเมนูทั้งหมด" : "Explore Menu",
    },
  ];

  const [activeFeatureIndex, setActiveFeatureIndex] = useState(1);
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
      {/* Warm split background behind the content and full poster. */}
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[#f4ebe1] dark:bg-[#14100c]">
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 bg-[#e8ded3]/45 dark:bg-[#0d0b09]" />
      </div>

      {/* Main Content Container Layer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-8 sm:pb-12 flex-1 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-14 items-center">

        {/* Left Side Content: Strictly contained within left canvas & vertically centered */}
        <div className="w-full min-w-0 max-w-2xl text-left">
          {/* Clean Headline with Word Balancing & Emphasized Accent */}
          <ScrollRevealText delay={0.05} yOffset={28}>
            <p className="mb-5 text-sm sm:text-base font-semibold text-[#946025] dark:text-[#c69255]">
              {hero.eyebrow[language]}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[56px] font-bold tracking-tight leading-[1.3] text-stone-900 dark:text-white">
              <span className="block">{hero.headingLine1[language]}</span>
              <span className="block mt-3 text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] text-[#a96e2e] dark:text-[#c69255]">
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
                href="/franchise#calculator"
                className="px-7 py-3.5 rounded-full bg-stone-950 hover:bg-[#b57a38] text-white dark:bg-[#c69255] dark:hover:bg-[#d8a162] dark:text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-stone-900/10 flex items-center gap-2 group active:scale-95"
              >
                <span>{hero.packagesText[language]}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#contact"
                className="px-7 py-3.5 rounded-full bg-[#b57a38] hover:bg-[#9e672b] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-[0_4px_20px_rgba(181,122,56,0.35)] transition-all flex items-center gap-2 active:scale-95"
              >
                <span>{hero.consultText[language]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Preserve the full square artwork, including its logo and bottom caption. */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full min-w-0">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-stone-900/10 dark:border-white/10 bg-[#111210] shadow-2xl shadow-stone-950/15">
            <Image
              src="/hero/superblack-ev-cafe.webp"
              alt={language === "th" ? "Super Black EV x Café สถานีชาร์จ iGreen+ และร้านกาแฟ Super Black" : "Super Black EV x Café with an iGreen+ charging station and Super Black coffee shop"}
              fill
              priority
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), (max-width: 1280px) 46vw, 580px"
              className="object-contain object-center"
            />
          </div>
        </div>

        {/* Bottom Bar: Right Floating Showcase Card */}
        <div className="pt-8 sm:pt-10 lg:col-start-1 lg:row-start-2 min-w-0 flex items-end justify-start">
          <ScrollReveal delay={0.3} yOffset={24}>
            <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
              {/* The Floating Card with Auto-slide */}
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="w-full sm:w-[440px] max-w-full bg-white/95 dark:bg-[#1a1511]/90 backdrop-blur-xl border border-stone-200 dark:border-white/15 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 hover:border-[#c69255]"
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
