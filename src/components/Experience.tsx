"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./Providers";
import {
  MdWorkOutline,
  MdLocationOn,
  MdSchool,
  MdVerified,
  MdCorporateFare,
} from "react-icons/md";
import { SplitText } from "./ui/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
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

      if (timelineRef.current) {
        const items = Array.from(timelineRef.current.children);
        gsap.from(items, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 sm:py-28 md:py-44 px-4 sm:px-6 lg:px-8 relative bg-section-alt-bg/40 border-t border-foreground/10 overflow-hidden"
    >
      {/* Watermark Parallax Background */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute -top-10 left-1/2 -translate-x-1/2 text-[14vw] font-black tracking-tighter text-foreground/[0.025] dark:text-white/[0.025] select-none pointer-events-none whitespace-nowrap z-0"
      >
        EXPERIENCE
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-6 sm:pb-8 border-b border-foreground/10 gap-6 sm:gap-8">
          <div className="max-w-2xl lg:max-w-3xl flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-4">
              <MdWorkOutline className="w-4 h-4" />
              {t.experience.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground text-balance">
              <SplitText text={t.experience.title} />
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted font-normal max-w-sm md:max-w-md text-left md:text-right leading-relaxed shrink-0">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative space-y-10 sm:space-y-14">
          {/* Continuous Vertical Spine Line - Exactly centered at left-4 sm:left-6 */}
          <div
            className="absolute top-6 bottom-6 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-[#1a73e8] via-foreground/20 to-foreground/5 -translate-x-1/2 pointer-events-none"
            aria-hidden="true"
          />

          {t.experience.items.map((item, index) => {
            const isGraduation = item.period === "2023";

            return (
              <div
                key={item.company + item.period}
                className="relative pl-12 sm:pl-16 group transition-all duration-300"
              >
                {/* Timeline Node Icon/Dot - Exactly centered on the line via left-4 sm:left-6 and -translate-x-1/2 */}
                <div className="absolute left-4 sm:left-6 top-6 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background border-2 border-foreground/20 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#1a73e8] z-10">
                  {item.current ? (
                    <span className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a73e8] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-[#1a73e8]"></span>
                    </span>
                  ) : isGraduation ? (
                    <MdSchool className="w-4 h-4 sm:w-5 sm:h-5 text-[#fbbc04]" />
                  ) : (
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: item.color || "#1a73e8" }}
                    />
                  )}
                </div>

                {/* Milestone Card */}
                <div className="liquid-glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-foreground/25 hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                  {/* Top ambient color bar indicator */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: item.current
                        ? "linear-gradient(90deg, #1a73e8, #8b5cf6)"
                        : item.color || "#1a73e8",
                    }}
                  />

                  {/* Header Row: Period Badge, Current indicator & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase ${
                          item.current
                            ? "bg-[#1a73e8]/15 text-[#1a73e8] dark:text-[#8ab4f8] border border-[#1a73e8]/30"
                            : "bg-foreground/5 text-foreground/80 border border-foreground/10"
                        }`}
                      >
                        {item.period}
                      </span>

                      {item.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
                      <MdLocationOn className="w-3.5 h-3.5 text-red-500/80 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Company & Role */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      {isGraduation ? (
                        <MdSchool className="w-5 h-5 text-muted shrink-0" />
                      ) : (
                        <MdCorporateFare className="w-5 h-5 text-muted shrink-0" />
                      )}
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-[#1a73e8] transition-colors">
                        {item.company}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-[#1a73e8] dark:text-[#8ab4f8]">
                      {item.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-normal mb-6">
                    {item.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-foreground/5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-foreground/[0.04] text-foreground/70 border border-foreground/5 transition-colors hover:bg-foreground/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
