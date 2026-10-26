"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

const franchiseTopics = [
  {
    href: "/franchise#calculator",
    title: { th: "เปิดร้านกับเรา ใช้งบเท่าไร?", en: "What Does It Cost to Open?" },
    description: {
      th: "ดูรูปแบบร้านและเครื่องมือประเมินงบเบื้องต้น แล้วสอบถามรายละเอียดค่าใช้จ่ายและสิ่งที่รวมในแพ็กเกจกับทีมงาน",
      en: "Explore store formats and estimate your budget, then ask our team about costs and what each package includes.",
    },
    action: { th: "ดูรูปแบบร้านและประเมินงบ", en: "Explore Formats & Budget" },
  },
  {
    href: "/franchise#support",
    title: { th: "เปิดร้านแล้ว ได้รับการดูแลอะไรบ้าง?", en: "What Support Can You Expect?" },
    description: {
      th: "ศึกษารายละเอียดการอบรม การจัดการร้าน และการสนับสนุน เพื่อเตรียมความพร้อมก่อนร่วมแฟรนไชส์",
      en: "Learn about training, store operations and support as you prepare to become a franchise partner.",
    },
    action: { th: "ดูรายละเอียดการสนับสนุน", en: "Explore Franchise Support" },
  },
  {
    href: "/franchise#steps",
    title: { th: "เริ่มต้นเปิดร้านอย่างไร?", en: "How Do You Get Started?" },
    description: {
      th: "ดูขั้นตอนตั้งแต่พูดคุยกับทีมงาน ประเมินทำเล และเตรียมร้าน เพื่อวางแผนการเปิดสาขาของคุณ",
      en: "See the steps from your first conversation and location review to preparing your store for opening.",
    },
    action: { th: "ดูขั้นตอนการเปิดร้าน", en: "See the Opening Steps" },
  },
] as const;

export function FranchiseTeaserSection() {
  const { language } = useLanguage();

  return (
    <section id="packages" className="scroll-mt-20 py-16 sm:py-24 bg-[#0a0807] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-[#c69255] mb-3">
            {language === "th" ? "วางแผนก่อนเริ่มธุรกิจ" : "PLAN YOUR NEXT STEP"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
            {language === "th" ? "แพ็กเกจแฟรนไชส์" : "Franchise Packages"}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-300">
            {language === "th" ? "เลือกรูปแบบร้าน วางแผนงบลงทุน และศึกษารายละเอียดก่อนตัดสินใจร่วมธุรกิจ" : "Explore store formats, plan your budget and understand the details before becoming a partner."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {franchiseTopics.map((topic, index) => (
            <Link key={topic.href} href={topic.href} className="group flex flex-col rounded-3xl border border-white/15 bg-white/5 p-7 hover:border-[#c69255] transition-colors">
              <span className="text-sm font-mono text-[#c69255] mb-6">0{index + 1}</span>
              <h3 className="text-xl font-semibold leading-relaxed">{topic.title[language]}</h3>
              <p className="mt-3 mb-8 text-sm leading-relaxed text-stone-300">{topic.description[language]}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#d8ad78]">
                {topic.action[language]} <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
