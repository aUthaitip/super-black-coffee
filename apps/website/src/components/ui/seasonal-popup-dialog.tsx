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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dark Dim Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Dialog Container */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Close Button at top-right above/on image */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute -top-10 right-0 p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Banner Image Frame with Warm Gold/Orange Border */}
        <div className="relative w-full aspect-video sm:aspect-video overflow-hidden border border-amber-100">
          <Link href={finalHref} onClick={() => setIsOpen(false)} className="block w-full h-full relative cursor-pointer">
            <Image
              src={finalImage}
              alt="Promotion & Festival Announcement"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-center hover:scale-[1.01] transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
