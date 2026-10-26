"use client";

import Image from "next/image";
import { ArrowRight, ChartNoAxesCombined, Boxes, Store } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

const features = [
  {
    icon: ChartNoAxesCombined,
    title: { th: "หน้าร้านและยอดขาย", en: "Sales & Store Operations" },
    description: { th: "รู้จักเครื่องมือสำหรับติดตามการขายและภาพรวมการทำงานของร้าน", en: "Explore tools for tracking sales and daily store operations." },
  },
  {
    icon: Boxes,
    title: { th: "สต็อกและการสั่งวัตถุดิบ", en: "Stock & Supply Orders" },
    description: { th: "ดูแนวทางจัดการวัตถุดิบคงเหลือและการสั่งซื้อสำหรับสาขา", en: "Learn about inventory management and supply ordering for your branch." },
  },
  {
    icon: Store,
    title: { th: "หลังบ้านและสาขา", en: "Back Office & Branches" },
    description: { th: "ทำความเข้าใจการจัดการข้อมูลร้านและการประสานงานกับสำนักงานใหญ่", en: "Understand store information management and coordination with headquarters." },
  },
] as const;

export function StoreSystemSection() {
  const { language } = useLanguage();

  return (
    <section id="systems" className="scroll-mt-20 bg-[#eef2ed] dark:bg-[#111a15] py-16 sm:py-24 text-stone-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#375a43] dark:text-[#a5c5ae] mb-4">SUPER BLACK CONTROL</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-snug">
            {language === "th" ? "ระบบร้าน" : "Store Systems"}
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            {language === "th"
              ? "การเปิดร้านเป็นเพียงจุดเริ่มต้น ทำความรู้จักระบบสำหรับงานหน้าร้าน สต็อก และหลังบ้าน พร้อมสอบถามทีมงานว่ารูปแบบร้านของคุณใช้เครื่องมือใดบ้าง"
              : "Opening is just the beginning. Explore systems for sales, inventory and back-office work, and ask our team which tools apply to your store format."}
          </p>
          <ul className="mt-8 space-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title.en} className="flex gap-4">
                <div className="shrink-0 rounded-2xl bg-white dark:bg-white/10 p-3 self-start text-[#375a43] dark:text-[#a5c5ae]">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{title[language]}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{description[language]}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#284834] hover:bg-[#1d3826] px-6 py-3.5 text-sm font-bold text-white transition-colors">
            {language === "th" ? "สอบถามเรื่องระบบร้าน" : "Ask About Store Systems"}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone-900/10 dark:border-white/10 bg-white dark:bg-black">
          <Image
            src="/services/superblackcoffee-service-control.webp"
            alt={language === "th" ? "ภาพแนะนำระบบ Super Black Control สำหรับร้านและสำนักงานใหญ่" : "Super Black Control store and headquarters system overview"}
            fill
            sizes="(max-width: 1023px) 100vw, 600px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
