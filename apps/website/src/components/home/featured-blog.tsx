// @ts-nocheck
"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/i18n/language-provider"
import { BlogPost } from "@/data/blog"
import { useEffect, useRef, useState, useCallback } from "react"

interface FeaturedBlogProps {
  posts: BlogPost[]
}

export default function FeaturedBlog({ posts }: FeaturedBlogProps) {
  const { language } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const cards = container.querySelectorAll<HTMLElement>("[data-card]")
    if (!cards[index]) return
    const card = cards[index]
    const scrollLeft = card.offsetLeft - container.offsetLeft - 16 // 16px padding offset
    container.scrollTo({ left: scrollLeft, behavior: "smooth" })
    setActiveIndex(index)
  }, [])

  // Auto-slide every 2 seconds
  useEffect(() => {
    if (!posts || posts.length <= 1) return

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % posts.length
        scrollToIndex(next)
        return next
      })
    }, 2000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [posts, scrollToIndex])

  // Pause auto-scroll on hover / touch
  const pauseAutoScroll = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }
  const resumeAutoScroll = () => {
    if (!posts || posts.length <= 1) return
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % posts.length
        scrollToIndex(next)
        return next
      })
    }, 2000)
  }

  if (!posts || posts.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-white mb-8 text-center">
        {language === "th" ? "บทความและข่าวสาร" : "Latest Articles & News"}
      </h2>

      <div
        ref={scrollRef}
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={resumeAutoScroll}
        onTouchStart={pauseAutoScroll}
        onTouchEnd={resumeAutoScroll}
        className="flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {posts.map((post, i) => (
          <article
            key={post.id}
            data-card
            className="snap-center flex-shrink-0 w-[85vw] sm:w-80 md:w-96 lg:w-[28rem] group flex flex-col bg-white dark:bg-[#14100c] border border-stone-200/90 dark:border-white/5 rounded-3xl overflow-hidden hover:border-[#c69255] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#c69255]/5"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
              <Image
                src={post.coverImage}
                alt={post.title[language]}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-white">
                {post.category[language]}
              </div>
            </div>
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-stone-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#c69255] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title[language]}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3 font-normal pt-1">
                  {post.excerpt[language]}
                </p>
              </div>
              <div className="pt-5 mt-auto">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#b47836] dark:text-[#c69255] hover:underline transition-colors group-hover:translate-x-0.5 duration-200"
                >
                  {language === "th" ? "อ่านต่อ" : "Read more"}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              scrollToIndex(i)
              pauseAutoScroll()
              resumeAutoScroll()
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? "bg-[#c69255] w-6"
                : "bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
