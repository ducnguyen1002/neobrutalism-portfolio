"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./Providers";
import { Sparkles } from "lucide-react";

export function LoadingScreen() {
	const { t } = useLanguage();
	const [loading, setLoading] = useState(true);
	const [currentMessage, setCurrentMessage] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// Message rotation
		const messageInterval = setInterval(() => {
			setCurrentMessage((prev) => (prev + 1) % t.loading.messages.length);
		}, 600);

		// Progress bar simulation
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(progressInterval);
					setTimeout(() => setLoading(false), 350);
					return 100;
				}
				return prev + Math.random() * 25;
			});
		}, 120);

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
					exit={{ opacity: 0, scale: 1.02 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
					className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-6 text-foreground"
				>
					<div className="max-w-md w-full text-center">
						{/* Google Sparkle Animated Orb */}
						<div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#8B5CF6] to-[#EC4899] p-0.5 mx-auto mb-8 shadow-[0_0_30px_rgba(66,133,244,0.4)]">
							<div className="w-full h-full rounded-full bg-background flex items-center justify-center">
								<motion.div
									animate={{ rotate: 360, scale: [1, 1.1, 1] }}
									transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
								>
									<Sparkles className="w-7 h-7 text-[#4285F4] dark:text-[#8ab4f8]" />
								</motion.div>
							</div>
						</div>

						{/* Title */}
						<h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
							{t.loading.cooking}{" "}
							<span className="veo-gradient-text">
								{t.loading.cookingHighlight}
							</span>
						</h2>

						{/* Google 4-Color Gradient Progress Bar */}
						<div className="h-2 w-full rounded-full bg-foreground/10 my-6 relative overflow-hidden">
							<motion.div
								className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4285F4] via-[#8B5CF6] via-[#EC4899] to-[#06B6D4] rounded-full"
								style={{ width: `${progress}%` }}
							/>
						</div>

						{/* Decryption Message */}
						<div className="h-6 flex items-center justify-center">
							<AnimatePresence mode="wait">
								<motion.p
									key={currentMessage}
									initial={{ opacity: 0, y: 4 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -4 }}
									transition={{ duration: 0.2 }}
									className="text-xs text-muted font-medium"
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
