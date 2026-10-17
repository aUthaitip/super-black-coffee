"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect accessibility settings
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Expose lenis to window for programmatic section transitions
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Check for hash on initial load or after navigation
    const scrollToHash = () => {
      if (window.location.hash) {
        try {
          const hashEl = document.querySelector(window.location.hash);
          if (hashEl) {
            setTimeout(() => {
              lenis.scrollTo(hashEl as HTMLElement, {
                offset: -70,
                duration: 1.2,
              });
            }, 150);
          }
        } catch {
          // Ignore invalid CSS selector in hash (e.g. Sanity auth hash #sid=...)
        }
      }
    };
    scrollToHash();

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      // Match #hash or /#hash when already on home page
      const isSamePageHomeHash =
        (rawHref.startsWith("/#") && window.location.pathname === "/") ||
        (rawHref.startsWith("#") && rawHref.length > 1);

      if (isSamePageHomeHash) {
        const hash = rawHref.startsWith("/#") ? rawHref.slice(1) : rawHref;
        try {
          const element = document.querySelector(hash);
          if (element) {
            e.preventDefault();
            window.history.pushState(null, "", hash);
            lenis.scrollTo(element as HTMLElement, {
              offset: -70,
              duration: 1.2,
            });
          }
        } catch {
          // Ignore invalid selector
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", scrollToHash);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
