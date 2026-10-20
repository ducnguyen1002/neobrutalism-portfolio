"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { ProjectModal } from "./ui/ProjectModal";
import { ExternalLink, Github, FolderOpen, ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "./Providers";

export function Projects() {
	const { t } = useLanguage();
	const [selectedProject, setSelectedProject] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = (project: any) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const getTagBadgeStyle = (tag: string) => {
		if (tag.includes("Next.js")) return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30";
		if (tag.includes("Tailwind")) return "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30";
		if (tag.includes("Directus") || tag.includes("Health")) return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
		if (tag.includes("Echarts") || tag.includes("Graph")) return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
		if (tag.includes("GSAP") || tag.includes("Editorial")) return "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30";
		return "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20";
	};

	return (
		<section
			id="projects"
			className="py-24 px-4 bg-section-alt-bg/60 border-y border-foreground/15 relative"
		>
			<div className="max-w-6xl mx-auto">
				{/* Section Header with High Contrast */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 pb-6 border-b border-foreground/15 gap-4">
					<div>
						<div className="font-mono text-xs uppercase tracking-widest text-[#0052ff] dark:text-[#38bdf8] font-bold mb-2 flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-[#0052ff] dark:bg-[#38bdf8]" />
							SECTION 03 // ARCHIVED CASE FILES
						</div>
						<h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
							{t.projects.title}{" "}
							<span className="bg-gradient-to-r from-[#0052ff] to-[#0284c7] dark:from-[#38bdf8] dark:to-[#60a5fa] bg-clip-text text-transparent font-black">
								{t.projects.highlight}
							</span>
						</h2>
					</div>
					<p className="font-mono text-xs text-foreground/70 dark:text-zinc-300 font-semibold max-w-xs text-left sm:text-right">
						OFFICIAL AUDIT OF PRODUCTION DEPLOYMENTS & CLIENT CASE HISTORIES
					</p>
				</div>

				{/* Case Files Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{t.projects.items.map((project: any, index: number) => {
						return (
							<div
								key={project.id || index}
								className="liquid-glass-card rounded-2xl flex flex-col h-full group hover:shadow-2xl transition-all duration-300 border-2 border-foreground/10 hover:border-blue-500/40 bg-white dark:bg-zinc-900/90"
							>
								{/* Dossier Header */}
								<div className="px-6 py-3.5 border-b border-foreground/10 flex items-center justify-between font-mono text-xs text-muted bg-blue-500/5 dark:bg-blue-950/20">
									<span className="font-extrabold text-[#0052ff] dark:text-[#38bdf8] tracking-wider flex items-center gap-1.5">
										<FolderOpen className="w-4 h-4" />
										{project.id || `CASE-0${index + 1}`}
									</span>
									<span className="office-stamp rounded-md py-0.5 px-2 bg-emerald-500/10 border-emerald-500/30 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
										{project.status || "VERIFIED"}
									</span>
								</div>

								{/* Image Preview - FULL COLOR, High Resolution, No Grayscale! */}
								<div
									onClick={() => handleOpenModal(project)}
									className="relative aspect-16/10 overflow-hidden bg-foreground/5 cursor-pointer border-b border-foreground/10"
								>
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
										<span className="font-mono text-xs font-bold text-white bg-[#0052ff] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
											INSPECT DOSSIER <ArrowUpRight className="w-3.5 h-3.5" />
										</span>
									</div>
								</div>

								{/* Content */}
								<div className="p-6 flex flex-col flex-grow">
									<div className="font-mono text-xs uppercase tracking-wider text-[#0052ff] dark:text-[#38bdf8] font-bold mb-1.5">
										{project.classification || "PRODUCTION WEB SYSTEM"}
									</div>

									<h3
										onClick={() => handleOpenModal(project)}
										className="text-2xl font-black tracking-tight mb-3 text-foreground group-hover:text-[#0052ff] dark:group-hover:text-[#38bdf8] cursor-pointer transition-colors"
									>
										{project.title}
									</h3>

									<p className="text-sm text-foreground/80 dark:text-zinc-300 font-normal leading-relaxed mb-6 flex-grow">
										{project.description}
									</p>

									{/* Vivid Monospace Tech Tags */}
									<div className="flex flex-wrap gap-1.5 mb-6">
										{project.tags.map((tag: string) => (
											<span
												key={tag}
												className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${getTagBadgeStyle(tag)}`}
											>
												#{tag}
											</span>
										))}
									</div>

									{/* Action Buttons */}
									<div className="grid grid-cols-2 gap-3 pt-4 border-t border-foreground/10 mt-auto">
										<Button
											size="sm"
											variant="outline"
											className="w-full rounded-xl gap-1.5 text-xs font-mono font-bold"
											onClick={(e) => {
												e.stopPropagation();
												handleOpenModal(project);
											}}
										>
											<FolderOpen className="w-3.5 h-3.5" />
											DOSSIER
										</Button>

										<Button
											size="sm"
											variant="primary"
											className="w-full rounded-xl gap-1.5 text-xs font-mono font-bold text-white"
											onClick={(e) => {
												e.stopPropagation();
												window.open(project.live, "_blank");
											}}
										>
											<ExternalLink className="w-3.5 h-3.5" />
											{t.projects.live}
										</Button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<ProjectModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				project={selectedProject}
			/>
		</section>
	);
}
