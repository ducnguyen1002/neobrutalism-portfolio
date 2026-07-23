"use client";

import { motion } from "framer-motion";

const words = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Animation",
  "UI/UX",
  "Performance",
  "Accessibility",
];

const separator = (
  <span className="bg-muted-foreground/40 mx-2 inline-block h-1 w-1 rounded-full" />
);

export function Marquee() {
  const items = words.flatMap((word) => [word, null]);

  return (
    <div className="bg-surface overflow-hidden border-y border-[var(--border)] py-8">
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex items-center whitespace-nowrap"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-0">
            {items.map((item, j) =>
              item === null ? (
                <span
                  key={`sep-${j}`}
                  className="text-muted-foreground/30 mx-4"
                >
                  ·
                </span>
              ) : (
                <span
                  key={`${item}-${j}`}
                  className="text-muted-foreground mx-4 text-sm font-medium tracking-wide"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
