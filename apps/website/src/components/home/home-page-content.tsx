"use client";

import React from "react";
import { SeasonalPopupDialog } from "@/components/ui/seasonal-popup-dialog";
import {
  HeroSection,
  HighlightsSection,
  BranchPromotionsSection,
  BrandStorySection,
  FinalCtaSection,
} from "./index";

export function HomePageContent() {
  return (
    <div className="bg-black text-white selection:bg-[#c69255] selection:text-stone-950">
      {/* Section A: Cinematic Hero */}
      <HeroSection />

      {/* Section B: Brand Highlights */}
      <HighlightsSection />

      {/* Section C: Exclusive Branch Promotions (เลือกสิทธิ์พิเศษใกล้คุณ) */}
      <BranchPromotionsSection />

      {/* Section D: Brand Story */}
      <BrandStorySection />

      {/* Section E: Final Editorial CTA */}
      <FinalCtaSection />

      {/* Festival & Seasonal Popup Dialog */}
      <SeasonalPopupDialog />
    </div>
  );
}

