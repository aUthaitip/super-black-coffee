"use client";

import React from "react";
import { SeasonalPopupDialog } from "@/components/ui/seasonal-popup-dialog";
import {
  HeroSection,
  HighlightsSection,
  BranchPromotionsSection,
  BrandStorySection,
  FinalCtaSection,
  FaqSection,
  ContactFormSection,
} from "./index";

export function HomePageContent() {
  return (
    <div className="bg-black text-white selection:bg-[#c69255] selection:text-stone-950">
      {/* Section A: Cinematic Hero */}
      <HeroSection />

      {/* Section B: Brand Highlights */}
      <HighlightsSection />

      {/* Section C: Brand Story (เรื่องราวเบื้องหลังความเข้ม) - ซ่อนไว้ชั่วคราว */}
      {/* <BrandStorySection /> */}

      {/* Section D: Exclusive Branch Promotions (เลือกสิทธิ์พิเศษใกล้คุณ) */}
      <BranchPromotionsSection />

      {/* Section E: Frequently Asked Questions (FAQ) */}
      <FaqSection />

      {/* Section F: Contact Form Section */}
      <ContactFormSection />

      {/* Section G: Final Editorial CTA (สัมผัสความเข้มลึกที่แท้จริงได้แล้ววันนี้ - ล่างสุดก่อน Footer) */}
      <FinalCtaSection />

      {/* Festival & Seasonal Popup Dialog */}
      <SeasonalPopupDialog />
    </div>
  );
}

