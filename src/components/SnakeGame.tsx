"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  RefreshCw,
  Play,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bug,
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useLanguage } from "./Providers";
import { Button } from "./ui/Button";

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;

type Point = { x: number; y: number };

export function SnakeGame() {
  const { t, language } = useLanguage();
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const setDirectionSafe = useCallback((newDir: Point) => {
    setDirection((prev: Point) => {
      // Prevent reversing directly
      if (newDir.x !== 0 && prev.x !== 0) return prev;
      if (newDir.y !== 0 && prev.y !== 0) return prev;
      return newDir;
    });
  }, []);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Don't spawn food on snake
      const isOnSnake = snake.some(
        (segment: Point) =>
          segment.x === newFood!.x && segment.y === newFood!.y,
      );
      if (!isOnSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 10 });
    setDirection({ x: 0, y: -1 });
    setIsGameOver(false);
    setIsStarted(true);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || !isStarted) return;

    setSnake((prevSnake: Point[]) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (
        prevSnake.some(
          (segment: Point) =>
            segment.x === newHead.x && segment.y === newHead.y,
        )
      ) {
        setIsGameOver(true);
        setIsStarted(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s: number) => {
          const newScore = s + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFood(generateFood());
        setSpeed((prev: number) => Math.max(prev - SPEED_INCREMENT, 50));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isStarted, highScore, generateFood]);

  useEffect(() => {
    const saved = localStorage.getItem("snake-high-score");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("snake-high-score", highScore.toString());
  }, [highScore]);

  useEffect(() => {
    if (isStarted && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isStarted, isGameOver, moveSnake, speed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          setDirectionSafe({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirectionSafe({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirectionSafe({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirectionSafe({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setDirectionSafe]);

  const getRainbowColor = (index: number) => {
    const rainbow = [
      "#FF0000", // Red
      "#FF7F00", // Orange
      "#FFFF00", // Yellow
      "#00FF00", // Green
      "#0000FF", // Blue
      "#4B0082", // Indigo
      "#8B00FF", // Violet
    ];
    return rainbow[index % rainbow.length];
  };

  return (
    <div id="game" className="fb-card overflow-hidden">
      {/* ── FB Post Header ── */}
      <div className="flex items-start justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--fb-blue) 0%, #7c3aed 100%)",
            }}
          >
            DN
          </div>
          <div>
            <p
              className="text-[15px] font-semibold"
              style={{ color: "var(--fb-text)" }}
            >
              Duc Nguyen
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: "var(--fb-muted)" }}>
                7 ngày trước
              </span>
              <span style={{ color: "var(--fb-muted)" }}>·</span>
              <Globe className="h-3 w-3" style={{ color: "var(--fb-muted)" }} />
            </div>
          </div>
        </div>
        <button
          className="fb-icon-btn"
          style={{ width: "36px", height: "36px" }}
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      {/* Post text */}
      <div className="px-4 pb-3">
        <p
          className="text-[15px] leading-relaxed"
          style={{ color: "var(--fb-text)" }}
        >
          🎮 {t.snake?.badge || "FOR FUN"} —{" "}
          <span className="font-semibold">{t.snake?.title || "Mini Game"}</span>
        </p>
        <p
          className="mt-1 text-[15px] leading-relaxed"
          style={{ color: "var(--fb-text)", opacity: 0.85 }}
        >
          {t.snake?.desc ||
            "Use arrow keys to control the snake. Eat the bugs to grow!"}
        </p>
      </div>
      {/* Score badges */}
      <div className="flex gap-3 px-4 pb-4">
        <div
          className="fb-card min-w-[80px] px-5 py-3 text-center"
          style={{ background: "var(--fb-icon-bg)", boxShadow: "none" }}
        >
          <div
            className="mb-1 text-xs font-medium tracking-wider uppercase"
            style={{ color: "var(--fb-muted)" }}
          >
            {t.snake?.score || "Score"}
          </div>
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--fb-blue)" }}
          >
            {score}
          </div>
        </div>
        <div
          className="fb-card min-w-[80px] px-5 py-3 text-center"
          style={{ background: "var(--fb-icon-bg)", boxShadow: "none" }}
        >
          <div
            className="mb-1 text-xs font-medium tracking-wider uppercase"
            style={{ color: "var(--fb-muted)" }}
          >
            {t.snake?.highScore || "Best"}
          </div>
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--fb-text)" }}
          >
            {highScore}
          </div>
        </div>
      </div>
      {/* Game area */}
      <div
        style={{
          borderTop: "1px solid var(--fb-border)",
          padding: "12px 16px",
        }}
      >
        <div
          className="relative mx-auto aspect-square w-full max-w-2xl overflow-hidden rounded-xl md:aspect-video"
          style={{
            background: "var(--fb-card)",
            border: "1px solid var(--fb-border)",
          }}
        >
          {/* Grid Layout */}
          <div
            className="grid h-full w-full"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {/* Render Snake */}
            {snake.map((segment: Point, i: number) => (
              <div
                key={i}
                style={{
                  gridColumn: segment.x + 1,
                  gridRow: segment.y + 1,
                  backgroundColor: getRainbowColor(i),
                }}
                className="border-[1px] border-black/40"
              />
            ))}

            {/* Render Food (Bug) */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              style={{
                gridColumn: food.x + 1,
                gridRow: food.y + 1,
              }}
              className="flex items-center justify-center"
            >
              <Bug className="h-full w-full fill-rose-500 p-[2px] text-rose-500" />
            </motion.div>
          </div>

          {/* Game Over / Start Overlays */}
          <AnimatePresence>
            {!isStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/60 p-6 text-center backdrop-blur-sm"
              >
                <div
                  className="w-full max-w-sm rounded-xl p-8"
                  style={{
                    background: "var(--fb-card)",
                    border: "1px solid var(--fb-border)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  }}
                >
                  {isGameOver ? (
                    <>
                      <Trophy
                        className="mx-auto mb-4 h-12 w-12"
                        style={{ color: "#f59e0b" }}
                      />
                      <h3
                        className="mb-2 text-2xl font-bold"
                        style={{ color: "var(--fb-text)" }}
                      >
                        {t.snake?.gameOver || "Game Over"}
                      </h3>
                      <p className="mb-6" style={{ color: "var(--fb-muted)" }}>
                        Score:{" "}
                        <span
                          className="font-semibold"
                          style={{ color: "var(--fb-blue)" }}
                        >
                          {score}
                        </span>
                      </p>
                      <Button
                        onClick={resetGame}
                        className="w-full justify-center"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />{" "}
                        {t.snake?.playAgain || "Play Again"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Play
                        className="mx-auto mb-4 h-12 w-12"
                        style={{ color: "var(--fb-blue)" }}
                      />
                      <h3
                        className="mb-5 text-2xl font-bold"
                        style={{ color: "var(--fb-text)" }}
                      >
                        {t.snake?.ready || "Ready to play?"}
                      </h3>
                      <Button
                        onClick={resetGame}
                        size="lg"
                        className="w-full justify-center"
                      >
                        {t.snake?.start || "Start Game"}
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* D-Pad Controls for Mobile */}
        <div className="mt-12 flex flex-col items-center gap-2 md:hidden">
          <button
            onClick={() => setDirectionSafe({ x: 0, y: -1 })}
            className="flex h-14 w-14 items-center justify-center rounded-xl transition-all active:scale-95"
            style={{
              background: "var(--fb-icon-bg)",
              color: "var(--fb-muted)",
            }}
          >
            <ChevronUp className="h-6 w-6" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setDirectionSafe({ x: -1, y: 0 })}
              className="flex h-14 w-14 items-center justify-center rounded-xl transition-all active:scale-95"
              style={{
                background: "var(--fb-icon-bg)",
                color: "var(--fb-muted)",
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setDirectionSafe({ x: 0, y: 1 })}
              className="flex h-14 w-14 items-center justify-center rounded-xl transition-all active:scale-95"
              style={{
                background: "var(--fb-icon-bg)",
                color: "var(--fb-muted)",
              }}
            >
              <ChevronDown className="h-6 w-6" />
            </button>
            <button
              onClick={() => setDirectionSafe({ x: 1, y: 0 })}
              className="flex h-14 w-14 items-center justify-center rounded-xl transition-all active:scale-95"
              style={{
                background: "var(--fb-icon-bg)",
                color: "var(--fb-muted)",
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Desktop Hint */}
        <p
          className="mt-6 hidden text-center text-sm font-medium md:block"
          style={{ color: "var(--fb-muted)", opacity: 0.7 }}
        >
          Tip: Use Keyboard Arrow Keys to Play
        </p>
      </div>{" "}
      {/* end game area */}
      {/* ── Post reaction bar ── */}
      <div
        style={{ borderTop: "1px solid var(--fb-border)", margin: "0 16px" }}
      />
      <div className="flex px-2 py-1">
        <button className="fb-post-action">
          <ThumbsUp className="h-5 w-5" />{" "}
          {language === "vi" ? "Thích" : "Like"}
        </button>
        <button className="fb-post-action">
          <MessageCircle className="h-5 w-5" />{" "}
          {language === "vi" ? "Bình luận" : "Comment"}
        </button>
        <button className="fb-post-action">
          <Share2 className="h-5 w-5" />{" "}
          {language === "vi" ? "Chia sẻ" : "Share"}
        </button>
      </div>
    </div>
  );
}
