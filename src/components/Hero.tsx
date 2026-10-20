"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import {
  MdTerminal,
  MdArrowOutward,
  MdEast,
  MdBolt,
} from "react-icons/md";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGreensock,
} from "react-icons/si";
import { useLanguage } from "./Providers";
import { Button } from "./ui/Button";
import { SplitText } from "./ui/SplitText";
import { ProjectModal } from "./ui/ProjectModal";

export function Hero() {
  const { t } = useLanguage();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<any>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // 3D Stage & Floating Element Refs
  const sandboxRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const satelliteLeftRef = useRef<HTMLDivElement>(null);
  const satelliteRightRef = useRef<HTMLDivElement>(null);
  const techPill1Ref = useRef<HTMLDivElement>(null);
  const techPill2Ref = useRef<HTMLDivElement>(null);
  const techPill3Ref = useRef<HTMLDivElement>(null);
  const techPill4Ref = useRef<HTMLDivElement>(null);
  const metricBadgeRef = useRef<HTMLDivElement>(null);

  // Synchronized projects list
  const projects = t.projects?.items || [
    {
      id: "PROJECT_01",
      classification: "CỔNG THÔNG TIN QUÂN Y",
      title: "Bệnh viện Quân y 175",
      description:
        "Cổng thông tin y tế chính thức cho Bệnh viện Quân y 175 với kiến trúc chuẩn SEO và Headless CMS Directus.",
      image:
        "/neobrutalism-portfolio/projects/benhvien175_homepage_screenshot.png",
      live: "https://benhvien175.vn",
      github: "#",
      tags: ["Next.js", "TailwindCSS", "Directus CMS"],
      metrics: "99.9% Uptime",
    },
    {
      id: "PROJECT_02",
      classification: "FINTECH & BẢNG GIÁ REAL-TIME",
      title: "Cổng thông tin chứng khoán UPSC",
      description:
        "Nền tảng giao dịch và biểu đồ tài chính thời gian thực cho Chứng khoán UP với Echarts và GraphQL.",
      image:
        "/neobrutalism-portfolio/projects/upstock_homepage_screenshot.png",
      live: "https://upstock.com.vn/",
      github: "#",
      tags: ["Next.js", "TailwindCSS", "Echarts", "GraphQL"],
      metrics: "< 50ms Độ trễ",
    },
    {
      id: "PROJECT_03",
      classification: "DOANH NGHIỆP & BẤT ĐỘNG SẢN",
      title: "Tập đoàn Tân Hoàng Minh",
      description:
        "Website thương hiệu tập đoàn cao cấp với các hoạt ảnh cuộn trang phức tạp điều phối bằng GSAP.",
      image:
        "/neobrutalism-portfolio/projects/tanhoangminh_homepage_screenshot.png",
      live: "https://tanhoangminh.com.vn/",
      github: "#",
      tags: ["Next.js", "TailwindCSS", "GSAP Motion"],
      metrics: "60 FPS Mượt mà",
    },
  ];

  const activeProject = projects[activeProjectIndex % projects.length];
  const leftProject = projects[(activeProjectIndex + 1) % projects.length];
  const rightProject = projects[(activeProjectIndex + 2) % projects.length];

  const handleOpenModal = (project: any) => {
    setModalProject(project);
    setIsModalOpen(true);
  };

  const handleSelectProject = (index: number) => {
    if (mainCardRef.current) {
      gsap.fromTo(
        mainCardRef.current,
        { scale: 0.96, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }
    setActiveProjectIndex(index);
  };

  // GSAP Animations: Entrance Timeline & Floating Micro-Motion
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating Prompt Capsule
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          y: -5,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Continuous Floating Animations with Varied Speeds and Distances (Depth Perception)
      if (mainCardRef.current) {
        gsap.to(mainCardRef.current, {
          y: -7,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (satelliteLeftRef.current) {
        gsap.to(satelliteLeftRef.current, {
          y: -14,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (satelliteRightRef.current) {
        gsap.to(satelliteRightRef.current, {
          y: 15,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.4,
        });
      }

      if (techPill1Ref.current) {
        gsap.to(techPill1Ref.current, {
          y: 10,
          duration: 2.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (techPill2Ref.current) {
        gsap.to(techPill2Ref.current, {
          y: -12,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.2,
        });
      }

      if (techPill3Ref.current) {
        gsap.to(techPill3Ref.current, {
          y: 11,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.6,
        });
      }

      if (techPill4Ref.current) {
        gsap.to(techPill4Ref.current, {
          y: -10,
          duration: 4.0,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }

      if (metricBadgeRef.current) {
        gsap.to(metricBadgeRef.current, {
          y: 7,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
      }

      // Staggered Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
            delay: 0.2,
          },
          "-=0.2",
        )
        .from(
          buttonsRef.current ? Array.from(buttonsRef.current.children) : [],
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          sandboxRef.current,
          {
            opacity: 0,
            scale: 0.94,
            y: 40,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.6",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Cursor-Aware 3D Parallax Tilt with Depth Layers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    // 1. Overall Stage 3D perspective tilt
    gsap.to(sandboxRef.current, {
      rotateX: normY * -4.5,
      rotateY: normX * 4.5,
      transformPerspective: 1400,
      duration: 0.45,
      ease: "power2.out",
    });

    // 2. Middle Layer: Main Central Card
    if (mainCardRef.current) {
      gsap.to(mainCardRef.current, {
        x: normX * 12,
        y: normY * 10,
        rotateX: normY * -6,
        rotateY: normX * 6,
        duration: 0.45,
        ease: "power2.out",
      });
    }

    // 3. Deep Layer: Background Satellite Cards (Inverse / Lagged Parallax)
    if (satelliteLeftRef.current) {
      gsap.to(satelliteLeftRef.current, {
        x: normX * -20,
        y: normY * -16,
        rotateY: 14 + normX * 5,
        rotateX: normY * -4,
        duration: 0.55,
        ease: "power2.out",
      });
    }

    if (satelliteRightRef.current) {
      gsap.to(satelliteRightRef.current, {
        x: normX * -18,
        y: normY * -18,
        rotateY: -14 + normX * 5,
        rotateX: normY * -4,
        duration: 0.55,
        ease: "power2.out",
      });
    }

    // 4. Foreground Layer: Floating Tech Pills & Metric Badges (High Parallax Shift)
    if (techPill1Ref.current) {
      gsap.to(techPill1Ref.current, {
        x: normX * 30,
        y: normY * 26,
        duration: 0.35,
        ease: "power2.out",
      });
    }
    if (techPill2Ref.current) {
      gsap.to(techPill2Ref.current, {
        x: normX * 34,
        y: normY * 30,
        duration: 0.35,
        ease: "power2.out",
      });
    }
    if (techPill3Ref.current) {
      gsap.to(techPill3Ref.current, {
        x: normX * 24,
        y: normY * 22,
        duration: 0.4,
        ease: "power2.out",
      });
    }
    if (techPill4Ref.current) {
      gsap.to(techPill4Ref.current, {
        x: normX * 24,
        y: normY * 20,
        duration: 0.4,
        ease: "power2.out",
      });
    }
    if (metricBadgeRef.current) {
      gsap.to(metricBadgeRef.current, {
        x: normX * 18,
        y: normY * 16,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    // 5. Specular Ambient Cursor Glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - 250,
        y: y - 250,
        opacity: 0.32,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!sandboxRef.current) return;
    const elements = [
      sandboxRef.current,
      mainCardRef.current,
      satelliteLeftRef.current,
      satelliteRightRef.current,
      techPill1Ref.current,
      techPill2Ref.current,
      techPill3Ref.current,
      techPill4Ref.current,
      metricBadgeRef.current,
    ].filter(Boolean);

    gsap.to(elements, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.85,
      ease: "power2.out",
    });

    if (satelliteLeftRef.current) {
      gsap.to(satelliteLeftRef.current, {
        rotateY: 10,
        rotateZ: -3,
        duration: 0.85,
      });
    }
    if (satelliteRightRef.current) {
      gsap.to(satelliteRightRef.current, {
        rotateY: -10,
        rotateZ: 3,
        duration: 0.85,
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.6,
      });
    }
  };

  return (
    <section
      ref={heroRef}
      className="pt-44 md:pt-48 pb-32 md:pb-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Google Prompt Capsule with Liquid Glass */}
        <div
          ref={badgeRef}
          className="google-prompt-capsule inline-flex items-center gap-3 px-6 py-3 mb-10 max-w-3xl text-left"
        >
          {/* Google 2-Tone Terminal Capsule Orb */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#8b5cf6] p-[1.5px] flex items-center justify-center shrink-0 shadow-sm">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#0c0e17] flex items-center justify-center">
              <MdTerminal className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#8ab4f8]" />
            </div>
          </div>
          <span className="text-xs sm:text-sm font-medium text-foreground/90 truncate">
            <strong className="text-[#1a73e8] dark:text-[#8ab4f8]">
              {t.hero.promptLabel}{" "}
            </strong>
            {t.hero.promptText}
          </span>
        </div>

        {/* Google Sans Headline - Expansive and Cinematic with Text Split */}
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.14] max-w-6xl mb-8"
        >
          <SplitText text={t.hero.title1} delay={0.15} />{" "}
          <span className="block mt-3">
            <SplitText text={t.hero.title2} gradient delay={0.38} />
          </span>
        </h1>

        {/* Subtitle with Airy Spacing */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-2xl text-foreground/75 dark:text-zinc-300 max-w-3xl mb-12 leading-relaxed font-normal"
        >
          {t.hero.desc}
        </p>

        {/* Google Pill CTAs */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap items-center justify-center gap-5 mb-16 sm:mb-20"
        >
          <Button
            size="lg"
            variant="aurora"
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="gap-2 px-9 py-4 text-base font-semibold"
          >
            {t.hero.work}
            <MdArrowOutward className="w-4 h-4 ml-1" />
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="gap-2 px-9 py-4 text-base font-medium"
          >
            {t.hero.contact}
            <MdEast className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* 3D Cursor-Aware Floating Showcase Arena */}
        <div
          ref={sandboxRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-6xl mx-auto min-h-[460px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center py-6 sm:py-10 select-none overflow-visible"
          style={{ perspective: "1400px" }}
        >
          {/* Specular Ambient Glow Follower */}
          <div
            ref={glowRef}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#1a73e8]/30 via-[#8b5cf6]/25 to-transparent blur-3xl pointer-events-none opacity-0 -z-0"
            style={{ left: 0, top: 0 }}
          />

          {/* Background Subtle Radial Focus Ring */}
          <div className="absolute inset-0 max-w-4xl mx-auto rounded-full bg-gradient-to-r from-blue-500/[0.04] via-purple-500/[0.06] to-transparent blur-2xl pointer-events-none -z-10" />

          {/* ------------------------------------------------------------------ */}
          {/* LAYER 3: FLOATING TECH PILLS & METRICS (FOREGROUND - Z: 30) */}
          {/* ------------------------------------------------------------------ */}

          {/* Top-Center: Core Web Vitals Status Pill */}
          <div
            ref={metricBadgeRef}
            className="absolute -top-3 sm:-top-5 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#121520]/95 backdrop-blur-xl border border-foreground/15 dark:border-white/20 shadow-lg shadow-black/5 dark:shadow-black/40 text-xs font-semibold text-foreground"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5" />
            <span className="font-mono text-[11px] sm:text-xs tracking-wider">
              CORE WEB VITALS: 100/100
            </span>
            <span className="opacity-30">|</span>
            <span className="text-muted font-normal text-[11px]">&lt; 50ms SPEED</span>
          </div>

          {/* Top-Right: Next.js 16 Pill */}
          <div
            ref={techPill1Ref}
            className="absolute -top-2 sm:top-2 right-2 sm:right-8 lg:right-16 z-30 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 dark:bg-[#121520]/95 backdrop-blur-xl border border-foreground/15 dark:border-white/20 shadow-xl shadow-black/5 dark:shadow-black/50 text-xs sm:text-sm font-semibold text-foreground hover:scale-105 transition-transform"
          >
            <SiNextdotjs className="w-4 h-4 text-foreground" />
            <span>Next.js 16 App Router</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8]" />
          </div>

          {/* Bottom-Left: React 19 & TypeScript Pill */}
          <div
            ref={techPill2Ref}
            className="absolute -bottom-3 sm:bottom-4 left-2 sm:left-8 lg:left-16 z-30 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 dark:bg-[#121520]/95 backdrop-blur-xl border border-foreground/15 dark:border-white/20 shadow-xl shadow-black/5 dark:shadow-black/50 text-xs sm:text-sm font-semibold text-foreground hover:scale-105 transition-transform"
          >
            <div className="flex items-center -space-x-1">
              <SiReact className="w-4 h-4 text-[#00d8ff]" />
              <SiTypescript className="w-3.5 h-3.5 text-[#3178c6]" />
            </div>
            <span>React 19 • TypeScript</span>
          </div>

          {/* Mid-Left: GSAP 3D Motion */}
          <div
            ref={techPill3Ref}
            className="hidden md:inline-flex absolute top-1/2 -translate-y-12 -left-2 lg:left-4 z-25 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-[#121520]/90 backdrop-blur-xl border border-foreground/15 dark:border-white/20 shadow-lg text-xs font-semibold text-foreground"
          >
            <SiGreensock className="w-4 h-4 text-[#88ce02]" />
            <span>GSAP 3D Motion</span>
          </div>

          {/* Mid-Right: Tailwind CSS v4 & Liquid Glass */}
          <div
            ref={techPill4Ref}
            className="hidden md:inline-flex absolute top-1/2 translate-y-12 -right-2 lg:right-4 z-25 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-[#121520]/90 backdrop-blur-xl border border-foreground/15 dark:border-white/20 shadow-lg text-xs font-semibold text-foreground"
          >
            <SiTailwindcss className="w-4 h-4 text-[#38bdf8]" />
            <span>Tailwind v4 • Glass</span>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* LAYER 1: SATELLITE FLOATING CARDS (DEEP BACKGROUND - Z: 10) */}
          {/* ------------------------------------------------------------------ */}

          {/* Left Satellite Project Card */}
          <div
            ref={satelliteLeftRef}
            onClick={() =>
              handleSelectProject((activeProjectIndex + 1) % projects.length)
            }
            className="hidden sm:flex flex-col absolute -left-4 md:-left-8 lg:-left-12 top-10 sm:top-14 w-52 sm:w-60 md:w-68 z-10 p-3 rounded-2xl bg-white/75 dark:bg-[#12141e]/85 backdrop-blur-2xl border border-foreground/15 dark:border-white/15 shadow-2xl cursor-pointer group transition-all duration-300 hover:scale-105 hover:border-[#1a73e8]/50 hover:shadow-blue-500/20"
            style={{ transform: "rotateY(10deg) rotateZ(-3deg)" }}
            title="Click to bring this project to center"
          >
            <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-black/10 dark:bg-white/5 mb-2.5">
              <img
                src={leftProject.image}
                alt={leftProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white tracking-wider uppercase border border-white/15">
                {leftProject.classification || "Project"}
              </div>
            </div>
            <div className="flex items-center justify-between text-left">
              <span className="text-xs font-bold text-foreground group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors line-clamp-1">
                {leftProject.title}
              </span>
              <span className="text-[10px] text-[#1a73e8] dark:text-[#8ab4f8] font-bold flex items-center shrink-0">
                Đổi ↗
              </span>
            </div>
          </div>

          {/* Right Satellite Project Card */}
          <div
            ref={satelliteRightRef}
            onClick={() =>
              handleSelectProject((activeProjectIndex + 2) % projects.length)
            }
            className="hidden sm:flex flex-col absolute -right-4 md:-right-8 lg:-right-12 bottom-8 sm:bottom-12 w-52 sm:w-60 md:w-68 z-10 p-3 rounded-2xl bg-white/75 dark:bg-[#12141e]/85 backdrop-blur-2xl border border-foreground/15 dark:border-white/15 shadow-2xl cursor-pointer group transition-all duration-300 hover:scale-105 hover:border-[#1a73e8]/50 hover:shadow-blue-500/20"
            style={{ transform: "rotateY(-10deg) rotateZ(3deg)" }}
            title="Click to bring this project to center"
          >
            <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-black/10 dark:bg-white/5 mb-2.5">
              <img
                src={rightProject.image}
                alt={rightProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white tracking-wider uppercase border border-white/15">
                {rightProject.classification || "Project"}
              </div>
            </div>
            <div className="flex items-center justify-between text-left">
              <span className="text-xs font-bold text-foreground group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors line-clamp-1">
                {rightProject.title}
              </span>
              <span className="text-[10px] text-[#1a73e8] dark:text-[#8ab4f8] font-bold flex items-center shrink-0">
                Đổi ↗
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* LAYER 2: PRIMARY CENTRAL PROJECT SHOWCASE (MIDDLE PLANE - Z: 20) */}
          {/* ------------------------------------------------------------------ */}
          <div
            ref={mainCardRef}
            className="relative w-full max-w-2xl lg:max-w-3xl z-20 p-2 sm:p-3 md:p-4 rounded-3xl bg-white/85 dark:bg-[#10121a]/90 backdrop-blur-3xl border border-foreground/15 dark:border-white/20 shadow-2xl shadow-blue-500/10 dark:shadow-black/70"
          >
            {/* Inner Cinematic Showcase Card */}
            <div
              onClick={() => handleOpenModal(activeProject)}
              className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer shadow-inner"
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Cinematic Frosted Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 flex flex-col justify-between p-5 sm:p-8 text-left text-white">
                {/* Top Header Bar */}
                <div className="flex items-center justify-between gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-white/20">
                    {activeProject.classification || "FEATURED PROJECT"}
                  </span>

                  <div className="flex items-center gap-2 font-mono text-xs bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                    <MdBolt className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-zinc-200">
                      {activeProject.metrics || "60 FPS"}
                    </span>
                  </div>
                </div>

                {/* Bottom Info & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-3xl font-black mb-2 text-white drop-shadow-md group-hover:text-blue-300 transition-colors">
                      {activeProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-1 max-w-lg mb-2">
                      {activeProject.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(activeProject.tags || []).slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-zinc-200 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(activeProject);
                    }}
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-100 transition-all shadow-lg hover:scale-105 cursor-pointer"
                  >
                    <span>{t.projects?.inspect || "Xem chi tiết"}</span>
                    <MdArrowOutward className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Project Switcher Controls (< 640px) */}
            <div className="flex sm:hidden items-center justify-between mt-3 pt-2.5 px-2 border-t border-foreground/10 text-xs text-muted">
              <span className="font-medium text-foreground">Các dự án khác:</span>
              <div className="flex items-center gap-2">
                {projects.map((p: any, idx: number) => (
                  <button
                    key={p.id || idx}
                    onClick={() => handleSelectProject(idx)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      activeProjectIndex === idx
                        ? "bg-[#1a73e8] text-white"
                        : "bg-foreground/10 text-foreground/80 hover:bg-foreground/15"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={modalProject}
        />
      </div>
    </section>
  );
}

