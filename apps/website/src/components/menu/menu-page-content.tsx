"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { MENU_CATEGORIES, MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

interface SanityMenuItem {
  id: string;
  nameTh: string;
  nameEn: string;
  price: number;
  category: string;
  image: string;
  isPopular?: boolean;
}

interface MenuPageContentProps {
  initialItems?: SanityMenuItem[];
}

export function MenuPageContent({ initialItems = [] }: MenuPageContentProps) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("popular");
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const sliderRef = useRef<HTMLDivElement>(null);

  // Normalize items from Sanity
  const menuItems: MenuItem[] = useMemo(() => {
    return initialItems.map((item) => ({
      id: item.id,
      name: {
        th: item.nameTh,
        en: item.nameEn || item.nameTh,
      },
      price: item.price,
      category: item.category as MenuItem["category"],
      image: item.image || "/coffee/coffee-espresso.webp",
      isPopular: item.isPopular,
    }));
  }, [initialItems]);

  // Filter items by active category
  const categoryItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (activeCategory === "popular") {
        return Boolean(item.isPopular || item.category === "popular");
      }
      return item.category === activeCategory;
    });
  }, [menuItems, activeCategory]);

  // Filtered items based on Search
  const searchFilteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categoryItems;
    return categoryItems.filter(
      (item) =>
        item.name.th.toLowerCase().includes(q) ||
        item.name.en.toLowerCase().includes(q)
    );
  }, [categoryItems, searchQuery]);

  // Reset active index when category changes
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setActiveItemIndex(0);
    setSearchQuery("");
  };

  const handlePrev = () => {
    setActiveItemIndex((prev) => (prev > 0 ? prev - 1 : categoryItems.length - 1));
  };

  const handleNext = () => {
    setActiveItemIndex((prev) => (prev < categoryItems.length - 1 ? prev + 1 : 0));
  };

  // Center the active item in slider when activeItemIndex changes
  useEffect(() => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>("[data-menu-slide]");
    const activeCard = cards[activeItemIndex];
    if (activeCard) {
      const containerWidth = container.offsetWidth;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      container.scrollTo({
        left: cardLeft - containerWidth / 2 + cardWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeItemIndex]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0a09] text-stone-900 dark:text-white selection:bg-[#c69255] selection:text-white transition-colors duration-300">
      
      {/* 1. Header Banner (แบบคลีน สะอาดตา ปรับระยะห่างด้านบนให้กระชับขึ้น) */}
      <section className="relative pt-18 pb-3 sm:pt-20 sm:pb-4 text-center bg-white dark:bg-[#0c0a09] border-b border-stone-200/80 dark:border-white/10 transition-colors">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 dark:text-white tracking-tight mb-3 sm:mb-4 font-prompt">
            {language === "th" ? "เมนู Super Black" : "Super Black Menu"}
          </h1>

          {/* Clean Category Tabs */}
          <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-9 pb-1">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    "text-sm sm:text-base font-medium transition-all relative pb-2 cursor-pointer select-none",
                    isSelected
                      ? "text-stone-950 dark:text-white font-bold"
                      : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                  )}
                >
                  <span>{cat.label[language]}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c69255] rounded-full shadow-[0_0_8px_rgba(198,146,85,0.4)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* 2. Clean Product Showcase Carousel */}
      {categoryItems.length > 0 && (
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 overflow-hidden">
          
          {/* Navigation Arrow Left (ปุ่มลูกศรซ้าย ทรงกลมสีเทาอ่อนตามแบบ) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous drink"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-300/80 hover:bg-stone-400 dark:bg-stone-800/90 dark:hover:bg-stone-700 text-white flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Arrow Right (ปุ่มลูกศรขวา ทรงกลมสีเทาอ่อนตามแบบ) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next drink"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-300/80 hover:bg-stone-400 dark:bg-stone-800/90 dark:hover:bg-stone-700 text-white flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Horizontal Carousel Track */}
          <div
            ref={sliderRef}
            className="flex items-center gap-6 sm:gap-10 md:gap-14 overflow-x-auto scroll-smooth py-6 px-12 sm:px-16 no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categoryItems.map((item, idx) => {
              const isActive = idx === activeItemIndex;

              return (
                <div
                  key={item.id}
                  data-menu-slide
                  onClick={() => setActiveItemIndex(idx)}
                  className={cn(
                    "shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 select-none group",
                    isActive
                      ? "scale-105 opacity-100 z-10"
                      : "scale-90 opacity-70 hover:opacity-95"
                  )}
                  style={{ width: "150px" }}
                >
                  {/* Drink Cup Presentation */}
                  <div className="relative aspect-[3/4] w-full max-w-[130px] sm:max-w-[140px] flex items-center justify-center">
                    {/* Natural Soft Shadow underneath cup */}
                    <div
                      className={cn(
                        "absolute bottom-1 w-24 h-4 bg-black/20 dark:bg-black/50 rounded-full blur-md transition-all duration-300",
                        isActive ? "scale-110 opacity-70" : "scale-85 opacity-30"
                      )}
                    />

                    {/* Drink Presentation */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name[language]}
                        fill
                        sizes="(max-width: 640px) 130px, 140px"
                        className="object-contain object-center scale-95 group-hover:scale-100 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Typography Under Cup: Name & Price */}
                  <div className="text-center mt-4 sm:mt-5 space-y-1">
                    <h3
                      className={cn(
                        "font-medium text-stone-900 dark:text-white tracking-tight line-clamp-1 transition-colors font-prompt",
                        isActive
                          ? "text-base sm:text-lg font-bold text-stone-950 dark:text-white"
                          : "text-sm sm:text-base text-stone-700 dark:text-stone-300"
                      )}
                    >
                      {item.name[language]}
                    </h3>
                    <p className="text-sm sm:text-base font-normal text-stone-800 dark:text-stone-300 font-prompt">
                      <span>{item.price}</span>{" "}
                      <span>{language === "th" ? "บาท" : "THB"}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Full Catalog Grid (รายการทั้งหมดในหมวดหมู่ ดูสะดวก สะอาดตา) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 border-t border-stone-100 dark:border-white/5">
        
        {/* Search bar & Item Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4">
          <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
            {language === "th"
              ? `พบ ${searchFilteredItems.length} รายการในหมวดหมู่นี้`
              : `Found ${searchFilteredItems.length} items in this category`}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "th" ? "ค้นหาในหมวดนี้..." : "Search menu..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-stone-50 dark:bg-[#14100c] border border-stone-200 dark:border-white/10 focus:border-[#c69255] focus:outline-none text-xs sm:text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Clean 4-Column Grid for Complete Category Browsing */}
        {searchFilteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {searchFilteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  const itemIndex = categoryItems.findIndex((c) => c.id === item.id);
                  if (itemIndex !== -1) setActiveItemIndex(itemIndex);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Cup Container (Clean without card background) */}
                <div className="relative aspect-[3/4] w-full max-w-[140px] sm:max-w-[150px] rounded-2xl overflow-hidden flex items-center justify-center mb-3">
                  <Image
                    src={item.image}
                    alt={item.name[language]}
                    fill
                    sizes="(max-width: 640px) 140px, 150px"
                    className="object-contain object-center scale-95 group-hover:scale-100 transition-transform duration-500"
                  />
                </div>

                {/* Name & Price */}
                <h4 className="text-sm sm:text-base font-medium text-stone-900 dark:text-white tracking-tight line-clamp-1 group-hover:text-[#b57a38] dark:group-hover:text-[#c69255] transition-colors font-prompt">
                  {item.name[language]}
                </h4>
                <p className="text-xs sm:text-sm font-normal text-stone-600 dark:text-stone-300 mt-0.5 font-prompt">
                  <span>{item.price}</span>{" "}
                  <span>{language === "th" ? "บาท" : "THB"}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-white/10 rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              {language === "th"
                ? "ไม่พบเมนูที่ตรงกับคำค้นหา"
                : "No items match your search"}
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
