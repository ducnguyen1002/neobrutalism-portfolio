"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Terminal } from "lucide-react";

interface StickerProps {
	text: string;
	subtext?: string;
	rotate?: number;
	className?: string;
	icon?: "shield" | "sparkles" | "terminal";
}

export function Sticker({
	text,
	subtext,
	rotate = -3,
	className = "",
	icon,
}: StickerProps) {
	return (
		<motion.div
			drag
			dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
			whileHover={{ scale: 1.05, y: -2 }}
			whileTap={{ scale: 0.98 }}
			style={{ rotate }}
			className={`absolute z-10 cursor-grab active:cursor-grabbing select-none ${className}`}
		>
			<div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-2.5 border border-foreground/15 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)]">
				{icon === "shield" && <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
				{icon === "sparkles" && <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
				{icon === "terminal" && <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
				
				<div className="flex flex-col">
					<span className="font-mono text-[11px] font-bold tracking-wider uppercase text-foreground">
						{text}
					</span>
					{subtext && (
						<span className="font-mono text-[9px] text-muted tracking-tight">
							{subtext}
						</span>
					)}
				</div>
			</div>
		</motion.div>
	);
}
