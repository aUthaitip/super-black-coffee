"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Building, Building2, Calculator, RotateCcw, Check, Sparkles, Info } from "lucide-react";
import { ScrollRevealText } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

export interface FranchiseModelData {
  id: "s" | "m" | "l";
  name: string;
  subName: string;
  tag: string;
  image: string;
  minInvestment: number;
  investmentRange: string;
  area: string;
  items: {
    label: string;
    value: string;
  }[];
}

export const CALCULATOR_MODELS: Record<"s" | "m" | "l", FranchiseModelData> = {
  s: {
    id: "s",
    name: "Smart Café",
    subName: "Size S",
    tag: "Size S — Smart Café",
    image: "/model/model-s.webp",
    minInvestment: 1500000,
    investmentRange: "1.5–2.5 ล้านบาท",
    area: "พื้นที่โครงการแนะนำ 100 ตร.ว. / 400 ตร.ม.",
    items: [
      { label: "รูปแบบอาคาร", value: "คีออสหรือร้านขนาดเล็ก ชั้นเดียว" },
      { label: "พื้นที่โครงการแนะนำ", value: "100 ตร.ว. / 400 ตร.ม." },
      { label: "พื้นที่บริการ", value: "เคาน์เตอร์กาแฟ อาหารและเบเกอรี่ พื้นที่รับสินค้า" },
      { label: "บริการเสริมตามแผน", value: "BPOST65 EXPRESS" },
      { label: "สถานีชาร์จ EV ตามแผน", value: "1 สถานี" },
      { label: "ค่าแฟรนไชส์เริ่มต้น", value: "300,000 บาท" },
    ],
  },
  m: {
    id: "m",
    name: "Lifestyle Café",
    subName: "Size M",
    tag: "Size M — Lifestyle Café",
    image: "/model/model-m.webp",
    minInvestment: 3500000,
    investmentRange: "3.5–5 ล้านบาท",
    area: "พื้นที่โครงการแนะนำ 200 ตร.ว. / 800 ตร.ม.",
    items: [
      { label: "รูปแบบอาคาร", value: "คาเฟ่ชั้นเดียว มีพื้นที่นั่งภายใน" },
      { label: "พื้นที่โครงการแนะนำ", value: "200 ตร.ว. / 800 ตร.ม." },
      { label: "พื้นที่บริการ", value: "เคาน์เตอร์กาแฟ ครัว เบเกอรี่ และพื้นที่นั่งรับประทาน" },
      { label: "บริการเสริมตามแผน", value: "BPOST65 EXPRESS และไปรษณีย์" },
      { label: "สถานีชาร์จ EV ตามแผน", value: "2 สถานี" },
      { label: "ค่าแฟรนไชส์เริ่มต้น", value: "500,000 บาท" },
    ],
  },
  l: {
    id: "l",
    name: "Lifestyle Hub",
    subName: "Size L",
    tag: "Size L — Lifestyle Hub",
    image: "/model/model-l.webp",
    minInvestment: 7000000,
    investmentRange: "7–10 ล้านบาทขึ้นไป",
    area: "พื้นที่โครงการแนะนำ 400 ตร.ว. / 1,600 ตร.ม.",
    items: [
      { label: "รูปแบบอาคาร", value: "อาคารสองชั้น พร้อมพื้นที่ใช้งานหลายส่วน" },
      { label: "พื้นที่โครงการแนะนำ", value: "400 ตร.ว. / 1,600 ตร.ม." },
      { label: "พื้นที่บริการ", value: "เคาน์เตอร์กาแฟ ครัว เบเกอรี่ พื้นที่นั่ง พื้นที่ทำงาน และห้องประชุม" },
      { label: "บริการเสริมตามแผน", value: "BPOST65 EXPRESS ไปรษณีย์ พื้นที่กิจกรรม และ Mobile Café" },
      { label: "สถานีชาร์จ EV ตามแผน", value: "4 สถานี" },
      { label: "ค่าแฟรนไชส์เริ่มต้น", value: "700,000 บาท" },
    ],
  },
};

const CALCULATOR_MODELS_EN: Record<FranchiseModelData["id"], Pick<FranchiseModelData, "investmentRange" | "area" | "items">> = {
  s: {
    investmentRange: "THB 1.5–2.5 million",
    area: "Recommended site area: 100 sq wah / 400 sq m",
    items: [
      { label: "Building type", value: "Single-storey kiosk or small café" },
      { label: "Recommended site area", value: "100 sq wah / 400 sq m" },
      { label: "Service areas", value: "Coffee counter, food and bakery service, and pickup area" },
      { label: "Planned additional services", value: "BPOST65 EXPRESS" },
      { label: "Planned EV charging stations", value: "1 station" },
      { label: "Starting franchise fee", value: "THB 300,000" },
    ],
  },
  m: {
    investmentRange: "THB 3.5–5 million",
    area: "Recommended site area: 200 sq wah / 800 sq m",
    items: [
      { label: "Building type", value: "Single-storey café with indoor seating" },
      { label: "Recommended site area", value: "200 sq wah / 800 sq m" },
      { label: "Service areas", value: "Coffee counter, kitchen, bakery, and dining area" },
      { label: "Planned additional services", value: "BPOST65 EXPRESS and postal services" },
      { label: "Planned EV charging stations", value: "2 stations" },
      { label: "Starting franchise fee", value: "THB 500,000" },
    ],
  },
  l: {
    investmentRange: "THB 7–10 million and above",
    area: "Recommended site area: 400 sq wah / 1,600 sq m",
    items: [
      { label: "Building type", value: "Two-storey building with multiple functional areas" },
      { label: "Recommended site area", value: "400 sq wah / 1,600 sq m" },
      { label: "Service areas", value: "Coffee counter, kitchen, bakery, seating, workspace, and meeting room" },
      { label: "Planned additional services", value: "BPOST65 EXPRESS, postal services, event space, and Mobile Café" },
      { label: "Planned EV charging stations", value: "4 stations" },
      { label: "Starting franchise fee", value: "THB 700,000" },
    ],
  },
};

const CALCULATOR_COPY = {
  th: {
    required: "กรุณาระบุงบประมาณมากกว่า 0 บาท",
    invalid: "กรุณาระบุงบประมาณเป็นจำนวนเต็มมากกว่า 0 บาท และไม่เกิน 15 หลัก",
    placeholder: "ระบุเงินลงทุน เช่น 2,000,000",
    currency: "บาท",
    siteUnit: "ตร.ว.",
    budgetHelp: "กรอกงบประมาณเพื่อเปรียบเทียบ โดยโมเดล Size S เริ่มต้นประมาณ 1,500,000 บาท",
    modelAlt: "โมเดลร้าน",
    modelCaption: "ตัวอย่างโมเดล",
    investment: "งบลงทุนโดยประมาณ",
    comparisonNote: "เปรียบเทียบกับขอบล่างของช่วงงบลงทุนโดยประมาณ กรุณาสอบถามรายละเอียดโครงการเพื่อประเมินงบจริง",
    enquiry: "สนใจรายละเอียดแปลนอาคารและระบบเครื่องจักร",
    contact: "ปรึกษาฝ่ายพัฒนาธุรกิจ",
    equal: "เท่ากับงบลงทุนขั้นต่ำของโมเดล",
  },
  en: {
    required: "Please enter a budget greater than THB 0.",
    invalid: "Please enter a positive whole-number budget of no more than 15 digits.",
    placeholder: "Enter your budget, e.g. 2,000,000",
    currency: "THB",
    siteUnit: "sq wah",
    budgetHelp: "Enter your budget to compare. Size S starts at approximately THB 1,500,000.",
    modelAlt: "Store model:",
    modelCaption: "Model preview:",
    investment: "Estimated investment",
    comparisonNote: "This compares your budget with the lower end of the estimated investment range. Contact us for a project-specific estimate.",
    enquiry: "Enquire about building plans and equipment systems",
    contact: "Contact Business Development",
    equal: "Your budget matches the model’s minimum estimated investment.",
  },
};

export function FranchiseCalculator({ language = "th" }: { language?: string }) {
  const isThai = language === "th";
  const copy = CALCULATOR_COPY[isThai ? "th" : "en"];
  const locale = isThai ? "th-TH" : "en-US";
  const [selectedModel, setSelectedModel] = useState<"s" | "m" | "l">("s");
  const [budgetNumber, setBudgetNumber] = useState<number>(2000000);
  const [budgetDisplay, setBudgetDisplay] = useState<string>("2,000,000");
  const [hasCalculated, setHasCalculated] = useState(false);
  const [inputError, setInputError] = useState<"required" | "invalid" | null>(null);
  const calculatedData = hasCalculated
    ? { ...CALCULATOR_MODELS[selectedModel], ...(!isThai ? CALCULATOR_MODELS_EN[selectedModel] : {}) }
    : null;
  const budgetDifference = calculatedData
    ? Math.abs(budgetNumber - calculatedData.minInvestment).toLocaleString(locale)
    : "";

  // Handle direct budget typing
  const handleBudgetChange = (valStr: string) => {
    setHasCalculated(false);
    const raw = valStr.replace(/[^0-9]/g, "");
    if (!raw) {
      setBudgetDisplay("");
      setBudgetNumber(0);
      setInputError("required");
      return;
    }
    const num = parseInt(raw, 10);
    setBudgetNumber(num);
    setBudgetDisplay(num.toLocaleString(locale));

    if (!Number.isSafeInteger(num) || num <= 0 || raw.length > 15) {
      setInputError("invalid");
    } else {
      setInputError(null);
    }
  };

  // Model switch
  const handleModelChange = (modelId: "s" | "m" | "l") => {
    setSelectedModel(modelId);
  };

  // Calculate action
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!Number.isSafeInteger(budgetNumber) || budgetNumber <= 0 || budgetNumber >= 1e15) {
      setInputError("invalid");
      return;
    }
    setInputError(null);
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
    setSelectedModel("s");
    setBudgetNumber(2000000);
    setBudgetDisplay("2,000,000");
    setInputError(null);
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
                      <span className="text-[#b47836] dark:text-[#c69255]">ตามโมเดลร้าน</span>
                    </>
                  ) : (
                    <>
                      Compare Investment <br />
                      <span className="text-[#b47836] dark:text-[#c69255]">by Store Model</span>
                    </>
                  )}
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-4 font-normal leading-relaxed max-w-sm">
                  {language === "th"
                    ? "เปรียบเทียบงบประมาณของคุณกับช่วงเงินลงทุน พร้อมดูพื้นที่โครงการและบริการของแต่ละโมเดล"
                    : "Compare your budget with the investment range and explore the recommended site area and services for each model."}
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
                  <label htmlFor="franchise-budget" className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {language === "th" ? "งบลงทุนของคุณ" : "Your Investment Budget"}
                  </label>
                  <div className="relative">
                    <input
                      id="franchise-budget"
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      aria-invalid={Boolean(inputError)}
                      aria-describedby="franchise-budget-help"
                      value={budgetDisplay}
                      onChange={(e) => handleBudgetChange(e.target.value)}
                      placeholder={copy.placeholder}
                      className={cn(
                        "w-full h-13 pl-4 pr-14 py-3 bg-stone-50/90 dark:bg-[#1c1611] border rounded-2xl text-stone-900 dark:text-white font-medium text-sm sm:text-base focus:outline-none focus:ring-2 transition-all",
                        inputError
                          ? "border-red-400 focus:ring-red-400/30"
                          : "border-stone-200 dark:border-white/10 focus:ring-[#c69255]/40 focus:border-[#c69255]"
                      )}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                      {copy.currency}
                    </div>
                  </div>
                  {inputError ? (
                    <p id="franchise-budget-help" role="alert" className="text-red-500 text-xs mt-1.5 font-medium">{copy[inputError]}</p>
                  ) : (
                    <p id="franchise-budget-help" className="text-stone-500 dark:text-stone-400 text-xs mt-1.5">
                      {copy.budgetHelp}
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
                      aria-pressed={selectedModel === "s"}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer text-center",
                        selectedModel === "s"
                          ? "border-[#c69255] bg-[#c69255]/[0.08] dark:bg-[#c69255]/15 text-stone-950 dark:text-white shadow-sm"
                          : "border-stone-200/90 dark:border-white/10 bg-stone-50/50 dark:bg-[#1a1511]/50 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-white/20"
                      )}
                    >
                      <Store className={cn("w-6 h-6 mb-2", selectedModel === "s" ? "text-[#b47836] dark:text-[#c69255]" : "text-stone-400")} />
                      <span className="text-sm font-bold">Smart Café</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Size S · 100 {copy.siteUnit}</span>
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
                      aria-pressed={selectedModel === "m"}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer text-center",
                        selectedModel === "m"
                          ? "border-[#c69255] bg-[#c69255]/[0.08] dark:bg-[#c69255]/15 text-stone-950 dark:text-white shadow-sm"
                          : "border-stone-200/90 dark:border-white/10 bg-stone-50/50 dark:bg-[#1a1511]/50 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-white/20"
                      )}
                    >
                      <Building className={cn("w-6 h-6 mb-2", selectedModel === "m" ? "text-[#b47836] dark:text-[#c69255]" : "text-stone-400")} />
                      <span className="text-sm font-bold">Lifestyle Café</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Size M · 200 {copy.siteUnit}</span>
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
                      aria-pressed={selectedModel === "l"}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer text-center",
                        selectedModel === "l"
                          ? "border-[#c69255] bg-[#c69255]/[0.08] dark:bg-[#c69255]/15 text-stone-950 dark:text-white shadow-sm"
                          : "border-stone-200/90 dark:border-white/10 bg-stone-50/50 dark:bg-[#1a1511]/50 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-white/20"
                      )}
                    >
                      <Building2 className={cn("w-6 h-6 mb-2", selectedModel === "l" ? "text-[#b47836] dark:text-[#c69255]" : "text-stone-400")} />
                      <span className="text-sm font-bold">Lifestyle Hub</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Size L · 400 {copy.siteUnit}</span>
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
                        alt={`${copy.modelAlt} ${calculatedData.name}`}
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
                        {copy.modelCaption} {calculatedData.name} ({calculatedData.subName})
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
                          className="py-3 sm:py-3.5 grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1.5 sm:gap-4 text-xs sm:text-sm hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-2 rounded-lg transition-colors"
                        >
                          <span className="text-stone-600 dark:text-stone-300 font-medium">
                            {item.label}
                          </span>
                          <span className="font-semibold text-stone-900 dark:text-white sm:text-right leading-relaxed min-w-0 break-words">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total Price Banner (Warm Gold / Cream Gradient) */}
                    <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#b47836]/10 via-[#c69255]/15 to-[#b47836]/10 dark:from-[#c69255]/20 dark:to-[#b47836]/10 border border-[#c69255]/30 space-y-2">
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 block">
                          {copy.investment}
                        </span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-[#b47836] dark:text-[#d8a162]">
                        {calculatedData.investmentRange}
                      </div>
                    </div>

                    <div role="status" className="mt-4 rounded-2xl border border-stone-200 dark:border-white/10 p-5 text-sm leading-relaxed">
                      <p className="font-semibold text-stone-900 dark:text-white">
                        {isThai
                          ? `งบของคุณ ${budgetNumber.toLocaleString(locale)} บาท`
                          : `Your budget: THB ${budgetNumber.toLocaleString(locale)}`}
                      </p>
                      <p className="mt-2 text-stone-600 dark:text-stone-300">
                        {budgetNumber < calculatedData.minInvestment
                          ? isThai
                            ? `ต่ำกว่างบลงทุนขั้นต่ำของโมเดล ${budgetDifference} บาท`
                            : `Your budget is THB ${budgetDifference} below the model’s minimum estimated investment.`
                          : budgetNumber === calculatedData.minInvestment
                            ? copy.equal
                            : isThai
                              ? `สูงกว่างบลงทุนขั้นต่ำของโมเดล ${budgetDifference} บาท`
                              : `Your budget is THB ${budgetDifference} above the model’s minimum estimated investment.`}
                      </p>
                      <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                        {copy.comparisonNote}
                      </p>
                    </div>

                    {/* Quick Call to Action */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400 px-1">
                      <div className="flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#c69255]" />
                        <span>{copy.enquiry}</span>
                      </div>
                      <a
                        href="/#contact"
                        className="font-bold text-[#b47836] dark:text-[#c69255] hover:underline"
                      >
                        {copy.contact}
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
