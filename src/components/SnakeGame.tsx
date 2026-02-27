"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RefreshCw, Play, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Bug } from "lucide-react";
import { useLanguage } from "./Providers";
import { Button } from "./ui/Button";

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
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
      "#8B00FF"  // Violet
    ];
    return rainbow[index % rainbow.length];
  };

  return (
    <section id="game" className="py-20 px-4 bg-background border-t-4 border-black dark:border-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-5xl font-black mb-4 flex items-center gap-4 text-black dark:text-white uppercase">
              {t.snake?.title || "MINI GAME"}{" "}
              <span className="bg-neo-red px-4 py-1 neo-brutalism-border text-white text-2xl -rotate-2">
                {t.snake?.badge || "FOR FUN"}
              </span>
            </h2>
            <p className="font-bold text-xl text-black/70 dark:text-white/70 max-w-md">
              {t.snake?.desc || "Use arrow keys to control the snake. Eat red dots to grow!"}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-neo-green neo-brutalism-border p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-xs font-black uppercase mb-1">{t.snake?.score || "Score"}</div>
              <div className="text-3xl font-black">{score}</div>
            </div>
            <div className="bg-neo-yellow neo-brutalism-border p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-xs font-black uppercase mb-1">{t.snake?.highScore || "High"}</div>
              <div className="text-3xl font-black">{highScore}</div>
            </div>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-video w-full max-w-2xl mx-auto bg-white dark:bg-black/50 neo-brutalism-border neo-brutalism-shadow overflow-hidden">
          {/* Grid Layout */}
          <div
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
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
              <Bug className="w-full h-full text-neo-red fill-neo-red p-[2px]" />
            </motion.div>
          </div>

          {/* Game Over / Start Overlays */}
          <AnimatePresence>
            {!isStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 text-center"
              >
                <div className="bg-white dark:bg-[#1a1a1a] neo-brutalism-border p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
                  {isGameOver ? (
                    <>
                      <Trophy className="w-16 h-16 mx-auto mb-4 text-neo-yellow" />
                      <h3 className="text-4xl font-black mb-2 text-neo-red uppercase">
                        {t.snake?.gameOver || "GAME OVER!"}
                      </h3>
                      <p className="font-bold mb-6 text-xl">
                        Final Score: <span className="text-neo-purple">{score}</span>
                      </p>
                      <Button onClick={resetGame} className="w-full justify-center">
                        <RefreshCw className="w-5 h-5 mr-2" /> {t.snake?.playAgain || "PLAY AGAIN"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Play className="w-16 h-16 mx-auto mb-4 text-neo-green" />
                      <h3 className="text-3xl font-black mb-6 uppercase">
                        {t.snake?.ready || "Ready to play?"}
                      </h3>
                      <Button onClick={resetGame} size="lg" className="w-full justify-center">
                        {t.snake?.start || "START GAME"}
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
            className="w-16 h-16 bg-white dark:bg-zinc-800 neo-brutalism-border flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <ChevronUp className="w-8 h-8" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setDirectionSafe({ x: -1, y: 0 })}
              className="w-16 h-16 bg-white dark:bg-zinc-800 neo-brutalism-border flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => setDirectionSafe({ x: 0, y: 1 })}
              className="w-16 h-16 bg-white dark:bg-zinc-800 neo-brutalism-border flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
            <button
              onClick={() => setDirectionSafe({ x: 1, y: 0 })}
              className="w-16 h-16 bg-white dark:bg-zinc-800 neo-brutalism-border flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Desktop Hint */}
        <p className="hidden md:block text-center mt-8 font-bold opacity-50">
          Tip: Use Keyboard Arrow Keys to Play
        </p>
      </div>
    </section>
  );
}
