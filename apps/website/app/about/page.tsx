import { Metadata } from "next";
import { AboutPageContent } from "@/components/about";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | Super Black Coffee - จากผืนดินภูเขาไฟสู่หยดกาแฟระดับมาสเตอร์",
  description:
    "เรื่องราวการเดินทางของเมล็ดกาแฟสายพันธุ์พิเศษบนยอดดอยสูงกว่า 1,200 เมตร ที่ราบสูงโบลาเวนและหัวพัน สปป.ลาว สู่กาแฟรสชาติเข้มลึกระดับมาสเตอร์ของ Super Black Coffee",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
