"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
	const [isHovering, setIsHovering] = useState(false);
	const [cursorText, setCursorText] = useState("");
	const mouseX = useMotionValue(-100);
	const mouseY = useMotionValue(-100);

	const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
	const cursorX = useSpring(mouseX, springConfig);
	const cursorY = useSpring(mouseY, springConfig);

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};

		const checkHover = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const interactive = target.closest(
				"button, a, input, select, textarea, [role='button'], .cursor-pointer"
			);

			if (interactive) {
				setIsHovering(true);
				if (interactive.getAttribute("aria-label")) {
					setCursorText("");
				} else if (interactive.tagName === "A" || interactive.closest("a")) {
					setCursorText("OPEN");
				} else {
					setCursorText("SELECT");
				}
			} else {
				setIsHovering(false);
				setCursorText("");
			}
		};

		window.addEventListener("mousemove", moveCursor);
		window.addEventListener("mouseover", checkHover);

		return () => {
			window.removeEventListener("mousemove", moveCursor);
			window.removeEventListener("mouseover", checkHover);
		};
	}, [mouseX, mouseY]);

	return (
		<>
			{/* Center precision pinpoint */}
			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-[99999] hidden lg:block"
				style={{
					x: mouseX,
					y: mouseY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			>
				<div className="w-1.5 h-1.5 rounded-full bg-foreground" />
			</motion.div>

			{/* Outer Liquid Glass Trailing Ring */}
			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-[99998] hidden lg:block"
				style={{
					x: cursorX,
					y: cursorY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			>
				<motion.div
					animate={{
						width: isHovering ? 50 : 28,
						height: isHovering ? 50 : 28,
						backgroundColor: isHovering
							? "rgba(10, 25, 47, 0.12)"
							: "rgba(10, 25, 47, 0.04)",
					}}
					transition={{ type: "spring", stiffness: 450, damping: 25 }}
					className="rounded-full border border-blue-900/30 dark:border-blue-300/35 backdrop-blur-[2px] flex items-center justify-center shadow-sm"
				>
					{isHovering && cursorText && (
						<motion.span
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							className="font-mono text-[8px] font-bold tracking-widest text-foreground uppercase"
						>
							{cursorText}
						</motion.span>
					)}
				</motion.div>
			</motion.div>
		</>
	);
}
