import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { BlogPageContent } from "@/components/blog";
import { getBlogPosts } from "@/sanity/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "บทความและข่าวสารเรื่องกาแฟ",
    description:
      "ติดตามบทความ ข่าวสาร และเรื่องราวกาแฟออร์แกนิกจาก Super Black Coffee ตั้งแต่แหล่งปลูกเมล็ดกาแฟไปจนถึงเครื่องดื่มและธุรกิจร้านกาแฟ",
    path: "/blog",
    keywords: ["บทความกาแฟ", "ข่าวสารกาแฟ", "ความรู้เรื่องกาแฟ", "coffee blog"],
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogPageContent initialPosts={posts} />;
}
