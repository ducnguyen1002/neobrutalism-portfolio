"use client";

import { useLanguage } from "./Providers";
import { CheckCircle2, Code2, Sparkles } from "lucide-react";

const skills = [
	{ id: "SK-01", name: "React 19", role: "Core UI Architecture", proficiency: "Expert", color: "#0284c7", bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-600 dark:text-sky-400" },
	{ id: "SK-02", name: "Next.js 16", role: "Full-Stack App Router", proficiency: "Expert", color: "#0052ff", bg: "bg-blue-600/10", border: "border-blue-600/30", text: "text-blue-600 dark:text-blue-400" },
	{ id: "SK-03", name: "TypeScript", role: "Type-Safe Architecture", proficiency: "Expert", color: "#2563eb", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-700 dark:text-blue-300" },
	{ id: "SK-04", name: "Tailwind CSS", role: "Design Token Systems", proficiency: "Advanced", color: "#06b6d4", bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-600 dark:text-cyan-400" },
	{ id: "SK-05", name: "RESTful API", role: "Network & Data Protocols", proficiency: "Advanced", color: "#4f46e5", bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-600 dark:text-indigo-400" },
	{ id: "SK-06", name: "GraphQL", role: "Optimized Query Schema", proficiency: "Advanced", color: "#d946ef", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", text: "text-fuchsia-600 dark:text-fuchsia-400" },
	{ id: "SK-07", name: "Zustand", role: "Atomic State Management", proficiency: "Advanced", color: "#d97706", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400" },
	{ id: "SK-08", name: "Directus CMS", role: "Headless Content Ops", proficiency: "Advanced", color: "#7c3aed", bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-600 dark:text-purple-400" },
	{ id: "SK-09", name: "Git & CI/CD", role: "Deployment Pipelines", proficiency: "Proficient", color: "#ea580c", bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-600 dark:text-orange-400" },
	{ id: "SK-10", name: "GSAP & Motion", role: "Micro-Interactions", proficiency: "Advanced", color: "#059669", bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-600 dark:text-emerald-400" },
];

export function Skills() {
	const { t } = useLanguage();

	return (
		<section
			id="skills"
			className="py-24 px-4 bg-background relative"
		>
			<div className="max-w-6xl mx-auto">
				{/* Section Header with High Contrast */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-foreground/15 gap-4">
					<div>
						<div className="font-mono text-xs uppercase tracking-widest text-[#0052ff] dark:text-[#38bdf8] font-bold mb-2 flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-[#0052ff] dark:bg-[#38bdf8]" />
							SECTION 02 // TECHNICAL REGISTRY
						</div>
						<h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
							{t.skills.title}
						</h2>
					</div>

					<div className="flex items-center gap-3">
						<span className="office-stamp rounded-lg bg-blue-500/10 border-blue-500/30 text-[#0052ff] dark:text-[#38bdf8] font-bold">
							{t.skills.badge}
						</span>
					</div>
				</div>

				{/* High-Contrast Skills Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
					{skills.map((skill) => (
						<div
							key={skill.id}
							className="liquid-glass rounded-2xl p-5 flex flex-col justify-between group hover:border-blue-500 hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-foreground/15 bg-white/90 dark:bg-zinc-900/90"
						>
							{/* Top Specifier */}
							<div className="flex items-center justify-between mb-4">
								<span className={`font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded-md ${skill.bg} ${skill.text} ${skill.border} border`}>
									{skill.id}
								</span>
								<CheckCircle2 className={`w-4 h-4 ${skill.text} transition-transform group-hover:scale-110`} />
							</div>

							{/* Skill Name */}
							<div>
								<h3 className="font-extrabold text-lg text-foreground tracking-tight mb-1 group-hover:translate-x-0.5 transition-transform">
									{skill.name}
								</h3>
								<p className="font-mono text-xs text-foreground/70 dark:text-zinc-300 leading-tight">
									{skill.role}
								</p>
							</div>

							{/* Proficiency Status Stamp */}
							<div className="mt-4 pt-3 border-t border-foreground/10 flex items-center justify-between font-mono text-[11px]">
								<span className="text-muted uppercase font-semibold">STATUS</span>
								<span className={`font-bold tracking-wider uppercase ${skill.text}`}>
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
