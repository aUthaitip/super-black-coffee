"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { ABOUT_DATA } from "@/data/about";

export function PhilosophySection() {
  const { language } = useLanguage();
  const { philosophy } = ABOUT_DATA;

  return (
    <section className="relative z-10 py-24 bg-black text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Photo: about-growing-together.png */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/15 shadow-2xl group">
              <Image
                src={philosophy.image}
                alt={philosophy.tag[language]}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#b57a38]">
                  GROWING TOGETHER
                </span>
                <p className="text-sm font-semibold text-white mt-1">
                  {philosophy.tag[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Right Quote */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#f3ce9c] font-semibold block">
              {philosophy.tag[language]}
            </span>

            <blockquote className="border-l-4 border-[#b57a38] pl-6 py-2">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                “{philosophy.quote[language]}”
              </p>
            </blockquote>

            <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
              {language === "th"
                ? "ทุกหยดกาแฟของ Super Black Coffee เริ่มต้นจากความเคารพในธรรมชาติ ความร่วมมือกับเกษตรกรท้องถิ่น และความตั้งใจของทีมงานที่ต้องการส่งมอบจุดพักที่ดีที่สุดให้คุณในทุก ๆ วัน"
                : "Every drop of Super Black Coffee begins with respect for terroir and a passionate team committed to giving you the finest restorative sanctuary every day."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/menu"
                className="px-8 py-3.5 rounded-full bg-[#b57a38] hover:bg-[#c69255] text-stone-950 font-bold text-xs sm:text-sm tracking-wide transition-colors shadow-xl shadow-[#b57a38]/30 flex items-center gap-2 group cursor-pointer"
              >
                <span>{language === "th" ? "ดูเมนูกาแฟของเรา" : "Explore Our Menu"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/branches"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-xs sm:text-sm tracking-wide backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#b57a38]" />
                <span>{language === "th" ? "ค้นหาสาขาใกล้คุณ" : "Find Near Branch"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
