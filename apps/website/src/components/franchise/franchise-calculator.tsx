"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Building, Building2, Calculator, RotateCcw, Check, Sparkles, Info } from "lucide-react";
import { ScrollReveal, ScrollRevealText } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

export interface FranchiseModelData {
  id: "s" | "m" | "l";
  name: string;
  subName: string;
  tag: string;
  image: string;
  minInvestment: number;
  area: string;
  items: {
    label: string;
    value: string;
    amount?: number;
  }[];
  totalPrice: number;
  note?: string;
}

export const CALCULATOR_MODELS: Record<"s" | "m" | "l", FranchiseModelData> = {
  s: {
    id: "s",
    name: "Kiosk",
    subName: "Smart Café (Size S)",
    tag: "Kiosk / Stand",
    image: "/franchise/superblackcoffee-franchise-s.webp",
    minInvestment: 1930000,
    area: "เริ่มต้นที่ 20 ตร.ม. (พื้นที่รวม 100 ตร.ว.)",
    items: [
      { label: "ขนาดพื้นที่", value: "เริ่มต้นที่ 20 ตร.ม. (พื้นที่รวม 100 ตร.ว.)" },
      { label: "ค่าก่อสร้าง / ตกแต่ง / งานระบบ", value: "800,000 บาท", amount: 800000 },
      { label: "ค่าออกแบบพื้นที่", value: "40,000 บาท", amount: 40000 },
      { label: "ค่าอุปกรณ์และเครื่องชงกาแฟมาตรฐาน Super Black", value: "650,000 บาท", amount: 650000 },
      { label: "ค่าธรรมเนียมแฟรนไชส์แรกเข้า (Franchise Fee)", value: "150,000 บาท", amount: 150000 },
      { label: "ค่าดำเนินการและฝึกอบรมก่อนเปิดร้าน", value: "60,000 บาท", amount: 60000 },
      { label: "เงินประกันสัญญาแบรนด์ (ได้รับคืนเมื่อครบสัญญา)", value: "100,000 บาท", amount: 100000 },
    ],
    totalPrice: 1800000,
    note: "*ราคาประเมินเบื้องต้น อาจมีการปรับเปลี่ยนตามสภาพพื้นที่จริง และอุปกรณ์เสริมพิเศษ",
  },
  m: {
    id: "m",
    name: "Build in",
    subName: "Lifestyle Café (Size M)",
    tag: "Build-in Store",
    image: "/franchise/superblackcoffee-franchise-m.webp",
    minInvestment: 2330000,
    area: "เริ่มต้นที่ 40 ตร.ม. (พื้นที่รวม 200 ตร.ว.)",
    items: [
      { label: "ขนาดพื้นที่", value: "เริ่มต้นที่ 40 ตร.ม. (พื้นที่รวม 200 ตร.ว.)" },
      { label: "ค่าก่อสร้าง / ตกแต่ง / งานระบบ", value: "1,000,000 บาท", amount: 1000000 },
      { label: "ค่าออกแบบพื้นที่", value: "50,000 บาท", amount: 50000 },
      { label: "ค่าอุปกรณ์และเครื่องชงกาแฟมาตรฐาน Super Black", value: "850,000 บาท", amount: 850000 },
      { label: "ค่าธรรมเนียมแฟรนไชส์แรกเข้า (Franchise Fee)", value: "150,000 บาท", amount: 150000 },
      { label: "ค่าดำเนินการและฝึกอบรมก่อนเปิดร้าน", value: "80,000 บาท", amount: 80000 },
      { label: "เงินประกันสัญญาแบรนด์ (ได้รับคืนเมื่อครบสัญญา)", value: "200,000 บาท", amount: 200000 },
    ],
    totalPrice: 2330000,
    note: "*ราคาประเมินเบื้องต้น อาจมีการปรับเปลี่ยนตามสภาพพื้นที่จริง และอุปกรณ์เสริมพิเศษ",
  },
  l: {
    id: "l",
    name: "Stand Alone",
    subName: "Lifestyle Hub (Size L)",
    tag: "Stand Alone + EV Hub",
    image: "/franchise/superblackcoffee-franchise-l.webp",
    minInvestment: 5500000,
    area: "เริ่มต้นที่ 120 ตร.ม. (พื้นที่รวม 400 ตร.ว.)",
    items: [
      { label: "ขนาดพื้นที่", value: "เริ่มต้นที่ 120 ตร.ม. (พื้นที่รวม 400 ตร.ว.)" },
      { label: "ค่าก่อสร้าง / ตกแต่ง / งานระบบภายนอก-ใน", value: "2,800,000 บาท", amount: 2800000 },
      { label: "ค่าออกแบบพื้นที่และแปลนสถาปัตยกรรม", value: "100,000 บาท", amount: 100000 },
      { label: "ค่าอุปกรณ์และเครื่องชงกาแฟแบบ Full-Scale Specialty", value: "1,600,000 บาท", amount: 1600000 },
      { label: "ค่าธรรมเนียมแฟรนไชส์แรกเข้า (Franchise Fee)", value: "300,000 บาท", amount: 300000 },
      { label: "ค่าดำเนินการ จัดเตรียมระบบ และฝึกอบรม", value: "120,000 บาท", amount: 120000 },
      { label: "เงินประกันสัญญาแบรนด์ (ได้รับคืนเมื่อครบสัญญา)", value: "300,000 บาท", amount: 300000 },
    ],
    totalPrice: 5220000,
    note: "*ราคาประเมินเบื้องต้น ยังไม่รวมสถานีชาร์จ Ultra Fast EV Station และจุดบริการเสริม",
  },
};

export function FranchiseCalculator({ language = "th" }: { language?: string }) {
  const [selectedModel, setSelectedModel] = useState<"s" | "m" | "l">("m");
  const [budgetNumber, setBudgetNumber] = useState<number>(2000000);
  const [budgetDisplay, setBudgetDisplay] = useState<string>("2,000,000");
  const [calculatedData, setCalculatedData] = useState<FranchiseModelData | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // Handle direct budget typing
  const handleBudgetChange = (valStr: string) => {
    const raw = valStr.replace(/[^0-9]/g, "");
    if (!raw) {
      setBudgetDisplay("");
      setBudgetNumber(0);
      setInputError("กรุณาระบุงบประมาณเริ่มต้นอย่างน้อย 2,000,000 บาท");
      return;
    }
    const num = parseInt(raw, 10);
    setBudgetNumber(num);
    setBudgetDisplay(num.toLocaleString("th-TH"));

    if (num < 2000000) {
      setInputError("งบประมาณเริ่มต้นต้องไม่ต่ำกว่า 2,000,000 บาท");
    } else {
      setInputError(null);
    }
  };

  // Model switch
  const handleModelChange = (modelId: "s" | "m" | "l") => {
    setSelectedModel(modelId);
    if (hasCalculated) {
      setCalculatedData(CALCULATOR_MODELS[modelId]);
    }
  };

  // Calculate action
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (budgetNumber < 2000000) {
      setInputError("งบประมาณเริ่มต้นต้องไม่ต่ำกว่า 2,000,000 บาท");
      return;
    }
    setInputError(null);
    setCalculatedData(CALCULATOR_MODELS[selectedModel]);
    setHasCalculated(true);

    // Smooth scroll to result preview after a moment
    setTimeout(() => {
      const resultElem = document.getElementById("calculator-result-view");
      if (resultElem) {
        resultElem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 150);
  };

  // Reset action
  const handleReset = () => {
    setSelectedModel("m");
    setBudgetNumber(2000000);
    setBudgetDisplay("2,000,000");
    setInputError(null);
    setCalculatedData(null);
    setHasCalculated(false);
  };

  return (
    <section id="calculator" className="relative py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-stone-50/70 dark:bg-[#0d0a08]/80 transition-colors pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c69255]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Box Container */}
        <div className="bg-white dark:bg-[#14100c] rounded-3xl border border-stone-200/90 dark:border-white/10 shadow-xl overflow-hidden p-6 sm:p-10 md:p-14">
          
          {/* Top Form Grid: Left Title / Right Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Title with subtle Coffee Art watermark */}
            <div className="lg:col-span-5 relative flex flex-col justify-center">
              <ScrollRevealText delay={0.05} yOffset={15}>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b47836] dark:text-[#c69255] mb-2">
                  <Calculator className="w-4 h-4" />
                  <span>{language === "th" ? "เครื่องมือคำนวณงบประมาณ" : "Investment Calculator"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-stone-950 dark:text-white leading-[1.2] tracking-tight">
                  {language === "th" ? (
                    <>
                      คำนวณเงินลงทุน <br />
                      <span className="text-[#b47836] dark:text-[#c69255]">ก่อสร้างร้าน</span>
                    </>
                  ) : (
                    <>
                      Calculate Store <br />
                      <span className="text-[#b47836] dark:text-[#c69255]">Investment Cost</span>
                    </>
                  )}
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-4 font-normal leading-relaxed max-w-sm">
                  {language === "th"
                    ? "ประเมินโครงสร้างงบประมาณเริ่มต้นตามขนาดพื้นที่และโมเดลร้านที่คุณต้องการเปิด"
                    : "Estimate preliminary setup costs based on your preferred store model and footprint."}
                </p>
              </ScrollRevealText>

              {/* Decorative Subtle Coffee Bean Watermark Vector */}
              <div className="absolute right-0 bottom-[-20px] opacity-[0.04] dark:opacity-[0.06] pointer-events-none select-none">
                <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor" className="text-stone-900 dark:text-white">
                  <path d="M50 10 C30 10, 15 25, 15 50 C15 75, 30 90, 50 90 C70 90, 85 75, 85 50 C85 25, 70 10, 50 10 Z M50 18 C65 18, 77 30, 77 50 C77 60, 73 69, 66 75 C60 62, 45 42, 50 18 Z M45 82 C34 77, 23 65, 23 50 C23 38, 29 28, 38 21 C36 40, 48 64, 45 82 Z" />
                </svg>
              </div>
            </div>

            {/* Right Form Fields */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleCalculate} className="space-y-6">
                
                {/* 1. Money Input */}
                <div>
                  <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {language === "th" ? "เงินลงทุนและขนาดพื้นที่" : "Budget & Store Footprint"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={budgetDisplay}
                      onChange={(e) => handleBudgetChange(e.target.value)}
                      placeholder="ระบุเงินลงทุน เช่น 2,000,000"
                      className={cn(
                        "w-full h-13 px-4 py-3 bg-stone-50/90 dark:bg-[#1c1611] border rounded-2xl text-stone-900 dark:text-white font-medium text-sm sm:text-base focus:outline-none focus:ring-2 transition-all",
                        inputError
                          ? "border-red-400 focus:ring-red-400/30"
                          : "border-stone-200 dark:border-white/10 focus:ring-[#c69255]/40 focus:border-[#c69255]"
                      )}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                      บาท
                    </div>
                  </div>
                  {inputError ? (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">{inputError}</p>
                  ) : (
                    <p className="text-stone-500 dark:text-stone-400 text-xs mt-1.5">
                      * สามารถกรอกงบประมาณได้เอง (เริ่มต้น 2,000,000 บาท)
                    </p>
                  )}
                </div>

                {/* 2. Model Radio Card Selectors */}
                <div>
                  <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2.5">
                    {language === "th" ? "เลือกรูปแบบร้านค้า" : "Select Store Model"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Kiosk */}
                    <button
                      type="button"
                      onClick={() => handleModelChange("s")}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer text-center",
                        selectedModel === "s"
                          ? "border-[#c69255] bg-[#c69255]/[0.08] dark:bg-[#c69255]/15 text-stone-950 dark:text-white shadow-sm"
                          : "border-stone-200/90 dark:border-white/10 bg-stone-50/50 dark:bg-[#1a1511]/50 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-white/20"
                      )}
                    >
                      <Store className={cn("w-6 h-6 mb-2", selectedModel === "s" ? "text-[#b47836] dark:text-[#c69255]" : "text-stone-400")} />
                      <span className="text-sm font-bold">Kiosk</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Size S (~20 ตร.ม.)</span>
                      {selectedModel === "s" && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#c69255] text-stone-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>

                    {/* Build in */}
                    <button
                      type="button"
                      onClick={() => handleModelChange("m")}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer text-center",
                        selectedModel === "m"
                          ? "border-[#c69255] bg-[#c69255]/[0.08] dark:bg-[#c69255]/15 text-stone-950 dark:text-white shadow-sm"
                          : "border-stone-200/90 dark:border-white/10 bg-stone-50/50 dark:bg-[#1a1511]/50 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-white/20"
                      )}
                    >
                      <Building className={cn("w-6 h-6 mb-2", selectedModel === "m" ? "text-[#b47836] dark:text-[#c69255]" : "text-stone-400")} />
                      <span className="text-sm font-bold">Build in</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Size M (~40 ตร.ม.)</span>
                      {selectedModel === "m" && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#c69255] text-stone-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>

                    {/* Stand Alone */}
                    <button
                      type="button"
                      onClick={() => handleModelChange("l")}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer text-center",
                        selectedModel === "l"
                          ? "border-[#c69255] bg-[#c69255]/[0.08] dark:bg-[#c69255]/15 text-stone-950 dark:text-white shadow-sm"
                          : "border-stone-200/90 dark:border-white/10 bg-stone-50/50 dark:bg-[#1a1511]/50 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-white/20"
                      )}
                    >
                      <Building2 className={cn("w-6 h-6 mb-2", selectedModel === "l" ? "text-[#b47836] dark:text-[#c69255]" : "text-stone-400")} />
                      <span className="text-sm font-bold">Stand Alone</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Size L (120+ ตร.ม.)</span>
                      {selectedModel === "l" && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#c69255] text-stone-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* 3. Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-white dark:bg-[#1e1813] border border-stone-300 dark:border-white/15 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 font-bold text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-stone-400" />
                    <span>{language === "th" ? "ล้างข้อมูล" : "Reset"}</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 px-8 py-3.5 rounded-full bg-stone-950 hover:bg-[#c69255] text-white hover:text-stone-950 dark:bg-[#c69255] dark:hover:bg-[#d8a162] dark:text-stone-950 font-bold text-sm transition-all shadow-md hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{language === "th" ? "คำนวณ" : "Calculate"}</span>
                  </button>
                </div>

              </form>
            </div>

          </div>

          {/* DYNAMIC RESULT CONTAINER */}
          <AnimatePresence>
            {hasCalculated && calculatedData && (
              <motion.div
                id="calculator-result-view"
                initial={{ opacity: 0, y: 25, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mt-12 pt-12 border-t border-stone-200 dark:border-white/10 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Left Column: 3D Render Image */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-stone-200/90 dark:border-white/10 bg-stone-100 dark:bg-[#1a1511] group">
                      <Image
                        src={calculatedData.image}
                        alt={`โมเดลร้าน ${calculatedData.name}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-black/75 text-white backdrop-blur-md border border-white/15">
                        {calculatedData.tag}
                      </div>
                    </div>
                    <div className="mt-3.5 text-center">
                      <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
                        ตัวอย่างโมเดล {calculatedData.name} ({calculatedData.subName})
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {calculatedData.area}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Detailed Breakdown Table & Total */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    
                    {/* Cost Breakdown Rows */}
                    <div className="divide-y divide-stone-100 dark:divide-white/5 border-t border-b border-stone-200/80 dark:border-white/10">
                      {calculatedData.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="py-3 sm:py-3.5 flex items-center justify-between gap-4 text-xs sm:text-sm hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-2 rounded-lg transition-colors"
                        >
                          <span className="text-stone-600 dark:text-stone-300 font-medium">
                            {item.label}
                          </span>
                          <span className="font-bold text-stone-900 dark:text-white shrink-0 font-mono">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total Price Banner (Warm Gold / Cream Gradient) */}
                    <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#b47836]/10 via-[#c69255]/15 to-[#b47836]/10 dark:from-[#c69255]/20 dark:to-[#b47836]/10 border border-[#c69255]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 block">
                          รวมราคาเริ่มต้น (ไม่รวม VAT)
                        </span>
                        <span className="text-[11px] text-stone-400 dark:text-stone-400">
                          {calculatedData.note || "*ราคาประเมินเบื้องต้น อาจมีการปรับเปลี่ยนตามขนาดหน้างาน"}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#b47836] dark:text-[#d8a162] font-mono shrink-0">
                        {calculatedData.totalPrice.toLocaleString("th-TH")} <span className="text-sm font-sans font-normal text-stone-600 dark:text-stone-300">บาท</span>
                      </div>
                    </div>

                    {/* Quick Call to Action */}
                    <div className="mt-5 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
                      <div className="flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#c69255]" />
                        <span>สนใจรายละเอียดแปลนอาคารและระบบเครื่องจักร</span>
                      </div>
                      <a
                        href="/#contact"
                        className="font-bold text-[#b47836] dark:text-[#c69255] hover:underline"
                      >
                        ปรึกษาฝ่ายพัฒนาธุรกิจ →
                      </a>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
