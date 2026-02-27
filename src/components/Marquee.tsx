"use client";

import { motion } from "framer-motion";

export function Marquee() {
	const words = [
		"REACT",
		"NEXT.JS",
		"TYPESCRIPT",
		"TAILWIND",
		"ANIMATION",
		"AESTHETIC",
		"BOLD",
		"FAST",
	];

	return (
		<div className="bg-neo-blue border-y-4 border-(--border-color) py-4 overflow-hidden select-none">
			<motion.div
				animate={{ x: [0, -1000] }}
				transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
				className="flex whitespace-nowrap gap-12"
			>
				{[...Array(10)].map((_, i) => (
					<div
						key={i}
						className="flex gap-12 items-center"
					>
						{words.map((word) => (
							<span
								key={word}
								className="text-4xl md:text-6xl font-black text-white"
							>
								{word}
							</span>
						))}
					</div>
				))}
			</motion.div>
		</div>
	);
}
