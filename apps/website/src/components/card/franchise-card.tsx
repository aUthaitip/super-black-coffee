import React from "react";
import Link from "next/link";
import { FranchisePackage, Language } from "@/types";

export interface FranchiseCardProps {
  pkg: FranchisePackage;
  language: Language;
  viewDetailsText: string;
}

export function FranchiseCard({
  pkg,
  language,
  viewDetailsText,
}: FranchiseCardProps) {
  const name = language === "th" ? pkg.nameTh : pkg.nameEn;
  const investment =
    language === "th"
      ? pkg.illustrativeInvestmentTh
      : pkg.illustrativeInvestmentEn;
  const size = language === "th" ? pkg.sizeTh : pkg.sizeEn;
  const recommendedFor =
    language === "th" ? pkg.recommendedForTh : pkg.recommendedForEn;

  return (
    <div
      className={`p-8 rounded-[32px] border flex flex-col justify-between transition-all duration-300 ${
        pkg.popular
          ? "bg-gradient-to-b from-[#221c17] to-[#181310] border-2 border-[#c69255] shadow-2xl shadow-amber-950/40 ring-1 ring-[#c69255]/40 transform md:-translate-y-2"
          : "bg-[#14100d] border-[#2d241d] shadow-lg hover:border-[#c69255]/50 hover:shadow-xl"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#c69255]/20 text-[#c69255] border border-[#c69255]/30">
            Tier {pkg.tier}
          </span>
          {pkg.popular && (
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 px-2.5 py-0.5 rounded-full bg-[#c69255]/20 border border-[#c69255]/40">
              Popular Choice
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <div className="my-4">
          <span className="text-2xl font-black text-[#c69255] font-mono">
            {investment}
          </span>
          <span className="text-xs text-[#9e9085] block mt-0.5">
            {language === "th"
              ? "(งบประมาณประมาณการจำลอง)"
              : "(Illustrative Demo Estimate)"}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#b8aba0] mb-4">
          {language === "th" ? "ขนาดพื้นที่:" : "Space Area:"}{" "}
          <strong className="text-white">{size}</strong>
        </p>
        <p className="text-xs sm:text-sm text-[#9e9085] leading-relaxed mb-6">
          {recommendedFor}
        </p>
      </div>

      <Link
        href="/franchise"
        className={`w-full py-3.5 rounded-full text-center text-sm font-semibold transition-all block ${
          pkg.popular
            ? "bg-[#c69255] text-stone-950 font-bold hover:bg-[#d8a162] shadow-md shadow-amber-950/30"
            : "bg-[#221c17] hover:bg-[#2e261f] border border-[#382d24] text-white hover:border-[#c69255]/60"
        }`}
      >
        {viewDetailsText}
      </Link>
    </div>
  );
}
