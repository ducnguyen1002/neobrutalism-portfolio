"use client";

import { useState } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { ProjectModal } from "./ui/ProjectModal";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "./Providers";

export function Projects() {
	const { t } = useLanguage();
	const [selectedProject, setSelectedProject] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = (project: any, meta: any) => {
		setSelectedProject({
			...project,
			...meta,
		});
		setIsModalOpen(true);
	};

	return (
		<section
			id="projects"
			className="py-20 px-4 bg-(--section-alt-bg) border-y-4 border-(--border-color)"
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-5xl font-black mb-12 flex items-center gap-4 text-black dark:text-white">
					{t.projects.title}{" "}
					<span className="text-neo-red italic">{t.projects.highlight}</span>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{t.projects.items.map((project, index) => {
						const projectMeta = [
							{
								tags: ["Next.js", "TailwindCSS", "Directus"],
								color: "red",
								image: "/projects/benhvien175_homepage_screenshot.png",
							},
							{
								tags: ["Next.js", "TailwindCSS", "Echarts", "GraphQL"],
								color: "purple",
								image: "/projects/upstock_homepage_screenshot.png",
							},
							{
								tags: ["Next.js", "TailwindCSS", "GSAP"],
								color: "green",
								image: "/projects/tanhoangminh_homepage_screenshot.png",
							},
						][index];

						return (
							<Card
								color={projectMeta.color as any}
								key={index}
								className="flex flex-col h-full group"
								onClick={() => handleOpenModal(project, projectMeta)}
							>
								<div
									className="h-48 bg-black/10 neo-brutalism-border mb-6 flex items-center justify-center font-black text-4xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-300 cursor-pointer"
								>
									<img
										src={projectMeta.image}
										alt={project.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
								<h3 className="text-3xl font-black mb-4 group-hover:underline cursor-pointer">
									{project.title}
								</h3>
								<p className="font-bold mb-6 grow opacity-80">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2 mb-6">
									{projectMeta.tags.map((tag: string, tagIndex: number) => {
										// Assign a consistent neobrutalism color based on the tag string length or predefined map
										const tagColorMap: Record<string, string> = {
											"Next.js": "bg-neo-purple text-white",
											"TailwindCSS": "bg-neo-blue text-white",
											"Directus": "bg-neo-green text-black",
											"Echarts": "bg-neo-yellow text-black",
											"GSAP": "bg-neo-red text-white",
										};

										const colorClass = tagColorMap[tag] || "bg-background text-foreground";

										return (
											<span
												key={tag}
												className={`${colorClass} neo-brutalism-border px-2 py-1 text-xs font-black`}
											>
												#{tag}
											</span>
										);
									})}
								</div>

								<div className="flex gap-4">
									<Button
										size="sm"
										variant="outline"
										className="flex-1 dark:bg-black dark:text-white"
										onClick={() => window.open(project.github || "#", "_blank")}
									>
										<Github className="w-4 h-4" /> {t.projects.code}
									</Button>
									<Button
										size="sm"
										className="flex-1"
										onClick={() => window.open(project.live, "_blank")}
									>
										<ExternalLink className="w-4 h-4" /> {t.projects.live}
									</Button>
								</div>
							</Card>
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
