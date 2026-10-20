"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 400) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility, { passive: true });
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.6, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.6, y: 20 }}
					transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
					onClick={scrollToTop}
					aria-label="Back to top"
					className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer border border-white/40 dark:border-white/15"
				>
					<div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1a73e8]/20 to-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					<ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200 text-[#1a73e8] dark:text-[#8ab4f8]" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
