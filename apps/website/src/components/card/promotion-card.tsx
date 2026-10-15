import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BranchPromotion } from "@/data/promotions";
import { Language } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PromotionCardProps {
  item: BranchPromotion;
  language: Language;
  onSelect?: (item: BranchPromotion) => void;
}

export function PromotionCard({ item, language, onSelect }: PromotionCardProps) {
  return (
    <Card
      onClick={() => onSelect?.(item)}
      className="group relative flex flex-col justify-end h-[420px] sm:h-[460px] w-full rounded-[28px] overflow-hidden cursor-pointer select-none border-0 bg-stone-950 shadow-xl transition-all duration-500 hover:scale-[1.02]"
    >
      {/* Background Image: Crisp, properly balanced at rest, bright & vivid on hover */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.image}
          alt={item.title[language]}
          fill
          sizes="(max-width: 640px) 290px, (max-width: 1024px) 340px, 400px"
          className="object-cover object-center brightness-90 contrast-[1.02] group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Cinematic Vignette: Dark gradient from bottom so text is readable, but image remains clear and visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/75 group-hover:via-transparent transition-all duration-500 pointer-events-none" />
      </div>

      {/* Floating Glass Branch Tag Badge (Top Left) */}
      <div className="absolute top-6 left-6 z-10">
        <Badge
          variant="outline"
          className="border-white/20 bg-black/40 backdrop-blur-md text-white/90 text-xs px-3.5 py-1 font-normal tracking-wide shadow-sm"
        >
          {item.tag[language]}
        </Badge>
      </div>

      {/* Action Button: Explore More + Circle Arrow (Floating or Bottom) */}
      <div className="relative z-10 p-6 sm:p-7 space-y-3">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight leading-snug drop-shadow-md group-hover:text-[#f3ce9c] transition-colors">
          {item.title[language]}
        </h3>

        {/* Explore Button with Circular Arrow matching screenshot */}
        <div className="pt-1 flex items-center gap-2">
          <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-stone-950 font-medium text-xs shadow-md group-hover:bg-[#c69255] transition-colors">
            {language === "th" ? "ดูรายละเอียด" : "Explore More"}
          </span>
          <div className="w-8 h-8 rounded-full bg-white text-stone-950 flex items-center justify-center shadow-md group-hover:bg-[#c69255] group-hover:scale-105 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Card>
  );
}
