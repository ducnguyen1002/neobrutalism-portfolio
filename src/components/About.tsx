"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./Providers";
import {
	MdPersonOutline,
	MdPhone,
	MdEmail,
	MdLocationOn,
	MdPool,
	MdFitnessCenter,
	MdContentCopy,
	MdCheck,
	MdArrowOutward,
	MdCheckCircle,
} from "react-icons/md";
import { Button } from "./ui/Button";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function About() {
	const { t } = useLanguage();
	const [copiedField, setCopiedField] = useState<string | null>(null);

	const sectionRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	const handleCopy = (text: string, field: string) => {
		navigator.clipboard.writeText(text);
		setCopiedField(field);
		setTimeout(() => setCopiedField(null), 2000);
	};

	// GSAP ScrollTrigger Stagger Reveal
	useEffect(() => {
		const ctx = gsap.context(() => {
			if (gridRef.current) {
				const cards = Array.from(gridRef.current.children);
				gsap.from(cards, {
					scrollTrigger: {
						trigger: gridRef.current,
						start: "top 82%",
						toggleActions: "play none none none",
					},
					y: 45,
					opacity: 0,
					duration: 0.85,
					stagger: 0.15,
					ease: "power3.out",
					clearProps: "all",
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="about"
			className="py-36 md:py-44 px-4 sm:px-6 lg:px-8 relative border-t border-foreground/10"
		>
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 pb-8 border-b border-foreground/10 gap-8">
					<div>
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-4">
							<MdPersonOutline className="w-4 h-4" />
							{t.about.badge}
						</div>
						<h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
							{t.about.title}{" "}
							<span className="google-gradient-text">
								// Front-End
							</span>
						</h2>
					</div>
					<div className="flex items-center gap-2.5 text-xs sm:text-sm text-muted font-medium bg-foreground/5 px-4 py-2 rounded-full border border-foreground/10">
						<MdLocationOn className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
						<span>{t.about.location}</span>
						<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
					</div>
				</div>

				{/* Bento Grid Layout with Liquid Glass & Focus Dimming */}
				<div
					ref={gridRef}
					className="focus-dim-group grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch"
				>
					{/* Left Large Card: Bio & Direct Contacts (7 Cols) */}
					<div
						className="lg:col-span-7 focus-card liquid-glass-card p-8 sm:p-10 flex flex-col justify-between"
					>
						<div>
							{/* Profile Subheader */}
							<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
								<div>
									<h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
										{t.about.title}
									</h3>
									<p className="text-xs sm:text-sm font-semibold text-[#1a73e8] dark:text-[#8ab4f8] mt-0.5">
										{t.about.role}
									</p>
								</div>

								<span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20 flex items-center gap-1.5">
									<MdCheckCircle className="w-4 h-4 text-emerald-500" />
									{t.about.experience}
								</span>
							</div>

							{/* Bio Text with Generous Leading */}
							<p className="text-base sm:text-lg text-foreground/80 dark:text-zinc-300 leading-relaxed font-normal mb-8">
								{t.about.bio}
							</p>
						</div>

						{/* Direct Contact Pills */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-foreground/10 mt-6">
							{/* Phone Pill */}
							<div className="liquid-glass rounded-2xl p-4 flex items-center justify-between gap-3 border border-foreground/10 hover:border-blue-500/40 transition-colors">
								<div className="flex items-center gap-3 truncate">
									<div className="w-9 h-9 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] flex items-center justify-center shrink-0">
										<MdPhone className="w-4 h-4" />
									</div>
									<div className="truncate">
										<div className="text-[10px] font-bold text-muted uppercase tracking-wider">
											{t.about.phoneLabel}
										</div>
										<a
											href={`tel:${t.about.phone.replace(/\s+/g, "")}`}
											className="text-sm font-semibold text-foreground hover:text-[#1a73e8] transition-colors truncate"
										>
											{t.about.phone}
										</a>
									</div>
								</div>
								<button
									onClick={() => handleCopy(t.about.phone, "phone")}
									className="p-1.5 rounded-full hover:bg-foreground/10 text-muted hover:text-foreground transition-colors cursor-pointer shrink-0"
									title={t.about.copyPhone}
								>
									{copiedField === "phone" ? (
										<MdCheck className="w-4 h-4 text-emerald-500" />
									) : (
										<MdContentCopy className="w-4 h-4" />
									)}
								</button>
							</div>

							{/* Email Pill */}
							<div className="liquid-glass rounded-2xl p-4 flex items-center justify-between gap-3 border border-foreground/10 hover:border-purple-500/40 transition-colors">
								<div className="flex items-center gap-3 truncate">
									<div className="w-9 h-9 rounded-full bg-purple-500/10 text-[#8b5cf6] dark:text-[#c58af9] flex items-center justify-center shrink-0">
										<MdEmail className="w-4 h-4" />
									</div>
									<div className="truncate">
										<div className="text-[10px] font-bold text-muted uppercase tracking-wider">
											{t.about.emailLabel}
										</div>
										<a
											href={`mailto:${t.about.email}`}
											className="text-sm font-semibold text-foreground hover:text-[#8b5cf6] transition-colors truncate"
										>
											{t.about.email}
										</a>
									</div>
								</div>
								<button
									onClick={() => handleCopy(t.about.email, "email")}
									className="p-1.5 rounded-full hover:bg-foreground/10 text-muted hover:text-foreground transition-colors cursor-pointer shrink-0"
									title={t.about.copyEmail}
								>
									{copiedField === "email" ? (
										<MdCheck className="w-4 h-4 text-emerald-500" />
									) : (
										<MdContentCopy className="w-4 h-4" />
									)}
								</button>
							</div>
						</div>
					</div>

					{/* Right Column: Lifestyle & Tech Stacks (5 Cols) */}
					<div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
						{/* Lifestyle & Hobbies Card */}
						<div
							className="focus-card liquid-glass-card p-8 flex flex-col justify-between flex-1"
						>
							<div>
								<div className="flex items-center justify-between mb-6 pb-4 border-b border-foreground/10">
									<h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-2">
										<MdFitnessCenter className="w-4 h-4 text-[#1a73e8]" />
										{t.about.hobbiesTitle}
									</h4>
									<span className="text-[11px] font-mono text-muted">{t.about.hobbiesSub}</span>
								</div>

								<div className="space-y-4">
									{/* Swimming */}
									<div className="liquid-glass rounded-2xl p-4.5 flex items-start gap-4 border border-foreground/10 hover:border-blue-500/30 transition-colors">
										<div className="w-10 h-10 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] flex items-center justify-center shrink-0 mt-0.5">
											<MdPool className="w-5 h-5" />
										</div>
										<div>
											<h5 className="text-base font-bold text-foreground">
												{t.about.hobbies[0].title}
											</h5>
											<p className="text-xs sm:text-sm text-foreground/70 dark:text-zinc-400 mt-1 leading-relaxed">
												{t.about.hobbies[0].desc}
											</p>
										</div>
									</div>

									{/* Gym */}
									<div className="liquid-glass rounded-2xl p-4.5 flex items-start gap-4 border border-foreground/10 hover:border-purple-500/30 transition-colors">
										<div className="w-10 h-10 rounded-full bg-purple-500/10 text-[#8b5cf6] dark:text-[#c58af9] flex items-center justify-center shrink-0 mt-0.5">
											<MdFitnessCenter className="w-5 h-5" />
										</div>
										<div>
											<h5 className="text-base font-bold text-foreground">
												{t.about.hobbies[1].title}
											</h5>
											<p className="text-xs sm:text-sm text-foreground/70 dark:text-zinc-400 mt-1 leading-relaxed">
												{t.about.hobbies[1].desc}
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-6 pt-4 border-t border-foreground/10 flex items-center justify-between text-xs text-muted font-mono">
								<span>{t.about.hobbiesSub}</span>
								<span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
							</div>
						</div>

						{/* Quick Connect CTA Card */}
						<div
							className="focus-card liquid-glass-card p-7 flex items-center justify-between gap-4"
						>
							<div>
								<div className="text-xs uppercase font-bold text-muted tracking-wider mb-1">
									{t.about.collabTitle}
								</div>
								<div className="text-base font-bold text-foreground">
									{t.about.collabDesc}
								</div>
							</div>

							<Button
								variant="aurora"
								size="sm"
								onClick={() => {
									const el = document.getElementById("skills");
									if (el) el.scrollIntoView({ behavior: "smooth" });
								}}
								className="gap-1.5 text-xs font-semibold shrink-0"
							>
								{t.about.collabCta}
								<MdArrowOutward className="w-3.5 h-3.5 ml-0.5" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
