import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/i18n/language-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-[#fbfaf8] antialiased min-h-screen flex flex-col`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
