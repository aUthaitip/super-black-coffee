"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { FAQ_DATA } from "@/data/faq";
import { ScrollReveal, ScrollRevealText } from "@/components/ui/scroll-reveal";

export function FaqSection() {
  const { language } = useLanguage();
  const faq = FAQ_DATA;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative z-10 py-24 sm:py-32 bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Clean Title */}
        <div className="mb-10 sm:mb-12 text-left">
          <ScrollRevealText delay={0.05} yOffset={24}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 dark:text-white tracking-tight">
              {faq.title[language]}
            </h2>
          </ScrollRevealText>
        </div>

        {/* Minimalist Accordion List */}
        <div className="border-t border-stone-200 dark:border-white/10">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal
                key={index}
                delay={Math.min(index * 0.08, 0.4)}
                yOffset={16}
                className="w-full"
              >
                <div
                  className={`transition-all duration-200 ${
                    isOpen
                      ? "my-4 rounded-2xl border border-[#c69255]/50 bg-white dark:bg-[#14110e] p-5 sm:p-6 shadow-sm dark:shadow-[0_4px_20px_rgba(198,146,85,0.08)]"
                      : "border-b border-stone-200 dark:border-white/10 hover:border-[#c69255]/50"
                  }`}
                >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className={`w-full text-left flex items-center justify-between gap-4 cursor-pointer select-none group ${
                    isOpen ? "pb-3" : "py-5 sm:py-6"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg tracking-normal transition-colors font-bold ${
                      isOpen
                        ? "text-[#b47836] dark:text-[#c69255]"
                        : "text-stone-800 dark:text-white group-hover:text-[#b47836] dark:group-hover:text-[#c69255]"
                    }`}
                  >
                    {item.question[language]}
                  </span>

                  <span className="shrink-0 flex items-center justify-center transition-colors">
                    {isOpen ? (
                      <X className="w-4 h-4 text-[#b47836] dark:text-[#c69255]" />
                    ) : (
                      <Plus className="w-5 h-5 text-stone-400 dark:text-white/60 group-hover:text-[#c69255]" />
                    )}
                  </span>
                </button>

                {/* Expanded Answer */}
                {isOpen && (
                  <div className="pt-1 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {item.answer[language]}
                  </div>
                )}
              </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
