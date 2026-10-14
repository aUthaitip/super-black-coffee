"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Menu, X, MapPin, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { LAYOUT_DATA } from "@/data/layout";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const { brand, navLinks, portalLink, findBranchButton } = LAYOUT_DATA;

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8">
      {/* Desktop Floating Pill Navbar Container */}
      <div className="container z-10 hidden lg:flex flex-row items-center justify-between backdrop-blur-md border max-w-full xl:max-w-7xl mx-auto xl:px-6 py-[6px] h-auto border-[#352d26]/40 bg-gradient-to-b from-[#201b16]/70 via-[#171411]/85 to-[#201b16]/70 text-white rounded-3xl shadow-xl shadow-black/50">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group pl-1">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#c69255] to-[#8f6040] flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-950/40 group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider text-white flex items-center gap-1">
              {brand.name}
            </span>
            <span className="text-[9px] text-[#bf9576] tracking-widest uppercase block -mt-1 font-mono font-semibold">
              {brand.subtitle[language]}
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs tracking-wide transition-all relative py-1 px-2 rounded-lg font-medium",
                  isActive
                    ? "text-[#c69255] font-semibold bg-[#28221c]/50"
                    : "text-[#c5b8ae] hover:text-white hover:bg-[#28221c]/30"
                )}
              >
                {link.label[language]}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#c69255] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher & CTAs */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#28221c]/80 border border-[#352d26]/60 rounded-xl p-0.5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setLanguage("th")}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all",
                language === "th"
                  ? "bg-[#c69255] text-stone-950 shadow-sm font-bold"
                  : "text-[#9e9187] hover:text-white"
              )}
            >
              TH
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all",
                language === "en"
                  ? "bg-[#c69255] text-stone-950 shadow-sm font-bold"
                  : "text-[#9e9187] hover:text-white"
              )}
            >
              EN
            </button>
          </div>

          {/* Franchise Portal Info Link */}
          <Link
            href={portalLink.href}
            className="text-xs font-medium text-[#c5b8ae] hover:text-[#c69255] transition-colors flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-[#28221c]/40"
          >
            <span>{portalLink.label[language]}</span>
            <ExternalLink className="w-3 h-3 text-[#bf9576]" />
          </Link>

          {/* Find Branch CTA Button */}
          <Link
            href={findBranchButton.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#c69255] to-[#bf9576] hover:from-[#d8a162] hover:to-[#ce9f7c] text-stone-950 font-bold text-xs shadow-md shadow-amber-950/40 transition-all hover:scale-105"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{findBranchButton.label[language]}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navbar Floating Pill */}
      <div className="lg:hidden flex items-center justify-between backdrop-blur-md border border-[#352d26]/60 bg-gradient-to-b from-[#201b16]/90 via-[#171411]/95 to-[#201b16]/90 text-white rounded-2xl px-4 py-2.5 shadow-xl shadow-black/50">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c69255] to-[#8f6040] flex items-center justify-center text-stone-950 font-bold">
            <Coffee className="w-4 h-4 text-stone-950" />
          </div>
          <div>
            <span className="text-base font-black tracking-wider text-white">
              {brand.name}
            </span>
            <span className="text-[8px] text-[#bf9576] tracking-widest uppercase block -mt-1 font-mono">
              {brand.subtitle[language]}
            </span>
          </div>
        </Link>

        {/* Mobile Right Controls: Language & Menu Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#28221c] border border-[#352d26] rounded-lg p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLanguage("th")}
              className={cn(
                "px-2 py-0.5 rounded",
                language === "th"
                  ? "bg-[#c69255] text-stone-950 font-bold"
                  : "text-[#9e9187]"
              )}
            >
              TH
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={cn(
                "px-2 py-0.5 rounded",
                language === "en"
                  ? "bg-[#c69255] text-stone-950 font-bold"
                  : "text-[#9e9187]"
              )}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#28221c] border border-[#352d26] text-white hover:text-[#c69255] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#171411]/95 backdrop-blur-xl border border-[#352d26] rounded-2xl shadow-2xl p-5 transition-all animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-[#28221c] text-[#c69255] font-semibold border border-[#352d26]"
                      : "text-[#c5b8ae] hover:bg-[#201b16] hover:text-white"
                  )}
                >
                  <span>{link.label[language]}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#c69255]" />}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-[#352d26] flex flex-col gap-2.5">
              <Link
                href={findBranchButton.href}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#c69255] to-[#bf9576] text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/40"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{findBranchButton.label[language]}</span>
              </Link>
              <Link
                href={portalLink.href}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#201b16] border border-[#352d26] text-xs text-[#c5b8ae] hover:text-white"
              >
                <span>{portalLink.label[language]}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
