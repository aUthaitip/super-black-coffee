import { Metadata } from "next";
import { BlogPageContent } from "@/components/blog";
import { getBlogPosts } from "@/sanity/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "บทความและข่าวสาร | Super Black Coffee",
  description:
    "อัปเดตเรื่องราว ข่าวสาร และสาระน่ารู้เกี่ยวกับกาแฟพรีเมียม นวัตกรรม และการเติบโตทางธุรกิจของ Super Black Coffee",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogPageContent initialPosts={posts} />;
}
