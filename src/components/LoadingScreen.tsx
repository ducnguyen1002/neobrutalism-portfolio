"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./Providers";

export function LoadingScreen() {
	const { t } = useLanguage();
	const [loading, setLoading] = useState(true);
	const [currentMessage, setCurrentMessage] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// Message rotation
		const messageInterval = setInterval(() => {
			setCurrentMessage((prev) => (prev + 1) % t.loading.messages.length);
		}, 800);

		// Progress bar simulation
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(progressInterval);
					setTimeout(() => setLoading(false), 500);
					return 100;
				}
				return prev + Math.random() * 15;
			});
		}, 200);

		return () => {
			clearInterval(messageInterval);
			clearInterval(progressInterval);
		};
	}, [t.loading.messages.length]);

	return (
		<AnimatePresence>
			{loading && (
				<motion.div
					initial={{ y: 0 }}
					exit={{ y: "-100%" }}
					transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
					className="fixed inset-0 z-9999 bg-neo-yellow flex flex-col items-center justify-center p-6 border-b-8 border-black text-black text-center"
				>
					<div className="max-w-md w-full">
						<motion.div
							animate={{
								rotate: [0, 10, -10, 10, 0],
								scale: [1, 1.1, 1, 1.1, 1],
							}}
							transition={{ duration: 1, repeat: Infinity }}
							className="text-8xl mb-8 select-none"
						>
							🐢
						</motion.div>

						<h2 className="text-4xl font-black mb-4 uppercase italic leading-none">
							{t.loading.cooking}{" "}
							<span className="text-neo-purple">
								{t.loading.cookingHighlight}
							</span>
						</h2>

						<div className="neo-brutalism-border bg-white h-12 w-full mb-6 relative overflow-hidden">
							<motion.div
								className="absolute inset-0 bg-neo-green border-r-4 border-black"
								style={{ width: `${progress}%` }}
							/>
							<div className="absolute inset-0 flex items-center justify-center font-black text-xl mix-blend-difference">
								{Math.round(progress)}%
							</div>
						</div>

						<AnimatePresence mode="wait">
							<motion.p
								key={currentMessage}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="text-xl font-bold italic"
							>
								{t.loading.messages[currentMessage]}
							</motion.p>
						</AnimatePresence>
					</div>

					<div className="absolute bottom-10 left-0 right-0 text-center font-black text-sm opacity-30 px-6">
						{t.loading.warning}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
