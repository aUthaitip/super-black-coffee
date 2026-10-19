"use client";

import React, { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When route changes, briefly trigger smooth progress bar
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent overflow-hidden pointer-events-none">
      <div
        className={`h-full w-full origin-left animate-[progress_0.8s_ease-in-out_infinite] ${
          isAdmin ? "bg-orange-500 shadow-sm shadow-orange-500/50" : "bg-[#80503a] shadow-sm shadow-[#80503a]/50"
        }`}
      />
    </div>
  );
}
