import React from "react";
import { Coffee } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative">
        {/* Pulsing ring */}
        <div className="h-16 w-16 rounded-2xl bg-[#80503a]/15 animate-ping absolute inset-0" />
        
        {/* Center coffee brand logo */}
        <div className="relative h-16 w-16 rounded-2xl bg-[#80503a] text-white flex items-center justify-center shadow-lg shadow-[#80503a]/30 animate-pulse">
          <Coffee className="h-8 w-8 text-amber-100" />
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <h3 className="text-base font-bold text-slate-800 tracking-tight">
          SUPER BLACK COFFEE
        </h3>
        <p className="text-xs text-slate-400 animate-pulse">
          กำลังโหลดข้อมูลระบบแฟรนไชส์ B2B...
        </p>
      </div>

      {/* Modern animated progress line */}
      <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#80503a] rounded-full animate-[progress_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
