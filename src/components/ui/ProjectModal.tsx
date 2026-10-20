"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdOpenInNew, MdLanguage, MdCheckCircle } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { useEffect } from "react";
import { Button } from "./Button";
import { useLanguage } from "../Providers";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id?: string;
    classification?: string;
    title: string;
    description: string;
    image: string;
    live: string;
    github?: string;
    tags: string[];
    metrics?: string;
  } | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Frosted Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-2xl z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-2 sm:inset-6 md:inset-12 z-[101] pointer-events-none flex items-center justify-center p-1 sm:p-4"
          >
            <div className="w-full max-w-5xl liquid-glass rounded-2xl sm:rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] flex flex-col pointer-events-auto max-h-[92vh] sm:max-h-[90vh] overflow-hidden">
              {/* Header Bar */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-foreground/10 flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                  <span className="font-semibold text-xs tracking-wider uppercase text-muted">
                    {project.classification}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted bg-foreground/5 px-3 py-1 rounded-full border border-foreground/10">
                    <MdLanguage className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[200px]">{project.live}</span>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <MdClose className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-start">
                  {/* Left: Cinematic Preview */}
                  <div className="md:col-span-6 rounded-xl sm:rounded-2xl overflow-hidden border border-foreground/10 bg-black/10 aspect-16/10 relative shadow-inner">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                      <MdCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      {project.metrics || "Active"}
                    </div>
                  </div>

                  {/* Right: Technical Specs */}
                  <div className="md:col-span-6 flex flex-col">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 sm:mb-4 text-foreground">
                      {project.title}
                    </h2>

                    <p className="text-foreground/80 dark:text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Chips */}
                    <div className="mb-6 sm:mb-8">
                      <div className="text-xs uppercase font-bold text-muted tracking-wider mb-2">
                        {t.projects.stackLabel}
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-foreground/5 dark:bg-white/10 text-foreground font-semibold border border-foreground/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 sm:pt-6 border-t border-foreground/10 flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-auto">
                      <Button
                        variant="aurora"
                        className="w-full sm:flex-1 gap-2 justify-center py-2.5 sm:py-3 text-xs sm:text-sm font-semibold"
                        onClick={() => window.open(project.live, "_blank")}
                      >
                        <MdOpenInNew className="w-4 h-4" /> {t.projects.live}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full sm:flex-1 gap-2 justify-center py-2.5 sm:py-3 text-xs sm:text-sm font-medium"
                        onClick={() => window.open(project.github || "#", "_blank")}
                      >
                        <FaGithub className="w-4 h-4" /> {t.projects.code}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
