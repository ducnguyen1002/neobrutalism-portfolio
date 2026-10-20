"use client";

import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
	text: string;
	className?: string;
	gradient?: boolean;
	delay?: number;
}

export function SplitText({
	text,
	className = "",
	gradient = false,
	delay = 0,
}: SplitTextProps) {
	if (!text) return null;

	const words = text.split(" ");

	return (
		<span className={`inline ${className}`}>
			{words.map((word, index) => (
				<React.Fragment key={`${word}-${index}`}>
					<motion.span
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "0px 0px -30px 0px" }}
						transition={{
							duration: 0.45,
							delay: delay + index * 0.03,
							ease: [0.16, 1, 0.3, 1],
						}}
						className={`inline-block will-change-transform ${
							gradient ? "google-gradient-text" : ""
						}`}
					>
						{word}
					</motion.span>
					{index < words.length - 1 && " "}
				</React.Fragment>
			))}
		</span>
	);
}
