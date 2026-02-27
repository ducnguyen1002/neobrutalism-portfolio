"use client";

import { motion } from "framer-motion";

interface StickerProps {
	text: string;
	color?: string;
	rotate?: number;
	className?: string;
}

export function Sticker({
	text,
	color = "bg-neo-yellow",
	rotate = -5,
	className = "",
}: StickerProps) {
	return (
		<motion.div
			drag
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			whileHover={{ scale: 1.1, rotate: rotate + 5 }}
			style={{ rotate }}
			className={`absolute z-10 p-4 neo-brutalism-border neo-brutalism-shadow ${color} cursor-grab active:cursor-grabbing select-none ${className}`}
		>
			<p className="font-black text-sm uppercase whitespace-nowrap">{text}</p>
		</motion.div>
	);
}
