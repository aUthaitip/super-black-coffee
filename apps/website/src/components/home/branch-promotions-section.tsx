"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import {
  BRANCH_PROMOTIONS,
  PROMOTION_BRANCH_TABS,
  BranchPromotion,
} from "@/data/promotions";
import { PromotionCard } from "@/components/card";

export function BranchPromotionsSection() {
  const { language } = useLanguage();
  const [selectedBranch, setSelectedBranch] = useState<string>("ayutthaya");
  const [activeModalPromo, setActiveModalPromo] = useState<BranchPromotion | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter promotions by branch slug
  const filteredPromotions = BRANCH_PROMOTIONS.filter(
    (item) => item.branchSlug === selectedBranch
  );

  // Auto-scroll loop every 4.5 seconds unless user is interacting/modal open
  useEffect(() => {
    if (isPaused || activeModalPromo !== null) return;

    const timer = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      // If reached end, smooth scroll back to start
      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 340, behavior: "smooth" });
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, activeModalPromo, selectedBranch]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSelectBranch = (slug: string) => {
    setSelectedBranch(slug);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#faf8f5] dark:bg-black relative overflow-hidden mt-16 sm:mt-30 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-112.5 h-112.5 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-112.5 h-112.5 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 dark:text-white tracking-tight leading-[1.2]">
              {language === "th" ? "เลือกสิทธิ์พิเศษใกล้คุณ" : "Exclusive Privileges Near You"}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-[#8e8278] mt-2 font-medium">
              {language === "th"
                ? "โปรโมชั่นแต่ละรายการใช้ได้เฉพาะสาขาที่ระบุ"
                : "Each promotion is valid only at the designated branch"}
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous promotions"
              className="w-12 h-12 rounded-full border border-stone-300 dark:border-white/20 bg-white dark:bg-white/5 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-stone-800 dark:text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next promotions"
              className="w-12 h-12 rounded-full border border-stone-300 dark:border-white/20 bg-white dark:bg-white/5 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-stone-800 dark:text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm active:scale-95 shadow-xs"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Branch Filter Tabs */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {PROMOTION_BRANCH_TABS.map((tab) => {
            const isActive = selectedBranch === tab.slug;
            return (
              <button
                key={tab.slug}
                onClick={() => handleSelectBranch(tab.slug)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer select-none shadow-xs ${
                  isActive
                    ? "bg-stone-900 text-white dark:bg-[#c69255] dark:text-stone-950 shadow-md"
                    : "bg-white dark:bg-[#14100e] border border-stone-200 dark:border-[#2d241d] text-stone-700 dark:text-white hover:border-[#c69255] hover:text-[#c69255]"
                }`}
              >
                {tab.name[language]}
              </button>
            );
          })}
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredPromotions.map((promo) => (
            <div
              key={promo.id}
              className="w-[290px] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start"
            >
              <PromotionCard
                item={promo}
                language={language}
                onSelect={(item) => setActiveModalPromo(item)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Promotion Poster Lightbox Modal */}
      {activeModalPromo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            onClick={() => setActiveModalPromo(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-[#14100e] border border-stone-200 dark:border-[#c69255]/50 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalPromo(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 dark:bg-black">
              <Image
                src={activeModalPromo.image}
                alt={activeModalPromo.title[language]}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 512px"
              />
            </div>

            {/* Poster Details */}
            <div className="p-5 bg-stone-50 dark:bg-[#1a1612] border-t border-stone-200 dark:border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#c69255] text-stone-950">
                  {activeModalPromo.tag[language]}
                </span>
                <span className="text-xs font-medium text-stone-500 dark:text-[#a89c92]">
                  {language === "th" ? `สาขา${activeModalPromo.branchName.th}` : `${activeModalPromo.branchName.en} Branch`}
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-snug">
                {activeModalPromo.title[language]}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
