"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { ProjectModal } from "./ui/ProjectModal";
import { ExternalLink, Github, Sparkles, ArrowUpRight, Zap, Layers } from "lucide-react";
import { useLanguage } from "./Providers";

export function Projects() {
	const { t } = useLanguage();
	const [selectedProject, setSelectedProject] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = (project: any) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	return (
		<section
			id="projects"
			className="py-28 px-4 relative"
		>
			<div className="max-w-6xl mx-auto">
				{/* Google Veo Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-foreground/10 gap-6">
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-3">
							<Sparkles className="w-3.5 h-3.5" />
							FEATURED CASE STUDIES
						</div>
						<h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
							{t.projects.title}{" "}
							<span className="veo-gradient-text">
								{t.projects.highlight}
							</span>
						</h2>
					</div>
					<p className="text-sm text-muted font-normal max-w-sm text-left sm:text-right">
						{t.projects.subtitle}
					</p>
				</div>

				{/* Bento Showcase Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{t.projects.items.map((project: any, index: number) => {
						return (
							<div
								key={project.id || index}
								className="veo-card flex flex-col h-full group"
							>
								{/* Card Header Bar */}
								<div className="px-6 py-4 flex items-center justify-between border-b border-foreground/10 text-xs font-medium text-muted bg-foreground/[0.02]">
									<span className="font-semibold text-foreground tracking-wide flex items-center gap-2">
										<span className="w-2 h-2 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8]" />
										{project.classification}
									</span>
									<span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
										{project.metrics || "Active"}
									</span>
								</div>

								{/* Cinematic Image Preview */}
								<div
									onClick={() => handleOpenModal(project)}
									className="relative aspect-16/10 overflow-hidden bg-black/10 cursor-pointer border-b border-foreground/10"
								>
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
										<span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
											<Sparkles className="w-3.5 h-3.5 text-yellow-300" />
											{t.projects.inspect}
										</span>
										<div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
											<ArrowUpRight className="w-5 h-5" />
										</div>
									</div>
								</div>

								{/* Card Body */}
								<div className="p-6 sm:p-7 flex flex-col flex-grow">
									<h3
										onClick={() => handleOpenModal(project)}
										className="text-2xl font-bold tracking-tight mb-3 text-foreground group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] cursor-pointer transition-colors"
									>
										{project.title}
									</h3>

									<p className="text-sm text-foreground/75 dark:text-zinc-300 leading-relaxed mb-6 flex-grow font-normal">
										{project.description}
									</p>

									{/* Google Material Chips */}
									<div className="flex flex-wrap gap-2 mb-8">
										{project.tags.map((tag: string) => (
											<span
												key={tag}
												className="text-xs px-3 py-1 rounded-full bg-foreground/5 dark:bg-white/10 text-foreground/80 font-medium border border-foreground/10"
											>
												{tag}
											</span>
										))}
									</div>

									{/* Pill Action Buttons */}
									<div className="grid grid-cols-2 gap-3 pt-4 border-t border-foreground/10 mt-auto">
										<Button
											size="sm"
											variant="secondary"
											className="w-full"
											onClick={(e) => {
												e.stopPropagation();
												handleOpenModal(project);
											}}
										>
											{t.projects.inspect}
										</Button>

										<Button
											size="sm"
											variant="primary"
											className="w-full gap-1.5"
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
