"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-provider";
import { MOCK_FRANCHISE_PACKAGES } from "@/data/franchise";
import { HOME_DATA } from "@/data/home";

export function FranchiseTeaserSection() {
  const { language } = useLanguage();
  const { franchiseTeaser } = HOME_DATA;

  return (
    <section className="py-24 bg-black border-b border-[#352d26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#c69255] uppercase">
            {franchiseTeaser.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
            {franchiseTeaser.title[language]}
          </h2>
          <p className="text-sm text-[#c5b8ae] mt-3">
            {franchiseTeaser.subtitle[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_FRANCHISE_PACKAGES.map((pkg) => {
            const name = language === "th" ? pkg.nameTh : pkg.nameEn;
            const investment = language === "th" ? pkg.illustrativeInvestmentTh : pkg.illustrativeInvestmentEn;
            const size = language === "th" ? pkg.sizeTh : pkg.sizeEn;
            const recommendedFor = language === "th" ? pkg.recommendedForTh : pkg.recommendedForEn;

            return (
              <div
                key={pkg.id}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "bg-gradient-to-b from-[#201b16] to-[#28221c] border-[#c69255] shadow-2xl shadow-amber-950/40"
                    : "bg-[#171411] border-[#352d26]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#c69255]/20 text-[#c69255] border border-[#c69255]/30">
                      Tier {pkg.tier}
                    </span>
                    {pkg.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        Popular Choice
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                  <div className="my-4">
                    <span className="text-2xl font-black text-[#c69255] font-mono">
                      {investment}
                    </span>
                    <span className="text-[11px] text-[#9e9187] block mt-0.5">
                      {language === "th" ? "(งบประมาณประมาณการจำลอง)" : "(Illustrative Demo Estimate)"}
                    </span>
                  </div>
                  <p className="text-xs text-[#c5b8ae] mb-4">
                    {language === "th" ? "ขนาดพื้นที่:" : "Space Area:"}{" "}
                    <strong className="text-white">{size}</strong>
                  </p>
                  <p className="text-xs text-[#9e9187] leading-relaxed mb-6">
                    {recommendedFor}
                  </p>
                </div>

                <Link
                  href="/franchise"
                  className="w-full py-3 rounded-xl bg-[#201b16] hover:bg-[#c69255] hover:text-stone-950 border border-[#352d26] text-white text-center text-xs font-bold transition-all block"
                >
                  {franchiseTeaser.viewDetailsText[language]}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-[11px] font-mono text-[#9e9187]">
          {franchiseTeaser.disclaimer[language]}
        </div>
      </div>
    </section>
  );
}
