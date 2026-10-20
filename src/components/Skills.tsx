"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./Providers";
import { Sparkles, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
	{ name: "React 19", role: "Core UI Architecture", level: "Expert", dot: "#4285F4", description: "Concurrent rendering, Server Actions & reactive hooks" },
	{ name: "Next.js 16", role: "Full-Stack App Router", level: "Expert", dot: "#9B72CF", description: "Turbopack optimization, streaming SSR & hybrid routing" },
	{ name: "TypeScript", role: "Type-Safe Architecture", level: "Expert", dot: "#4285F4", description: "Strict static typing, generic interfaces & schema validation" },
	{ name: "Tailwind CSS", role: "Modern Design Tokens", level: "Advanced", dot: "#34A853", description: "Micro-animations, responsive systems & CSS v4 engine" },
	{ name: "RESTful API", role: "Network Data Protocols", level: "Advanced", dot: "#EA4335", description: "Resilient state sync, HTTP caching & endpoint orchestration" },
	{ name: "GraphQL", role: "Optimized Query Layer", level: "Advanced", dot: "#EA4335", description: "Apollo Client, fine-grained schemas & real-time subscriptions" },
	{ name: "Zustand", role: "Atomic State Management", level: "Advanced", dot: "#FBBC05", description: "Global reactive store, persistent state & middleware" },
	{ name: "Directus CMS", role: "Headless Content Ops", level: "Advanced", dot: "#9B72CF", description: "Dynamic relational schemas, permissions & webhook pipelines" },
	{ name: "Git & CI/CD", role: "Deployment Automation", level: "Proficient", dot: "#EA4335", description: "GitHub Actions, automated quality checks & zero-downtime deploys" },
	{ name: "GSAP Motion", role: "Cinematic Micro-Interactions", level: "Advanced", dot: "#34A853", description: "ScrollTrigger, timeline choreographies & fluid physics" },
];

export function Skills() {
	const { t } = useLanguage();
	const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const matrixRef = useRef<HTMLDivElement>(null);

	// GSAP ScrollTrigger Stagger Entrance
	useEffect(() => {
		const ctx = gsap.context(() => {
			if (matrixRef.current) {
				const cards = Array.from(matrixRef.current.children);
				gsap.from(cards, {
					scrollTrigger: {
						trigger: matrixRef.current,
						start: "top 82%",
						toggleActions: "play none none none",
					},
					y: 40,
					opacity: 0,
					duration: 0.7,
					stagger: 0.08,
					ease: "power3.out",
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="skills"
			className="py-36 md:py-44 px-4 sm:px-6 lg:px-8 relative bg-section-alt-bg/60 border-t border-foreground/10"
		>
			<div className="max-w-7xl mx-auto">
				{/* Section Header with Generous Spacing */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 pb-8 border-b border-foreground/10 gap-8">
					<div>
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-4">
							<Sparkles className="w-3.5 h-3.5" />
							{t.skills.badge}
						</div>
						<h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
							{t.skills.title}
						</h2>
					</div>
					<p className="text-sm sm:text-base text-muted font-normal max-w-md text-left sm:text-right leading-relaxed">
						{t.skills.subtitle}
					</p>
				</div>

				{/* Google Bento Capability Matrix with Liquid Glass & Focus Dimming */}
				<div
					ref={matrixRef}
					onMouseLeave={() => setHoveredSkill(null)}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
				>
					{capabilities.map((item) => {
						const isDimmed = hoveredSkill !== null && hoveredSkill !== item.name;
						const isHovered = hoveredSkill === item.name;

						return (
							<div
								key={item.name}
								onMouseEnter={() => setHoveredSkill(item.name)}
								className={`liquid-glass-card p-7 flex flex-col justify-between group cursor-default transition-all duration-300 ${
									isDimmed
										? "opacity-30 scale-[0.97] blur-[0.4px]"
										: isHovered
										? "opacity-100 scale-[1.02] -translate-y-2.5 shadow-2xl border-blue-500/40"
										: "opacity-100 scale-100"
								}`}
							>
								{/* Top Specifier */}
								<div className="flex items-center justify-between mb-6">
									<span
										className="w-3 h-3 rounded-full shadow-sm"
										style={{ backgroundColor: item.dot }}
									/>
									<span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-foreground/5 text-muted">
										{item.level}
									</span>
								</div>

								{/* Title & Role */}
								<div className="mb-4">
									<h3 className="text-xl font-bold text-foreground tracking-tight mb-1.5 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
										{item.name}
									</h3>
									<div className="text-xs font-medium text-muted">
										{item.role}
									</div>
								</div>

								{/* Description */}
								<p className="text-xs sm:text-[13px] text-foreground/70 dark:text-zinc-400 leading-relaxed font-normal mb-4">
									{item.description}
								</p>

								{/* Subtle Bottom Accent Indicator */}
								<div className="mt-5 pt-3.5 border-t border-foreground/5 flex items-center justify-between text-[10px] text-muted font-mono">
									<span>SYSTEM VERIFIED</span>
									<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
