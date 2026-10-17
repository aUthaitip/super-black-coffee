import { Metadata } from "next";
import { FranchisePageContent } from "@/components/franchise";

export const metadata: Metadata = {
  title: "สนใจร่วมธุรกิจแฟรนไชส์ | Super Black Coffee & Lifestyle Hub",
  description:
    "โอกาสร่วมลงทุนธุรกิจกาแฟพรีเมียมและ Lifestyle Hub สร้างรายได้หลายทาง ทั้งคาเฟ่ สถานีชาร์จ Ultra Fast EV และจุดบริการไปรษณีย์ BPOST65 คืนทุนไว กำไรขั้นต้น 60-65%",
};

export default function FranchisePage() {
  return <FranchisePageContent />;
}
