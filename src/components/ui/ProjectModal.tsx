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

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  "Next.js": { bg: "#e4e6eb", color: "#050505" },
  TailwindCSS: { bg: "#dbeafe", color: "#1d4ed8" },
  Directus: { bg: "#ede9fe", color: "#6d28d9" },
  Echarts: { bg: "#fef3c7", color: "#92400e" },
  GSAP: { bg: "#d1fae5", color: "#065f46" },
  GraphQL: { bg: "#fce7f3", color: "#9d174d" },
};

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
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
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(0,0,0,0.65)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-4 z-[101] flex items-center justify-center md:inset-12 lg:inset-20"
          >
            <div
              className="pointer-events-auto flex w-full max-w-4xl flex-col overflow-hidden"
              style={{
                background: "var(--fb-card)",
                borderRadius: "8px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                maxHeight: "calc(100vh - 96px)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: "1px solid var(--fb-border)" }}
              >
                <div
                  className="flex items-center gap-2"
                  style={{ color: "var(--fb-muted)" }}
                >
                  <Globe
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--fb-blue)" }}
                  />
                  <span className="truncate text-sm">{project.live}</span>
                </div>
                <button
                  onClick={onClose}
                  className="fb-icon-btn ml-3 shrink-0"
                  style={{ width: "36px", height: "36px" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5 md:p-8">
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
                  {/* Image */}
                  <div
                    className="aspect-video overflow-hidden rounded-lg"
                    style={{ background: "var(--fb-icon-bg)" }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex h-full flex-col">
                    <h2
                      className="mb-3 text-xl font-bold tracking-tight"
                      style={{ color: "var(--fb-text)" }}
                    >
                      {project.title}
                    </h2>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => {
                        const s = TAG_COLORS[tag] ?? {
                          bg: "var(--fb-icon-bg)",
                          color: "var(--fb-text)",
                        };
                        return (
                          <span
                            key={tag}
                            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{ background: s.bg, color: s.color }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    <p
                      className="mb-6 flex-1 text-sm leading-relaxed"
                      style={{ color: "var(--fb-text)", opacity: 0.85 }}
                    >
                      {project.description}
                    </p>

                    <div
                      className="flex flex-wrap gap-3 pt-4"
                      style={{ borderTop: "1px solid var(--fb-border)" }}
                    >
                      <Button
                        className="flex-1 justify-center"
                        onClick={() => window.open(project.live, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" /> {t.projects.live}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 justify-center"
                        onClick={() =>
                          window.open(project.github || "#", "_blank")
                        }
                      >
                        <Github className="h-4 w-4" /> {t.projects.code}
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
