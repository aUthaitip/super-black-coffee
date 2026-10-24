import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { AboutPageContent } from "@/components/about";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "เกี่ยวกับเรา และไร่กาแฟออร์แกนิกที่หัวพัน",
    description:
      "รู้จัก Super Black Coffee และเรื่องราวเมล็ดกาแฟออร์แกนิกจากไร่บนดอยสูงกว่า 1,200 เมตร ณ แขวงหัวพัน สปป.ลาว ตั้งแต่การปลูกจนถึงกาแฟในแก้วของคุณ",
    path: "/about",
    keywords: [
      "ไร่กาแฟลาว",
      "กาแฟหัวพัน",
      "เมล็ดกาแฟจากลาว",
      "Houaphan coffee",
    ],
  });
}

export default function AboutPage() {
  return <AboutPageContent />;
}
