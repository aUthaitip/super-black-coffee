import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store-context";
import { Navbar } from "@/components/layout/navbar";

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
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <StoreProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
            © 2026 Super Black Coffee Co., Ltd. ระบบสั่งของแฟรนไชส์และการจัดส่ง B2B
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
