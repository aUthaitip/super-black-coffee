import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { ContactPageContent } from "@/components/contact";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "ติดต่อเรา และสอบถามแฟรนไชส์",
    description:
      "ติดต่อ Super Black Coffee เพื่อสอบถามสินค้า สาขา และธุรกิจแฟรนไชส์ โทร 062 562 9431 เวลา 09:00–18:00 น. หรือส่งข้อความผ่านแบบฟอร์มติดต่อ",
    path: "/contact",
    keywords: [
      "ติดต่อ Super Black Coffee",
      "สอบถามแฟรนไชส์กาแฟ",
      "เบอร์โทร Super Black Coffee",
    ],
  });
}

export default function ContactPage() {
  return <ContactPageContent />;
}
