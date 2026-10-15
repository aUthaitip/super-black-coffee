"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";

export function FinalCtaSection() {
  const { language } = useLanguage();
  const { finalCta } = HOME_DATA;

  return (
    <section className="relative z-0 mt-2 sm:mt-4 py-32 sm:py-44 bg-black overflow-hidden">
      {/* Background Coffee Image with Gradient Overlays */}
      {finalCta.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={finalCta.bgImage}
            alt="Super Black Coffee Background"
            fill
            className="object-cover opacity-90 scale-105"
            sizes="100vw"
          />
          {/* Subtle base darkening */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Left seamless fade: ฝั่งซ้ายมืดสลัว */}
          <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none" />

          {/* Right seamless fade: ฝั่งขวามืดสลัว */}
          <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-black via-black/70 to-transparent pointer-events-none" />

          {/* Top seamless fade from pure black */}
          <div className="absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-black via-black/75 to-transparent pointer-events-none" />

          {/* Bottom seamless fade to pure black */}
          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-black via-black/75 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {finalCta.heading[language]}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-stone-200 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {finalCta.description[language]}
        </p>
      </div>
    </section>
  );
}
