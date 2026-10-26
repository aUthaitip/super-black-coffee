import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { HomePageContent } from "@/components/home/home-page-content";
import { getPromotions, getBlogPosts } from "@/sanity/queries";

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "เปิดร้านกาแฟของคุณ กับแฟรนไชส์ Super Black Coffee",
    description:
      "วางแผนเปิดร้านกาแฟกับ Super Black Coffee ดูรูปแบบร้าน แพ็กเกจลงทุน และขั้นตอนการร่วมแฟรนไชส์ พร้อมปรึกษาทีมงานก่อนตัดสินใจ",
    path: "/",
    keywords: [
      "กาแฟลาว",
      "กาแฟหัวพัน",
      "เมล็ดกาแฟออร์แกนิก",
      "แฟรนไชส์กาแฟ",
      "Laos coffee",
    ],
  });
}
export default async function Home() {
  const promotions = await getPromotions();
  const blogPosts = await getBlogPosts();
  return (
    <HomePageContent initialPromotions={promotions} initialPosts={blogPosts} />
  );
}
