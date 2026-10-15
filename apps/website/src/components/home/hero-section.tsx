"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Flame, Star } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";

export function HeroSection() {
  const { language } = useLanguage();
  const { hero } = HOME_DATA;

  return (
    <section className="relative -mt-16 min-h-screen flex items-center overflow-hidden">
      {/* Background Image - Brightened & Vibrant */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.bgImage}
          alt="Super Black Coffee Sunset Cafe"
          fill
          priority
          className="object-cover object-center opacity-85 scale-105 transform hover:scale-100 transition-transform duration-1000"
        />
        {/* Soft directional gradient: dark on left for text legibility, transparent on right to see the cafe scene */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl text-left">
          {/* Structured Main Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-snug tracking-normal drop-shadow-md">
            <span>{hero.headingLine1[language]}</span>
            <span className="block mt-1 bg-linear-to-r from-[#d8a162] via-[#fbfaf8] to-[#c69255] bg-clip-text text-transparent font-semibold">
              {hero.headingLine2[language]}
            </span>
          </h1>

          {/* Description with Left Border Quote/Accent for Structure */}
          <div className="mt-5 pl-4 border-l-2 border-[#c69255]/40 max-w-xl">
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              {hero.description[language]}
            </p>
          </div>

          {/* Action Buttons in Clean Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3.5 rounded-xl bg-linear-to-r from-[#c69255] to-[#bf9576] hover:from-[#d8a162] hover:to-[#ce9f7c] text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/40 transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>{hero.exploreMenuText[language]}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/branches"
              className="px-8 py-3.5 rounded-xl bg-[#201b16]/90 hover:bg-[#28221c] border border-[#352d26] hover:border-[#c69255]/60 text-white font-bold text-sm transition-all flex items-center gap-2 backdrop-blur-sm shadow-lg shadow-black/50"
            >
              <MapPin className="w-4 h-4 text-[#c69255]" />
              <span>{hero.findBranchText[language]}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
