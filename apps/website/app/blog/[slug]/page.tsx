import type { Metadata } from "next";
import { cache } from "react";
import { createPageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { BLOG_DATA, BlogPost } from "@/data/blog";
import { BlogDetailContent } from "@/components/blog";
import { getBlogPostBySlug, getBlogPosts } from "@/sanity/queries";

export const revalidate = 60;

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const sanityPosts = await getBlogPosts();
  const sanitySlugs = sanityPosts.map((p: any) => ({ slug: p.slug }));
  const localSlugs = BLOG_DATA.posts.map((post) => ({ slug: post.slug }));

  // Combine unique slugs
  const allSlugs = [...sanitySlugs];
  for (const item of localSlugs) {
    if (!allSlugs.some((s) => s.slug === item.slug)) {
      allSlugs.push(item);
    }
  }
  return allSlugs;
}

const resolvePost = cache(async (slug: string): Promise<BlogPost | null> => {
  // 1. Try to find in Sanity CMS
  try {
    const sPost = await getBlogPostBySlug(slug);
    if (sPost) {
      const titleTh = sPost.titleTh || sPost.title || "";
      const titleEn = sPost.titleEn || titleTh;
      const excerptTh = sPost.excerptTh || sPost.excerpt || "";
      const excerptEn = sPost.excerptEn || excerptTh;
      const categoryName = sPost.category || "บทความทั่วไป";

      return {
        id: sPost._id,
        slug: sPost.slug,
        title: { th: titleTh, en: titleEn },
        excerpt: { th: excerptTh, en: excerptEn },
        coverImage: sPost.coverImage || "/hero/branches-welcome.webp",
        category: { th: categoryName, en: categoryName },
        publishedAt: {
          th: sPost.publishedAt
            ? new Date(sPost.publishedAt).toLocaleDateString("th-TH")
            : "เร็วๆ นี้",
          en: sPost.publishedAt
            ? new Date(sPost.publishedAt).toLocaleDateString("en-US")
            : "Recent",
        },
        views: 0,
        rawContentTh: sPost.contentTh,
        rawContentEn: sPost.contentEn,
      };
    }
  } catch (err) {
    console.error("Error resolving Sanity blog post:", err);
  }

  // 2. Fallback to local mock data
  const localPost = BLOG_DATA.posts.find((p) => p.slug === slug);
  return localPost || null;
});

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) {
    notFound();
  }

  return createPageMetadata({
    title: post.title.th,
    description:
      post.excerpt.th || `อ่านเรื่อง ${post.title.th} จาก Super Black Coffee`,
    path: `/blog/${encodeURIComponent(slug)}`,
    keywords: [post.category.th, post.category.en, "บทความกาแฟ"].filter(
      Boolean,
    ),
    image: post.coverImage,
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailContent post={post} />;
}
