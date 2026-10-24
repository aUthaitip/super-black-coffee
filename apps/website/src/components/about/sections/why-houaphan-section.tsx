"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-provider";
import { ABOUT_DATA } from "@/data/about";

export function WhyHouaphanSection() {
  const { language } = useLanguage();
  const { whyHouaphan, soilToCup } = ABOUT_DATA;

  return (
    <section className="relative z-10 py-20 sm:py-28 bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-white leading-tight">
            {whyHouaphan.title[language]}
          </h2>
        </div>

        {/* 4 Pillars Grid (01 to 04 with image and text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyHouaphan.pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="group relative rounded-[28px] bg-white dark:bg-[#14100d] border border-stone-200 dark:border-white/10 hover:border-[#b57a38] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg shadow-stone-900/5 dark:shadow-black/25 hover:shadow-[0_15px_40px_rgba(181,122,56,0.18)]"
            >
              {/* Photo Header */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                <Image
                  src={pillar.image}
                  alt={pillar.label[language]}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#14100d] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-2xl font-black font-mono text-[#f3ce9c] px-3 py-1 rounded-full bg-black/80 border border-[#b57a38]/40">
                    {pillar.num}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8a5722] dark:text-[#f3ce9c] font-semibold block">
                    {pillar.label[language]}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-2 leading-snug">
                    {pillar.title[language]}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {pillar.desc[language]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Interlude Showcase: 2 Images with labels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Image 1: organic-coffee-harvest.png */}
          <div className="group rounded-[32px] overflow-hidden border border-stone-200 dark:border-white/10 bg-white dark:bg-[#14100c] transition-colors duration-300 shadow-xl shadow-stone-900/10 dark:shadow-2xl dark:shadow-black/30">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={soilToCup.harvestImage}
                alt={soilToCup.harvestBadge[language]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-6">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
                {soilToCup.harvestBadge[language]}
              </h3>
            </div>
          </div>

          {/* Image 2: soil-to-cup-journey.png */}
          <div className="group rounded-[32px] overflow-hidden border border-stone-200 dark:border-white/10 bg-white dark:bg-[#14100c] transition-colors duration-300 shadow-xl shadow-stone-900/10 dark:shadow-2xl dark:shadow-black/30">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={soilToCup.journeyImage}
                alt={soilToCup.journeyBadge[language]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-6">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
                {soilToCup.journeyBadge[language]}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
