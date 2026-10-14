"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";

export function FinalCtaSection() {
  const { language } = useLanguage();
  const { finalCta } = HOME_DATA;

  return (
    <section className="py-28 bg-black relative overflow-hidden border-t border-[#352d26]">
      {/* Background Coffee Image with Gradient Vignette */}
      {finalCta.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={finalCta.bgImage}
            alt="Super Black Coffee Background"
            fill
            className="object-cover opacity-40 scale-105 hover:scale-100 transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black" />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c69255] to-[#8f6040] flex items-center justify-center text-stone-950 font-bold mx-auto mb-6 shadow-xl shadow-amber-950/40">
          <Coffee className="w-7 h-7 text-stone-950" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {finalCta.heading[language]}
        </h2>
        <p className="mt-4 text-sm text-[#c5b8ae] max-w-xl mx-auto leading-relaxed">
          {finalCta.description[language]}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/menu"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c69255] to-[#bf9576] hover:from-[#d8a162] hover:to-[#ce9f7c] text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/40 transition-all hover:scale-105"
          >
            {finalCta.exploreMenuText[language]}
          </Link>
          <Link
            href="/franchise"
            className="px-8 py-3.5 rounded-xl bg-[#201b16]/90 backdrop-blur-sm border border-[#352d26] hover:border-[#c69255] text-white font-semibold text-sm transition-all hover:scale-105"
          >
            {finalCta.franchiseText[language]}
          </Link>
        </div>
      </div>
    </section>
  );
}
