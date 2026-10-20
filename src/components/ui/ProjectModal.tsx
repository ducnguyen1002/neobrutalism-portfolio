"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Globe, Sparkles, Zap, Layers } from "lucide-react";
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
            className="fixed inset-4 sm:inset-8 md:inset-16 z-[101] pointer-events-none flex items-center justify-center p-2 sm:p-4"
          >
            <div className="w-full max-w-4xl bg-white dark:bg-[#0c0e17] rounded-3xl border border-black/10 dark:border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto max-h-[90vh] overflow-hidden">
              {/* Header Bar */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                  <span className="font-semibold text-xs tracking-wider uppercase text-muted">
                    {project.classification}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted bg-foreground/5 px-3 py-1 rounded-full border border-foreground/10">
                    <Globe className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[200px]">{project.live}</span>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-foreground/5 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left: Cinematic Preview */}
                  <div className="md:col-span-6 rounded-2xl overflow-hidden border border-foreground/10 bg-black/10 aspect-16/10 relative shadow-inner">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      {project.metrics || "Active"}
                    </div>
                  </div>

                  {/* Right: Technical Specs */}
                  <div className="md:col-span-6 flex flex-col">
                    <h2 className="text-3xl font-black tracking-tight mb-4 text-foreground">
                      {project.title}
                    </h2>

                    <p className="text-foreground/80 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Chips */}
                    <div className="mb-8">
                      <div className="text-xs uppercase font-bold text-muted tracking-wider mb-2.5">
                        ARCHITECTURE STACK:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1.5 rounded-full bg-foreground/5 dark:bg-white/10 text-foreground font-semibold border border-foreground/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 border-t border-foreground/10 flex flex-wrap gap-3 mt-auto">
                      <Button
                        variant="aurora"
                        className="flex-1 gap-2"
                        onClick={() => window.open(project.live, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" /> {t.projects.live}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={() => window.open(project.github || "#", "_blank")}
                      >
                        <Github className="w-4 h-4" /> {t.projects.code}
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
