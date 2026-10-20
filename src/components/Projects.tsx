"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/Button";
import { ProjectModal } from "./ui/ProjectModal";
import { MdWorkOutline, MdOpenInNew, MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "./Providers";
import { SplitText } from "./ui/SplitText";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
	const { t } = useLanguage();
	const [selectedProject, setSelectedProject] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const sectionRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	const handleOpenModal = (project: any) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	// GSAP ScrollTrigger Entrance Animation
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
					y: 50,
					opacity: 0,
					duration: 0.9,
					stagger: 0.18,
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
			id="projects"
			className="py-36 md:py-44 px-4 sm:px-6 lg:px-8 relative"
		>
			<div className="max-w-7xl mx-auto">
				{/* Section Header with Generous Breathing Room */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 pb-8 border-b border-foreground/10 gap-8">
					<div>
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-4">
							<MdWorkOutline className="w-4 h-4" />
							{t.projects.badge}
						</div>
						<h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
							<SplitText text={t.projects.title} />{" "}
							<SplitText text={t.projects.highlight} gradient />
						</h2>
					</div>
					<p className="text-sm sm:text-base text-muted font-normal max-w-md text-left sm:text-right leading-relaxed">
						{t.projects.subtitle}
					</p>
				</div>

				{/* Bento Showcase Grid with Liquid Glass & Focus Dimming */}
				<div
					ref={gridRef}
					className="focus-dim-group grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10"
				>
					{t.projects.items.map((project: any, index: number) => (
						<div
							key={project.id || index}
							className="focus-card liquid-glass-card flex flex-col h-full group"
						>
							{/* Card Header Bar */}
							<div className="px-7 py-4.5 flex items-center justify-between border-b border-foreground/10 text-xs font-medium text-muted bg-foreground/[0.02]">
								<span className="font-semibold text-foreground tracking-wide flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8]" />
									{project.classification}
								</span>
								<span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
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
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6 sm:p-7">
									<span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
										<MdArrowOutward className="w-3.5 h-3.5 text-white" />
										{t.projects.inspect}
									</span>
									<div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
										<MdArrowOutward className="w-5 h-5" />
									</div>
								</div>
							</div>

							{/* Card Body with Generous Padding */}
							<div className="p-7 sm:p-8 flex flex-col flex-grow">
								<h3
									onClick={() => handleOpenModal(project)}
									className="text-2xl font-bold tracking-tight mb-3 text-foreground group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] cursor-pointer transition-colors"
								>
									{project.title}
								</h3>

								<p className="text-sm sm:text-base text-foreground/75 dark:text-zinc-300 leading-relaxed mb-6 flex-grow font-normal">
									{project.description}
								</p>

								{/* Google Material Chips */}
								<div className="flex flex-wrap gap-2 mb-8">
									{project.tags.map((tag: string) => (
										<span
											key={tag}
											className="text-xs px-3 py-1.5 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/10 text-foreground/80 font-medium"
										>
											{tag}
										</span>
									))}
								</div>

								{/* Action Footer */}
								<div className="pt-5 border-t border-foreground/10 flex items-center justify-between mt-auto">
									<Button
										variant="secondary"
										size="sm"
										onClick={() => handleOpenModal(project)}
										className="gap-1.5 text-xs font-semibold"
									>
										{t.projects.inspect}
										<MdArrowOutward className="w-3.5 h-3.5 ml-0.5" />
									</Button>

									<div className="flex items-center gap-2">
										<a
											href={project.live}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2 rounded-full hover:bg-foreground/5 text-muted hover:text-foreground transition-colors"
											aria-label={t.projects.live}
											title={t.projects.live}
										>
											<MdOpenInNew className="w-4 h-4" />
										</a>
										{project.github && project.github !== "#" && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2 rounded-full hover:bg-foreground/5 text-muted hover:text-foreground transition-colors"
												aria-label={t.projects.code}
												title={t.projects.code}
											>
												<FaGithub className="w-4 h-4" />
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
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
