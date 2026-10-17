import { Metadata } from "next";
import { MenuPageContent } from "@/components/menu";
import { getMenuItems } from "@/sanity/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "เมนูเครื่องดื่มและเบเกอรี่ | Super Black Coffee",
  description:
    "ค้นพบเมนูกาแฟพรีเมียม ชา ช็อกโกแลต เครื่องดื่มปั่น และโซดา จากวัตถุดิบคัดสรรพิเศษของ Super Black Coffee",
};

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuPageContent initialItems={items} />;
}
