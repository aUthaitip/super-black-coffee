"use client";

import React from "react";
import { useLanguage } from "@/i18n/language-provider";
import { MOCK_FRANCHISE_PACKAGES } from "@/data/franchise";
import { HOME_DATA } from "@/data/home";
import { FranchiseCard } from "@/components/card/franchise-card";

export function FranchiseTeaserSection() {
  const { language } = useLanguage();
  const { franchiseTeaser } = HOME_DATA;

  return (
    <section className="py-24 bg-[#0a0807] border-b border-[#26201b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#c69255] uppercase px-3.5 py-1 rounded-full bg-[#c69255]/15 border border-[#c69255]/30">
            {franchiseTeaser.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight mt-3">
            {franchiseTeaser.title[language]}
          </h2>
          <p className="text-sm sm:text-base text-[#a89b90] mt-3">
            {franchiseTeaser.subtitle[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_FRANCHISE_PACKAGES.map((pkg) => (
            <FranchiseCard
              key={pkg.id}
              pkg={pkg}
              language={language}
              viewDetailsText={franchiseTeaser.viewDetailsText[language]}
            />
          ))}
        </div>

        <div className="mt-10 text-center text-xs font-mono text-[#786c62]">
          {franchiseTeaser.disclaimer[language]}
        </div>
      </div>
    </section>
  );
}
