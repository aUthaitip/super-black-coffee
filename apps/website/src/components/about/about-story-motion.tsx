"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { ABOUT_STORY_SCENES } from "@/data/about";
import styles from "./about-story-motion.module.css";

interface AboutStoryMotionProps {
  isPlaying: boolean;
  currentSceneIndex: number;
  isPaused: boolean;
  onSceneChange: (index: number | ((prev: number) => number)) => void;
  onTogglePause: () => void;
  onClose: () => void;
}

export function AboutStoryMotion({
  isPlaying,
  currentSceneIndex,
  isPaused,
  onSceneChange,
  onTogglePause,
  onClose,
}: AboutStoryMotionProps) {
  const { language } = useLanguage();

  const currentScene =
    (ABOUT_STORY_SCENES[currentSceneIndex] ?? ABOUT_STORY_SCENES[0])!;

  // 3-second auto-advancing slideshow with crossfade
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const timer = setTimeout(() => {
      if (currentSceneIndex < ABOUT_STORY_SCENES.length - 1) {
        onSceneChange((prev) => prev + 1);
      } else {
        // Finished story, smoothly reveal the full about webpage
        onClose();
      }
    }, 3000); // 3 seconds per scene as requested

    return () => clearTimeout(timer);
  }, [isPlaying, isPaused, currentSceneIndex, onSceneChange, onClose]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="relative z-30 p-6 sm:p-8 flex items-center justify-end">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onTogglePause}
                aria-label={language === "th" ? (isPaused ? "เล่นต่อ" : "หยุดชั่วคราว") : (isPaused ? "Resume story" : "Pause story")}
                className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 hover:border-[#b57a38] text-xs font-medium text-stone-300 hover:text-white flex items-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer"
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-[#c69255]" />
                    <span className="hidden sm:inline">{language === "th" ? "เล่นต่อ" : "Resume"}</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current text-[#c69255]" />
                    <span className="hidden sm:inline">{language === "th" ? "หยุดชั่วคราว" : "Pause"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-black/60 border border-white/20 hover:border-[#b57a38] text-stone-200 hover:text-white font-medium text-xs flex items-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer"
              >
                <span>{language === "th" ? "ข้ามไปหน้าเว็บ" : "Skip to Page"}</span>
                <SkipForward className="w-3.5 h-3.5 text-[#c69255]" />
              </button>
            </div>
          </div>

          {/* Full-bleed Background Scene Graphic with Ken Burns Zoom & Fade */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={currentScene.image}
                  alt={currentScene.title[language]}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center contrast-105"
                />
                {/* Top subtle dark gradient for status/controls visibility */}
                <div className={`absolute inset-0 pointer-events-none ${styles.sceneWash}`} />
                {/* Center Vignette: Darkens center behind the text while keeping left & right brighter and visible */}
                <div className={`absolute inset-0 pointer-events-none ${styles.sceneVignette}`} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Central Animated Scene Content */}
          <div className="relative z-10 flex-1 w-full flex items-center justify-center">
            {/* Motion Text Typography */}
            <div className="relative max-w-4xl mx-auto px-6 text-center space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentScene.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {/* Scene Title - Big with font-semibold, with Gold accent on Farm Name */}
                  <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
                    {currentScene.id === "scene-1" ? (
                      <span>
                        <span className="text-[#c69255] drop-shadow-[0_2px_15px_rgba(198,146,85,0.4)]">ไร่กาแฟ</span>
                        <span className="text-white">หัวพัน สปป.ลาว</span>
                      </span>
                    ) : (
                      <span className="text-white">
                        {currentScene.title[language]}
                      </span>
                    )}
                  </h2>

                  {/* Subtitle - font-semibold */}
                  {currentScene.subtitle && (
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-stone-200 tracking-wide max-w-2xl mx-auto">
                      {currentScene.subtitle[language]}
                    </p>
                  )}

                  {/* Scene Story Description - font-semibold */}
                  <p className="max-w-2xl mx-auto text-stone-200 text-sm sm:text-base md:text-lg leading-relaxed font-semibold">
                    {currentScene.desc[language]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
