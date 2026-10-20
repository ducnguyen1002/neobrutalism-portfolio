"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectModal } from "./ui/ProjectModal";
import { Button } from "./ui/Button";
import {
	MdWorkOutline,
	MdChevronRight,
	MdExpandMore,
	MdExpandLess,
} from "react-icons/md";
import { useLanguage } from "./Providers";
import { SplitText } from "./ui/SplitText";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
	const { t } = useLanguage();
	const [selectedProject, setSelectedProject] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [visibleCount, setVisibleCount] = useState(6);

	const sectionRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const watermarkRef = useRef<HTMLDivElement>(null);

	const handleOpenModal = (project: any) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	// GSAP ScrollTrigger Entrance Animation & Parallax
	useEffect(() => {
		const ctx = gsap.context(() => {
			if (watermarkRef.current) {
				gsap.to(watermarkRef.current, {
					y: -100,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.2,
					},
				});
			}

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
					stagger: 0.16,
					ease: "power3.out",
					clearProps: "all",
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Handle Load More: Show 6 more projects with smooth entrance
	const handleLoadMore = () => {
		const nextCount = visibleCount + 6;
		setVisibleCount(nextCount);

		// Animate newly added cards smoothly
		setTimeout(() => {
			if (gridRef.current) {
				const allCards = Array.from(gridRef.current.children);
				const newCards = allCards.slice(visibleCount, nextCount);
				if (newCards.length > 0) {
					gsap.fromTo(
						newCards,
						{ opacity: 0, y: 35, scale: 0.96 },
						{
							opacity: 1,
							y: 0,
							scale: 1,
							duration: 0.65,
							stagger: 0.1,
							ease: "power2.out",
							clearProps: "transform,opacity",
						}
					);
				}
			}
		}, 30);
	};

	const handleShowLess = () => {
		setVisibleCount(6);
		// Scroll back smoothly to section top
		sectionRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const visibleProjects = (t.projects.items || []).slice(0, visibleCount);

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="py-36 md:py-44 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
		>
			{/* Parallax Background Typography */}
			<div
				ref={watermarkRef}
				aria-hidden="true"
				className="absolute -top-10 left-1/2 -translate-x-1/2 text-[14vw] font-black tracking-tighter text-foreground/[0.025] dark:text-white/[0.025] select-none pointer-events-none whitespace-nowrap z-0"
			>
				SHOWCASE
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 md:mb-20 pb-8 border-b border-foreground/10 gap-8">
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

				{/* Google Veo-Style Minimal Showcase Grid: Clean, Visual-First Cards */}
				<div
					ref={gridRef}
					className="focus-dim-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
				>
					{visibleProjects.map((project: any, index: number) => (
						<div
							key={project.id || index}
							onClick={() => handleOpenModal(project)}
							className="focus-card flex flex-col group cursor-pointer select-none"
						>
							{/* Cinematic Rounded Thumbnail */}
							<div className="relative aspect-16/10 rounded-2xl sm:rounded-3xl overflow-hidden bg-black/10 dark:bg-white/5 border border-foreground/10 shadow-sm transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:border-[#1a73e8]/40 dark:group-hover:border-[#8ab4f8]/40">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
								/>

								{/* Subtle Top-Left Category Badge */}
								<div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase border border-white/15">
									{project.classification}
								</div>

								{/* Hover Vignette Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>

							{/* Minimal Details Underneath: Title & Interactive Demo Link */}
							<div className="mt-5 sm:mt-6 flex flex-col">
								<h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors leading-snug">
									{project.title}
								</h3>
								<div className="mt-2.5 inline-flex items-center gap-1 text-sm font-medium text-foreground/75 dark:text-zinc-400 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
									<span>{t.projects.exploreDemo || t.projects.inspect}</span>
									<MdChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#1a73e8] dark:text-[#8ab4f8]" />
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Load More Action Bar */}
				{t.projects.items && t.projects.items.length > 6 && (
					<div className="mt-16 md:mt-20 flex flex-col items-center justify-center gap-3.5">
						{visibleCount < t.projects.items.length ? (
							<Button
								variant="secondary"
								size="lg"
								onClick={handleLoadMore}
								className="px-9 py-4 rounded-full font-semibold text-sm sm:text-base border border-foreground/15 hover:border-[#1a73e8]/50 gap-3 transition-all shadow-md hover:scale-105 cursor-pointer"
							>
								<span>{t.projects.loadMore || "Xem thêm dự án"}</span>
								<span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8] font-bold font-mono">
									+6
								</span>
								<MdExpandMore className="w-5 h-5 text-[#1a73e8] dark:text-[#8ab4f8]" />
							</Button>
						) : (
							<Button
								variant="secondary"
								size="lg"
								onClick={handleShowLess}
								className="px-8 py-3.5 rounded-full font-medium text-xs sm:text-sm border border-foreground/15 hover:border-[#1a73e8]/50 gap-2 transition-all cursor-pointer text-muted hover:text-foreground"
							>
								<span>{t.projects.showLess || "Thu gọn danh sách"}</span>
								<MdExpandLess className="w-4 h-4" />
							</Button>
						)}

						{/* Counter Status */}
						<div className="text-xs text-muted font-medium font-mono flex items-center gap-1.5">
							<span>
								{t.projects.showing || "Đang hiển thị"}{" "}
								<strong className="text-foreground">
									{Math.min(visibleCount, t.projects.items.length)}
								</strong>{" "}
								{t.projects.of || "trên"} {t.projects.items.length}{" "}
								{t.projects.projectsCount || "dự án"}
							</span>
							{visibleCount >= t.projects.items.length && (
								<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
							)}
						</div>
					</div>
				)}
			</div>

			{/* Detailed Specs Modal Triggered on Click */}
			<ProjectModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				project={selectedProject}
			/>
		</section>
	);
}
