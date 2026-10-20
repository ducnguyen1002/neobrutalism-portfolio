"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./Providers";
import {
	MdLayers,
	MdDesignServices,
	MdCode,
	MdSpeed,
	MdRocketLaunch,
	MdArrowForward,
} from "react-icons/md";
import { SplitText } from "./ui/SplitText";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const STEP_ICONS = [
	MdDesignServices,
	MdCode,
	MdSpeed,
	MdRocketLaunch,
];

const STEP_ACCENTS = [
	{ border: "group-hover:border-[#1a73e8]/40", glow: "group-hover:shadow-[0_12px_36px_-8px_rgba(26,115,232,0.18)]", tagBg: "bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8]" },
	{ border: "group-hover:border-[#8b5cf6]/40", glow: "group-hover:shadow-[0_12px_36px_-8px_rgba(139,92,246,0.18)]", tagBg: "bg-[#8b5cf6]/10 text-[#8b5cf6] dark:text-[#c4b5fd]" },
	{ border: "group-hover:border-[#34a853]/40", glow: "group-hover:shadow-[0_12px_36px_-8px_rgba(52,168,83,0.18)]", tagBg: "bg-[#34a853]/10 text-[#34a853] dark:text-[#81c995]" },
	{ border: "group-hover:border-[#ea4335]/40", glow: "group-hover:shadow-[0_12px_36px_-8px_rgba(234,67,53,0.18)]", tagBg: "bg-[#ea4335]/10 text-[#ea4335] dark:text-[#f28b82]" },
];

export function Workflow() {
	const { t } = useLanguage();
	const sectionRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const watermarkRef = useRef<HTMLDivElement>(null);

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
					duration: 0.8,
					stagger: 0.12,
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
			id="workflow"
			className="py-20 sm:py-28 md:py-44 px-4 sm:px-6 lg:px-8 relative bg-section-bg border-t border-foreground/10 overflow-hidden"
		>
			{/* Watermark Parallax Background */}
			<div
				ref={watermarkRef}
				aria-hidden="true"
				className="absolute -top-10 left-1/2 -translate-x-1/2 text-[14vw] font-black tracking-tighter text-foreground/[0.025] dark:text-white/[0.025] select-none pointer-events-none whitespace-nowrap z-0"
			>
				WORKFLOW
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-6 sm:pb-8 border-b border-foreground/10 gap-6 sm:gap-8">
					<div className="max-w-2xl lg:max-w-3xl flex-1">
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-[#8b5cf6] dark:text-[#c4b5fd] text-xs font-bold tracking-wider uppercase mb-4">
							<MdLayers className="w-4 h-4" />
							{t.workflow.badge}
						</div>
						<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground text-balance">
							<SplitText text={t.workflow.title} />
						</h2>
					</div>
					<p className="text-sm sm:text-base text-muted font-normal max-w-sm md:max-w-md text-left md:text-right leading-relaxed shrink-0">
						{t.workflow.subtitle}
					</p>
				</div>

				{/* 4-Step Bento Grid */}
				<div
					ref={gridRef}
					className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
				>
					{t.workflow.steps.map((step, idx) => {
						const IconComponent = STEP_ICONS[idx] || MdLayers;
						const accent = STEP_ACCENTS[idx] || STEP_ACCENTS[0];

						return (
							<div
								key={step.step}
								className={`group relative liquid-glass rounded-3xl p-7 sm:p-9 border border-foreground/10 transition-all duration-300 hover:-translate-y-1.5 ${accent.border} ${accent.glow}`}
							>
								{/* Step Number & Icon Header */}
								<div className="flex items-center justify-between mb-6 pb-4 border-b border-foreground/5">
									<div className="flex items-center gap-3">
										<div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/80 group-hover:scale-105 group-hover:bg-foreground/10 transition-all">
											<IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a73e8] dark:text-[#8ab4f8]" />
										</div>
										<span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-foreground/30 group-hover:text-foreground transition-colors">
											{step.step}
										</span>
									</div>

									{idx < 3 && (
										<div className="hidden lg:flex items-center gap-1 text-xs font-mono text-muted/60 uppercase">
											<span>Next</span>
											<MdArrowForward className="w-3.5 h-3.5" />
										</div>
									)}
								</div>

								{/* Step Title */}
								<h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-[#1a73e8] transition-colors">
									{step.title}
								</h3>

								{/* Step Description */}
								<p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-normal mb-6">
									{step.desc}
								</p>

								{/* Tags */}
								<div className="flex flex-wrap gap-2 pt-2 border-t border-foreground/5">
									{step.tags.map((tag) => (
										<span
											key={tag}
											className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-foreground/[0.04] text-foreground/70 border border-foreground/5 group-hover:border-foreground/15 transition-colors"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
