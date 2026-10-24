"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-provider";
import { ABOUT_DATA } from "@/data/about";

export function BranchesGrowthSection() {
  const { language } = useLanguage();
  const { branchesSection } = ABOUT_DATA;

  return (
    <section className="relative z-10 py-20 sm:py-28 bg-[#f0e9df] dark:bg-stone-950 text-stone-900 dark:text-white transition-colors duration-300 border-t border-stone-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-white leading-tight">
            {branchesSection.title[language]}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            {branchesSection.description[language]}
          </p>
        </div>

        {/* 3 Branches Journey Cards (01 อยุธยา, 02 พิษณุโลก, 03 ประชาอุทิศ) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branchesSection.branches.map((b) => (
            <div
              key={b.num}
              className="group rounded-[32px] bg-white dark:bg-[#14100d] border border-stone-200 dark:border-white/10 hover:border-[#b57a38] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg shadow-stone-900/5 dark:shadow-black/25 hover:shadow-[0_15px_40px_rgba(181,122,56,0.2)]"
            >
              {/* Branch Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                <Image
                  src={b.image}
                  alt={b.name[language]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#14100d] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#b57a38]/50 text-xs font-mono font-bold text-[#f3ce9c]">
                    {b.num}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white group-hover:text-[#8a5722] dark:group-hover:text-[#f3ce9c] transition-colors">
                    {b.name[language]}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {b.desc[language]}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
