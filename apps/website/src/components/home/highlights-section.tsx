"use client";

import React from "react";
import { Sparkles, Flame, Coffee } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";

export function HighlightsSection() {
  const { language } = useLanguage();
  const { highlights } = HOME_DATA;

  const renderIcon = (name: string) => {
    switch (name) {
      case "sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "flame":
        return <Flame className="w-6 h-6" />;
      default:
        return <Coffee className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-24 bg-[#171411] border-b border-[#352d26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#c69255] uppercase">
            {highlights.badge[language]}
          </span>
          <h2 className="text-3xl font-black text-white mt-1">
            {highlights.title[language]}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#201b16] border border-[#352d26] hover:border-[#c69255]/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#c69255] mb-6 group-hover:scale-110 transition-transform">
                {renderIcon(item.icon)}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title[language]}
              </h3>
              <p className="text-xs text-[#c5b8ae] leading-relaxed">
                {item.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
