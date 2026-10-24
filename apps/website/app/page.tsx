import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { HomePageContent } from "@/components/home/home-page-content";
import { getPromotions, getBlogPosts } from "@/sanity/queries";

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "กาแฟออร์แกนิกจากลาว และแฟรนไชส์ร้านกาแฟ",
    description:
      "กาแฟออร์แกนิกจากไร่บนดอยสูง ณ แขวงหัวพัน สปป.ลาว สู่แก้วของคุณ สำรวจเมนูเครื่องดื่ม ค้นหาสาขา และร่วมธุรกิจแฟรนไชส์ Super Black Coffee",
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
