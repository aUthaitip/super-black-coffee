"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";

export function BrandStorySection() {
  const { language } = useLanguage();
  const { story } = HOME_DATA;

  return (
    <section className="relative z-10 py-32 sm:py-40 bg-black overflow-hidden">
      {/* Background Image: Coffee Journey from Farm to Cup */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about/coffee-journey-transparent.webp"
          alt="Super Black Coffee Journey from Farm to Cup"
          fill
          priority={false}
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        {/* Background Overlays */}
        {/* Base: เพิ่มความมืดเล็กน้อยทั่วทั้งภาพ */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Main Gradient: ซ้ายสว่าง → ขวามืด */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-transparent
            via-black/35
            to-black/85
          "
        />

        {/* Top Gradient: ค่อย ๆ ไล่จากสีดำสนิทลงมา เพื่อเชื่อมต่อกับ Section ด้านบนอย่างไร้รอยต่อ */}
        <div
          className="
            absolute inset-x-0 top-0 h-40 sm:h-56
            bg-gradient-to-b
            from-black
            via-black/60
            to-transparent
          "
        />

        {/* Bottom Gradient: ค่อย ๆ ไล่ลงสู่สีดำสนิท เพื่อเชื่อมต่อกับ Section ด้านล่างอย่างไร้รอยต่อ */}
        <div
          className="
            absolute inset-x-0 bottom-0 h-48 sm:h-64
            bg-gradient-to-t
            from-black
            via-black/70
            to-transparent
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl ml-auto text-left space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.2]">
            {story.title[language]}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            <p>{story.desc1[language]}</p>
            <p>{story.desc2[language]}</p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#c69255] to-[#d8a162] hover:brightness-110 text-stone-950 text-sm font-bold transition-all hover:scale-[1.02] shadow-[0_8px_25px_rgba(216,161,98,0.25)]"
            >
              <span>{story.learnMoreText[language]}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
