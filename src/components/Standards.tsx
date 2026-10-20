"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./Providers";
import {
	MdVerified,
	MdCheckCircle,
	MdSpeed,
	MdBolt,
	MdDevices,
	MdSecurity,
} from "react-icons/md";
import { SplitText } from "./ui/SplitText";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const METRIC_ICONS = [
	MdSpeed,
	MdBolt,
	MdDevices,
	MdSecurity,
];

export function Standards() {
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
					y: 40,
					opacity: 0,
					duration: 0.75,
					stagger: 0.1,
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
			id="standards"
			className="py-20 sm:py-28 md:py-44 px-4 sm:px-6 lg:px-8 relative bg-section-alt-bg/50 border-t border-foreground/10 overflow-hidden"
		>
			{/* Watermark Parallax Background */}
			<div
				ref={watermarkRef}
				aria-hidden="true"
				className="absolute -top-10 left-1/2 -translate-x-1/2 text-[14vw] font-black tracking-tighter text-foreground/[0.025] dark:text-white/[0.025] select-none pointer-events-none whitespace-nowrap z-0"
			>
				STANDARDS
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-6 sm:pb-8 border-b border-foreground/10 gap-6 sm:gap-8">
					<div className="max-w-2xl lg:max-w-3xl flex-1">
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase mb-4">
							<MdVerified className="w-4 h-4" />
							{t.standards.badge}
						</div>
						<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground text-balance">
							<SplitText text={t.standards.title} />
						</h2>
					</div>
					<p className="text-sm sm:text-base text-muted font-normal max-w-sm md:max-w-md text-left md:text-right leading-relaxed shrink-0">
						{t.standards.subtitle}
					</p>
				</div>

				{/* 4 Quantitative Cards Grid */}
				<div
					ref={gridRef}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
				>
					{t.standards.metrics.map((metric, idx) => {
						const IconComponent = METRIC_ICONS[idx] || MdCheckCircle;
						const accentColor = metric.color || "#1a73e8";

						return (
							<div
								key={metric.label}
								className="group relative liquid-glass rounded-3xl p-6 sm:p-8 border border-foreground/10 hover:border-foreground/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
							>
								{/* Accent Glow Header */}
								<div>
									<div className="flex items-center justify-between mb-6">
										<div
											className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
											style={{
												backgroundColor: `${accentColor}18`,
												color: accentColor,
											}}
										>
											<IconComponent className="w-5 h-5" />
										</div>
										<span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
									</div>

									{/* Large Metric Value */}
									<div
										className="text-4xl sm:text-5xl font-black font-mono tracking-tight mb-3 transition-colors"
										style={{ color: accentColor }}
									>
										{metric.value}
									</div>

									{/* Metric Label */}
									<h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
										{metric.label}
									</h3>

									{/* Metric Description */}
									<p className="text-sm text-foreground/75 leading-relaxed font-normal">
										{metric.desc}
									</p>
								</div>

								{/* Bottom Progress / Quality bar */}
								<div className="mt-6 pt-4 border-t border-foreground/5">
									<div className="w-full h-1.5 rounded-full bg-foreground/10 overflow-hidden">
										<div
											className="h-full rounded-full transition-all duration-700 ease-out group-hover:w-full"
											style={{
												backgroundColor: accentColor,
												width: "88%",
											}}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
