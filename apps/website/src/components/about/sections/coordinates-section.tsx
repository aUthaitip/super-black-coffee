"use client";

import React from "react";
import Image from "next/image";
import { Compass, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { ABOUT_DATA } from "@/data/about";

export function CoordinatesSection() {
  const { language } = useLanguage();
  const { coordinates } = ABOUT_DATA;

  return (
    <section className="relative z-10 py-16 sm:py-24 bg-stone-950/80 border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#f3ce9c] font-semibold block">
              {coordinates.badge[language]}
            </span>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#b57a38]/20 border border-[#b57a38]/50 flex items-center justify-center text-[#f3ce9c]">
                  <Compass className="w-5 h-5 animate-[spin_25s_linear_infinite]" />
                </div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-[#f3ce9c] tracking-tight">
                  {coordinates.coords}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
                {coordinates.tagline[language]}
              </h3>

              <p className="text-sm sm:text-base text-stone-300 font-medium leading-relaxed">
                {coordinates.locationName[language]}
              </p>
            </div>
          </div>

          {/* Right: Map Photo with Green Plantation Boundary */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-[#b57a38]/40 shadow-2xl group">
              <Image
                src={coordinates.image}
                alt="Houaphan Coffee Farm Location Coordinates"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs">
                <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#b57a38]/40 text-[#f3ce9c] font-mono flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#b57a38]" />
                  <span>{coordinates.coords}</span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  BAN JAD · VIENGXAY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
