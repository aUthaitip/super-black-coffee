"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { MOCK_BRANCHES } from "@/data/branches";
import { HOME_DATA } from "@/data/home";

export function BranchTeaserSection() {
  const { language, t } = useLanguage();
  const { branchTeaser } = HOME_DATA;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("all");

  const filteredBranches = MOCK_BRANCHES.filter((branch) => {
    const matchesProvince =
      selectedProvince === "all" ||
      branch.provinceTh === selectedProvince ||
      branch.provinceEn.toLowerCase() === selectedProvince.toLowerCase();

    const name = language === "th" ? branch.nameTh : branch.nameEn;
    const address = language === "th" ? branch.addressTh : branch.addressEn;
    const matchesSearch =
      !searchTerm ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesProvince && matchesSearch;
  }).slice(0, 3);

  return (
    <section className="py-24 bg-[#faf8f5] dark:bg-[#171411] border-b border-stone-200 dark:border-[#352d26] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#b47836] dark:text-[#c69255] uppercase">
            {branchTeaser.badge[language]}
          </span>
          <h2 className="text-3xl font-black text-stone-900 dark:text-white mt-1">
            {branchTeaser.title[language]}
          </h2>
          <p className="text-xs text-stone-600 dark:text-[#c5b8ae] mt-2 font-medium">
            {branchTeaser.subtitle[language]}
          </p>

          {/* Quick Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={branchTeaser.searchPlaceholder[language]}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#201b16] border border-stone-200 dark:border-[#352d26] text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-[#c69255] shadow-xs"
              />
            </div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#201b16] border border-stone-200 dark:border-[#352d26] text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#c69255] shadow-xs cursor-pointer"
            >
              <option value="all">{branchTeaser.allProvinces[language]}</option>
              <option value="พระนครศรีอยุธยา">อยุธยา (Ayutthaya)</option>
              <option value="พิษณุโลก">พิษณุโลก (Phitsanulok)</option>
              <option value="กรุงเทพมหานคร">กรุงเทพฯ (Bangkok)</option>
              <option value="เชียงใหม่">เชียงใหม่ (Chiang Mai)</option>
              <option value="ภูเก็ต">ภูเก็ต (Phuket)</option>
              <option value="ขอนแก่น">ขอนแก่น (Khon Kaen)</option>
            </select>
          </div>
        </div>

        {/* Branch Teaser Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => {
            const name = language === "th" ? branch.nameTh : branch.nameEn;
            const address = language === "th" ? branch.addressTh : branch.addressEn;
            const hours = language === "th" ? branch.openingHoursTh : branch.openingHoursEn;

            return (
              <div
                key={branch.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#201b16] border border-stone-200 dark:border-[#352d26] hover:border-[#c69255] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#b47836] dark:text-[#c69255] font-bold uppercase tracking-wider block mb-1">
                    {branch.provinceEn}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white mb-2">{name}</h3>
                  <p className="text-xs text-stone-600 dark:text-[#c5b8ae] line-clamp-2 mb-4 leading-relaxed font-normal">
                    {address}
                  </p>
                  <div className="text-[11px] text-stone-600 dark:text-[#9e9187]">
                    <strong>{branchTeaser.openHoursLabel[language]}</strong> {hours}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-[#352d26] flex items-center justify-between">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open Now
                  </span>
                  <Link
                    href="/branches"
                    className="text-xs font-bold text-[#b47836] dark:text-[#c69255] hover:underline transition-colors"
                  >
                    {t.common.viewDetails} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/branches"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-[#c69255] text-white hover:text-stone-950 dark:bg-[#201b16] dark:border dark:border-[#352d26] dark:hover:border-[#c69255] text-xs font-bold transition-all shadow-sm"
          >
            <span>{branchTeaser.viewAllBranches[language]}</span>
            <ArrowRight className="w-4 h-4 text-[#c69255]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
