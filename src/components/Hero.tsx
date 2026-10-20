"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { MdTerminal, MdArrowOutward, MdEast, MdLayers, MdBolt } from "react-icons/md";
import { useLanguage } from "./Providers";
import { Button } from "./ui/Button";
import { SplitText } from "./ui/SplitText";

export function Hero() {
	const { t } = useLanguage();
	const [activePreset, setActivePreset] = useState(0);

	const heroRef = useRef<HTMLDivElement>(null);
	const badgeRef = useRef<HTMLDivElement>(null);
	const headlineRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const buttonsRef = useRef<HTMLDivElement>(null);
	const sandboxRef = useRef<HTMLDivElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);

	const presets = [
		{
			id: "app-1",
			title: "Military Hospital 175",
			metrics: { latency: "< 50ms", fps: "60 FPS", stack: "Next.js 16 + Directus" },
			image: "/neobrutalism-portfolio/projects/benhvien175_homepage_screenshot.png",
			tag: "HEALTHCARE ENTERPRISE",
		},
		{
			id: "app-2",
			title: "UPSC Stock Portal",
			metrics: { latency: "< 40ms", fps: "60 FPS", stack: "Next.js + Echarts Real-time" },
			image: "/neobrutalism-portfolio/projects/upstock_homepage_screenshot.png",
			tag: "FINTECH REAL-TIME",
		},
		{
			id: "app-3",
			title: "Tan Hoang Minh Flagship",
			metrics: { latency: "< 50ms", fps: "60 FPS", stack: "Next.js + GSAP Motion" },
			image: "/neobrutalism-portfolio/projects/tanhoangminh_homepage_screenshot.png",
			tag: "LUXURY EDITORIAL",
		},
	];

	// GSAP Animations: Entrance Timeline & Floating Micro-Motion
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Floating Prompt Capsule
			if (badgeRef.current) {
				gsap.to(badgeRef.current, {
					y: -5,
					duration: 2.8,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}

			// Staggered Entrance
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			tl.from(badgeRef.current, {
				opacity: 0,
				y: 20,
				duration: 0.6,
			})
				.from(
					subtitleRef.current,
					{
						opacity: 0,
						y: 25,
						duration: 0.8,
						delay: 0.2,
					},
					"-=0.2"
				)
				.from(
					buttonsRef.current ? Array.from(buttonsRef.current.children) : [],
					{
						opacity: 0,
						y: 20,
						stagger: 0.1,
						duration: 0.7,
					},
					"-=0.5"
				)
				.from(
					sandboxRef.current,
					{
						opacity: 0,
						scale: 0.95,
						y: 40,
						duration: 1.1,
						ease: "power3.out",
					},
					"-=0.6"
				);
		}, heroRef);

		return () => ctx.revert();
	}, []);

	// GSAP 3D Interactive Parallax Tilt on the Showcase Sandbox
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!sandboxRef.current) return;
		const rect = sandboxRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -4.5;
		const rotateY = ((x - centerX) / centerX) * 4.5;

		gsap.to(sandboxRef.current, {
			rotateX,
			rotateY,
			transformPerspective: 1400,
			duration: 0.45,
			ease: "power2.out",
		});

		if (glowRef.current) {
			gsap.to(glowRef.current, {
				x: x - 200,
				y: y - 200,
				opacity: 0.22,
				duration: 0.35,
				ease: "power2.out",
			});
		}
	};

	const handleMouseLeave = () => {
		if (!sandboxRef.current) return;
		gsap.to(sandboxRef.current, {
			rotateX: 0,
			rotateY: 0,
			duration: 0.8,
			ease: "power2.out",
		});

		if (glowRef.current) {
			gsap.to(glowRef.current, {
				opacity: 0,
				duration: 0.6,
			});
		}
	};

	return (
		<section
			ref={heroRef}
			className="pt-44 md:pt-48 pb-32 md:pb-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
		>
			<div className="max-w-7xl mx-auto flex flex-col items-center text-center">
				{/* Google Prompt Capsule with Liquid Glass */}
				<div
					ref={badgeRef}
					className="google-prompt-capsule inline-flex items-center gap-3 px-6 py-3 mb-10 max-w-3xl text-left"
				>
					{/* Google 2-Tone Terminal Capsule Orb */}
					<div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#8b5cf6] p-[1.5px] flex items-center justify-center shrink-0 shadow-sm">
						<div className="w-full h-full rounded-full bg-white dark:bg-[#0c0e17] flex items-center justify-center">
							<MdTerminal className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#8ab4f8]" />
						</div>
					</div>
					<span className="text-xs sm:text-sm font-medium text-foreground/90 truncate">
						<strong className="text-[#1a73e8] dark:text-[#8ab4f8]">{t.hero.promptLabel} </strong>
						{t.hero.promptText}
					</span>
				</div>

				{/* Google Sans Headline - Expansive and Cinematic with Text Split */}
				<h1
					ref={headlineRef}
					className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.14] max-w-6xl mb-8"
				>
					<SplitText text={t.hero.title1} delay={0.15} />{" "}
					<span className="block mt-3">
						<SplitText text={t.hero.title2} gradient delay={0.38} />
					</span>
				</h1>

				{/* Subtitle with Airy Spacing */}
				<p
					ref={subtitleRef}
					className="text-lg sm:text-2xl text-foreground/75 dark:text-zinc-300 max-w-3xl mb-12 leading-relaxed font-normal"
				>
					{t.hero.desc}
				</p>

				{/* Google Pill CTAs */}
				<div
					ref={buttonsRef}
					className="flex flex-wrap items-center justify-center gap-5 mb-20"
				>
					<Button
						size="lg"
						variant="aurora"
						onClick={() => {
							const el = document.getElementById("projects");
							if (el) el.scrollIntoView({ behavior: "smooth" });
						}}
						className="gap-2 px-9 py-4 text-base font-semibold"
					>
						{t.hero.work}
						<MdArrowOutward className="w-4 h-4 ml-1" />
					</Button>

					<Button
						size="lg"
						variant="secondary"
						onClick={() => {
							const el = document.getElementById("about");
							if (el) el.scrollIntoView({ behavior: "smooth" });
						}}
						className="gap-2 px-9 py-4 text-base font-medium"
					>
						{t.hero.contact}
						<MdEast className="w-4 h-4 ml-1" />
					</Button>
				</div>

				{/* Interactive Showcase Sandbox with GSAP 3D Tilt & Liquid Glass */}
				<div
					ref={sandboxRef}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className="liquid-glass-card w-full max-w-6xl rounded-3xl p-5 sm:p-8 shadow-2xl relative transition-shadow duration-500 overflow-hidden"
				>
					{/* Dynamic Specular Hover Light Follower */}
					<div
						ref={glowRef}
						className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#1a73e8] to-[#8b5cf6] blur-3xl pointer-events-none opacity-0 -z-0"
						style={{ left: 0, top: 0 }}
					/>

					{/* Interactive Preset Selector Bar */}
					<div className="flex flex-col sm:flex-row items-center justify-between pb-5 mb-6 border-b border-foreground/10 gap-4 relative z-10">
						<div className="flex items-center gap-2.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
							{presets.map((preset, index) => (
								<button
									key={preset.id}
									onClick={() => setActivePreset(index)}
									className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all select-none whitespace-nowrap cursor-pointer ${
										activePreset === index
											? "bg-[#1a73e8] text-white shadow-md shadow-blue-500/25"
											: "bg-foreground/5 hover:bg-foreground/10 text-foreground/80"
									}`}
								>
									{preset.title}
								</button>
							))}
						</div>

						<div className="flex items-center gap-2 font-mono text-xs text-muted">
							<span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse" />
							<span>Architecture // 60 FPS // &lt; 50ms</span>
						</div>
					</div>

					{/* Cinematic Display Screen with Glass Bevel */}
					<div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group shadow-inner relative z-10">
						<img
							src={presets[activePreset].image}
							alt={presets[activePreset].title}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>

						{/* Overlay Specs */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-6 sm:p-10 text-left text-white">
							<div className="flex items-center justify-between">
								<span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase border border-white/20">
									{presets[activePreset].tag}
								</span>
								<div className="flex items-center gap-3 text-xs font-mono bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
									<MdBolt className="w-3.5 h-3.5 text-yellow-400" />
									<span>Latency: {presets[activePreset].metrics.latency}</span>
									<span className="opacity-40">|</span>
									<span>{presets[activePreset].metrics.fps}</span>
								</div>
							</div>

							<div>
								<h3 className="text-2xl sm:text-4xl font-black mb-3 text-white drop-shadow-md">
									{presets[activePreset].title}
								</h3>
								<div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-mono">
									<MdLayers className="w-4 h-4 text-blue-400" />
									<span>{presets[activePreset].metrics.stack}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Glass Indicator Bar */}
					<div className="mt-6 pt-4 flex flex-wrap items-center justify-between text-xs text-muted px-2 gap-3 relative z-10">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1.5">
								<span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
								<span className="font-semibold text-foreground/80">Google Material 3</span>
							</div>
							<span className="opacity-30">•</span>
							<div className="flex items-center gap-1.5">
								<span className="w-2 h-2 rounded-full bg-[#34A853]" />
								<span>Core Web Vitals 100/100</span>
							</div>
						</div>

						<div className="font-mono text-[11px] text-muted">
							DESIGNED FOR ULTRA PERFORMANCE &amp; ACCESSIBILITY
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
