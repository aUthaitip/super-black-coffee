import { Metadata } from "next";
import { BlogPageContent } from "@/components/blog";

export const metadata: Metadata = {
  title: "บทความและข่าวสาร | Super Black Coffee",
  description:
    "อัปเดตเรื่องราว ข่าวสาร และสาระน่ารู้เกี่ยวกับกาแฟพรีเมียม นวัตกรรม และการเติบโตทางธุรกิจของ Super Black Coffee",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
