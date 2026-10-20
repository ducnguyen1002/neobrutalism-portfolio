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
					<div className="font-mono text-xs uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
						<span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
						SECTION 04 // FORMAL DISPATCH
					</div>

					<h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
						{t.footer.talk}{" "}
						<span className="font-serif italic font-normal text-muted">
							{t.footer.talkHighlight}
						</span>
					</h2>

					<p className="text-base sm:text-lg text-muted mb-8 leading-relaxed">
						{t.footer.desc}
					</p>

					{/* Liquid Glass Social Badges */}
					<div className="flex gap-3">
						<a
							href="https://github.com/ducnguyen1002"
							target="_blank"
							rel="noopener noreferrer"
							className="liquid-glass rounded-xl p-3 text-foreground/80 hover:text-foreground hover:border-blue-400/30 transition-all hover:-translate-y-0.5"
							aria-label="GitHub Profile"
						>
							<Github className="w-5 h-5" />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="liquid-glass rounded-xl p-3 text-foreground/80 hover:text-foreground hover:border-blue-400/30 transition-all hover:-translate-y-0.5"
							aria-label="LinkedIn Profile"
						>
							<Linkedin className="w-5 h-5" />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="liquid-glass rounded-xl p-3 text-foreground/80 hover:text-foreground hover:border-blue-400/30 transition-all hover:-translate-y-0.5"
							aria-label="Twitter Profile"
						>
							<Twitter className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Right Column: Contact Details & Signature */}
				<div className="flex flex-col items-start md:items-end">
					{/* Copyable Email Pill */}
					<div className="liquid-glass rounded-2xl p-4 border border-foreground/15 mb-6 flex items-center gap-3">
						<Mail className="w-4 h-4 text-muted" />
						<span className="font-mono text-sm sm:text-base font-semibold text-foreground">
							{email}
						</span>
						<button
							onClick={handleCopyEmail}
							className="ml-2 p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-muted hover:text-foreground transition-colors"
							title="Copy email"
						>
							{copied ? (
								<Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
