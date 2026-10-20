"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Marquee() {
	const items = [
		{ text: "NEXT.JS 16 APP ROUTER", dot: "#4285F4" },
		{ text: "REACT 19 CORE RUNTIME", dot: "#EA4335" },
		{ text: "TYPESCRIPT STRICT ARCHITECTURE", dot: "#FBBC05" },
		{ text: "TAILWIND CSS V4", dot: "#34A853" },
		{ text: "GOOGLE SANS TYPOGRAPHY", dot: "#8B5CF6" },
		{ text: "ECHARTS REAL-TIME STREAMING", dot: "#06B6D4" },
		{ text: "GSAP CINEMATIC CHOREOGRAPHY", dot: "#EC4899" },
		{ text: "DIRECTUS HEADLESS OPS", dot: "#4285F4" },
		{ text: "SUB-50MS INTERACTION LATENCY", dot: "#34A853" },
	];

	return (
		<div className="border-y border-foreground/10 py-7 md:py-8 overflow-hidden select-none bg-black/5 dark:bg-white/[0.02] backdrop-blur-md">
			<motion.div
				animate={{ x: [0, -1200] }}
				transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
				className="flex whitespace-nowrap gap-16"
			>
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="flex gap-16 items-center"
					>
						{items.map((item) => (
							<span
								key={item.text}
								className="text-xs sm:text-sm font-semibold tracking-wider text-foreground/80 uppercase flex items-center gap-4"
							>
								{item.text}
								<span
									className="w-2 h-2 rounded-full inline-block shadow-sm"
									style={{ backgroundColor: item.dot }}
								/>
							</span>
						))}
					</div>
				))}
			</motion.div>
		</div>
	);
}
