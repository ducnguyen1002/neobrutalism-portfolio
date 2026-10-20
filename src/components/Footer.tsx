"use client";

import { Github, Twitter, Linkedin, Copy, Check, Mail, Sparkles, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./Providers";
import { useState } from "react";
import { Button } from "./ui/Button";

export function Footer() {
	const { t } = useLanguage();
	const [copied, setCopied] = useState(false);
	const email = "ducduc1022000@gmail.com";

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<footer id="about" className="py-28 px-4 border-t border-foreground/10 relative overflow-hidden">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
				{/* Left Column */}
				<div className="max-w-xl">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-4">
						<Sparkles className="w-3.5 h-3.5" />
						CONNECT WITH ME
					</div>

					<h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-foreground leading-[1.1]">
						{t.footer.talk}{" "}
						<span className="google-gradient-text">
							{t.footer.talkHighlight}
						</span>
					</h2>

					<p className="text-base sm:text-lg text-foreground/75 dark:text-zinc-300 mb-8 leading-relaxed font-normal">
						{t.footer.desc}
					</p>

					{/* Social Links */}
					<div className="flex gap-3">
						<a
							href="https://github.com/ducnguyen1002"
							target="_blank"
							rel="noopener noreferrer"
							className="w-12 h-12 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground transition-all hover:scale-105 shadow-sm"
							aria-label="GitHub"
						>
							<Github className="w-5 h-5" />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="w-12 h-12 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-[#1a73e8] dark:text-[#8ab4f8] transition-all hover:scale-105 shadow-sm"
							aria-label="LinkedIn"
						>
							<Linkedin className="w-5 h-5" />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="w-12 h-12 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-[#06b6d4] transition-all hover:scale-105 shadow-sm"
							aria-label="Twitter"
						>
							<Twitter className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Right Column */}
				<div className="flex flex-col items-start md:items-end">
					{/* Copyable Email Pill */}
					<div className="px-5 py-3 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 backdrop-blur-xl mb-6 flex items-center gap-3 shadow-lg">
						<Mail className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
						<span className="text-sm sm:text-base font-semibold text-foreground">
							{email}
						</span>
						<button
							onClick={handleCopyEmail}
							className="ml-2 p-1.5 rounded-full bg-foreground/10 hover:bg-foreground/15 text-foreground transition-colors"
							title="Copy email"
						>
							{copied ? (
								<Check className="w-4 h-4 text-emerald-500" />
							) : (
								<Copy className="w-4 h-4" />
							)}
						</button>
					</div>

					<p className="text-xs text-muted mb-2 text-center md:text-right">
						{t.footer.madeWith}{" "}
						<span className="font-semibold text-foreground">Google Antigravity & Next.js 16</span>
					</p>

					<p className="text-xs text-muted/80 text-center md:text-right">
						{t.footer.rights} © 2026.
					</p>
				</div>
			</div>
		</footer>
	);
}
