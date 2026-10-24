import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { BranchesPageContent } from "@/components/branches";
import { getBranches } from "@/sanity/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "ค้นหาสาขาและจุดบริการ EV Station",
    description:
      "ค้นหาสาขา Super Black Coffee พร้อมที่ตั้ง เวลาเปิดให้บริการ และข้อมูลติดต่อ วางแผนแวะดื่มกาแฟและตรวจสอบจุดบริการสถานีชาร์จรถยนต์ไฟฟ้า",
    path: "/branches",
    keywords: [
      "สาขา Super Black Coffee",
      "ร้านกาแฟใกล้ฉัน",
      "สถานีชาร์จรถไฟฟ้า",
      "iGreen+",
      "EV Station",
    ],
  });
}

export default async function BranchesPage() {
  const branches = await getBranches();
  return <BranchesPageContent initialBranches={branches} />;
}
