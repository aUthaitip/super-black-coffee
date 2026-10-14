"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { MOCK_PRODUCTS } from "@/data/products";
import { HOME_DATA } from "@/data/home";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface SignatureMenuSectionProps {
  onSelectProduct: (product: Product) => void;
}

export function SignatureMenuSection({ onSelectProduct }: SignatureMenuSectionProps) {
  const { language, t } = useLanguage();
  const { signatureMenu } = HOME_DATA;
  const signatureProducts = MOCK_PRODUCTS.filter((p) => p.isRecommended).slice(0, 6);

  return (
    <section className="py-24 bg-black border-b border-[#352d26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#c69255] uppercase">
              {signatureMenu.badge[language]}
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              {signatureMenu.title[language]}
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#c69255] hover:text-[#d8a162] transition-colors"
          >
            <span>{signatureMenu.viewAllText[language]}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureProducts.map((product) => {
            const name = language === "th" ? product.nameTh : product.nameEn;
            const description = language === "th" ? product.descriptionTh : product.descriptionEn;

            return (
              <div
                key={product.id}
                className="rounded-3xl bg-[#201b16] border border-[#352d26] overflow-hidden hover:border-[#c69255]/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-60 w-full overflow-hidden bg-black">
                  <Image
                    src={product.image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-sm text-[#c69255] border border-[#352d26]">
                      {product.roastLevel || product.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#c69255] transition-colors">
                        {name}
                      </h3>
                      <span className="text-base font-black text-[#c69255] font-mono">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#c5b8ae] line-clamp-2 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#352d26] flex items-center justify-between">
                    <span className="text-[10px] text-[#9e9187] font-mono">
                      {t.common.demoDataBadge}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#28221c] hover:bg-[#c69255] hover:text-stone-950 text-white font-semibold text-xs transition-colors"
                    >
                      {t.common.viewDetails}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
