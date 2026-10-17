"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";
import { ScrollRevealText } from "@/components/ui/scroll-reveal";

export function FinalCtaSection() {
  const { language } = useLanguage();
  const { finalCta } = HOME_DATA;

  return (
    <section className="relative z-0 mt-2 sm:mt-4 py-32 sm:py-44 overflow-hidden">
      {/* Background Coffee Image in 100% Natural Color */}
      {finalCta.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={finalCta.bgImage}
            alt="Super Black Coffee Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollRevealText delay={0.05} yOffset={24}>
          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {finalCta.heading[language]}
          </h2>
        </ScrollRevealText>
        <ScrollRevealText delay={0.15} yOffset={20}>
          <p className="mt-4 text-sm sm:text-base text-stone-200 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {finalCta.description[language]}
          </p>
        </ScrollRevealText>
      </div>
    </section>
  );
}
