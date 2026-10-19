"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { useTheme } from "@/providers/theme-provider";
import { LAYOUT_DATA } from "@/data/layout";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 px-3 sm:px-6 lg:px-8",
        isScrolled
          ? "bg-[#faf8f5]/90 dark:bg-[#0d0b09]/85 backdrop-blur-md border-b border-stone-200/80 dark:border-white/5 shadow-sm dark:shadow-lg dark:shadow-black/20"
          : "bg-[#faf8f5]/70 dark:bg-[#0d0b09]/60 backdrop-blur-sm border-b border-stone-200/40 dark:border-white/[0.03]"
      )}
    >
      <div className="flex h-14 sm:h-16 w-full flex-row items-center justify-between container mx-auto">
        <Link href="/" className="group flex items-center min-w-0">
          <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-stone-950 dark:text-white transition-colors group-hover:text-[#c69255] truncate">
            {brand.name}
          </span>
        </Link>

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
                      "text-sm tracking-wide transition-all relative py-1 px-2 rounded-lg font-medium flex items-center gap-1.5",
                      isActive
                        ? "text-[#c69255] font-semibold"
                        : "text-stone-700 dark:text-stone-200 group-hover:text-[#c69255]"
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
                    <div className="bg-white dark:bg-[#171411] border border-stone-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 ring-1 ring-black/5">
                      {link.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl transition-all duration-150 flex items-center justify-between",
                              isChildActive
                                ? "bg-[#c69255] text-stone-950 font-semibold shadow-sm"
                                : "text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/5 hover:text-[#c69255]"
                            )}
                          >
                            <span>{child.label[language]}</span>
                            {isChildActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />
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
                  "text-sm tracking-wide transition-all relative py-1 px-2 rounded-lg font-medium",
                  isActive
                    ? "text-[#c69255] font-semibold"
                    : "text-stone-700 dark:text-stone-200 hover:text-[#c69255]"
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

        {/* Right Actions: Theme Toggle, Language Switcher & Portal Link */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-xl border border-stone-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-stone-700 dark:text-stone-200 hover:text-[#c69255] hover:border-[#c69255] transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Toggle dark/light theme"
            title={theme === "light" ? "สลับเป็นโหมดมืด (Dark Mode)" : "สลับเป็นโหมดสว่าง (Light Mode)"}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-stone-700 hover:text-[#c69255] transition-colors" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-colors" />
            )}
          </button>

          {/* Minimalist Globe Language Switcher */}
          <button
            type="button"
            onClick={() => setLanguage(language === "th" ? "en" : "th")}
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono uppercase text-stone-700 dark:text-stone-200 hover:text-[#c69255] transition-colors cursor-pointer px-2 sm:px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-white/10 bg-white/60 dark:bg-white/5 active:scale-95"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide">{language.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3 opacity-70 hidden sm:inline" />
          </button>

          {/* Franchise Portal Info Link */}
          <Link
            href={portalLink.href}
            className="hidden sm:flex text-sm font-semibold text-stone-800 dark:text-white hover:text-[#c69255] dark:hover:text-[#c69255] transition-colors items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-stone-200/50 dark:hover:bg-white/5"
          >
            <span>{portalLink.label[language]}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#28221c] border border-stone-200 dark:border-[#352d26] text-stone-800 dark:text-white hover:text-[#c69255] transition-colors shadow-sm active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Drawer: Opens from Right Side (ครึ่งจอ/Half screen) mounted directly to body */}
      {mobileMenuOpen && mounted && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[99999] lg:hidden">
          {/* Backdrop on Left side to dismiss */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
          />

          {/* Right-Side Drawer Container (Solid Pure White Background) */}
          <div className="fixed inset-y-0 right-0 w-[72%] sm:w-[50%] max-w-sm bg-white shadow-2xl flex flex-col justify-between p-5 sm:p-6 transition-transform duration-300 ease-out animate-in slide-in-from-right text-stone-900 border-l border-stone-200">
            
            {/* Drawer Header: Brand Mini & Close Button */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <span className="text-xs sm:text-sm font-bold text-stone-900 tracking-wider truncate">
                  {brand.name}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links inside Drawer */}
              <nav className="flex flex-col gap-1.5 pt-4">
                {navLinks.map((link) => {
                  const hasChildren = "children" in link && Boolean(link.children?.length);
                  const isActive =
                    pathname === link.href ||
                    (hasChildren && link.children?.some((child) => pathname === child.href));

                  if (hasChildren && link.children) {
                    return (
                      <div key={link.href} className="flex flex-col gap-1 py-1">
                        <div className="text-[11px] uppercase font-semibold text-stone-400 tracking-wider px-3 pt-1">
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
                                  "text-xs sm:text-sm font-medium py-2 px-3 rounded-xl transition-colors flex items-center justify-between",
                                  isChildActive
                                    ? "bg-[#c69255] text-stone-950 font-bold shadow-xs"
                                    : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                                )}
                              >
                                <span>{child.label[language]}</span>
                                {isChildActive && <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
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
                        "text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between",
                        isActive
                          ? "bg-[#c69255] text-stone-950 font-bold shadow-xs"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                      )}
                    >
                      <span>{link.label[language]}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Portal & Info */}
            <div className="pt-4 border-t border-stone-200 flex flex-col gap-2">
              <Link
                href={portalLink.href}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-900 hover:bg-[#c69255] text-white hover:text-stone-950 font-bold text-xs transition-colors shadow-sm"
              >
                <span>{portalLink.label[language]}</span>
              </Link>
              <div className="text-[10px] text-center text-stone-400 font-mono pt-1">
                SUPER BLACK COFFEE
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
