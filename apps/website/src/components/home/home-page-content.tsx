"use client";

import React from "react";
import { SeasonalPopupDialog } from "@/components/ui/seasonal-popup-dialog";
import {
  GardenCoffeeIntroVideo,
  HeroSection,
  SignatureStorySection,
  HighlightsSection,
  FinalCtaSection,
  FaqSection,
  ContactFormSection,
} from "./index";

export function HomePageContent() {
  return (
    <div className="bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-white selection:bg-[#c69255] selection:text-white transition-colors duration-300">
      {/* Opening Intro Video Screen: Plays continuously until user scrolls */}
      <GardenCoffeeIntroVideo />

      {/* Section A: Cinematic Hero */}
      <HeroSection />

      {/* Section A2: Our Signature Story (มากกว่าความเข้ม คือคุณภาพที่สัมผัสได้) */}
      <SignatureStorySection />

      {/* Section B: Brand Highlights */}
      <HighlightsSection />

      {/* Section E: Frequently Asked Questions (FAQ) */}
      <FaqSection />

      {/* Section F: Contact Form Section */}
      <ContactFormSection />

      {/* Section G: Final Editorial CTA (Experience True Roast Intensity Today) */}
      <FinalCtaSection />

      {/* Festival & Seasonal Popup Dialog */}
      <SeasonalPopupDialog />
    </div>
  );
}
