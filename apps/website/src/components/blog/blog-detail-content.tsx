"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Eye, ArrowLeft, Share2, Check } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { BlogPost, BLOG_DATA } from "@/data/blog";
import { cn } from "@/lib/utils";

interface BlogDetailContentProps {
  post: BlogPost;
}

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  const { language } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const sections = post.sections || [];

  // Observe which section is currently on screen to highlight TOC
  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSectionId(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0d0b09] text-stone-900 dark:text-white selection:bg-[#c69255] selection:text-white pb-32 transition-colors duration-300">
      {/* Top Breadcrumb Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          <Link
            href="/blog"
            className="hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 dark:text-stone-600" />
          <span className="text-[#b47836] dark:text-[#c69255] font-medium truncate max-w-[280px] sm:max-w-md md:max-w-lg">
            {post.title[language]}
          </span>
        </nav>
      </div>

      {/* Main Grid: Left Article Content (approx 68%) | Right Sticky TOC (approx 32%) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Article Body Column */}
          <article className="lg:col-span-8 space-y-8">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-stone-950 dark:text-white leading-[1.25] tracking-tight">
              {post.title[language]}
            </h1>

            {/* Intro Lead Paragraph */}
            {post.introParagraph && (
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {post.introParagraph[language]}
              </p>
            )}

            {/* Meta bar: Date, Views, Share */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-stone-200 dark:border-white/10 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                  <span>{post.publishedAt[language]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                  <span>
                    {post.views} {BLOG_DATA.viewsText?.[language] || (language === "th" ? "ผู้ชม" : "views")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
                title="แชร์ลิงก์"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#b47836] dark:text-[#c69255]" />
                    <span className="text-[#b47836] dark:text-[#c69255] font-semibold">คัดลอกลิงก์แล้ว</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>แชร์บทความ</span>
                  </>
                )}
              </button>
            </div>

            {/* Cover Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-white/5 shadow-md dark:shadow-2xl">
              <Image
                src={post.coverImage}
                alt={post.title[language]}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 68vw"
              />
            </div>

            {/* Article Sections (Paragraphs & Subheadings) */}
            <div className="space-y-10 pt-4 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="space-y-4 scroll-mt-24"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-950 dark:text-white tracking-tight pt-2">
                    {section.title[language]}
                  </h2>
                  {section.content[language].map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* Back to Blog Button */}
            <div className="pt-10 border-t border-stone-200 dark:border-white/10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 dark:bg-[#171411] border border-stone-200 dark:border-[#352d26] hover:border-[#c69255]/50 text-stone-900 dark:text-white text-sm font-semibold transition-all hover:-translate-x-1 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4 text-[#b47836] dark:text-[#c69255]" />
                <span>กลับสู่หน้าบทความทั้งหมด</span>
              </Link>
            </div>
          </article>

          {/* Right Column: Sticky Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-[#14100c] border border-stone-200/90 dark:border-white/5 rounded-2xl sm:rounded-3xl p-6 shadow-sm dark:shadow-xl">
              {/* Header Label: News / สารบัญ */}
              <div className="text-xs font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-4 pb-2 border-b border-stone-100 dark:border-white/5">
                {BLOG_DATA.tableOfContentsText?.[language] || (language === "th" ? "สารบัญ" : "Table of Contents")}
              </div>

              {/* TOC Link Items */}
              {sections.length > 0 ? (
                <ul className="space-y-1.5">
                  {sections.map((sec) => {
                    const isCurrent = activeSectionId === sec.id;
                    return (
                      <li key={sec.id}>
                        <a
                          href={`#${sec.id}`}
                          onClick={(e) => scrollToSection(e, sec.id)}
                          className={cn(
                            "block text-xs sm:text-sm transition-all duration-200 leading-snug py-2 px-3 rounded-xl",
                            isCurrent
                              ? "bg-[#c69255]/15 dark:bg-[#201914] text-[#b47836] dark:text-[#c69255] font-bold translate-x-1 border-l-2 border-[#c69255]"
                              : "text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/5 font-medium"
                          )}
                        >
                          {sec.title[language]}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-xs text-stone-400 dark:text-stone-500">ไม่มีหัวข้อสารบัญ</p>
              )}
            </div>

            {/* Quick Contact & Partnership CTA Banner */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-[#1a1410] dark:to-[#0f0c0a] border border-amber-200/60 dark:border-[#352d26] text-center space-y-3 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b47836] dark:text-[#c69255]">
                Super Black Coffee
              </span>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                พร้อมร่วมเป็นส่วนหนึ่งของธุรกิจกาแฟพรีเมียม?
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                ระบบจัดการครบวงจรและการอบรมมาตรฐานระดับสากล
              </p>
              <div className="pt-2">
                <Link
                  href="/franchise"
                  className="inline-block w-full py-2.5 px-4 rounded-xl bg-[#c69255] hover:bg-[#b47836] text-white dark:text-stone-950 font-bold text-xs transition-all shadow-md shadow-[#c69255]/20 hover:scale-[1.02]"
                >
                  ดูข้อมูลร่วมธุรกิจ
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
