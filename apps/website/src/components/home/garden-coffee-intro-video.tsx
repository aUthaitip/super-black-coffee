"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

interface GardenCoffeeIntroVideoProps {
  onIntroEnd?: () => void;
}

export function GardenCoffeeIntroVideo({ onIntroEnd }: GardenCoffeeIntroVideoProps) {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // States
  const [showTypography, setShowTypography] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Video time tracker: Trigger text starting at 2 seconds into playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      // Show typography starting from 2 seconds into playback
      if (currentTime >= 2) {
        setShowTypography(true);
      }
    };

    const handleEnded = () => {
      // Loop video smoothly if user hasn't scrolled yet
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // Fallback: trigger text after 2 seconds
    const fallbackTimer = setTimeout(() => {
      setShowTypography(true);
    }, 2000);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Scroll Reveal Observer: As user scrolls, video scale & opacity adjust smoothly
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = -(sectionRef.current?.getBoundingClientRect().top ?? 0);
      const windowHeight = window.innerHeight;

      if (scrollY > 15) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Calculate 0 to 1 progress as user scrolls down the first screen
      const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 0.7)));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (!(nextSection instanceof HTMLElement)) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | HTMLElement, opts?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(nextSection, { duration: 1.4 });
    } else {
      window.scrollTo({
        top: window.scrollY + nextSection.getBoundingClientRect().top,
        behavior: "smooth",
      });
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black select-none">
      {/* Video Background Layer */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `scale(${1 + scrollProgress * 0.12}) translateY(${scrollProgress * 20}px)`,
          filter: `brightness(${1 - scrollProgress * 0.25})`,
        }}
      >
        <video
          ref={videoRef}
          src="/mp4/gradencoffee.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          loop
          className="w-full h-full object-cover object-center"
        />

        {/* Ambient Cine Vignette: Natural contrast without foggy gradient */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>

      {/* Center Typography (Appears in the last 3 seconds with cinematic reveal) */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 text-center transition-all duration-1000 ease-out pointer-events-none ${
          showTypography
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-0 translate-y-8 blur-sm"
        }`}
        style={{
          opacity: showTypography ? Math.max(0, 1 - scrollProgress * 2) : 0,
          transform: `translateY(${showTypography ? scrollProgress * -40 : 32}px)`,
        }}
      >
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">

          {/* Main Requested Thai Phrase */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-semibold text-white tracking-tight leading-[1.3] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            {language === "th" ? (
              <>
                จากผืนดินอันอุดมสมบูรณ์<br />
                <span className="text-[#f5d5aa]">สู่กาแฟคุณภาพในทุกแก้ว</span>
              </>
            ) : (
              <>
                From Fertile Mountain Soil<br />
                <span className="text-[#f5d5aa]">To Quality Coffee in Every Cup</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-lg md:text-xl text-stone-200 font-medium max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] leading-relaxed">
            {language === "th"
              ? "สัมผัสเรื่องราวจากไร่กาแฟบนภูเขา ผ่านความพิถีพิถันในทุกขั้นตอนการผลิต"
              : "Experience the journey from mountain coffee farms through meticulous craft in every stage of production."}
          </p>
        </div>
      </div>

      {/* Floating Sound Control (Bottom Left) */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-8 left-6 sm:left-10 z-20 w-11 h-11 rounded-full bg-black/45 hover:bg-black/75 text-white/90 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-stone-300" /> : <Volume2 className="w-5 h-5 text-[#c69255]" />}
      </button>

      {/* Scroll Down Indicator with Pulsing Chevron (Bottom Center) */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer select-none transition-opacity duration-500"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 3),
        }}
        onClick={handleScrollDown}
      >
        <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.1em] text-stone-200 drop-shadow-md">
          {language === "th" ? "เลื่อนเพื่อค้นพบเรื่องราวของเรา" : "Scroll to discover our story"}
        </span>
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white animate-bounce shadow-md">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
