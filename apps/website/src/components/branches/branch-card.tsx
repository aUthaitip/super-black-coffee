"use client";

import React from "react";
import Image from "next/image";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Zap, 
  Wifi, 
  Plug, 
  Car, 
  Armchair, 
} from "lucide-react";
import { Branch, Amenity } from "@/types";
import { useLanguage } from "@/i18n/language-provider";

interface BranchCardProps {
  branch: Branch;
  onSelect: (branch: Branch) => void;
  onViewPromotions?: (branch: Branch) => void;
}

export function BranchCard({ branch, onSelect, onViewPromotions }: BranchCardProps) {
  const { language } = useLanguage();

  const name = language === "th" ? branch.nameTh : branch.nameEn;
  const address = language === "th" ? branch.addressTh : branch.addressEn;
  const hours = language === "th" ? branch.openingHoursTh : branch.openingHoursEn;

  const renderAmenityIcon = (amenity: Amenity) => {
    switch (amenity) {
      case "ev-charger":
        return <Zap className="w-3.5 h-3.5 text-amber-500" />;
      case "drive-thru":
        return <Car className="w-3.5 h-3.5 text-blue-500" />;
      case "wifi":
        return <Wifi className="w-3.5 h-3.5 text-emerald-500" />;
      case "power-outlets":
        return <Plug className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />;
      case "parking":
        return <Car className="w-3.5 h-3.5 text-purple-500" />;
      case "seating":
        return <Armchair className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />;
      default:
        return null;
    }
  };

  const getAmenityLabel = (amenity: Amenity) => {
    switch (amenity) {
      case "ev-charger":
        return language === "th" ? "EV ชาร์จ" : "EV Charger";
      case "drive-thru":
        return "Drive-Thru";
      case "wifi":
        return "Wi-Fi";
      case "power-outlets":
        return language === "th" ? "ปลั๊กไฟ" : "Outlets";
      case "parking":
        return language === "th" ? "ที่จอดรถ" : "Parking";
      case "seating":
        return language === "th" ? "ที่นั่งทาน" : "Seating";
      default:
        return amenity;
    }
  };

  return (
    <div className="group flex flex-col rounded-3xl bg-white dark:bg-[#14110e] border border-stone-200/90 dark:border-white/10 hover:border-[#c69255] dark:hover:border-[#c69255]/60 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#c69255]/10">
      {/* Branch Thumbnail Header */}
      <div 
        className="relative h-52 sm:h-56 w-full overflow-hidden cursor-pointer bg-stone-100 dark:bg-stone-900"
        onClick={() => onSelect(branch)}
      >
        <Image
          src={branch.image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Branch Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onSelect(branch)}
            className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#c69255] transition-colors cursor-pointer line-clamp-1 mb-2"
          >
            {name}
          </h3>

          {/* Address */}
          <div className="flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-400 mb-3">
            <MapPin className="w-4 h-4 text-[#c69255] shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed">{address}</p>
          </div>

          {/* Opening Hours */}
          <div className="flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300 mb-2">
            <Clock className="w-4 h-4 text-[#c69255] shrink-0" />
            <span className="font-medium">{hours}</span>
          </div>

          {/* Phone */}
          {branch.phone && (
            <div className="flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300">
              <Phone className="w-4 h-4 text-stone-400 shrink-0" />
              <a 
                href={`tel:${branch.phone}`}
                className="hover:text-[#c69255] font-medium transition-colors"
              >
                {branch.phone}
              </a>
            </div>
          )}
        </div>

        {/* Amenities Icons */}
        <div className="pt-3 border-t border-stone-100 dark:border-white/5">
          <div className="flex flex-wrap gap-2">
            {branch.amenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 border border-stone-200/80 dark:border-white/5 text-[11px] font-medium text-stone-700 dark:text-stone-300"
              >
                {renderAmenityIcon(amenity)}
                <span>{getAmenityLabel(amenity)}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(branch)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-[#c69255] text-white hover:text-stone-950 dark:bg-white/5 dark:hover:bg-[#c69255] dark:text-stone-200 dark:hover:text-stone-950 font-bold text-xs transition-all duration-200 text-center border border-stone-900 hover:border-[#c69255] dark:border-white/10 shadow-sm cursor-pointer"
          >
            {language === "th" ? "ดูข้อมูลสาขา" : "Branch Details"}
          </button>

          {branch.googleMapsUrl && (
            <a
              href={branch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3.5 rounded-xl bg-[#c69255]/15 hover:bg-[#c69255] text-[#b47836] hover:text-stone-950 dark:text-[#d8a162] dark:hover:text-stone-950 font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 border border-[#c69255]/30 hover:border-[#c69255] cursor-pointer"
              title={language === "th" ? "เปิดแผนที่นำทาง" : "Directions"}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{language === "th" ? "นำทาง" : "Map"}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
