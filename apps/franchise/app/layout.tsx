import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store-context";
import { AppShell } from "@/components/layout/app-shell";
import { RouteLoadingBar } from "@/components/ui/route-loading-bar";

export const metadata: Metadata = {
  title: "Super Black Coffee - Franchise B2B Portal",
  description: "ระบบสั่งซื้อวัตถุดิบและอุปกรณ์สำหรับเจ้าของสาขาแฟรนไชส์ Super Black Coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased bg-slate-50 text-slate-900">
        <Suspense fallback={null}>
          <RouteLoadingBar />
        </Suspense>
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
