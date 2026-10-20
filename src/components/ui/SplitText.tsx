"use client";

import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
	text: string;
	className?: string;
	gradient?: boolean;
	delay?: number;
	noOrphan?: boolean;
}

interface WordToken {
	text: string;
	isHighlighted: boolean;
	isBreak?: boolean;
}

function parseTokens(text: string): WordToken[] {
	if (!text) return [];
	// Matches <br/>, <br>, <br />, \n, [[...]], **...**
	const parts = text.split(/(<br\s*\/?>|\n|\[\[.*?\]\]|\*\*.*?\*\*)/gi);
	const tokens: WordToken[] = [];

	for (const part of parts) {
		if (!part) continue;
		if (/^(<br\s*\/?>|\n)$/i.test(part.trim())) {
			tokens.push({ text: "<br />", isHighlighted: false, isBreak: true });
		} else if (part.startsWith("[[") && part.endsWith("]]")) {
			const clean = part.slice(2, -2).trim();
			const words = clean.split(/\s+/).filter(Boolean);
			for (const w of words) {
				tokens.push({ text: w, isHighlighted: true });
			}
		} else if (part.startsWith("**") && part.endsWith("**")) {
			const clean = part.slice(2, -2).trim();
			const words = clean.split(/\s+/).filter(Boolean);
			for (const w of words) {
				tokens.push({ text: w, isHighlighted: true });
			}
		} else {
			const words = part.split(/\s+/).filter(Boolean);
			for (const w of words) {
				tokens.push({ text: w, isHighlighted: false });
			}
		}
	}

	return tokens;
}

export function SplitText({
	text,
	className = "",
	gradient = false,
	delay = 0,
	noOrphan = true,
}: SplitTextProps) {
	if (!text) return null;

	const allTokens = parseTokens(text);
	if (allTokens.length === 0) return null;

	// Split tokens into line buckets by line breaks
	const lines: WordToken[][] = [];
	let currentLine: WordToken[] = [];

	for (const token of allTokens) {
		if (token.isBreak) {
			if (currentLine.length > 0) {
				lines.push(currentLine);
				currentLine = [];
			}
		} else {
			currentLine.push(token);
		}
	}
	if (currentLine.length > 0) {
		lines.push(currentLine);
	}

	// Stagger counter across all lines
	let wordCounter = 0;

	const renderToken = (token: WordToken, index: number) => {
		const isGrad = gradient || token.isHighlighted;
		return (
			<motion.span
				key={`${token.text}-${index}`}
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "0px 0px -30px 0px" }}
				transition={{
					duration: 0.45,
					delay: delay + index * 0.03,
					ease: [0.16, 1, 0.3, 1],
				}}
				className={`inline-block will-change-transform ${
					isGrad ? "google-gradient-text" : ""
				}`}
			>
				{token.text}
			</motion.span>
		);
	};

	const renderLine = (tokens: WordToken[], lineIdx: number) => {
		if (tokens.length <= 1 || !noOrphan) {
			return (
				<span key={lineIdx} className="inline">
					{tokens.map((token) => {
						const idx = wordCounter++;
						return (
							<React.Fragment key={`${token.text}-${idx}`}>
								{renderToken(token, idx)}
								{" "}
							</React.Fragment>
						);
					})}
				</span>
			);
		}

		// Prevent orphan on this line: group trailing 2 (or 3 if preceded by '&')
		const groupCount =
			tokens.length >= 3 && tokens[tokens.length - 3].text === "&" ? 3 : 2;
		const leadingTokens = tokens.slice(0, tokens.length - groupCount);
		const groupedTokens = tokens.slice(tokens.length - groupCount);

		return (
			<span key={lineIdx} className="inline">
				{leadingTokens.map((token) => {
					const idx = wordCounter++;
					return (
						<React.Fragment key={`${token.text}-${idx}`}>
							{renderToken(token, idx)}
							{" "}
						</React.Fragment>
					);
				})}
				<span className="inline-block whitespace-nowrap">
					{groupedTokens.map((token, gIdx) => {
						const idx = wordCounter++;
						return (
							<React.Fragment key={`${token.text}-${idx}`}>
								{renderToken(token, idx)}
								{gIdx < groupedTokens.length - 1 && " "}
							</React.Fragment>
						);
					})}
				</span>
			</span>
		);
	};

	return (
		<span className={`inline ${className}`}>
			{lines.map((lineTokens, lineIdx) => (
				<React.Fragment key={lineIdx}>
					{lineIdx > 0 && <br />}
					{renderLine(lineTokens, lineIdx)}
				</React.Fragment>
			))}
		</span>
	);
}
