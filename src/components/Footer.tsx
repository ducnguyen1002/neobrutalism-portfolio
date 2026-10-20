"use client";

import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import {
  MdEmail,
  MdContentCopy,
  MdCheck,
  MdAlternateEmail,
} from "react-icons/md";
import { useLanguage } from "./Providers";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./ui/SplitText";
import { RotatingGlobe } from "./ui/RotatingGlobe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = "ducduc1022000@gmail.com";
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark Parallax Drift
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Globe Parallax Floating Entrance
      if (globeRef.current) {
        gsap.fromTo(
          globeRef.current,
          { y: 45, opacity: 0.8 },
          {
            y: -15,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
      }

      if (contentRef.current) {
        const children = Array.from(contentRef.current.children);
        gsap.from(children, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="py-36 md:py-44 px-4 sm:px-6 lg:px-8 border-t border-foreground/10 relative overflow-hidden"
    >
      {/* Parallax Background Typography */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute opacity-80 -top-10 left-1/2 -translate-x-1/2 text-[14vw] font-black tracking-tighter text-foreground/[0.025] dark:text-white/[0.025] select-none pointer-events-none whitespace-nowrap z-0"
      >
        LET&apos;S CONNECT
      </div>

      <div
        ref={contentRef}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-14 lg:gap-10 relative z-10"
      >
        {/* Left Column with Airy Spacing */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-5">
            <MdAlternateEmail className="w-4 h-4" />
            {t.footer.badge}
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 text-foreground leading-[1.08]">
            <SplitText text={t.footer.talk} />{" "}
            <SplitText text={t.footer.talkHighlight} gradient />
          </h2>

          <p className="text-base sm:text-xl text-foreground/75 dark:text-zinc-300 mb-10 leading-relaxed font-normal">
            {t.footer.desc}
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/ducnguyen1002"
              target="_blank"
              rel="noopener noreferrer"
              className="w-13 h-13 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground transition-all hover:scale-110 shadow-sm"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-13 h-13 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-[#1a73e8] dark:text-[#8ab4f8] transition-all hover:scale-110 shadow-sm"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-13 h-13 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground transition-all hover:scale-110 shadow-sm"
              aria-label="Twitter / X"
              title="Twitter / X"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Center/Right Column: Rotating 3D Globe + Contact Capsule */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-between lg:justify-end gap-8 sm:gap-10">
          {/* Interactive Spinning Globe */}
          <div ref={globeRef} className="shrink-0 flex justify-center">
            <RotatingGlobe size={260} />
          </div>

          {/* Liquid Glass Email Capsule */}
          <div className="w-full sm:w-auto flex flex-col items-start gap-4">
            <div className="liquid-glass rounded-3xl p-6 sm:p-7 w-full sm:w-[340px] md:w-[380px]">
              <div className="text-xs uppercase font-bold text-muted tracking-wider mb-3 flex items-center gap-2">
                <MdEmail className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
                {t.footer.inboxLabel}
              </div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-foreground/10">
                <span className="font-mono text-sm sm:text-base text-foreground font-semibold truncate">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-full hover:bg-foreground/10 transition-colors text-muted hover:text-foreground cursor-pointer"
                  title={t.footer.copySuccess}
                >
                  {copied ? (
                    <MdCheck className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <MdContentCopy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-muted">
                  {t.footer.availabilityLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t.footer.availabilityValue}
                </span>
              </div>
            </div>

            <div className="text-xs text-muted font-normal max-w-sm px-1">
              {t.footer.rights}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
