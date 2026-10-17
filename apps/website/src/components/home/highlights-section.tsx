"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-provider";
import { HOME_DATA } from "@/data/home";
import { HighlightCard } from "@/components/card";
import { ScrollReveal, ScrollRevealText } from "@/components/ui/scroll-reveal";

// GPOS StackCard component with stuck observer
function StackCard({
  top,
  index,
  children,
}: {
  top: number;
  index: number;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      setIsStuck(rect.top <= top + 1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [top]);

  return (
    <div
      ref={cardRef}
      className="stack-card lg:sticky"
      data-stuck={isStuck ? "" : undefined}
      style={{
        top: `${top}px`,
        zIndex: index + 1,
      }}
    >
      {children}
    </div>
  );
}

// GPOS StackCardGroup: Calculates dynamic min-height for stacked cards so they peek cleanly
function StackCardGroup({
  step = 20,
  className,
  children,
}: {
  step?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    let animFrame = 0;

    const recalculate = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        const articles = [
          ...container.querySelectorAll<HTMLElement>(".stack-card > article"),
        ];
        articles.forEach((a) => a.style.removeProperty("min-height"));

        if (!mediaQuery.matches) return;

        const heights = articles.map((a) => a.offsetHeight);
        let maxHeight = 0;

        articles.forEach((art, idx) => {
          const h = heights[idx] ?? 0;
          maxHeight = Math.max(maxHeight, h + step * idx);
          const computedMinHeight = maxHeight - step * idx;
          if (computedMinHeight > h) {
            art.style.minHeight = `${computedMinHeight}px`;
          }
        });
      });
    };

    recalculate();

    const observer = new ResizeObserver(recalculate);
    container
      .querySelectorAll(".stack-card > article")
      .forEach((el) => observer.observe(el));

    window.addEventListener("resize", recalculate);
    return () => {
      cancelAnimationFrame(animFrame);
      observer.disconnect();
      window.removeEventListener("resize", recalculate);
    };
  }, [step]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export function HighlightsSection() {
  const { language } = useLanguage();
  const { highlights } = HOME_DATA;

  // Stacking offset values
  const baseTop = 110;
  const step = 20;

  return (
    <section className="w-full bg-[#faf8f5] dark:bg-black text-stone-900 dark:text-white relative my-2 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Sticky Column */}
          <div className="flex shrink-0 flex-col items-start gap-6 lg:sticky lg:top-28 lg:max-w-md lg:self-start">
            <ScrollRevealText delay={0.05} yOffset={24}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 dark:text-white tracking-tight leading-[1.2]">
                {highlights.title[language]}
              </h2>
            </ScrollRevealText>

            <ScrollRevealText delay={0.15} yOffset={20}>
              <p className="text-base sm:text-lg text-stone-600 dark:text-gray-300 font-medium leading-relaxed">
                {highlights.subtitle[language]}
              </p>
            </ScrollRevealText>

            <ScrollReveal delay={0.25} yOffset={20}>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#b57a38] px-6 py-3 text-sm sm:text-base font-bold text-white transition-all hover:bg-[#9e672b] hover:shadow-[0_4px_20px_rgba(181,122,56,0.35)] shadow-md"
              >
                {language === "th" ? "สนใจร่วมธุรกิจ" : "Become a Partner"}
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Column: StackCardGroup with GPOS Stacking Cards on Scroll */}
          <StackCardGroup
            step={step}
            className="flex flex-1 flex-col gap-12 lg:gap-24 w-full pb-12 lg:pb-24"
          >
            {highlights.items.map((item, index) => {
              const cardTop = baseTop + index * step;

              return (
                <StackCard key={index} index={index} top={cardTop}>
                  <HighlightCard item={item} language={language} index={index} />
                </StackCard>
              );
            })}
          </StackCardGroup>

        </div>
      </div>
    </section>
  );
}
