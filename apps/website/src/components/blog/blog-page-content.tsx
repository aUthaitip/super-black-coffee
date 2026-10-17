"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, ArrowRight, Search, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { BLOG_DATA, BlogPost } from "@/data/blog";

interface SanityPost {
  _id: string;
  titleTh?: string;
  titleEn?: string;
  title?: string;
  slug: string;
  excerptTh?: string;
  excerptEn?: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  publishedAt?: string;
}

interface BlogPageContentProps {
  initialPosts?: SanityPost[];
}

export function BlogPageContent({ initialPosts = [] }: BlogPageContentProps) {
  const { language } = useLanguage();
  const { header, readMoreText, viewsText } = BLOG_DATA;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const posts: BlogPost[] = useMemo(() => {
    return initialPosts.map((p) => {
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
        views: 0,
      };
    });
  }, [initialPosts]);

  const categories = useMemo(() => [
    { id: "all", label: { th: "ทั้งหมด", en: "All" } },
    ...Array.from(
      new Set(posts.map((p) => p.category.th))
    ).map((catTh) => {
      const match = posts.find((p) => p.category.th === catTh);
      return {
        id: catTh,
        label: {
          th: catTh,
          en: match?.category.en || catTh,
        },
      };
    }),
  ], [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category.th === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title[language].toLowerCase().includes(q) ||
        p.excerpt[language].toLowerCase().includes(q) ||
        p.category[language].toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery, language]);

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0d0b09] text-stone-900 dark:text-white selection:bg-[#c69255] selection:text-white pb-28 transition-colors duration-300">
      {/* Header Section */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 sm:mb-10">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "th" ? "ค้นหาบทความและข่าวสาร..." : "Search articles and news..."}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white dark:bg-[#171411] border border-stone-200 dark:border-[#352d26] hover:border-[#c69255]/50 focus:border-[#c69255] focus:ring-2 focus:ring-[#c69255]/20 text-stone-900 dark:text-white placeholder-stone-400 text-xs sm:text-sm outline-none transition-all shadow-sm dark:shadow-lg dark:shadow-black/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 p-1 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 dark:text-white mb-5">
          {header.title[language]}
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          {header.description[language]}
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer shadow-xs ${
                  isSelected
                    ? "bg-stone-900 text-white dark:bg-[#c69255] dark:text-stone-950 font-bold shadow-md"
                    : "bg-white dark:bg-[#181410] text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-[#231d17] border border-stone-200 dark:border-white/5"
                }`}
              >
                {cat.label[language]}
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                language={language}
                readMoreText={readMoreText[language]}
                viewsText={viewsText[language]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-[#14100c] border border-stone-200 dark:border-white/5 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
            <p className="text-stone-600 dark:text-stone-400 text-sm font-medium">
              {language === "th"
                ? "ไม่พบบทความที่ตรงกับคำค้นหา"
                : "No articles found matching your query"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-xs font-bold text-[#b47836] dark:text-[#c69255] hover:underline cursor-pointer"
            >
              {language === "th" ? "ล้างคำค้นหา" : "Clear filters"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function BlogCard({
  post,
  language,
  readMoreText,
  viewsText,
}: {
  post: BlogPost;
  language: "th" | "en";
  readMoreText: string;
  viewsText: string;
}) {
  return (
    <article className="group flex flex-col bg-white dark:bg-[#14100c] border border-stone-200/90 dark:border-white/5 rounded-3xl overflow-hidden hover:border-[#c69255] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#c69255]/5">
      {/* Article Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <Image
          src={post.coverImage}
          alt={post.title[language]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge on top of image */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-white">
          {post.category[language]}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title */}
          <h2 className="text-base sm:text-lg font-semibold text-stone-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#c69255] transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title[language]}
            </Link>
          </h2>

          {/* Metadata: Date & Views counter */}
          <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{post.publishedAt[language]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {post.views} {viewsText}
              </span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3 font-normal pt-1">
            {post.excerpt[language]}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-5 mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#b47836] dark:text-[#c69255] hover:underline transition-colors group-hover:translate-x-0.5 duration-200"
          >
            <span>{readMoreText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
