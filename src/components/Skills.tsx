"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./Providers";
import { MdCode, MdCheckCircle } from "react-icons/md";
import { SplitText } from "./ui/SplitText";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
	const { t } = useLanguage();
	const sectionRef = useRef<HTMLElement>(null);
	const matrixRef = useRef<HTMLDivElement>(null);

	// GSAP ScrollTrigger Stagger Entrance
	useEffect(() => {
		const ctx = gsap.context(() => {
			if (matrixRef.current) {
				const cards = Array.from(matrixRef.current.children);
				gsap.from(cards, {
					scrollTrigger: {
						trigger: matrixRef.current,
						start: "top 82%",
						toggleActions: "play none none none",
					},
					y: 40,
					opacity: 0,
					duration: 0.7,
					stagger: 0.08,
					ease: "power3.out",
					clearProps: "all",
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Distance-based Proximity Dimming: dimming increases with geometric distance
	const handleCardHover = (hoveredIdx: number) => {
		if (!matrixRef.current) return;
		const cards = Array.from(matrixRef.current.children) as HTMLElement[];
		const hoveredCard = cards[hoveredIdx];
		if (!hoveredCard) return;

		const hoveredRect = hoveredCard.getBoundingClientRect();
		const hx = hoveredRect.left + hoveredRect.width / 2;
		const hy = hoveredRect.top + hoveredRect.height / 2;

		// Calculate true geometric Euclidean distance from hovered card center
		let maxDist = 1;
		const dists = cards.map((card) => {
			const r = card.getBoundingClientRect();
			const cx = r.left + r.width / 2;
			const cy = r.top + r.height / 2;
			const d = Math.hypot(cx - hx, cy - hy);
			if (d > maxDist) maxDist = d;
			return d;
		});

		cards.forEach((card, idx) => {
			if (idx === hoveredIdx) {
				gsap.to(card, {
					opacity: 1,
					scale: 1.035,
					y: -6,
					filter: "blur(0px)",
					duration: 0.28,
					ease: "power2.out",
					overwrite: "auto",
				});
			} else {
				const norm = dists[idx] / maxDist; // 0 (closest) -> 1 (farthest)
				// Near cards: opacity ~0.65, scale ~0.99, crisp
				// Medium cards: opacity ~0.38, subtle blur
				// Far cards: opacity ~0.14, deeper blur and slight shrink
				const targetOpacity = gsap.utils.interpolate(0.68, 0.14, Math.pow(norm, 0.8));
				const targetScale = gsap.utils.interpolate(0.99, 0.94, norm);
				const targetBlur = gsap.utils.interpolate(0, 1.6, norm);
				const targetY = gsap.utils.interpolate(0, 3, norm);

				gsap.to(card, {
					opacity: targetOpacity,
					scale: targetScale,
					y: targetY,
					filter: `blur(${targetBlur.toFixed(1)}px)`,
					duration: 0.32,
					ease: "power2.out",
					overwrite: "auto",
				});
			}
		});
	};

	const handleCardLeave = () => {
		if (!matrixRef.current) return;
		const cards = Array.from(matrixRef.current.children) as HTMLElement[];
		gsap.to(cards, {
			opacity: 1,
			scale: 1,
			y: 0,
			filter: "blur(0px)",
			duration: 0.42,
			ease: "power2.out",
			overwrite: "auto",
		});
	};

	return (
		<section
			ref={sectionRef}
			id="skills"
			className="py-36 md:py-44 px-4 sm:px-6 lg:px-8 relative bg-section-alt-bg/60 border-t border-foreground/10"
		>
			<div className="max-w-7xl mx-auto">
				{/* Section Header with Generous Spacing */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 pb-8 border-b border-foreground/10 gap-8">
					<div>
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] text-xs font-bold tracking-wider uppercase mb-4">
							<MdCode className="w-4 h-4" />
							{t.skills.badge}
						</div>
						<h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
							<SplitText text={t.skills.title} />
						</h2>
					</div>
					<p className="text-sm sm:text-base text-muted font-normal max-w-md text-left sm:text-right leading-relaxed">
						{t.skills.subtitle}
					</p>
				</div>

				{/* Google Bento Capability Matrix with Proximity Distance-Based Dimming */}
				<div
					ref={matrixRef}
					onMouseLeave={handleCardLeave}
					className="proximity-dim-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
				>
					{t.skills.capabilities.map((item, index) => (
						<div
							key={item.name}
							onMouseEnter={() => handleCardHover(index)}
							className="proximity-card liquid-glass-card p-7 flex flex-col justify-between group cursor-default"
						>
							{/* Top Specifier */}
							<div className="flex items-center justify-between mb-6">
								<span
									className="w-3 h-3 rounded-full shadow-sm"
									style={{ backgroundColor: item.dot }}
								/>
								<span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-foreground/5 text-muted">
									{item.level}
								</span>
							</div>

							{/* Title & Role */}
							<div className="mb-4">
								<h3 className="text-xl font-bold text-foreground tracking-tight mb-1.5 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
									{item.name}
								</h3>
								<div className="text-xs font-medium text-muted">
									{item.role}
								</div>
							</div>

							{/* Description */}
							<p className="text-xs sm:text-[13px] text-foreground/70 dark:text-zinc-400 leading-relaxed font-normal mb-4">
								{item.description}
							</p>

							{/* Subtle Bottom Accent Indicator */}
							<div className="mt-5 pt-3.5 border-t border-foreground/5 flex items-center justify-between text-[10px] text-muted font-mono">
								<span>{t.skills.verified}</span>
								<MdCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
