"use client";

import { SeasonalPopupDialog } from "@/components/ui/seasonal-popup-dialog";

import FeaturedBlog from "./featured-blog";
import { StoreSystemSection } from "./store-system-section";
import { BlogPost } from "@/data/blog";
import {
  GardenCoffeeIntroVideo,
  HeroSection,
  SignatureStorySection,
  HighlightsSection,
  FinalCtaSection,
  FaqSection,
  ContactFormSection,
} from "./index";

interface SanityPromotion {
  _id: string;
  titleTh?: string;
  titleEn?: string;
  bannerImage: string;
  isPopup?: boolean;
  linkUrl?: string;
}

interface HomePageContentProps {
  initialPromotions?: SanityPromotion[];
  initialPosts?: any[]; // Sanity blog posts
}

export function HomePageContent({ initialPromotions = [], initialPosts = [] }: HomePageContentProps) {
  // Map Sanity posts to BlogPost shape
  const posts: BlogPost[] = initialPosts.map((p) => {
    const titleTh = p.titleTh || p.title || "";
    const titleEn = p.titleEn || titleTh;
    const excerptTh = p.excerptTh || p.excerpt || "";
    const excerptEn = p.excerptEn || excerptTh;
    const categoryName = p.category || "บทความทั่วไป";
    return {
      id: p._id,
      slug: p.slug,
      title: { th: titleTh, en: titleEn },
      excerpt: { th: excerptTh, en: excerptEn },
      coverImage: p.coverImage || "/hero/branches-welcome.webp",
      category: { th: categoryName, en: categoryName },
      publishedAt: {
        th: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("th-TH") : "เร็วๆ นี้",
        en: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-US") : "Recent",
      },
      views: p.views ?? 0,
    } as BlogPost;
  });

  return (
    <div className="bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-white selection:bg-[#c69255] selection:text-white transition-colors duration-300">
      {/* Open with the coffee-farm video, followed by the franchise offer. */}
      <GardenCoffeeIntroVideo />
      <HeroSection />

      {/* Our story, followed by the tools for running a store. */}
      <SignatureStorySection />
      <StoreSystemSection />
      <HighlightsSection />

      {/* 6. Featured Blog: บทความล่าสุด */}
      <FeaturedBlog posts={posts.slice(0, 6)} />

      {/* 9. FAQ: คำถามที่พบบ่อย */}
      <FaqSection />

      {/* 10. Contact Form: ติดต่อเรา */}
      <ContactFormSection franchise />

      {/* 11. Final CTA: ปิดท้ายให้อยากลงมือ */}
      <FinalCtaSection />

      {/* Festival & Seasonal Popup Dialog */}
      <SeasonalPopupDialog initialPromotions={initialPromotions} />
    </div>
  );
}
