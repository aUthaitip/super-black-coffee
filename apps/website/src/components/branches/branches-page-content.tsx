"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  X, 
} from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { 
  BRANCH_REGIONS, 
} from "@/data/branches";
import { Branch } from "@/types";
import { BranchCard } from "./branch-card";
import { BranchDetailModal } from "./branch-detail-modal";
import { cn } from "@/lib/utils";

interface SanityBranch {
  _id: string;
  nameTh: string;
  nameEn: string;
  slug: string;
  addressTh?: string;
  addressEn?: string;
  openingHours?: string;
  phone?: string;
  mapUrl?: string;
  image?: string;
  features?: string[];
}

interface BranchesPageContentProps {
  initialBranches?: SanityBranch[];
}

export function BranchesPageContent({ initialBranches = [] }: BranchesPageContentProps) {
  const { language } = useLanguage();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  // Modal State
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [modalTab, setModalTab] = useState<"info" | "promotions">("info");

  // Normalize Sanity branches (No mock data fallback)
  const branches: Branch[] = useMemo(() => {
    return initialBranches.map((b) => ({
      id: b._id,
      slug: b.slug || b._id,
      nameTh: b.nameTh,
      nameEn: b.nameEn || b.nameTh,
      addressTh: b.addressTh || "",
      addressEn: b.addressEn || b.addressTh || "",
      provinceTh: "",
      provinceEn: "",
      region: "central",
      latitude: 0,
      longitude: 0,
      openingHoursTh: b.openingHours || "06:30 - 20:00 น.",
      openingHoursEn: b.openingHours || "06:30 - 20:00",
      amenities: (b.features || ["parking", "wifi", "seating"]) as Branch["amenities"],
      image: b.image || "/branches/ayutthaya-ev-dusk.webp",
      phone: b.phone || "",
      googleMapsUrl: b.mapUrl || "",
    }));
  }, [initialBranches]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all");
  };

  const hasActiveFilters = 
    Boolean(searchQuery) || 
    selectedRegion !== "all";

  // Filter Logic
  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      // Region filter
      if (selectedRegion !== "all" && branch.region !== selectedRegion) {
        return false;
      }

      // Text search (matches name, province, address)
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchNameTh = branch.nameTh.toLowerCase().includes(q);
        const matchNameEn = branch.nameEn.toLowerCase().includes(q);
        const matchAddrTh = branch.addressTh.toLowerCase().includes(q);
        const matchAddrEn = branch.addressEn.toLowerCase().includes(q);
        const matchProvTh = branch.provinceTh.toLowerCase().includes(q);
        const matchProvEn = branch.provinceEn.toLowerCase().includes(q);

        if (!matchNameTh && !matchNameEn && !matchAddrTh && !matchAddrEn && !matchProvTh && !matchProvEn) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedRegion]);

  // Open Modal Helpers
  const handleSelectBranch = (branch: Branch) => {
    setModalTab("info");
    setSelectedBranch(branch);
  };

  const handleViewPromotions = (branch: Branch) => {
    setModalTab("promotions");
    setSelectedBranch(branch);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-white pb-28 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-stone-950 dark:text-white tracking-tight mb-4">
            {language === "th" ? "ค้นหาสาขาใกล้บ้านคุณ" : "Find Your Nearby Branch"}
          </h1>

          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            {language === "th"
              ? "แวะมาสัมผัสรสชาติกาแฟ Specialty Dark Roast พร้อมบรรยากาศแสนสบาย ที่จอดรถสะดวกสบาย และสถานีชาร์จ EV ความเร็วสูง"
              : "Experience the profound depth of specialty dark roasts, cozy lounges, ample parking, and ultra-fast EV charging stations."}
          </p>

          {/* Search Box in Hero */}
          <div className="max-w-2xl mx-auto relative shadow-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4.5 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "th"
                    ? "ค้นหาด้วยชื่อสาขา ถนน ย่าน หรือจังหวัด..."
                    : "Search by store name, road, district, or province..."
                }
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/95 dark:bg-[#14110e]/95 backdrop-blur-md border border-stone-200/90 dark:border-white/15 focus:border-[#c69255] focus:outline-none text-sm sm:text-base text-stone-900 dark:text-white placeholder-stone-400 shadow-2xl transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 dark:bg-white/10 dark:hover:bg-white/20 text-stone-700 dark:text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Stores Directory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Region Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar border-b border-stone-200 dark:border-white/10 mb-6">
          {BRANCH_REGIONS.map((region) => {
            const isSelected = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setSelectedRegion(region.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer shadow-xs",
                  isSelected
                    ? "bg-stone-900 text-white dark:bg-[#c69255] dark:text-stone-950 shadow-md"
                    : "bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/5"
                )}
              >
                {language === "th" ? region.nameTh : region.nameEn}
              </button>
            );
          })}
        </div>

        {/* Results Counter Summary */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-6 font-medium">
          <div>
            {language === "th" ? (
              <span>
                พร้อมเปิดให้บริการทั้งหมด{" "}
                <strong className="text-[#b47836] dark:text-[#c69255] font-semibold text-base">
                  {filteredBranches.length}
                </strong>{" "}
                สาขา
              </span>
            ) : (
              <span>
                Found{" "}
                <strong className="text-[#b47836] dark:text-[#c69255] font-black text-base">
                  {filteredBranches.length}
                </strong>{" "}
                active branch locations
              </span>
            )}
          </div>

          <div className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
            SUPER BLACK COFFEE NETWORK
          </div>
        </div>

        {/* Branch Cards Grid */}
        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBranches.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                onSelect={handleSelectBranch}
                onViewPromotions={handleViewPromotions}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white dark:bg-[#14110e] border border-stone-200 dark:border-white/10 rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-[#c69255]" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
              {language === "th" ? "ไม่พบสาขาที่ตรงกับเงื่อนไข" : "No branches found"}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mb-6">
              {language === "th"
                ? "ลองปรับเปลี่ยนคำค้นหา หรือล้างตัวกรองเพื่อดูสาขาทั้งหมดของ Super Black Coffee"
                : "Try adjusting your search terms or clearing your filters to see all Super Black Coffee branches."}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-[#c69255] text-white hover:text-stone-950 dark:bg-[#c69255] dark:hover:bg-[#d8a162] dark:text-stone-950 font-bold text-xs transition-colors cursor-pointer"
            >
              {language === "th" ? "ดูสาขาทั้งหมด" : "Show All Branches"}
            </button>
          </div>
        )}
      </section>

      {/* Branch Detail Modal */}
      <BranchDetailModal
        branch={selectedBranch}
        onClose={() => setSelectedBranch(null)}
        initialTab={modalTab}
      />
    </div>
  );
}

