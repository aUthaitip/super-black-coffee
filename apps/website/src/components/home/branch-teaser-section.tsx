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
    <section className="py-24 bg-[#171411] border-b border-[#352d26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#c69255] uppercase">
            {branchTeaser.badge[language]}
          </span>
          <h2 className="text-3xl font-black text-white mt-1">
            {branchTeaser.title[language]}
          </h2>
          <p className="text-xs text-[#c5b8ae] mt-2">
            {branchTeaser.subtitle[language]}
          </p>

          {/* Quick Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9e9187]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={branchTeaser.searchPlaceholder[language]}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#201b16] border border-[#352d26] text-xs text-white placeholder:text-[#9e9187] focus:outline-none focus:border-[#c69255]"
              />
            </div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-[#201b16] border border-[#352d26] text-xs text-white focus:outline-none focus:border-[#c69255]"
            >
              <option value="all">{branchTeaser.allProvinces[language]}</option>
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
                className="p-6 rounded-2xl bg-[#201b16] border border-[#352d26] hover:border-[#c69255]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#c69255] font-bold uppercase tracking-wider block mb-1">
                    {branch.provinceEn}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{name}</h3>
                  <p className="text-xs text-[#c5b8ae] line-clamp-2 mb-4 leading-relaxed">
                    {address}
                  </p>
                  <div className="text-[11px] text-[#9e9187]">
                    <strong>{branchTeaser.openHoursLabel[language]}</strong> {hours}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#352d26] flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Open Now
                  </span>
                  <Link
                    href="/branches"
                    className="text-xs font-semibold text-[#c69255] hover:text-white transition-colors"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#201b16] border border-[#352d26] hover:border-[#c69255] text-white text-xs font-bold transition-all"
          >
            <span>{branchTeaser.viewAllBranches[language]}</span>
            <ArrowRight className="w-4 h-4 text-[#c69255]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
