"use client";

import { useLanguage } from "./Providers";
import { Sparkles, CheckCircle2, Cpu, Zap, Layers, Activity } from "lucide-react";

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

	return (
		<section
			id="skills"
			className="py-28 px-4 relative bg-section-alt-bg/60 border-t border-foreground/10"
		>
			<div className="max-w-6xl mx-auto">
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-foreground/10 gap-6">
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-3">
							<Sparkles className="w-3.5 h-3.5" />
							{t.skills.badge}
						</div>
						<h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
							{t.skills.title}
						</h2>
					</div>
					<p className="text-sm text-muted font-normal max-w-sm text-left sm:text-right">
						{t.skills.subtitle}
					</p>
				</div>

				{/* Google Bento Capability Matrix with Liquid Glass */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
					{capabilities.map((item) => (
						<div
							key={item.name}
							className="liquid-glass-card p-6 flex flex-col justify-between group"
						>
							{/* Top Specifier */}
							<div className="flex items-center justify-between mb-5">
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
								<h3 className="text-xl font-bold text-foreground tracking-tight mb-1 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
									{item.name}
								</h3>
								<div className="text-xs font-medium text-muted">
									{item.role}
								</div>
							</div>

							{/* Description */}
							<p className="text-xs text-foreground/70 dark:text-zinc-400 leading-relaxed font-normal">
								{item.description}
							</p>

							{/* Subtle Bottom Accent Indicator */}
							<div className="mt-5 pt-3 border-t border-foreground/5 flex items-center justify-between text-[10px] text-muted font-mono">
								<span>SYSTEM VERIFIED</span>
								<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
