import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_DATA } from "@/data/blog";
import { BlogDetailContent } from "@/components/blog";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_DATA.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_DATA.posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "บทความไม่พบ | Super Black Coffee",
    };
  }

  return {
    title: `${post.title.th} | Super Black Coffee`,
    description: post.excerpt.th,
    openGraph: {
      title: post.title.th,
      description: post.excerpt.th,
      images: [post.coverImage],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_DATA.posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailContent post={post} />;
}
