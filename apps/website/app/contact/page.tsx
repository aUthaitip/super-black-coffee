import { Metadata } from "next";
import { ContactPageContent } from "@/components/contact";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Super Black Coffee",
  description:
    "ติดต่อทีมงาน Super Black Coffee สอบถามข้อมูลแฟรนไชส์ เมล็ดกาแฟ สาขา หรือบริการจัดเลี้ยง",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
