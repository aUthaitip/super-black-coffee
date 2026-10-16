"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { ABOUT_DATA } from "@/data/about";

export function BranchesGrowthSection() {
  const { language } = useLanguage();
  const { branchesSection } = ABOUT_DATA;

  return (
    <section className="relative z-10 py-20 sm:py-28 bg-stone-950 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {branchesSection.title[language]}
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            {branchesSection.description[language]}
          </p>
        </div>

        {/* 3 Branches Journey Cards (01 อยุธยา, 02 พิษณุโลก, 03 ประชาอุทิศ) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branchesSection.branches.map((b) => (
            <div
              key={b.num}
              className="group rounded-[32px] bg-[#14100d] border border-white/10 hover:border-[#b57a38] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_15px_40px_rgba(181,122,56,0.2)]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100d] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#b57a38]/50 text-xs font-mono font-bold text-[#f3ce9c]">
                    {b.num}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#f3ce9c] transition-colors">
                    {b.name[language]}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                    {b.desc[language]}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#b57a38]">
                  <span>SUPER BLACK COFFEE</span>
                  <Link
                    href="/branches"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>{language === "th" ? "ดูสาขา" : "View"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
