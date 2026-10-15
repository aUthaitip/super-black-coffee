import type { Metadata } from "next";
import { Prompt, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/language-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const promptFont = Prompt({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Super Black Coffee | กาแฟดีในทุกจังหวะของคุณ (Great Coffee, Every Moment)",
  description: "เว็บไซต์ทางการของ Super Black Coffee แบรนด์กาแฟพรีเมียม สเปเชียลตี้ดาร์กโรสต์ และระบบแฟรนไชส์คุณภาพ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark scroll-smooth">
      <body className={`${promptFont.variable} ${geistSans.variable} ${geistMono.variable} bg-black text-[#fbfaf8] antialiased min-h-screen flex flex-col font-prompt`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
