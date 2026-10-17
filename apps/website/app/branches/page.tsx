import { Metadata } from "next";
import { BranchesPageContent } from "@/components/branches";

export const metadata: Metadata = {
  title: "สาขาที่เปิดให้บริการ | Super Black Coffee",
  description:
    "ค้นหาสาขา Super Black Coffee ใกล้บ้านคุณ ทั้งสาขาอยุธยา พิษณุโลก ประชาอุทิศ รัชดาภิเษก สยามสแควร์ วิภาวดีรังสิต เชียงใหม่ ขอนแก่น และภูเก็ต พร้อมบริการ Drive-Thru 24 ชม. และจุดชาร์จ EV",
};

export default function BranchesPage() {
  return <BranchesPageContent />;
}
