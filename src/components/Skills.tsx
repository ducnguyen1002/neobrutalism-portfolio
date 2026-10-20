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
	const titleRef = useRef<HTMLHeadingElement>(null);
	const matrixRef = useRef<HTMLDivElement>(null);

	// GSAP ScrollTrigger Stagger Entrance
	useEffect(() => {
		const ctx = gsap.context(() => {
			if (titleRef.current) {
				const words = titleRef.current.querySelectorAll(".split-word");
				gsap.fromTo(
					words,
					{ opacity: 0, y: 30, filter: "blur(6px)" },
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.8,
						stagger: 0.04,
						ease: "power3.out",
						scrollTrigger: {
							trigger: titleRef.current,
							start: "top 88%",
							toggleActions: "play none none none",
						},
						clearProps: "all",
					}
				);
			}

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
						<h2
							ref={titleRef}
							className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground"
						>
							<SplitText text={t.skills.title} />
						</h2>
					</div>
					<p className="text-sm sm:text-base text-muted font-normal max-w-md text-left sm:text-right leading-relaxed">
						{t.skills.subtitle}
					</p>
				</div>

				{/* Google Bento Capability Matrix with Liquid Glass & Focus Dimming */}
				<div
					ref={matrixRef}
					className="focus-dim-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
				>
					{t.skills.capabilities.map((item) => (
						<div
							key={item.name}
							className="focus-card liquid-glass-card p-7 flex flex-col justify-between group cursor-default"
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
