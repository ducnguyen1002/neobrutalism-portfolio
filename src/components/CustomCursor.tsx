"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
	const [isHovering, setIsHovering] = useState(false);
	const mouseX = useMotionValue(-100);
	const mouseY = useMotionValue(-100);

	const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
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
			setIsHovering(!!interactive);
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
			{/* Center dot */}
			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-[99999] hidden lg:block"
				style={{
					x: mouseX,
					y: mouseY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			>
				<div className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8]" />
			</motion.div>

			{/* Outer Glowing Ring */}
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
						width: isHovering ? 46 : 24,
						height: isHovering ? 46 : 24,
						borderColor: isHovering
							? "rgba(66, 133, 244, 0.6)"
							: "rgba(66, 133, 244, 0.25)",
						backgroundColor: isHovering
							? "rgba(66, 133, 244, 0.08)"
							: "transparent",
					}}
					transition={{ type: "spring", stiffness: 400, damping: 25 }}
					className="rounded-full border backdrop-blur-[1px] shadow-[0_0_12px_rgba(66,133,244,0.15)]"
				/>
			</motion.div>
		</>
	);
}
