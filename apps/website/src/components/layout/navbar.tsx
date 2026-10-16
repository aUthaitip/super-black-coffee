"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { LAYOUT_DATA } from "@/data/layout";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Track scroll position to enhance navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { brand, navLinks, portalLink } = LAYOUT_DATA;

  return (
    <header
      className="sticky top-0 z-40 w-full transition-all duration-300 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="flex h-16 w-full flex-row items-center justify-between container mx-auto">
          <div>
            <span className="text-lg font-semibold tracking-wider text-white flex items-center gap-1">
              {brand.name}
            </span>
          </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const hasChildren = "children" in link && Boolean(link.children?.length);
            const isActive =
              pathname === link.href ||
              (hasChildren && link.children?.some((child) => pathname === child.href));

            if (hasChildren && link.children) {
              return (
                <div key={link.href} className="relative group py-2">
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm tracking-wide transition-all relative py-1 px-2 rounded-lg font-medium text-white flex items-center gap-1.5",
                      isActive
                        ? "text-[#c69255] font-semibold"
                        : "group-hover:text-[#c69255]"
                    )}
                  >
                    <span>{link.label[language]}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-80" />
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#c69255] rounded-full" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50 min-w-[220px]">
                    <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col gap-1 ring-1 ring-black/5">
                      {link.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl transition-all duration-150 flex items-center justify-between",
                              isChildActive
                                ? "bg-[#c69255] text-white font-semibold"
                                : "text-black hover:bg-[#c69255] hover:text-white"
                            )}
                          >
                            <span>{child.label[language]}</span>
                            {isChildActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-all relative py-1 px-2 rounded-lg font-medium text-white",
                  isActive
                    ? "text-[#c69255] font-semibold"
                    : "hover:text-[#c69255]"
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

        {/* Right Actions: Language Switcher & Portal Link */}
        <div className="flex items-center gap-3">
          {/* Minimalist Globe Language Switcher matching reference screenshot */}
          <button
            type="button"
            onClick={() => setLanguage(language === "th" ? "en" : "th")}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase text-white hover:text-[#c69255] transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-white/5 active:scale-95"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4 text-white" />
            <span className="font-semibold tracking-wide text-white">{language.toUpperCase()}</span>
            <ChevronDown className="w-3.5 h-3.5 text-white opacity-80" />
          </button>

          {/* Franchise Portal Info Link */}
          <Link
            href={portalLink.href}
            className="hidden sm:flex text-sm font-medium text-white hover:text-[#a26a2a] transition-colors items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-[#28221c]/40"
          >
            <span>{portalLink.label[language]}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#28221c] border border-[#352d26] text-white hover:text-[#c69255] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto mt-2 bg-[#171411]/95 backdrop-blur-xl border border-[#352d26] rounded-2xl shadow-2xl p-5 transition-all animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const hasChildren = "children" in link && Boolean(link.children?.length);
              const isActive =
                pathname === link.href ||
                (hasChildren && link.children?.some((child) => pathname === child.href));

              if (hasChildren && link.children) {
                return (
                  <div key={link.href} className="flex flex-col gap-1">
                    <div className="text-xs uppercase font-semibold text-stone-400 tracking-wider px-3 pt-2">
                      {link.label[language]}
                    </div>
                    <div className="pl-2 flex flex-col gap-1">
                      {link.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "text-sm font-medium py-2 px-3 rounded-xl transition-colors flex items-center justify-between",
                              isChildActive
                                ? "bg-[#28221c] text-[#c69255] font-semibold border border-[#352d26]"
                                : "text-[#c5b8ae] hover:bg-[#201b16] hover:text-white"
                            )}
                          >
                            <span>{child.label[language]}</span>
                            {isChildActive && <span className="w-1.5 h-1.5 rounded-full bg-[#c69255]" />}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between",
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
                href={portalLink.href}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#201b16] border border-[#352d26] text-sm text-[#c5b8ae] hover:text-white"
              >
                <span>{portalLink.label[language]}</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
