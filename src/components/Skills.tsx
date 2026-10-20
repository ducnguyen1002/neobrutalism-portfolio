"use client";

import { useLanguage } from "./Providers";
import { CheckCircle2, Layers } from "lucide-react";

const skills = [
	{ id: "SK-01", name: "React 19", role: "Core UI Architecture", proficiency: "Expert" },
	{ id: "SK-02", name: "Next.js 16", role: "Full-Stack App Router", proficiency: "Expert" },
	{ id: "SK-03", name: "TypeScript", role: "Type-Safe Architecture", proficiency: "Expert" },
	{ id: "SK-04", name: "Tailwind CSS", role: "Design Token Systems", proficiency: "Advanced" },
	{ id: "SK-05", name: "RESTful API", role: "Network & Data Protocols", proficiency: "Advanced" },
	{ id: "SK-06", name: "GraphQL", role: "Optimized Query Schema", proficiency: "Advanced" },
	{ id: "SK-07", name: "Zustand", role: "Atomic State Management", proficiency: "Advanced" },
	{ id: "SK-08", name: "Directus CMS", role: "Headless Content Ops", proficiency: "Advanced" },
	{ id: "SK-09", name: "Git & CI/CD", role: "Deployment Pipelines", proficiency: "Proficient" },
	{ id: "SK-10", name: "GSAP & Motion", role: "Scroll & Micro-Interactions", proficiency: "Advanced" },
];

export function Skills() {
	const { t } = useLanguage();

	return (
		<section
			id="skills"
			className="py-24 px-4 bg-background relative"
		>
			<div className="max-w-6xl mx-auto">
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-foreground/10 gap-4">
					<div>
						<div className="font-mono text-xs uppercase tracking-widest text-muted mb-2 flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-foreground" />
							SECTION 02 // TECHNICAL REGISTRY
						</div>
						<h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
							{t.skills.title}
						</h2>
					</div>

					<div className="flex items-center gap-3">
						<span className="office-stamp rounded-md bg-foreground/5 border-foreground/15 text-muted">
							{t.skills.badge}
						</span>
					</div>
				</div>

				{/* Skills Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
					{skills.map((skill) => (
						<div
							key={skill.id}
							className="liquid-glass rounded-2xl p-5 flex flex-col justify-between group hover:border-foreground/30 transition-all duration-300 relative overflow-hidden"
						>
							{/* Top Specifier */}
							<div className="flex items-center justify-between mb-4">
								<span className="font-mono text-[10px] font-semibold tracking-wider text-muted group-hover:text-foreground transition-colors">
									{skill.id}
								</span>
								<CheckCircle2 className="w-3.5 h-3.5 text-muted group-hover:text-foreground transition-colors opacity-60 group-hover:opacity-100" />
							</div>

							{/* Skill Name */}
							<div>
								<h3 className="font-bold text-lg text-foreground tracking-tight mb-1 group-hover:translate-x-0.5 transition-transform">
									{skill.name}
								</h3>
								<p className="font-mono text-[11px] text-muted leading-tight">
									{skill.role}
								</p>
							</div>

							{/* Proficiency Status Stamp */}
							<div className="mt-4 pt-3 border-t border-foreground/10 flex items-center justify-between font-mono text-[10px]">
								<span className="text-muted uppercase">STATUS</span>
								<span className="font-semibold text-foreground tracking-wider uppercase">
									{skill.proficiency}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
