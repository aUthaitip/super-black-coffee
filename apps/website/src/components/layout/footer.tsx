"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MessageCircle, Globe, ChevronDown, AlertCircle, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { LAYOUT_DATA } from "@/data/layout";

export function Footer() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [activeSocial, setActiveSocial] = useState<string>("");

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const { brand, navLinks } = LAYOUT_DATA;

  const handleSocialClick = (platform: string) => {
    setActiveSocial(platform);
    setSocialModalOpen(true);
  };

  return (
    <footer className="relative z-10 bg-[#f7f4ee] dark:bg-black text-stone-600 dark:text-[#a1a1aa] border-t border-stone-200 dark:border-white/10 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Brand (Left) | Menu (Center) | Contact (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16">
          
          {/* Column 1: Brand Logo & Description */}
          <div className="md:col-span-6 lg:col-span-6 space-y-5 text-left">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-9 h-9 overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo/superblackcoffee-logo.webp"
                  alt="Super Black Coffee Logo"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-xl font-black tracking-wider text-stone-950 dark:text-white">
                {brand.name}
              </span>
            </Link>

            <p className="text-sm text-stone-600 dark:text-[#71717a] leading-relaxed max-w-md font-normal">
              {brand.description[language]}
            </p>
          </div>

          {/* Column 2: Navigation Links (เมนู) */}
          <div className="md:col-span-3 lg:col-span-3 text-left">
            <h4 className="text-sm font-bold text-stone-950 dark:text-white mb-5">
              {language === "th" ? "เมนู" : "Menu"}
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  {language === "th" ? "หน้าแรก" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  {language === "th" ? "เมนูเครื่องดื่ม" : "Drink Menu"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  {language === "th" ? "เกี่ยวกับเรา" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  {language === "th" ? "ค้นหาสาขา" : "Find Branches"}
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  {language === "th" ? "แพ็กเกจแฟรนไชส์" : "Franchise"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  {language === "th" ? "ติดต่อเรา" : "Contact Us"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  {language === "th" ? "ความเป็นส่วนตัว" : "Privacy Policy"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Channels (ติดต่อ) */}
          <div className="md:col-span-3 lg:col-span-3 text-left">
            <h4 className="text-sm font-bold text-stone-950 dark:text-white mb-5">
              {language === "th" ? "ติดต่อ" : "Contact"}
            </h4>
            <ul className="space-y-4 text-sm">
              {/* Phone */}
              <li>
                <a
                  href="tel:021148678"
                  className="flex items-center gap-3 group text-stone-700 dark:text-[#a1a1aa] hover:text-stone-950 dark:hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full border border-stone-300 dark:border-white/20 bg-white dark:bg-transparent flex items-center justify-center shrink-0 group-hover:border-[#c69255] transition-colors shadow-xs">
                    <Phone className="w-4 h-4 text-stone-800 dark:text-white group-hover:text-[#c69255]" />
                  </div>
                  <span className="font-normal font-mono">02-888-9999</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:contact@superblackcoffee.com"
                  className="flex items-center gap-3 group text-stone-700 dark:text-[#a1a1aa] hover:text-stone-950 dark:hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full border border-stone-300 dark:border-white/20 bg-white dark:bg-transparent flex items-center justify-center shrink-0 group-hover:border-[#c69255] transition-colors shadow-xs">
                    <Mail className="w-4 h-4 text-stone-800 dark:text-white group-hover:text-[#c69255]" />
                  </div>
                  <span className="font-normal font-mono">contact@superblackcoffee.com</span>
                </a>
              </li>

              {/* LINE Official */}
              <li>
                <button
                  type="button"
                  onClick={() => handleSocialClick("LINE Official")}
                  className="flex items-center gap-3 group text-stone-700 dark:text-[#a1a1aa] hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full border border-stone-300 dark:border-white/20 bg-white dark:bg-transparent flex items-center justify-center shrink-0 group-hover:border-[#c69255] transition-colors shadow-xs">
                    <MessageCircle className="w-4 h-4 text-stone-800 dark:text-white group-hover:text-[#c69255]" />
                  </div>
                  <span className="font-normal font-mono">@superblackcoffee</span>
                </button>
              </li>

              {/* Facebook */}
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61573117743066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-stone-700 dark:text-[#a1a1aa] hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full border border-stone-300 dark:border-white/20 bg-white dark:bg-transparent flex items-center justify-center shrink-0 group-hover:border-[#c69255] transition-colors shadow-xs">
                    <svg className="w-4 h-4 text-stone-800 dark:text-white fill-current group-hover:text-[#c69255]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="font-normal">Super Black Coffee</span>
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Thin Divider Line */}
        <div className="border-t border-stone-200 dark:border-white/10" />

        {/* Bottom Bar: Copyright & Language Selector */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-[#71717a]">
          <div>
            <span>© 2026 SUPER BLACK COFFEE สงวนลิขสิทธิ์</span>
          </div>

          {/* Minimalist Globe Language Selector */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === "th" ? "en" : "th")}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase text-stone-600 dark:text-[#a1a1aa] hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-stone-200/60 dark:hover:bg-white/5"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </div>

      </div>

      {/* Social Media Explanatory Dialog */}
      {socialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#201b16] border border-stone-200 dark:border-[#352d26] rounded-2xl max-w-md w-full p-6 text-left shadow-2xl relative text-stone-900 dark:text-white">
            <button
              type="button"
              onClick={() => setSocialModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-[#28221c] text-stone-600 dark:text-[#9e9187] hover:text-stone-950 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#c69255]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-950 dark:text-white">
                  {activeSocial} Official Channel
                </h3>
                <span className="text-xs text-stone-500 dark:text-[#9e9187]">Demo Notification</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 dark:text-[#c5b8ae] leading-relaxed mb-6">
              ช่องทางโซเชียลมีเดียนี้จัดทำขึ้นเพื่อการสาธิตระบบ UI ของ Super Black Coffee เว็บไซต์นี้ไม่ได้เชื่อมต่อกับบัญชีโซเชียลมีเดียจริงของบริษัทภายนอก
            </p>
            <button
              type="button"
              onClick={() => setSocialModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-[#c69255] text-white hover:text-stone-950 dark:bg-[#c69255] dark:hover:bg-[#d8a162] dark:text-stone-950 font-bold text-xs transition-colors cursor-pointer"
            >
              เข้าใจแล้ว (Close)
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
