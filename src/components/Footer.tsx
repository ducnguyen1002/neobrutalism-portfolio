"use client";

import { Github, Twitter, Linkedin, Copy, Check, Mail, ExternalLink } from "lucide-react";
import { useLanguage } from "./Providers";
import { useState } from "react";

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
		<footer id="contact" className="py-24 px-4 bg-foreground/[0.02] dark:bg-white/[0.01] border-t border-foreground/10 relative">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
				{/* Left Dispatch Column */}
				<div className="max-w-xl">
					<div className="font-mono text-xs uppercase tracking-widest text-[#0052ff] dark:text-[#38bdf8] font-bold mb-3 flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-[#0052ff] dark:bg-[#38bdf8]" />
						SECTION 04 // FORMAL DISPATCH
					</div>

					<h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-foreground">
						{t.footer.talk}{" "}
						<span className="bg-gradient-to-r from-[#0052ff] to-[#0284c7] dark:from-[#38bdf8] dark:to-[#60a5fa] bg-clip-text text-transparent font-black">
							{t.footer.talkHighlight}
						</span>
					</h2>

					<p className="text-base sm:text-lg text-foreground/85 dark:text-zinc-200 mb-8 leading-relaxed font-normal">
						{t.footer.desc}
					</p>

					{/* Liquid Glass Social Badges */}
					<div className="flex gap-3">
						<a
							href="https://github.com/ducnguyen1002"
							target="_blank"
							rel="noopener noreferrer"
							className="liquid-glass rounded-xl p-3 text-foreground hover:text-white hover:bg-[#0052ff] border border-blue-500/30 transition-all hover:-translate-y-0.5 shadow-sm"
							aria-label="GitHub Profile"
						>
							<Github className="w-5 h-5" />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="liquid-glass rounded-xl p-3 text-foreground hover:text-white hover:bg-[#0052ff] border border-blue-500/30 transition-all hover:-translate-y-0.5 shadow-sm"
							aria-label="LinkedIn Profile"
						>
							<Linkedin className="w-5 h-5" />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="liquid-glass rounded-xl p-3 text-foreground hover:text-white hover:bg-[#0052ff] border border-blue-500/30 transition-all hover:-translate-y-0.5 shadow-sm"
							aria-label="Twitter Profile"
						>
							<Twitter className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Right Column: Contact Details & Signature */}
				<div className="flex flex-col items-start md:items-end">
					{/* Copyable Email Pill with Vibrant Blue Border */}
					<div className="liquid-glass rounded-2xl p-4 border-2 border-blue-500/30 bg-blue-500/5 mb-6 flex items-center gap-3 shadow-lg">
						<Mail className="w-5 h-5 text-[#0052ff] dark:text-[#38bdf8]" />
						<span className="font-mono text-sm sm:text-base font-bold text-foreground">
							{email}
						</span>
						<button
							onClick={handleCopyEmail}
							className="ml-2 p-2 rounded-lg bg-[#0052ff] text-white hover:bg-[#0041cc] transition-colors"
							title="Copy email"
						>
							{copied ? (
								<Check className="w-4 h-4 text-white" />
							) : (
								<Copy className="w-4 h-4" />
							)}
						</button>
					</div>

					<p className="font-mono text-xs text-muted mb-2">
						{t.footer.madeWith} <span className="text-foreground font-semibold">Google Antigravity</span>
					</p>

					<p className="font-mono text-[11px] text-muted opacity-70">
						{t.footer.rights} © 2026 ARCHIVAL RECORD.
					</p>
				</div>
			</div>
		</footer>
	);
}
