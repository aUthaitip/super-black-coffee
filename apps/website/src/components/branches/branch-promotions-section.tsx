"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { BRANCH_PROMOTIONS, PROMOTION_BRANCH_TABS } from "@/data/promotions";

interface BranchPromotionsSectionProps {
  onSelectBranchBySlug?: (slug: string) => void;
}

export function BranchPromotionsSection({ onSelectBranchBySlug }: BranchPromotionsSectionProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("ayutthaya");

  const filteredPromos = BRANCH_PROMOTIONS.filter(
    (item) => item.branchSlug === activeTab
  );

  return (
    <section className="mt-20 pt-16 border-t border-stone-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#c69255]/15 text-[#b47836] dark:text-[#d8a162] border border-[#c69255]/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "th" ? "สิทธิพิเศษเฉพาะสาขา" : "Branch Exclusive Deals"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
              {language === "th" ? "โปรโมชั่นและแคมเปญประจำสาขา" : "Store Promotions & Campaigns"}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-1 max-w-xl font-medium">
              {language === "th"
                ? "พบกับโปรโมชั่นซื้อ 1 แถม 1 และเมนูพิเศษที่ออกแบบเพื่อมอบความสดชื่นให้กับลูกค้าในแต่ละพื้นที่"
                : "Discover 1-for-1 offers and handcrafted specialty refreshments tailored for local stores."}
            </p>
          </div>

          {/* Branch Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#14110e] border border-stone-200 dark:border-white/10 shrink-0 shadow-sm">
            {PROMOTION_BRANCH_TABS.map((tab) => {
              const isSelected = activeTab === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => setActiveTab(tab.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#c69255] text-stone-950 shadow-sm"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white"
                  }`}
                >
                  <span>{language === "th" ? `สาขา${tab.name.th}` : `${tab.name.en} Store`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPromos.slice(0, 8).map((promo) => (
            <div
              key={promo.id}
              className="group rounded-2xl bg-white dark:bg-[#14110e] border border-stone-200/90 dark:border-white/10 hover:border-[#c69255] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#c69255]/5"
            >
              <div className="relative aspect-[3/4] w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.title[language]}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#c69255] text-stone-950 shadow-sm">
                    {promo.tag[language]}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 dark:bg-[#171310] flex-1 flex flex-col justify-between border-t border-stone-100 dark:border-white/5">
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white group-hover:text-[#c69255] transition-colors line-clamp-2">
                  {promo.title[language]}
                </h4>
                
                {onSelectBranchBySlug && (
                  <button
                    type="button"
                    onClick={() => onSelectBranchBySlug(activeTab)}
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#b47836] dark:text-[#d8a162] hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{language === "th" ? "ดูข้อมูลสาขานี้" : "View Branch"}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
