"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
	const [isHovering, setIsHovering] = useState(false);
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
		};

		const checkHover = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isInteractive = target.closest(
				"button, a, input, select, textarea, [role='button']",
			);
			setIsHovering(!!isInteractive);
		};

		window.addEventListener("mousemove", moveCursor);
		window.addEventListener("mouseover", checkHover);

		return () => {
			window.removeEventListener("mousemove", moveCursor);
			window.removeEventListener("mouseover", checkHover);
		};
	}, [cursorX, cursorY]);

	return (
		<motion.div
			className="fixed top-0 left-0 pointer-events-none z-[99999] hidden lg:block"
			style={{
				x: cursorX,
				y: cursorY,
				translateX: "-2px",
				translateY: "-2px",
				willChange: "transform",
			}}
		>
			<motion.div
				animate={{
					scale: isHovering ? 1.4 : 1,
					rotate: isHovering ? -15 : 0,
					color: isHovering
						? "var(--neo-purple)"
						: "var(--foreground)",
				}}
				transition={{ type: "spring", stiffness: 500, damping: 30 }}
				className="relative"
			>
				<svg
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					{/* Shadow - Manual instead of drop-shadow filter for performance */}
					<path
						d="M7.5 5.21V22.8L12.11 18.19L15.51 24.06L18.51 22.33L15.11 16.46L21.43 16.46L7.5 5.21Z"
						fill={isHovering ? "black" : "rgba(0,0,0,0.3)"}
						className="dark:fill-white/30"
					/>
					{/* Main Pointer */}
					<path
						d="M5.5 3.21V20.8L10.11 16.19L13.51 22.06L16.51 20.33L13.11 14.46L19.43 14.46L5.5 3.21Z"
						fill="currentColor"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinejoin="round"
					/>
				</svg>
			</motion.div>
			{isHovering && (
				<motion.div
					initial={{ opacity: 0, x: 10 }}
					animate={{ opacity: 1, x: 20 }}
					className="absolute top-4 left-0 font-black text-[10px] bg-neo-yellow px-2 py-0.5 border-2 border-black text-black whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
				>
					click me
				</motion.div>
			)}
		</motion.div>
	);
}
