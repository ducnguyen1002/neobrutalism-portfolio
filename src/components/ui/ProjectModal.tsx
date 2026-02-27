"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Globe } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./Button";
import { useLanguage } from "../Providers";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: string;
    live: string;
    github?: string;
    tags: string[];
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-[101] pointer-events-none flex items-center justify-center p-4"
          >
            <div className="w-full max-w-5xl bg-background neo-brutalism-border neo-brutalism-shadow flex flex-col pointer-events-auto max-h-full overflow-hidden">
              {/* Browser-like Header */}
              <div className="bg-neo-blue border-b-4 border-black p-3 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full border-2 border-black bg-neo-red" />
                  <div className="w-3 h-3 rounded-full border-2 border-black bg-neo-yellow" />
                  <div className="w-3 h-3 rounded-full border-2 border-black bg-neo-green" />
                </div>
                <div className="flex-1 bg-white/20 border-2 border-black px-3 py-1 text-xs font-bold text-white flex items-center gap-2 overflow-hidden whitespace-nowrap">
                  <Globe className="w-3 h-3 shrink-0" />
                  {project.live}
                </div>
                <button
                  onClick={onClose}
                  className="bg-neo-red w-8 h-8 border-2 border-black flex items-center justify-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-x-0"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Image Preview */}
                  <div className="neo-brutalism-border bg-black/10 aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col h-full">
                    <h2 className="text-4xl font-black mb-4 dark:text-white uppercase">
                      {project.title}
                    </h2>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-neo-yellow border-2 border-black px-2 py-1 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xl font-bold mb-8 dark:text-zinc-300 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-4 pt-6 border-t-4 border-black/10 border-dashed">
                      <Button
                        className="flex-1"
                        onClick={() => window.open(project.live, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" /> {t.projects.live}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 px-8 dark:bg-black dark:text-white"
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
