"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";

export function HeroSection() {
  const { language } = useLanguage();
  const { hero } = HOME_DATA;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#352d26]">
      {/* Background Image with Dark & Amber Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.bgImage}
          alt="Super Black Coffee Sunset Cafe"
          fill
          priority
          className="object-cover opacity-50 scale-105 transform hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-28">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#bf9576]/30 bg-[#201b16]/80 text-[#c69255] text-xs font-mono tracking-widest uppercase mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#c69255] animate-pulse" />
          <span>{hero.eyebrow[language]}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
          {hero.headingLine1[language]} <br />
          <span className="bg-gradient-to-r from-[#c69255] via-[#fbfaf8] to-[#bf9576] bg-clip-text text-transparent">
            {hero.headingLine2[language]}
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base text-[#c5b8ae] max-w-2xl mx-auto leading-relaxed font-normal">
          {hero.description[language]}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/menu"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c69255] to-[#bf9576] hover:from-[#d8a162] hover:to-[#ce9f7c] text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/40 transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>{hero.exploreMenuText[language]}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/branches"
            className="px-8 py-3.5 rounded-xl bg-[#201b16] hover:bg-[#28221c] border border-[#352d26] hover:border-[#c69255]/50 text-white font-semibold text-sm transition-all flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#c69255]" />
            <span>{hero.findBranchText[language]}</span>
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="mt-20 pt-10 border-t border-[#352d26]/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left sm:text-center">
          {hero.metrics.map((metric, idx) => (
            <div key={idx}>
              <div
                className={`text-3xl font-extrabold font-mono ${
                  metric.highlight ? "text-[#c69255]" : "text-white"
                }`}
              >
                {metric.value}
              </div>
              <div className="text-xs text-[#9e9187] mt-1">
                {metric.label[language]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
