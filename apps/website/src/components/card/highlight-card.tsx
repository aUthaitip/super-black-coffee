import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Language } from "@/types";

export interface HighlightItem {
  tag: string;
  title: { th: string; en: string };
  description: { th: string; en: string };
  image: string;
  href: string;
  actionText: { th: string; en: string };
  accentColor: string;
}

export interface HighlightCardProps {
  item: HighlightItem;
  language: Language;
  index?: number;
}

const CARD_THEMES = [
  {
    bg: "bg-[#dbe4d9] dark:bg-[#18211b]", // Soft Sage Green
    tagBg: "bg-[#2d4a36]/15 text-[#213a29] dark:text-[#9bc4a8]",
    titleColor: "text-[#1d3826] dark:text-[#e4efe7]",
    descColor: "text-[#2e4d37] dark:text-[#a8c2b1]",
    border: "border-[#c4d4c1] dark:border-[#2d4233]",
    btnBg: "bg-[#1d3826] hover:bg-[#14261a] text-white dark:bg-[#9bc4a8] dark:hover:bg-[#b5d6bf] dark:text-[#14261a]",
  },
  {
    bg: "bg-[#f4ebe1] dark:bg-[#201a14]", // Warm Sand Cream
    tagBg: "bg-[#6d4c28]/15 text-[#54381b] dark:text-[#dfc2a5]",
    titleColor: "text-[#3f2713] dark:text-[#f3e5d7]",
    descColor: "text-[#5e432c] dark:text-[#cfb7a1]",
    border: "border-[#e5d5c3] dark:border-[#382b20]",
    btnBg: "bg-[#3f2713] hover:bg-[#2c1a0c] text-white dark:bg-[#dfc2a5] dark:hover:bg-[#f0dac5] dark:text-[#2c1a0c]",
  },
  {
    bg: "bg-[#e8ecef] dark:bg-[#151c22]", // Muted Slate Cloud
    tagBg: "bg-[#294254]/15 text-[#1b303f] dark:text-[#a3c3d9]",
    titleColor: "text-[#162734] dark:text-[#e1ecf2]",
    descColor: "text-[#2b4456] dark:text-[#acc4d4]",
    border: "border-[#cfd8df] dark:border-[#263745]",
    btnBg: "bg-[#162734] hover:bg-[#0e1a24] text-white dark:bg-[#a3c3d9] dark:hover:bg-[#bfd8e8] dark:text-[#0e1a24]",
  },
  {
    bg: "bg-[#efece4] dark:bg-[#1e1c16]", // Earth Warm Alabaster
    tagBg: "bg-[#4f4832]/15 text-[#3b3624] dark:text-[#d3cbb1]",
    titleColor: "text-[#2e2a1b] dark:text-[#eee9db]",
    descColor: "text-[#4b4532] dark:text-[#bfb8a3]",
    border: "border-[#ded9cb] dark:border-[#332f24]",
    btnBg: "bg-[#2e2a1b] hover:bg-[#1f1c11] text-white dark:bg-[#d3cbb1] dark:hover:bg-[#e4ddc8] dark:text-[#1f1c11]",
  },
] as const;

export function HighlightCard({ item, language, index = 0 }: HighlightCardProps) {
  const theme = CARD_THEMES[index % CARD_THEMES.length]!;

  return (
    <article
      className={`flex w-full flex-col md:flex-row items-center gap-6 md:gap-8 overflow-hidden rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-10 ${theme.bg} border ${theme.border} shadow-[0_12px_40px_rgba(20,25,20,0.06)] dark:shadow-none group transition-all duration-300 hover:shadow-[0_18px_50px_rgba(20,25,20,0.12)]`}
    >
      {/* Left Photo Container (Rounded, warm, natural photo) */}
      <div className="relative aspect-[4/3] w-full md:w-[48%] rounded-2xl md:rounded-3xl overflow-hidden shrink-0 shadow-sm border border-black/5 dark:border-white/10">
        <Image
          src={item.image}
          alt={item.title[language]}
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Right Content: Title, Description, and Action */}
      <div className="flex flex-1 flex-col justify-center gap-4 w-full text-left">
        {/* Subtle pill tag */}
        <div className="self-start">
          <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase ${theme.tagBg}`}>
            {item.tag}
          </span>
        </div>

        {/* Clean, warm prominent title */}
        <h3 className={`text-2xl sm:text-3xl md:text-[32px] font-black tracking-tight leading-[1.25] ${theme.titleColor}`}>
          {item.title[language]}
        </h3>

        {/* Natural, breathable description */}
        <p className={`text-sm sm:text-base leading-relaxed font-normal ${theme.descColor}`}>
          {item.description[language]}
        </p>

        {/* Clean Pill Button */}
        <div className="pt-2">
          <Link
            href={item.href}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm ${theme.btnBg}`}
          >
            <span>{item.actionText[language]}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
