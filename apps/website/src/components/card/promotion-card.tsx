import React from "react";
import Image from "next/image";
import { BranchPromotion } from "@/data/promotions";
import { Language } from "@/types";

export interface PromotionCardProps {
  item: BranchPromotion;
  language: Language;
  onSelect?: (item: BranchPromotion) => void;
}

export function PromotionCard({ item, language, onSelect }: PromotionCardProps) {
  return (
    <article
      onClick={() => onSelect?.(item)}
      className="flex flex-col gap-3 rounded-[22px] bg-[#14100e] border border-[#2d241d] p-3 shadow-lg group hover:border-[#c69255]/60 hover:shadow-[0_8px_30px_rgba(198,146,85,0.15)] transition-all duration-300 cursor-pointer select-none"
    >
      {/* Poster Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] bg-[#0c0a08]">
        <Image
          src={item.image}
          alt={item.title[language]}
          fill
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info Section */}
      <div className="flex flex-col px-1 pb-1">
        <span className="text-[11px] sm:text-xs text-[#8e8278] font-normal">
          {item.tag[language]}
        </span>
        <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight line-clamp-1 group-hover:text-[#d8a162] transition-colors mt-0.5">
          {item.title[language]}
        </h3>
      </div>
    </article>
  );
}
