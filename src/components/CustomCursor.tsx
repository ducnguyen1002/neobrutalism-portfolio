"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
	const [isHovering, setIsHovering] = useState(false);
	const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
	const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
		};

		const checkHover = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isInteractive = target.closest(
				"button, a, input, select, textarea",
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
			className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[99999] hidden lg:block"
			style={{
				x: cursorX,
				y: cursorY,
				translateX: "-50%",
				translateY: "-50%",
			}}
		>
			<motion.div
				animate={{
					scale: isHovering ? 2.5 : 1,
					backgroundColor: isHovering
						? "rgba(163, 136, 238, 0.8)"
						: "rgba(0, 0, 0, 1)",
				}}
				className="w-full h-full neo-brutalism-border rounded-full"
			/>
			{isHovering && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="absolute inset-0 flex items-center justify-center font-black text-[8px] uppercase pointer-events-none"
				>
					CLICK
				</motion.div>
			)}
		</motion.div>
	);
}
