"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface SanityPromotion {
  _id: string;
  titleTh?: string;
  titleEn?: string;
  bannerImage: string;
  isPopup?: boolean;
  linkUrl?: string;
}

export function SeasonalPopupDialog({
  imageSrc,
  href,
  delayMs = 800,
  initialPromotions,
}: {
  imageSrc?: string;
  href?: string;
  delayMs?: number;
  initialPromotions?: SanityPromotion[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  // If promotions passed from Sanity, find the first active popup
  const activeSanityPopup = initialPromotions?.find((p) => p.isPopup && p.bannerImage);
  const finalImage = activeSanityPopup?.bannerImage || imageSrc;
  const finalHref = activeSanityPopup?.linkUrl || href || "/franchise";

  useEffect(() => {
    // Show dialog after specified delay on initial load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen || !finalImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
    >
      {/* Dark Dim Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity cursor-pointer"
      />

      {/* Dialog Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Close Button: Clean, highly accessible on both mobile and desktop */}
        <div className="w-full flex justify-end pb-2">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95 text-xs font-medium"
          >
            <span>ปิด</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Banner Image Frame with Warm Gold/Orange Border */}
        <div className="relative w-full max-h-[75vh] aspect-[4/3] sm:aspect-video overflow-hidden rounded-2xl border border-amber-200/50 shadow-2xl bg-black">
          <Link href={finalHref} onClick={() => setIsOpen(false)} className="block w-full h-full relative cursor-pointer">
            <Image
              src={finalImage}
              alt="Promotion & Festival Announcement"
              fill
              priority
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 896px"
              className="object-contain sm:object-cover object-center hover:scale-[1.01] transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
