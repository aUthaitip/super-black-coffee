"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Copy, 
  Check, 
  Zap, 
  Wifi, 
  Plug, 
  Car, 
  Armchair, 
  Sparkles,
  Tag,
  ExternalLink
} from "lucide-react";
import { Branch, Amenity } from "@/types";
import { useLanguage } from "@/i18n/language-provider";
import { BRANCH_PROMOTIONS } from "@/data/promotions";

interface BranchDetailModalProps {
  branch: Branch | null;
  onClose: () => void;
  initialTab?: "info" | "promotions";
}

export function BranchDetailModal({ branch, onClose, initialTab = "info" }: BranchDetailModalProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"info" | "promotions">(initialTab);
  const [copied, setCopied] = useState(false);

  if (!branch) return null;

  const name = language === "th" ? branch.nameTh : branch.nameEn;
  const address = language === "th" ? branch.addressTh : branch.addressEn;
  const hours = language === "th" ? branch.openingHoursTh : branch.openingHoursEn;
  const highlightTag = language === "th" ? branch.highlightTagTh : branch.highlightTagEn;

  // Filter promotions belonging to this branch
  const branchPromos = BRANCH_PROMOTIONS.filter(
    (p) => p.branchSlug === branch.slug
  );

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAmenityDetails = (amenity: Amenity) => {
    switch (amenity) {
      case "ev-charger":
        return {
          icon: <Zap className="w-4 h-4 text-amber-500" />,
          title: language === "th" ? "สถานีชาร์จ EV Charger" : "EV Fast Charger",
          desc: language === "th" ? "รองรับยานยนต์ไฟฟ้า DC/AC Fast Charge" : "High-speed DC/AC charging station",
        };
      case "drive-thru":
        return {
          icon: <Car className="w-4 h-4 text-blue-500" />,
          title: language === "th" ? "บริการ Drive-Thru" : "Drive-Thru Service",
          desc: language === "th" ? "สั่งกาแฟโดยไม่ต้องลงจากรถ สะดวก รวดเร็ว" : "Fast drive-thru ordering lane",
        };
      case "wifi":
        return {
          icon: <Wifi className="w-4 h-4 text-emerald-500" />,
          title: language === "th" ? "ฟรี Hi-Speed Wi-Fi" : "Free Fast Wi-Fi",
          desc: language === "th" ? "อินเทอร์เน็ตความเร็วสูง รองรับการทำงาน" : "Dedicated broadband for guests",
        };
      case "power-outlets":
        return {
          icon: <Plug className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
          title: language === "th" ? "ปลั๊กไฟทุกโต๊ะ" : "Power Outlets",
          desc: language === "th" ? "พร้อมใช้งานสำหรับการทำงานและชาร์จอุปกรณ์" : "Available at work seats",
        };
      case "parking":
        return {
          icon: <Car className="w-4 h-4 text-purple-500" />,
          title: language === "th" ? "ที่จอดรถสะดวกสบาย" : "Spacious Parking",
          desc: language === "th" ? "มีช่องจอดรถกว้างขวาง ปลอดภัย" : "Dedicated guest vehicle parking",
        };
      case "seating":
        return {
          icon: <Armchair className="w-4 h-4 text-stone-600 dark:text-stone-300" />,
          title: language === "th" ? "โซนที่นั่งทำงาน & เลานจ์" : "Cozy Lounge & Seating",
          desc: language === "th" ? "บรรยากาศเงียบสงบ แอร์เย็น สบายตา" : "Comfortable working & relaxing spots",
        };
      default:
        return {
          icon: <Sparkles className="w-4 h-4 text-[#c69255]" />,
          title: amenity,
          desc: "",
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div 
        className="bg-white dark:bg-[#14110e] border border-stone-200 dark:border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8 max-h-[90vh] flex flex-col text-stone-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-stone-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 bg-stone-900">
          <Image
            src={branch.image}
            alt={name}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {branch.is24Hours
                ? language === "th"
                  ? "เปิดบริการ 24 ชั่วโมง"
                  : "Open 24 Hours Daily"
                : language === "th"
                ? "เปิดให้บริการตอนนี้"
                : "Open Now"}
            </span>

            {highlightTag && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#c69255] text-stone-950 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                {highlightTag}
              </span>
            )}
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-6 right-6 z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#d8a162] block mb-1">
              {language === "th" ? branch.provinceTh : branch.provinceEn}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
              {name}
            </h2>
          </div>
        </div>

        {/* Tab Navigation if branch has promotions */}
        {branchPromos.length > 0 && (
          <div className="flex border-b border-stone-200 dark:border-white/10 px-6 pt-3 bg-stone-50 dark:bg-[#171411] shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("info")}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === "info"
                  ? "border-[#c69255] text-[#b47836] dark:text-[#c69255]"
                  : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              {language === "th" ? "ข้อมูลและบริการสาขา" : "Store Info & Amenities"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("promotions")}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === "promotions"
                  ? "border-[#c69255] text-[#b47836] dark:text-[#c69255]"
                  : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{language === "th" ? "โปรโมชั่นพิเศษ" : "Special Promos"}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-[#b47836] dark:text-[#d8a162] font-bold">
                {branchPromos.length}
              </span>
            </button>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === "info" ? (
            <>
              {/* Address & Navigation Action */}
              <div className="rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/90 dark:border-white/10 p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#c69255] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                        {language === "th" ? "ที่อยู่สาขา" : "Store Address"}
                      </h4>
                      <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">{address}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/70 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {language === "th" ? "คัดลอกที่อยู่แล้ว" : "Copied"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{language === "th" ? "คัดลอกที่อยู่" : "Copy Address"}</span>
                      </>
                    )}
                  </button>

                  {branch.googleMapsUrl && (
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#c69255] hover:bg-[#b47836] dark:hover:bg-[#d8a162] text-stone-950 text-xs font-bold transition-colors shadow-md"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{language === "th" ? "เปิด Google Maps นำทาง" : "Open in Google Maps"}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Hours & Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Hours */}
                <div className="rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/90 dark:border-white/10 p-4">
                  <div className="flex items-center gap-2.5 text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wider mb-1.5 font-bold">
                    <Clock className="w-4 h-4 text-[#c69255]" />
                    <span>{language === "th" ? "เวลาทำการ" : "Operating Hours"}</span>
                  </div>
                  <p className="text-sm font-bold text-stone-900 dark:text-white">{hours}</p>
                </div>

                {/* Phone */}
                <div className="rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/90 dark:border-white/10 p-4">
                  <div className="flex items-center gap-2.5 text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wider mb-1.5 font-bold">
                    <Phone className="w-4 h-4 text-[#c69255]" />
                    <span>{language === "th" ? "เบอร์โทรศัพท์ติดต่อ" : "Phone Contact"}</span>
                  </div>
                  {branch.phone ? (
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-sm font-bold text-[#b47836] dark:text-[#c69255] hover:underline"
                    >
                      {branch.phone}
                    </a>
                  ) : (
                    <p className="text-sm text-stone-400">-</p>
                  )}
                </div>
              </div>

              {/* Amenities & Facilities */}
              <div>
                <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
                  {language === "th" ? "สิ่งอำนวยความสะดวก & บริการ" : "Amenities & Facilities"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {branch.amenities.map((amenity) => {
                    const detail = getAmenityDetails(amenity);
                    return (
                      <div
                        key={amenity}
                        className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-200/80 dark:border-white/5"
                      >
                        <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-stone-200/60 dark:border-white/5 shrink-0 mt-0.5">
                          {detail.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 dark:text-white">{detail.title}</div>
                          {detail.desc && (
                            <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">{detail.desc}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Promotions Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {language === "th"
                    ? `โปรโมชั่นเฉพาะสาขานี้ (${branchPromos.length} รายการ)`
                    : `Exclusive Branch Promotions (${branchPromos.length})`}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branchPromos.map((promo) => (
                  <div
                    key={promo.id}
                    className="rounded-2xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 overflow-hidden flex flex-col group hover:border-[#c69255] transition-all shadow-sm"
                  >
                    <div className="relative aspect-[3/4] w-full bg-stone-100 dark:bg-stone-900">
                      <Image
                        src={promo.image}
                        alt={promo.title[language]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 300px"
                      />
                    </div>
                    <div className="p-3 bg-stone-50 dark:bg-[#1a1612]">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#c69255]/20 text-[#b47836] dark:text-[#d8a162] mb-1">
                        {promo.tag[language]}
                      </span>
                      <h5 className="text-xs font-bold text-stone-900 dark:text-white line-clamp-2">
                        {promo.title[language]}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-[#120f0d] flex items-center justify-between shrink-0">
          <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
            {language === "th" ? "Super Black Coffee ยินดีต้อนรับทุกท่าน" : "Welcome to Super Black Coffee"}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200/80 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors cursor-pointer"
            >
              {language === "th" ? "ปิด" : "Close"}
            </button>
            {branch.googleMapsUrl && (
              <a
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#c69255] hover:bg-[#b47836] dark:hover:bg-[#d8a162] text-stone-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{language === "th" ? "เส้นทาง" : "Directions"}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
