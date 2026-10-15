"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, MessageCircle, AlertCircle, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { LAYOUT_DATA } from "@/data/layout";

export function Footer() {
  const { language } = useLanguage();
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [activeSocial, setActiveSocial] = useState<string>("");

  const { brand, navLinks, footer } = LAYOUT_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSocialClick = (platform: string) => {
    setActiveSocial(platform);
    setSocialModalOpen(true);
  };

  return (
    <footer className="bg-black border-t border-[#352d26] text-[#c5b8ae] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#28221c]">
          {/* Column 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-[#201b16] border border-[#352d26] flex items-center justify-center p-0.5">
                <Image
                  src="/logo/superblackcoffee-logo.webp"
                  alt="Super Black Coffee Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-wider text-white">
                  {brand.name}
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#9e9187] leading-relaxed max-w-sm">
              {brand.description[language]}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono font-semibold text-[#c69255] uppercase tracking-wider block mb-1">
                {brand.tagline[language]}
              </span>
              <span className="text-[11px] font-mono text-[#9e9187] block">
                {brand.engTagline}
              </span>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
              {footer.quickLinksTitle[language]}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#c69255] transition-colors">
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Business Inquiries */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
              {footer.supportTitle[language]}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9e9187]">
              <li>
                <span className="block text-white font-bold">Headquarters Contact</span>
                <span className="text-[11px] font-mono">{footer.contactEmail}</span>
              </li>
              <li>
                <span className="block text-white font-bold">Franchise Desk</span>
                <span className="text-[11px] font-mono">{footer.franchiseEmail}</span>
              </li>
              <li className="pt-2">
                <span className="block text-white font-bold">{footer.hoursTitle[language]}</span>
                <span className="text-[11px]">{footer.hoursDetail[language]}</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Social Channels & Back to Top */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
              {footer.followUsTitle[language]}
            </h4>
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => handleSocialClick("Facebook")}
                className="w-9 h-9 rounded-lg bg-[#201b16] border border-[#352d26] flex items-center justify-center text-[#c5b8ae] hover:text-[#c69255] hover:border-[#c69255]/50 transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs font-mono">FB</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialClick("Instagram")}
                className="w-9 h-9 rounded-lg bg-[#201b16] border border-[#352d26] flex items-center justify-center text-[#c5b8ae] hover:text-[#c69255] hover:border-[#c69255]/50 transition-colors"
                aria-label="Instagram"
              >
                <span className="font-bold text-xs font-mono">IG</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialClick("LINE Official")}
                className="w-9 h-9 rounded-lg bg-[#201b16] border border-[#352d26] flex items-center justify-center text-[#c5b8ae] hover:text-[#c69255] hover:border-[#c69255]/50 transition-colors"
                aria-label="LINE Official"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#201b16] border border-[#352d26] text-xs font-bold text-[#c5b8ae] hover:text-white hover:border-[#c69255] transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#c69255]" />
              <span>{footer.backToTop[language]}</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9e9187]">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 SUPER BLACK COFFEE CO., LTD. {footer.rights[language]}</span>
            <span className="hidden sm:inline text-[#352d26]">•</span>
            <span className="text-[#bf9576] font-mono text-[11px]">{footer.demoNotice[language]}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {footer.privacy[language]}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {footer.terms[language]}
            </Link>
          </div>
        </div>
      </div>

      {/* Social Media Explanatory Dialog */}
      {socialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#201b16] border border-[#352d26] rounded-2xl max-w-md w-full p-6 text-left shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSocialModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#28221c] text-[#9e9187] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#c69255]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {activeSocial} Official Channel
                </h3>
                <span className="text-xs text-[#9e9187]">Demo Notification</span>
              </div>
            </div>
            <p className="text-xs text-[#c5b8ae] leading-relaxed mb-6">
              ช่องทางโซเชียลมีเดียนี้จัดทำขึ้นเพื่อการสาธิตระบบ UI ของ Super Black Coffee เว็บไซต์นี้ไม่ได้เชื่อมต่อกับบัญชีโซเชียลมีเดียจริงของบริษัทภายนอก
            </p>
            <button
              type="button"
              onClick={() => setSocialModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#c69255] hover:bg-[#d8a162] text-stone-950 font-bold text-xs transition-colors"
            >
              เข้าใจแล้ว (Close)
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
