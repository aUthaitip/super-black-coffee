import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { FranchisePageContent } from "@/components/franchise";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "แฟรนไชส์ร้านกาแฟ และ Lifestyle Hub",
    description:
      "ร่วมธุรกิจแฟรนไชส์ Super Black Coffee สำรวจโมเดล Smart Café, Lifestyle Café และ Lifestyle Hub ขนาด S M L พร้อมข้อมูลพื้นที่และเครื่องมือประเมินงบลงทุน",
    path: "/franchise",
    keywords: [
      "แฟรนไชส์กาแฟ",
      "แฟรนไชส์ร้านกาแฟ",
      "ลงทุนร้านกาแฟ",
      "Smart Café",
      "Lifestyle Café",
      "Lifestyle Hub",
      "coffee franchise",
    ],
  });
}

export default function FranchisePage() {
  return <FranchisePageContent />;
}
