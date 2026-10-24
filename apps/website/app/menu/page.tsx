import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { MenuPageContent } from "@/components/menu";
import { getMenuItems } from "@/sanity/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "เมนูกาแฟ เครื่องดื่ม และเบเกอรี่",
    description:
      "เลือกเมนูกาแฟออร์แกนิก กาแฟดำ ชา ช็อกโกแลต เครื่องดื่ม และเบเกอรี่ของ Super Black Coffee พร้อมรายละเอียดเมนูและราคา",
    path: "/menu",
    keywords: [
      "เมนูกาแฟ",
      "กาแฟดำ",
      "อเมริกาโน่",
      "เมนูเครื่องดื่ม",
      "coffee menu",
    ],
  });
}

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuPageContent initialItems={items} />;
}
