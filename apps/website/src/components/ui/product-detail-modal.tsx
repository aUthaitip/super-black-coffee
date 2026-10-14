"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Flame, Coffee, Info, Check } from "lucide-react";
import { Product } from "@/types";
import { useLanguage } from "@/i18n/language-provider";
import { formatPrice } from "@/lib/utils";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { language, t } = useLanguage();
  const [selectedDrinkType, setSelectedDrinkType] = useState<string>("");
  const [selectedSweetness, setSelectedSweetness] = useState<string>("100%");
  const [selectedBean, setSelectedBean] = useState<string>("Dark Roast");

  if (!product) return null;

  const name = language === "th" ? product.nameTh : product.nameEn;
  const description = language === "th" ? product.descriptionTh : product.descriptionEn;
  const ingredients = language === "th" ? product.ingredientsTh : product.ingredientsEn;
  const allergens = language === "th" ? product.allergensTh : product.allergensEn;
  const tastingNotes = product.tastingNotes ? product.tastingNotes[language] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-[#171411] border border-[#352d26] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-stone-300 hover:text-white flex items-center justify-center border border-[#352d26] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Media Header */}
        <div className="relative h-64 sm:h-72 w-full bg-black">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 650px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171411] via-[#171411]/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#c69255] text-stone-950">
                {product.category}
              </span>
              <h3 className="text-2xl font-black text-white mt-1.5">{name}</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#c69255]">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] text-[#9e9187] block font-mono">
                {t.common.demoDataBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <p className="text-sm text-[#c5b8ae] leading-relaxed">{description}</p>

          {/* Tasting Notes & Roast */}
          {(tastingNotes.length > 0 || product.roastLevel) && (
            <div className="p-4 rounded-2xl bg-[#201b16] border border-[#352d26] flex flex-wrap items-center gap-4">
              {product.roastLevel && (
                <div className="flex items-center gap-1.5 text-xs text-[#c69255] font-semibold">
                  <Flame className="w-4 h-4" />
                  <span>{product.roastLevel} Roast</span>
                </div>
              )}
              {tastingNotes.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-[#9e9187] font-medium">Notes:</span>
                  {tastingNotes.map((note, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#28221c] text-white border border-[#352d26] text-[11px]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Options: Drink Type */}
          {product.drinkTypes.length > 0 && (
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#c5b8ae] mb-2">
                {t.common.drinkType}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.drinkTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedDrinkType(type)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-colors ${
                      selectedDrinkType === type || (!selectedDrinkType && product.drinkTypes[0] === type)
                        ? "border-[#c69255] bg-[#c69255]/10 text-[#c69255]"
                        : "border-[#352d26] bg-[#201b16] text-[#9e9187] hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Options: Sweetness */}
          {product.sweetnessOptions.length > 0 && (
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#c5b8ae] mb-2">
                {t.common.sweetness}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sweetnessOptions.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedSweetness(level)}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      selectedSweetness === level
                        ? "border-[#c69255] bg-[#c69255]/10 text-[#c69255]"
                        : "border-[#352d26] bg-[#201b16] text-[#9e9187] hover:text-white"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Options: Beans */}
          {product.beanOptions.length > 0 && (
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#c5b8ae] mb-2">
                {t.common.beanType}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.beanOptions.map((bean) => (
                  <button
                    key={bean}
                    type="button"
                    onClick={() => setSelectedBean(bean)}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      selectedBean === bean
                        ? "border-[#c69255] bg-[#c69255]/10 text-[#c69255]"
                        : "border-[#352d26] bg-[#201b16] text-[#9e9187] hover:text-white"
                    }`}
                  >
                    {bean}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition & Ingredients */}
          <div className="pt-4 border-t border-[#352d26] space-y-3 text-xs text-[#9e9187]">
            {ingredients && ingredients.length > 0 && (
              <div>
                <span className="font-semibold text-white block mb-1">
                  {t.common.ingredients}:
                </span>
                <p>{ingredients.join(", ")}</p>
              </div>
            )}
            {allergens && allergens.length > 0 && (
              <div>
                <span className="font-semibold text-white block mb-1">
                  {t.common.allergens}:
                </span>
                <p className="text-amber-400">{allergens.join(", ")}</p>
              </div>
            )}
            {product.calories && (
              <div>
                <span className="font-semibold text-white">
                  {t.common.calories}:{" "}
                </span>
                <span>{product.calories} kcal (ประมาณการ)</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#201b16] border-t border-[#352d26] flex items-center justify-between">
          <div className="text-xs text-[#9e9187] flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#c69255]" />
            <span>พร้อมบริการที่ Super Black Coffee ทุกสาขา</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#c69255] hover:bg-[#d8a162] text-stone-950 font-bold text-xs transition-colors"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
}
