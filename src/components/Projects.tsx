"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { ProjectModal } from "./ui/ProjectModal";
import { ExternalLink, Github, FolderOpen, ArrowUpRight } from "lucide-react";
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
			className="py-24 px-4 bg-foreground/[0.02] dark:bg-white/[0.01] border-y border-foreground/10 relative"
		>
			<div className="max-w-6xl mx-auto">
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 pb-6 border-b border-foreground/10 gap-4">
					<div>
						<div className="font-mono text-xs uppercase tracking-widest text-muted mb-2 flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-foreground" />
							SECTION 03 // ARCHIVED CASE FILES
						</div>
						<h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
							{t.projects.title}{" "}
							<span className="font-serif italic font-normal text-muted">
								{t.projects.highlight}
							</span>
						</h2>
					</div>
					<p className="font-mono text-xs text-muted max-w-xs text-left sm:text-right">
						OFFICIAL AUDIT OF PRODUCTION DEPLOYMENTS & CLIENT CASE HISTORIES
					</p>
				</div>

				{/* Case Files Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{t.projects.items.map((project: any, index: number) => {
						return (
							<div
								key={project.id || index}
								className="liquid-glass-card rounded-2xl flex flex-col h-full group hover:shadow-2xl transition-all duration-300 border border-foreground/15"
							>
								{/* Dossier Header */}
								<div className="px-6 py-3.5 border-b border-foreground/10 flex items-center justify-between font-mono text-xs text-muted bg-foreground/[0.02]">
									<span className="font-bold text-foreground tracking-wider flex items-center gap-1.5">
										<FolderOpen className="w-3.5 h-3.5" />
										{project.id || `CASE-0${index + 1}`}
									</span>
									<span className="office-stamp rounded py-0.5 px-2 bg-foreground/5 border-foreground/15 text-[10px] text-foreground">
										{project.status || "VERIFIED"}
									</span>
								</div>

								{/* Image Preview */}
								<div
									onClick={() => handleOpenModal(project)}
									className="relative aspect-16/10 overflow-hidden bg-foreground/5 cursor-pointer border-b border-foreground/10"
								>
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
										<span className="font-mono text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-md flex items-center gap-1">
											INSPECT DOSSIER <ArrowUpRight className="w-3.5 h-3.5" />
										</span>
									</div>
								</div>

								{/* Content */}
								<div className="p-6 flex flex-col flex-grow">
									<div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
										{project.classification || "PRODUCTION WEB SYSTEM"}
									</div>

									<h3
										onClick={() => handleOpenModal(project)}
										className="text-2xl font-bold tracking-tight mb-3 text-foreground group-hover:text-foreground/80 cursor-pointer transition-colors"
									>
										{project.title}
									</h3>

									<p className="text-sm text-muted font-normal leading-relaxed mb-6 flex-grow">
										{project.description}
									</p>

									{/* Monospace Tech Tags */}
									<div className="flex flex-wrap gap-1.5 mb-6">
										{project.tags.map((tag: string) => (
											<span
												key={tag}
												className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-muted"
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
											className="w-full rounded-xl gap-1.5 text-xs font-mono"
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
											className="w-full rounded-xl gap-1.5 text-xs font-mono"
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
