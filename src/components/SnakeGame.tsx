"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RefreshCw, Play, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Binary, Terminal } from "lucide-react";
import { useLanguage } from "./Providers";
import { Button } from "./ui/Button";

const GRID_SIZE = 20;
const INITIAL_SPEED = 140;
const SPEED_INCREMENT = 2;

type Point = { x: number; y: number };

export function SnakeGame() {
  const { t } = useLanguage();
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
        (segment: Point) => segment.x === newFood!.x && segment.y === newFood!.y,
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
      if (prevSnake.some((segment: Point) => segment.x === newHead.x && segment.y === newHead.y)) {
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

  return (
    <section id="game" className="py-24 px-4 bg-background border-t border-foreground/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-6 border-b border-foreground/10 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              SECTION 04 // SIMULATION TERMINAL
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              {t.snake?.title || "MAINFRAME TERMINAL"}
              <span className="office-stamp rounded text-xs bg-foreground/5 border-foreground/15 text-muted">
                {t.snake?.badge || "SYS 01"}
              </span>
            </h2>
            <p className="text-muted text-sm sm:text-base mt-2 max-w-md">
              {t.snake?.desc || "Navigate data cursor across the mainframe grid. Collect memory nodes to expand."}
            </p>
          </div>

          {/* Metric Badges */}
          <div className="flex gap-3">
            <div className="liquid-glass rounded-xl px-5 py-3 border border-foreground/15 min-w-[100px]">
              <div className="font-mono text-[10px] uppercase text-muted tracking-wider mb-1">
                {t.snake?.score || "INDEX"}
              </div>
              <div className="font-mono text-2xl font-bold text-foreground">{score}</div>
            </div>

            <div className="liquid-glass rounded-xl px-5 py-3 border border-foreground/15 min-w-[100px]">
              <div className="font-mono text-[10px] uppercase text-muted tracking-wider mb-1">
                {t.snake?.highScore || "PEAK"}
              </div>
              <div className="font-mono text-2xl font-bold text-foreground">{highScore}</div>
            </div>
          </div>
        </div>

        {/* Terminal Screen Container */}
        <div className="liquid-glass rounded-3xl p-3 sm:p-5 border border-foreground/20 shadow-2xl relative max-w-2xl mx-auto">
          {/* Top Terminal Bar */}
          <div className="flex items-center justify-between pb-3 px-2 border-b border-foreground/10 text-xs font-mono text-muted">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
              </div>
              <span className="ml-2">TERMINAL://SIM_GRID_20x20</span>
            </div>
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> ONLINE
            </span>
          </div>

          {/* Grid Viewport */}
          <div className="relative aspect-square md:aspect-video w-full rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-inner mt-3">
            {/* Fine phosphor scanlines / grid */}
            <div
              className="grid w-full h-full p-2"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
              }}
            >
              {/* Render Snake */}
              {snake.map((segment: Point, i: number) => {
                const isHead = i === 0;
                return (
                  <div
                    key={i}
                    style={{
                      gridColumn: segment.x + 1,
                      gridRow: segment.y + 1,
                    }}
                    className={`rounded-sm transition-all duration-75 ${
                      isHead
                        ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-white"
                        : "bg-zinc-400 dark:bg-zinc-500 border border-zinc-900"
                    }`}
                  />
                );
              })}

              {/* Render Data Node (Food) */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{
                  gridColumn: food.x + 1,
                  gridRow: food.y + 1,
                }}
                className="flex items-center justify-center p-0.5"
              >
                <div className="w-full h-full rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                </div>
              </motion.div>
            </div>

            {/* Start / Game Over Overlay */}
            <AnimatePresence>
              {!isStarted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-6 text-center z-10"
                >
                  <div className="liquid-glass rounded-2xl p-6 sm:p-8 max-w-sm w-full border border-white/20 text-foreground">
                    {isGameOver ? (
                      <>
                        <Trophy className="w-10 h-10 mx-auto mb-3 text-foreground opacity-80" />
                        <h3 className="text-2xl font-bold tracking-tight mb-1 uppercase">
                          {t.snake?.gameOver || "SIMULATION CONCLUDED"}
                        </h3>
                        <p className="font-mono text-sm text-muted mb-6">
                          Recorded Index: <span className="font-bold text-foreground">{score}</span>
                        </p>
                        <Button onClick={resetGame} variant="primary" className="w-full justify-center rounded-xl font-mono text-xs">
                          <RefreshCw className="w-3.5 h-3.5 mr-2" /> {t.snake?.playAgain || "REBOOT TERMINAL"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Binary className="w-10 h-10 mx-auto mb-3 text-foreground opacity-80" />
                        <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">
                          {t.snake?.ready || "Ready to initialize?"}
                        </h3>
                        <p className="font-mono text-xs text-muted mb-6">
                          Use keyboard arrow keys or touch controls to direct the data cursor.
                        </p>
                        <Button onClick={resetGame} size="md" variant="primary" className="w-full justify-center rounded-xl font-mono text-xs">
                          <Play className="w-3.5 h-3.5 mr-2" /> {t.snake?.start || "INITIALIZE TERMINAL"}
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* D-Pad Controls for Mobile */}
          <div className="mt-6 flex flex-col items-center gap-2 md:hidden">
            <button
              onClick={() => setDirectionSafe({ x: 0, y: -1 })}
              className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center border border-foreground/15 active:scale-95 transition-transform"
              aria-label="Up"
            >
              <ChevronUp className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setDirectionSafe({ x: -1, y: 0 })}
                className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center border border-foreground/15 active:scale-95 transition-transform"
                aria-label="Left"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => setDirectionSafe({ x: 0, y: 1 })}
                className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center border border-foreground/15 active:scale-95 transition-transform"
                aria-label="Down"
              >
                <ChevronDown className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => setDirectionSafe({ x: 1, y: 0 })}
                className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center border border-foreground/15 active:scale-95 transition-transform"
                aria-label="Right"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Desktop Instruction */}
          <p className="hidden md:block text-center mt-4 font-mono text-xs text-muted">
            SYS COMMAND: USE ARROW KEYS [ ↑ ↓ ← → ] FOR NAVIGATION
          </p>
        </div>
      </div>
    </section>
  );
}
