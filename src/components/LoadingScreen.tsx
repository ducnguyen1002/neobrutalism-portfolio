"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 18;
      });
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--fb-bg)" }}
        >
          {/* Facebook "f" logo */}
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--fb-blue)" }}
          >
            <span
              className="leading-none font-bold text-white"
              style={{
                fontSize: "2.5rem",
                fontFamily: "Georgia, serif",
                marginTop: "-4px",
              }}
            >
              f
            </span>
          </div>

          {/* Progress bar (Facebook-style blue thin bar) */}
          <div
            className="w-48 overflow-hidden rounded-full"
            style={{ height: "3px", background: "var(--fb-divider)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "var(--fb-blue)",
              }}
            />
          </div>

          {/* "facebook" text wordmark */}
          <p
            className="mt-8 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--fb-muted)" }}
          >
            DucNV Portfolio
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
