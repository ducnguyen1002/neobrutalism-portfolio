"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "./Providers";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const STORIES = [
  {
    id: 1,
    author: "Duc Nguyen",
    avatar: "DN",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
    isCreate: true,
  },
  {
    id: 2,
    author: "Minh Tuấn",
    avatar: "MT",
    color: "#1b74e4",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
  },
  {
    id: 3,
    author: "Lan Anh",
    avatar: "LA",
    color: "#db2777",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
  },
  {
    id: 4,
    author: "Quang Huy",
    avatar: "QH",
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    id: 5,
    author: "Thu Hương",
    avatar: "TH",
    color: "#7c3aed",
    image:
      "https://images.unsplash.com/photo-1531297172867-4d6520b22a27?w=400&q=80",
  },
  {
    id: 6,
    author: "Thanh Long",
    avatar: "TL",
    color: "#d97706",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80",
  },
];

export function StoryCarousel() {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="relative mb-4 w-full">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 active:scale-95"
          style={{ border: "1px solid var(--fb-border)" }}
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 active:scale-95"
          style={{ border: "1px solid var(--fb-border)" }}
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="hide-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pt-1 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {STORIES.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="group relative shrink-0 cursor-pointer snap-start overflow-hidden rounded-xl"
            style={{
              width: "140px",
              height: "250px",
              background: "var(--fb-card)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {story.isCreate ? (
              /* ── Create Story Card ── */
              <div className="flex h-full w-full flex-col">
                <div className="flex-1 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80"
                    alt="Profile"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div
                  className="relative flex h-[56px] flex-col items-center justify-end pb-2"
                  style={{ background: "var(--fb-card)" }}
                >
                  {/* Blue Plus Button */}
                  <div
                    className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full border-4"
                    style={{
                      background: "var(--fb-blue)",
                      borderColor: "var(--fb-card)",
                    }}
                  >
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <p
                    className="text-[13px] font-semibold tracking-tight"
                    style={{ color: "var(--fb-text)" }}
                  >
                    {language === "vi" ? "Tạo tin" : "Create story"}
                  </p>
                </div>
              </div>
            ) : (
              /* ── Friend Story Card ── */
              <div className="relative h-full w-full">
                <img
                  src={story.image}
                  alt={story.author}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />

                {/* Avatar (Top Left) */}
                <div
                  className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full border-4 text-sm font-bold text-white"
                  style={{
                    background: story.color,
                    borderColor: "var(--fb-blue)",
                  }}
                >
                  {story.avatar}
                </div>

                {/* Name (Bottom) */}
                <p className="absolute right-3 bottom-3 left-3 text-[13px] leading-tight font-semibold text-white drop-shadow-md">
                  {story.author}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
