"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Globe, FileText, CheckCircle2 } from "lucide-react";
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
    status?: string;
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
          {/* Backdrop with Liquid Glass Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xl z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 sm:inset-8 md:inset-16 z-[101] pointer-events-none flex items-center justify-center p-2 sm:p-4"
          >
            <div className="w-full max-w-4xl bg-white/95 dark:bg-[#070e18]/95 backdrop-blur-2xl rounded-3xl border border-[#0a192f]/10 dark:border-blue-200/15 shadow-[0_25px_60px_-15px_rgba(10,25,47,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto max-h-[90vh] overflow-hidden">
              {/* Executive Document Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between gap-4 bg-foreground/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-foreground/20" />
                    <div className="w-3 h-3 rounded-full bg-foreground/20" />
                    <div className="w-3 h-3 rounded-full bg-foreground/20" />
                  </div>
                  <span className="font-mono text-xs text-muted ml-3 hidden sm:inline-block">
                    {project.id || "CASE FILE"} // OFFICIAL RECORD
                  </span>
                </div>

                <div className="flex-1 max-w-sm bg-foreground/5 rounded-lg px-3 py-1 font-mono text-xs text-muted flex items-center gap-2 truncate border border-foreground/10">
                  <Globe className="w-3 h-3 shrink-0 opacity-60" />
                  <span className="truncate">{project.live}</span>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-foreground/5 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dossier Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left: Image Specimen */}
                  <div className="md:col-span-6 rounded-2xl overflow-hidden border border-foreground/15 bg-foreground/5 aspect-16/10 relative shadow-inner">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 font-mono text-[10px] bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-md">
                      SPECIMEN PREVIEW
                    </div>
                  </div>

                  {/* Right: Technical Details */}
                  <div className="md:col-span-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="office-stamp rounded bg-foreground/5 border-foreground/15 text-[10px] text-foreground">
                        {project.status || "VERIFIED"}
                      </span>
                      <span className="font-mono text-[11px] text-muted uppercase">
                        {project.classification || "PRODUCTION WEB SYSTEM"}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black tracking-tight mb-4 text-foreground">
                      {project.title}
                    </h2>

                    <p className="text-foreground/85 dark:text-zinc-200 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Metadata tags */}
                    <div className="mb-6">
                      <div className="font-mono text-xs uppercase text-[#0052ff] dark:text-[#38bdf8] font-bold tracking-wider mb-2">
                        STACK SPECIFICATION:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-[#0052ff] dark:text-[#38bdf8]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-foreground/15 flex flex-wrap gap-3 mt-auto">
                      <Button
                        variant="primary"
                        className="flex-1 rounded-xl gap-2 font-mono text-xs text-white"
                        onClick={() => window.open(project.live, "_blank")}
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> {t.projects.live}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl gap-2 font-mono text-xs font-bold"
                        onClick={() => window.open(project.github || "#", "_blank")}
                      >
                        <Github className="w-3.5 h-3.5" /> {t.projects.code}
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
