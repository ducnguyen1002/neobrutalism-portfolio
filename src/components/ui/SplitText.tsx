"use client";

import React from "react";

interface SplitTextProps {
	text: string;
	className?: string;
	gradient?: boolean;
}

export function SplitText({ text, className = "", gradient = false }: SplitTextProps) {
	if (!text) return null;

	const words = text.split(" ");

	return (
		<span className={`inline ${gradient ? "google-gradient-text" : ""} ${className}`}>
			{words.map((word, index) => (
				<span
					key={`${word}-${index}`}
					className="split-word inline-block will-change-transform will-change-opacity"
					style={{ marginRight: "0.26em" }}
				>
					{word}
				</span>
			))}
		</span>
	);
}
