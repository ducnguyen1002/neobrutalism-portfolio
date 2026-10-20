"use client";

import { motion } from "framer-motion";

export function Marquee() {
	const specs = [
		"01 // ARCHITECTURAL FRONT-END",
		"02 // NEXT.JS 16 APP ROUTER",
		"03 // REACT 19 RUNTIME",
		"04 // TYPESCRIPT STRICT",
		"05 // TAILWIND CSS V4",
		"06 // LIQUID GLASS ERGONOMICS",
		"07 // ECHARTS REAL-TIME VISUALS",
		"08 // HEADLESS CMS DIRECTUS",
		"09 // GSAP SCROLL ORCHESTRATION",
		"10 // CORE WEB VITALS 99+",
	];

	return (
		<div className="bg-foreground/[0.03] dark:bg-white/[0.02] border-y border-foreground/10 py-4 overflow-hidden select-none backdrop-blur-sm">
			<motion.div
				animate={{ x: [0, -1400] }}
				transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
				className="flex whitespace-nowrap gap-10"
			>
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="flex gap-10 items-center"
					>
						{specs.map((item) => (
							<span
								key={item}
								className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-foreground/70 uppercase flex items-center gap-4"
							>
								{item}
								<span className="w-1.5 h-1.5 rounded-full bg-blue-600/40 dark:bg-blue-400/40 inline-block" />
							</span>
						))}
					</div>
				))}
			</motion.div>
		</div>
	);
}
