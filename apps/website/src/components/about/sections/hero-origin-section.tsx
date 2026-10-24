"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-provider";
import { ABOUT_DATA } from "@/data/about";

export function HeroOriginSection() {
  const { language } = useLanguage();
  const { hero } = ABOUT_DATA;

  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Title & Location */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-[#8a5722] dark:text-[#c69255]">ไร่กาแฟ</span>
            <span className="text-stone-900 dark:text-white">หัวพัน สปป.ลาว</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium tracking-wide">
            {hero.locationDetail[language]}
          </p>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#8a5722] dark:text-[#f3ce9c] tracking-tight leading-snug pt-2">
            {hero.title[language]}
          </h2>
        </div>

        {/* Full Image Banner: laos-coffee-farm-dawn.png */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-[32px] overflow-hidden border border-stone-200 dark:border-white/10 shadow-xl shadow-stone-900/10 dark:shadow-2xl dark:shadow-black/30 group">
          <Image
            src={hero.image}
            alt="Super Black Coffee Houaphan Farm"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-end text-xs font-mono text-[#f3ce9c]">
            <span className="hidden sm:inline text-stone-300">
              ELEVATION &gt; 1,200 MASL
            </span>
          </div>
        </div>

        {/* Story Content Block: รู้จักกับแหล่งปลูกเมล็ดกาแฟของเรา */}
        <div className="max-w-4xl mx-auto rounded-[32px] bg-white dark:bg-[#14100c] transition-colors duration-300 border border-stone-200 dark:border-white/10 p-8 sm:p-12 space-y-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#8a5722] dark:text-[#c69255] font-bold">
            SUPER BLACK COFFEE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            {hero.sectionTitle[language]}
          </h2>

          <div className="space-y-4 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            {hero.introParagraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p[language]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
