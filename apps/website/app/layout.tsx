import type { Metadata } from "next";
import { Prompt, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/language-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { FloatingContactWidget } from "@/components/ui/floating-contact-widget";

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
  title: "Super Black Coffee | กาแฟออร์แกนิกจากไร่ปลูกเอง พร้อมโมเดลธุรกิจแฟรนไชส์คุณภาพ",
  description: "สัมผัสรสชาติกาแฟออร์แกนิกแท้ ส่งตรงจากไร่ของเรา ณ แขวงหัวพัน สปป.ลาว พร้อมร่วมเติบโตกับธุรกิจแฟรนไชส์ Super Black Coffee และ Lifestyle Hub ครบวงจร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('superblack-theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${promptFont.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-prompt selection:bg-[#c69255] selection:text-white`}>
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScrollProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
              <FloatingContactWidget />
            </SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
