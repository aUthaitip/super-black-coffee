"use client";

import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { AboutStoryMotion } from "./about-story-motion";
import {
  HeroOriginSection,
  CoordinatesSection,
  WhyHouaphanSection,
  BranchesGrowthSection,
  PhilosophySection,
} from "./sections";

export function AboutPageContent() {
  const { language } = useLanguage();

  // Motion Story Video Mode State
  const [isStoryPlaying, setIsStoryPlaying] = useState(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Global scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const handleRestartStory = () => {
    setCurrentSceneIndex(0);
    setIsPaused(false);
    setIsStoryPlaying(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-stone-100 selection:bg-[#b57a38] selection:text-black overflow-hidden font-sans">
      {/* Top Floating Scroll Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a5722] via-[#b57a38] to-[#f3ce9c] origin-left z-40 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Atmospheric Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#b57a38]/12 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] -left-48 w-[600px] h-[600px] bg-[#c69255]/8 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 right-0 w-[700px] h-[700px] bg-[#8a5722]/10 blur-[180px] rounded-full" />
      </div>

      {/* ========================================================= */}
      {/* 1. CINEMATIC MOTION GRAPHICS STORY OVERLAY (3s per scene) */}
      {/* Extracted to separate component: <AboutStoryMotion />     */}
      {/* ========================================================= */}
      <AboutStoryMotion
        isPlaying={isStoryPlaying}
        currentSceneIndex={currentSceneIndex}
        isPaused={isPaused}
        onSceneChange={setCurrentSceneIndex}
        onTogglePause={() => setIsPaused(!isPaused)}
        onClose={() => setIsStoryPlaying(false)}
      />

      {/* ========================================================= */}
      {/* 2. FULL ABOUT WEBPAGE (Separated into clean modular files) */}
      {/* ========================================================= */}

      {/* REPLAY STORY BANNER */}
      <section className="relative z-20 pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-[#f3ce9c] uppercase font-bold">
            ABOUT US · เรื่องราวของเรา
          </span>
          <span className="text-xs text-stone-400 hidden sm:inline font-mono">
            SUPER BLACK COFFEE
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleRestartStory}
          className="px-4 py-2 rounded-full bg-[#1e1712] hover:bg-[#b57a38] border border-[#b57a38]/40 hover:border-[#b57a38] text-[#f3ce9c] hover:text-stone-950 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === "th" ? "ชม Motion Graphics Story อีกครั้ง" : "Replay Story Motion"}</span>
        </motion.button>
      </section>

      {/* SECTION 1: ไร่กาแฟหัวพัน สปป.ลาว / บ้านจาด เวียงไซ */}
      <HeroOriginSection />

      {/* SECTION 2: พิกัดไร่กาแฟที่หัวพัน สปป.ลาว (20°14'44.2"N 104°27'09.0"E) */}
      <CoordinatesSection />

      {/* SECTION 3: ทำไมต้องกาแฟจากหัวพัน? (4 Pillars & Harvest Showcase) */}
      <WhyHouaphanSection />

      {/* SECTION 4: จาก สปป.ลาว สู่สาขาที่เติบโตไปด้วยกัน */}
      <BranchesGrowthSection />

      {/* SECTION 5: ทีมงานและผู้ประกอบการกำลังร่วมวางแผนธุรกิจ & Vision Quote */}
      <PhilosophySection />
    </div>
  );
}
