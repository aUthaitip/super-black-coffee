"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { FAQ_DATA } from "@/data/faq";

export function FaqSection() {
  const { language } = useLanguage();
  const faq = FAQ_DATA;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative z-10 py-24 sm:py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Clean Title matching screenshot */}
        <div className="mb-10 sm:mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mediumi text-white tracking-tight">
            {faq.title[language]}
          </h2>
        </div>

        {/* Minimalist shadcn-style Accordion List */}
        <div className="border-t border-white/10">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`transition-all duration-200 ${
                  isOpen
                    ? "my-4 rounded-xl border border-[#c69255]/40 bg-black p-5 sm:p-6 shadow-[0_4px_20px_rgba(198,146,85,0.08)]"
                    : "border-b border-white/10 hover:border-[#c69255]/40"
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
                    className={`text-base sm:text-lg tracking-normal transition-colors ${
                      isOpen
                        ? "text-[#c69255] font-medium"
                        : "text-white font-normal group-hover:text-[#c69255]"
                    }`}
                  >
                    {item.question[language]}
                  </span>

                  <span className="shrink-0 flex items-center justify-center transition-colors">
                    {isOpen ? (
                      <X className="w-4 h-4 text-[#c69255]" />
                    ) : (
                      <Plus className="w-5 h-5 text-white/60 group-hover:text-[#c69255]" />
                    )}
                  </span>
                </button>

                {/* Expanded Answer */}
                {isOpen && (
                  <div className="pt-1 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                    {item.answer[language]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

