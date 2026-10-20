"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./Providers";
import { Cpu } from "lucide-react";

export function LoadingScreen() {
	const { t } = useLanguage();
	const [loading, setLoading] = useState(true);
	const [currentMessage, setCurrentMessage] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// Message rotation
		const messageInterval = setInterval(() => {
			setCurrentMessage((prev) => (prev + 1) % t.loading.messages.length);
		}, 700);

		// Progress bar simulation
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(progressInterval);
					setTimeout(() => setLoading(false), 400);
					return 100;
				}
				return prev + Math.random() * 20;
			});
		}, 150);

		return () => {
			clearInterval(messageInterval);
			clearInterval(progressInterval);
		};
	}, [t.loading.messages.length]);

	return (
		<AnimatePresence>
			{loading && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
					className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-foreground"
				>
					<div className="liquid-glass rounded-3xl p-8 max-w-md w-full border border-foreground/15 text-center shadow-2xl relative overflow-hidden">
						{/* Ambient glass light beam */}
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />

						{/* Top Archival Tag */}
						<div className="font-mono text-[10px] tracking-widest text-muted uppercase mb-6 flex items-center justify-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
							SYSTEM REQUISITION // 2026
						</div>

						{/* Animated Emblem */}
						<div className="w-16 h-16 rounded-2xl border border-foreground/20 mx-auto mb-6 flex items-center justify-center relative shadow-inner">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
								className="w-10 h-10 rounded-xl border border-dashed border-foreground/40 flex items-center justify-center"
							>
								<Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-80" />
							</motion.div>
						</div>

						{/* Title */}
						<h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 uppercase">
							{t.loading.cooking}{" "}
							<span className="font-serif italic font-normal text-muted">
								{t.loading.cookingHighlight}
							</span>
						</h2>

						{/* Refined Progress Bar */}
						<div className="h-2 w-full rounded-full bg-foreground/10 mb-4 relative overflow-hidden">
							<motion.div
								className="absolute inset-y-0 left-0 bg-[#0a192f] dark:bg-blue-400 rounded-full"
								style={{ width: `${progress}%` }}
							/>
						</div>

						<div className="flex items-center justify-between font-mono text-xs text-muted mb-6">
							<span>INDEXING</span>
							<span className="font-bold text-foreground">{Math.round(progress)}%</span>
						</div>

						{/* Decryption Message */}
						<div className="h-8 flex items-center justify-center">
							<AnimatePresence mode="wait">
								<motion.p
									key={currentMessage}
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -6 }}
									transition={{ duration: 0.2 }}
									className="font-mono text-xs text-muted"
								>
									{t.loading.messages[currentMessage]}
								</motion.p>
							</AnimatePresence>
						</div>
					</div>

					<div className="absolute bottom-8 left-0 right-0 text-center font-mono text-[10px] text-muted tracking-widest uppercase">
						{t.loading.warning}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
