"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { useTheme } from "next-themes";
import { useLanguage } from "./Providers";
import {
  MdWbSunny,
  MdDarkMode,
  MdTranslate,
  MdMenu,
  MdClose,
  MdCode,
  MdArrowOutward,
} from "react-icons/md";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:px-4 sm:py-4 md:py-6 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 liquid-glass ${
          scrolled
            ? "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.8)]"
            : "shadow-[0_8px_24px_-6px_rgba(0,0,0,0.06)]"
        }`}
      >
        <div className="flex items-center justify-between px-3.5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3.5">
          {/* Brand with Clean Google Code Icon */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group select-none shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#8b5cf6] p-[1.5px] flex items-center justify-center shadow-[0_0_14px_rgba(26,115,232,0.35)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#0c0e17] flex items-center justify-center">
                <MdCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 font-bold tracking-tight text-sm sm:text-base text-foreground">
              <span>DucNV</span>
              <span className="text-[11px] font-semibold text-muted px-2 py-0.5 rounded-full bg-foreground/5 hidden sm:inline-block">
                Front-End Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Strictly Ordered by Section Sequence */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-foreground/85">
            <Link
              href="#about"
              className="px-3.5 py-2 rounded-full hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {t.nav.about}
            </Link>
            <Link
              href="#experience"
              className="px-3.5 py-2 rounded-full hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {t.nav.experience}
            </Link>
            <Link
              href="#skills"
              className="px-3.5 py-2 rounded-full hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {t.nav.skills}
            </Link>
            <Link
              href="#projects"
              className="px-3.5 py-2 rounded-full hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {t.nav.projects}
            </Link>
            <Link
              href="#faq"
              className="px-3.5 py-2 rounded-full hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {t.nav.faq}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
              aria-label={theme === "dark" ? t.nav.light : t.nav.dark}
              title={theme === "dark" ? t.nav.light : t.nav.dark}
            >
              {!mounted ? (
                <div className="w-4 h-4" />
              ) : theme === "dark" ? (
                <MdWbSunny className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fbbc04] transition-transform hover:rotate-45" />
              ) : (
                <MdDarkMode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a73e8] transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
              className="h-8 sm:h-10 px-2 sm:px-3 rounded-full flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
              title={
                language === "vi"
                  ? "Switch to English"
                  : "Chuyển sang Tiếng Việt"
              }
            >
              <MdTranslate className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#8ab4f8]" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Google Aurora CTA Button */}
            <div className="hidden sm:block">
              <Button
                size="sm"
                variant="aurora"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="gap-1.5"
              >
                {t.nav.hire}
                <MdArrowOutward className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 sm:p-2 rounded-full text-foreground hover:bg-foreground/5 md:hidden transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <MdClose className="w-5 h-5" />
              ) : (
                <MdMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Strictly Ordered by Section Sequence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-foreground/10 px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-1.5 sm:gap-2 font-medium overflow-hidden"
            >
              <Link
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl text-foreground hover:bg-foreground/5 flex items-center justify-between"
              >
                <span>{t.nav.about}</span>
                <span className="text-xs text-muted font-mono">01</span>
              </Link>
              <Link
                href="#experience"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl text-foreground hover:bg-foreground/5 flex items-center justify-between"
              >
                <span>{t.nav.experience}</span>
                <span className="text-xs text-muted font-mono">02</span>
              </Link>
              <Link
                href="#skills"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl text-foreground hover:bg-foreground/5 flex items-center justify-between"
              >
                <span>{t.nav.skills}</span>
                <span className="text-xs text-muted font-mono">03</span>
              </Link>
              <Link
                href="#workflow"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl text-foreground hover:bg-foreground/5 flex items-center justify-between"
              >
                <span>{t.nav.workflow}</span>
                <span className="text-xs text-muted font-mono">04</span>
              </Link>
              <Link
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl text-foreground hover:bg-foreground/5 flex items-center justify-between"
              >
                <span>{t.nav.projects}</span>
                <span className="text-xs text-muted font-mono">05</span>
              </Link>
              <Link
                href="#standards"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl text-foreground hover:bg-foreground/5 flex items-center justify-between"
              >
                <span>{t.nav.standards}</span>
                <span className="text-xs text-muted font-mono">06</span>
              </Link>
              <Link
                href="#faq"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl text-foreground hover:bg-foreground/5 flex items-center justify-between"
              >
                <span>{t.nav.faq}</span>
                <span className="text-xs text-muted font-mono">07</span>
              </Link>

              <div className="pt-3 border-t border-foreground/10">
                <Button
                  size="md"
                  variant="aurora"
                  className="w-full justify-center gap-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {t.nav.hire}
                  <MdArrowOutward className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
