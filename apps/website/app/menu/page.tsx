import { Metadata } from "next";
import { MenuPageContent } from "@/components/menu";

export const metadata: Metadata = {
  title: "เมนูเครื่องดื่มและเบเกอรี่ | Super Black Coffee",
  description:
    "ค้นพบเมนูกาแฟพรีเมียม ชา ช็อกโกแลต เครื่องดื่มปั่น และโซดา จากวัตถุดิบคัดสรรพิเศษของ Super Black Coffee",
};

export default function MenuPage() {
  return <MenuPageContent />;
}
