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
    <section className="py-24 bg-[#171411] border-b border-[#352d26] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Story Image */}
          <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-[#352d26] shadow-2xl">
            <Image
              src={story.image}
              alt="Super Black Coffee Roaster Story"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171411] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-[#352d26]">
              <div className="text-xs font-mono text-[#c69255] font-semibold">
                CENTRAL ROASTING LAB
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {story.subBadge[language]}
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-[#c69255] uppercase">
              {story.badge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {story.title[language]}
            </h2>
            <p className="text-sm text-[#c5b8ae] leading-relaxed">
              {story.desc1[language]}
            </p>
            <p className="text-sm text-[#c5b8ae] leading-relaxed">
              {story.desc2[language]}
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#201b16] border border-[#352d26] hover:border-[#c69255] text-white text-xs font-bold transition-all hover:scale-105"
              >
                <span>{story.learnMoreText[language]}</span>
                <ArrowRight className="w-4 h-4 text-[#c69255]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
