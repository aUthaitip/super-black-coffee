"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const isAdmin = pathname?.startsWith("/admin");

  if (isStudio || isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        © 2026 Super Black Coffee Co., Ltd. ระบบสั่งของแฟรนไชส์และการจัดส่ง B2B
      </footer>
    </div>
  );
}
