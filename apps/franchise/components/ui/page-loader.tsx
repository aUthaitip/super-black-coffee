"use client";

import React from "react";
import { Coffee } from "lucide-react";

interface PageLoaderProps {
  title?: string;
  subtitle?: string;
  theme?: "coffee" | "orange";
}

export function PageLoader({
  title = "SUPER BLACK COFFEE",
  subtitle = "กำลังโหลดข้อมูล...",
  theme = "coffee",
}: PageLoaderProps) {
  const isOrange = theme === "orange";

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6 space-y-4 animate-in fade-in duration-200">
      <div className="relative">
        {/* Pulsing ring */}
        <div
          className={`h-16 w-16 rounded-2xl animate-ping absolute inset-0 ${
            isOrange ? "bg-orange-500/15" : "bg-[#80503a]/15"
          }`}
        />

        {/* Center icon */}
        <div
          className={`relative h-16 w-16 rounded-2xl text-white flex items-center justify-center shadow-lg animate-pulse ${
            isOrange
              ? "bg-orange-600 shadow-orange-600/30"
              : "bg-[#80503a] shadow-[#80503a]/30"
          }`}
        >
          <Coffee className="h-8 w-8 text-amber-100" />
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <h3 className="text-base font-bold text-slate-800 tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-400 animate-pulse">
          {subtitle}
        </p>
      </div>

      {/* Modern animated progress line */}
      <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full animate-[progress_1.2s_ease-in-out_infinite] ${
            isOrange ? "bg-orange-600" : "bg-[#80503a]"
          }`}
        />
      </div>
    </div>
  );
}
