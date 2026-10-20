"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./Providers";
import {
  MdHelpOutline,
  MdKeyboardArrowDown,
  MdQuestionAnswer,
} from "react-icons/md";
import { SplitText } from "./ui/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FAQ() {
  const { t } = useLanguage();
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (listRef.current) {
        const items = Array.from(listRef.current.children);
        gsap.from(items, {
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
          y: 35,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-20 sm:py-28 md:py-44 px-4 sm:px-6 lg:px-8 relative bg-section-bg border-t border-foreground/10 overflow-hidden"
    >
      {/* Watermark Parallax Background */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute -top-10 left-1/2 -translate-x-1/2 text-[14vw] font-black tracking-tighter text-foreground/[0.025] dark:text-white/[0.025] select-none pointer-events-none whitespace-nowrap z-0"
      >
        FAQS
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-6 sm:pb-8 border-b border-foreground/10 gap-6 sm:gap-8">
          <div className="max-w-2xl lg:max-w-3xl flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wider uppercase mb-4">
              <MdHelpOutline className="w-4 h-4" />
              {t.faq.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground text-balance">
              <SplitText text={t.faq.title} />
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted font-normal max-w-sm md:max-w-md text-left md:text-right leading-relaxed shrink-0">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion 2-Column Bento Grid */}
        <div
          ref={listRef}
          className="grid grid-cols-1 gap-5 sm:gap-6 items-start"
        >
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div
                key={item.q}
                className={`liquid-glass rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#1a73e8]/40 shadow-[0_8px_30px_-6px_rgba(26,115,232,0.12)]"
                    : "border-foreground/10 hover:border-foreground/25"
                }`}
              >
                {/* Accordion Question Trigger */}
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#1a73e8] text-white"
                          : "bg-foreground/5 text-foreground/70"
                      }`}
                    >
                      <MdQuestionAnswer className="w-4 h-4" />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                      {item.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8]"
                        : "bg-foreground/5 text-foreground/70"
                    }`}
                  >
                    <MdKeyboardArrowDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Accordion Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-foreground/5 text-sm sm:text-base text-foreground/80 leading-relaxed font-normal">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
