"use client";

import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdContentCopy, MdCheck, MdAlternateEmail } from "react-icons/md";
import { useLanguage } from "./Providers";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
	const { t } = useLanguage();
	const [copied, setCopied] = useState(false);
	const email = "ducduc1022000@gmail.com";
	const footerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (contentRef.current) {
				const children = Array.from(contentRef.current.children);
				gsap.from(children, {
					scrollTrigger: {
						trigger: footerRef.current,
						start: "top 85%",
						toggleActions: "play none none none",
					},
					y: 40,
					opacity: 0,
					duration: 0.8,
					stagger: 0.15,
					ease: "power3.out",
					clearProps: "all",
				});
			}
		}, footerRef);

		return () => ctx.revert();
	}, []);

	return (
		<footer
			ref={footerRef}
			id="contact"
			className="py-36 md:py-44 px-4 sm:px-6 lg:px-8 border-t border-foreground/10 relative overflow-hidden"
		>
			<div
				ref={contentRef}
				className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-10"
			>
				{/* Left Column with Airy Spacing */}
				<div className="max-w-2xl">
					<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-5">
						<MdAlternateEmail className="w-4 h-4" />
						{t.footer.badge}
					</div>

					<h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 text-foreground leading-[1.08]">
						{t.footer.talk}{" "}
						<span className="google-gradient-text">
							{t.footer.talkHighlight}
						</span>
					</h2>

					<p className="text-base sm:text-xl text-foreground/75 dark:text-zinc-300 mb-10 leading-relaxed font-normal max-w-xl">
						{t.footer.desc}
					</p>

					{/* Social Links */}
					<div className="flex gap-4">
						<a
							href="https://github.com/ducnguyen1002"
							target="_blank"
							rel="noopener noreferrer"
							className="w-13 h-13 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground transition-all hover:scale-110 shadow-sm"
							aria-label="GitHub"
							title="GitHub"
						>
							<FaGithub className="w-5 h-5" />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="w-13 h-13 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-[#1a73e8] dark:text-[#8ab4f8] transition-all hover:scale-110 shadow-sm"
							aria-label="LinkedIn"
							title="LinkedIn"
						>
							<FaLinkedinIn className="w-5 h-5" />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="w-13 h-13 rounded-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground transition-all hover:scale-110 shadow-sm"
							aria-label="Twitter / X"
							title="Twitter / X"
						>
							<FaXTwitter className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Right Column: Liquid Glass Email Capsule */}
				<div className="w-full md:w-auto flex flex-col items-start md:items-end gap-6">
					<div className="liquid-glass rounded-3xl p-6 sm:p-8 w-full md:w-auto min-w-[320px] sm:min-w-[420px]">
						<div className="text-xs uppercase font-bold text-muted tracking-wider mb-3 flex items-center gap-2">
							<MdEmail className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
							{t.footer.inboxLabel}
						</div>
						<div className="flex items-center justify-between gap-4 pb-4 border-b border-foreground/10">
							<span className="font-mono text-sm sm:text-base text-foreground font-semibold truncate">
								{email}
							</span>
							<button
								onClick={handleCopyEmail}
								className="p-2.5 rounded-full hover:bg-foreground/10 transition-colors text-muted hover:text-foreground cursor-pointer"
								title={t.footer.copySuccess}
							>
								{copied ? (
									<MdCheck className="w-4 h-4 text-emerald-500" />
								) : (
									<MdContentCopy className="w-4 h-4" />
								)}
							</button>
						</div>

						<div className="pt-4 flex items-center justify-between">
							<span className="text-xs text-muted">{t.footer.availabilityLabel}</span>
							<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
								<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
								{t.footer.availabilityValue}
							</span>
						</div>
					</div>

					<div className="text-xs text-muted font-normal text-left md:text-right max-w-sm">
						{t.footer.rights}
					</div>
				</div>
			</div>
		</footer>
	);
}
