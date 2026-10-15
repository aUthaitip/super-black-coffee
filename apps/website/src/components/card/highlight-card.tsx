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
}

export function HighlightCard({ item, language }: HighlightCardProps) {
  return (
    <article className="flex w-full flex-col gap-6 overflow-hidden rounded-[32px] md:rounded-[40px] bg-[#faf6f0] border border-[#ded2c2] shadow-[0px_10px_35px_rgba(40,25,15,0.07)] group hover:border-[#b57a38]/60 hover:shadow-[0px_14px_45px_rgba(40,25,15,0.12)] transition-all duration-300">
      {/* Top Section: Tag, Title, Description, Link */}
      <div className="flex flex-col gap-4 px-6 pt-6 sm:px-8 sm:pt-8 md:px-10 md:pt-10">
        <div className="flex items-center justify-between gap-4">
        </div>

        <h3 className="text-2xl sm:text-3xl font-semibold text-[#221811] tracking-tight">
          {item.title[language]}
        </h3>

        <p className="text-sm sm:text-base text-[#6b5a4d] leading-relaxed font-normal">
          {item.description[language]}
        </p>

        <div>
          <Link
            href={item.href}
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#b57a38] transition-colors hover:text-[#8f5a23]"
          >
            <span>{item.actionText[language]}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Image Showcase at Bottom with Smooth Float Motion on Hover */}
      <div className="mt-auto flex w-full justify-center px-4 pb-4 sm:px-8 sm:pb-8">
        <div className="relative aspect-[16/9] sm:aspect-[1800/836] w-full rounded-2xl overflow-hidden bg-[#ede3d5] border border-[#d9ccbc] transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <Image
            src={item.image}
            alt={item.title[language]}
            fill
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#221811]/15 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </article>
  );
}
