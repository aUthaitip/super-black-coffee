"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, Mail, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

export function FloatingContactWidget() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Social & contact action handlers
  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/profile.php?id=61573117743066", "_blank", "noopener,noreferrer");
  };

  const handleLineClick = () => {
    // สามารถใส่ Line Official Account ID หรือลิงก์ line.me ได้
    window.open("https://line.me/ti/p/~@superblackcoffee", "_blank", "noopener,noreferrer");
  };

  const handleEmailClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
    setIsOpen(false);
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:028889999";
  };

  return (
    <div className="fixed bottom-7 right-6 z-50 flex flex-col items-end select-none font-sans">
      {/* Expanded Menu Items */}
      <div
        className={cn(
          "flex flex-col items-end gap-3 mb-3 transition-all duration-300 transform",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none scale-95"
        )}
      >
        {/* 1. Facebook */}
        <div
          onClick={handleFacebookClick}
          className="group flex items-center gap-3 cursor-pointer"
        >
          {/* Label Tooltip Bubble */}
          <div className="relative bg-white/95 dark:bg-[#1c1712]/95 text-stone-800 dark:text-stone-200 px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-stone-200/90 dark:border-[#3d332a] text-xs sm:text-sm font-medium transition-all group-hover:shadow-md group-hover:scale-105 group-hover:border-[#1877f2] group-hover:text-[#1877f2]">
            {language === "th" ? "พูดคุยผ่าน Facebook" : "Chat on Facebook"}
            {/* Arrow Pointer */}
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white/95 dark:bg-[#1c1712]/95 border-t border-r border-stone-200/90 dark:border-[#3d332a] rotate-45 transform" />
          </div>
          {/* Circular Button */}
          <div className="w-12 h-12 rounded-full bg-[#1877f2] hover:bg-[#1464cc] text-white flex items-center justify-center shadow-lg shadow-[#1877f2]/25 transition-transform group-hover:scale-110 active:scale-95">
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.909 1.455 5.503 3.735 7.159V22l3.418-1.875c.91.252 1.873.389 2.847.389 5.523 0 10-4.145 10-9.256C22 6.145 17.523 2 12 2zm1.002 12.441l-2.559-2.73-4.997 2.73 5.496-5.834 2.621 2.73 4.935-2.73-5.496 5.834z" />
            </svg>
          </div>
        </div>

        {/* 2. Line */}
        <div
          onClick={handleLineClick}
          className="group flex items-center gap-3 cursor-pointer"
        >
          {/* Label Tooltip Bubble */}
          <div className="relative bg-white/95 dark:bg-[#1c1712]/95 text-stone-800 dark:text-stone-200 px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-stone-200/90 dark:border-[#3d332a] text-xs sm:text-sm font-medium transition-all group-hover:shadow-md group-hover:scale-105 group-hover:border-[#06c755] group-hover:text-[#06c755]">
            {language === "th" ? "พูดคุยผ่าน Line" : "Chat on LINE"}
            {/* Arrow Pointer */}
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white/95 dark:bg-[#1c1712]/95 border-t border-r border-stone-200/90 dark:border-[#3d332a] rotate-45 transform" />
          </div>
          {/* Circular Button */}
          <div className="w-12 h-12 rounded-full bg-[#06c755] hover:bg-[#05b34c] text-white flex items-center justify-center shadow-lg shadow-[#06c755]/25 transition-transform group-hover:scale-110 active:scale-95">
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.607.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.026c-.052.312-.246 1.222 1.07.666 1.316-.556 7.107-4.185 9.7-7.167 1.55-1.742 2.286-3.485 2.286-5.809zm-15.021 2.37h-1.929c-.276 0-.5-.224-.5-.5v-4.571c0-.276.224-.5.5-.5s.5.224.5.5v4.071h1.429c.276 0 .5.224.5.5s-.224.5-.5.5zm2.857-.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-4.571c0-.276.224-.5.5-.5s.5.224.5.5v4.571zm5.143 0c0 .235-.164.434-.393.485l-2.429.539c-.035.008-.071.012-.107.012-.276 0-.5-.224-.5-.5v-4.571c0-.276.224-.5.5-.5.235 0 .434.164.485.393l1.857 3.343v-3.236c0-.276.224-.5.5-.5s.5.224.5.5v4.571zm3.857-3.143h-1.929v.929h1.929c.276 0 .5.224.5.5s-.224.5-.5.5h-1.929v1.214h1.929c.276 0 .5.224.5.5s-.224.5-.5.5h-2.429c-.276 0-.5-.224-.5-.5v-4.571c0-.276.224-.5.5-.5h2.429c.276 0 .5.224.5.5s-.224.5-.5.5z" />
            </svg>
          </div>
        </div>

        {/* 3. Leave Inquiry / Contact Form (Super Black Gold Accent) */}
        <div
          onClick={handleEmailClick}
          className="group flex items-center gap-3 cursor-pointer"
        >
          {/* Label Tooltip Bubble */}
          <div className="relative bg-white/95 dark:bg-[#1c1712]/95 text-stone-800 dark:text-stone-200 px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-stone-200/90 dark:border-[#3d332a] text-xs sm:text-sm font-medium transition-all group-hover:shadow-md group-hover:scale-105 group-hover:border-[#c69255] group-hover:text-[#b47836] dark:group-hover:text-[#c69255]">
            {language === "th" ? "ฝากข้อมูลเพิ่มเติม" : "Leave an Inquiry"}
            {/* Arrow Pointer */}
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white/95 dark:bg-[#1c1712]/95 border-t border-r border-stone-200/90 dark:border-[#3d332a] rotate-45 transform" />
          </div>
          {/* Circular Button */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c69255] to-[#9a6a34] hover:from-[#d8a162] hover:to-[#a7743b] text-white flex items-center justify-center shadow-lg shadow-[#c69255]/30 transition-transform group-hover:scale-110 active:scale-95">
            <Mail className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* 4. Phone Call (Super Black Brand Accent) */}
        <div
          onClick={handlePhoneClick}
          className="group flex items-center gap-3 cursor-pointer"
        >
          {/* Label Tooltip Bubble */}
          <div className="relative bg-white/95 dark:bg-[#1c1712]/95 text-stone-800 dark:text-stone-200 px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-stone-200/90 dark:border-[#3d332a] text-xs sm:text-sm font-medium transition-all group-hover:shadow-md group-hover:scale-105 group-hover:border-[#c69255] group-hover:text-[#b47836] dark:group-hover:text-[#c69255]">
            {language === "th" ? "โทรหาเรา" : "Call Us Directly"}
            {/* Arrow Pointer */}
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white/95 dark:bg-[#1c1712]/95 border-t border-r border-stone-200/90 dark:border-[#3d332a] rotate-45 transform" />
          </div>
          {/* Circular Button */}
          <div className="w-12 h-12 rounded-full bg-stone-900 dark:bg-[#26201a] hover:bg-stone-800 dark:hover:bg-[#332b23] border border-[#c69255]/40 text-[#c69255] flex items-center justify-center shadow-lg shadow-black/30 transition-transform group-hover:scale-110 active:scale-95">
            <Phone className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>
      </div>

      {/* Main Trigger Floating Button */}
      <div className="flex items-center gap-3">
        {/* Speech Bubble (shows when closed) */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer relative bg-white/95 dark:bg-[#1a1511]/95 text-[#a86e2e] dark:text-[#c69255] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-[0_4px_25px_rgba(198,146,85,0.22)] border border-[#c69255]/40 dark:border-[#c69255]/30 animate-bounce duration-1000 transition-all hover:scale-105 hover:bg-amber-50/50 dark:hover:bg-[#251e18]"
          >
            {language === "th" ? "ติดต่อเราได้ที่นี่เลยค่ะ" : "Need help? Contact us here"}
            {/* Speech bubble pointer arrow */}
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white/95 dark:bg-[#1a1511]/95 border-t border-r border-[#c69255]/40 dark:border-[#c69255]/30 rotate-45 transform" />
          </div>
        )}

        {/* Main Circular Button with Super Black Luxury Gold & Dark Style */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? (language === "th" ? "ปิดเมนูติดต่อ" : "Close contact menu") : (language === "th" ? "ติดต่อเรา" : "Contact us")}
          className={cn(
            "relative w-13 h-13 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border",
            isOpen
              ? "bg-stone-900 dark:bg-stone-800 border-white/20 text-white shadow-stone-900/40 rotate-90"
              : "bg-gradient-to-tr from-[#a86e2e] via-[#c69255] to-[#dfaf76] hover:from-[#b97d39] hover:to-[#ebc18d] text-white border-[#dfaf76]/60 shadow-[0_8px_25px_rgba(198,146,85,0.4)]"
          )}
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <MessageSquare className="w-6 h-6 stroke-[2.2] fill-stone-950/20" />
          )}
        </button>
      </div>
    </div>
  );
}

