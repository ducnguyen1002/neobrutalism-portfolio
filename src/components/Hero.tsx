"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Terminal, Layers, Activity, Zap } from "lucide-react";
import { useLanguage } from "./Providers";
import { Button } from "./ui/Button";
import { useState } from "react";

export function Hero() {
	const { t } = useLanguage();
	const [activePreset, setActivePreset] = useState(0);

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

	return (
		<section className="pt-36 pb-24 px-4 relative overflow-hidden">
			<div className="max-w-6xl mx-auto flex flex-col items-center text-center">
				{/* Google Prompt Capsule with Liquid Glass */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="google-prompt-capsule inline-flex items-center gap-3 px-5 py-2.5 mb-8 max-w-2xl text-left"
				>
					{/* Google 4-Color Sparkle Orb */}
					<div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] p-[1.5px] flex items-center justify-center shrink-0 shadow-sm">
						<div className="w-full h-full rounded-full bg-white dark:bg-[#0c0e17] flex items-center justify-center">
							<Sparkles className="w-3.5 h-3.5 text-[#4285F4] dark:text-[#8ab4f8]" />
						</div>
					</div>
					<span className="text-xs sm:text-sm font-medium text-foreground/90 truncate">
						<strong className="text-[#1a73e8] dark:text-[#8ab4f8]">Next.js & React 19 // </strong>
						{t.hero.promptText}
					</span>
				</motion.div>

				{/* Google Sans Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] max-w-5xl mb-6"
				>
					{t.hero.title1}{" "}
					<span className="google-gradient-text block mt-1">
						{t.hero.title2}
					</span>
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-lg sm:text-2xl text-foreground/75 dark:text-zinc-300 max-w-3xl mb-10 leading-relaxed font-normal"
				>
					{t.hero.desc}
				</motion.p>

				{/* Google Pill CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="flex flex-wrap items-center justify-center gap-4 mb-16"
				>
					<Button
						size="lg"
						variant="aurora"
						onClick={() => {
							const el = document.getElementById("projects");
							if (el) el.scrollIntoView({ behavior: "smooth" });
						}}
						className="gap-2 px-8 py-3.5 text-base font-semibold"
					>
						<Sparkles className="w-4 h-4" />
						{t.hero.work}
					</Button>

					<Button
						size="lg"
						variant="secondary"
						onClick={() => {
							const el = document.getElementById("about");
							if (el) el.scrollIntoView({ behavior: "smooth" });
						}}
						className="gap-2 px-8 py-3.5 text-base font-medium"
					>
						{t.hero.contact}
						<ArrowRight className="w-4 h-4 ml-1" />
					</Button>
				</motion.div>

				{/* Interactive Showcase Sandbox with Liquid Glass */}
				<motion.div
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="liquid-glass-card w-full max-w-5xl rounded-3xl p-4 sm:p-6 shadow-2xl relative"
				>
					{/* Interactive Preset Selector Bar */}
					<div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-foreground/10 gap-3">
						<div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
							{presets.map((preset, index) => (
								<button
									key={preset.id}
									onClick={() => setActivePreset(index)}
									className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all select-none whitespace-nowrap cursor-pointer ${
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
							<span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
							<span>Architecture // 60 FPS // &lt; 50ms</span>
						</div>
					</div>

					{/* Cinematic Display Screen with Glass Bevel */}
					<div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group shadow-inner">
						<img
							src={presets[activePreset].image}
							alt={presets[activePreset].title}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>

						{/* Overlay Specs */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-6 sm:p-8 text-left text-white">
							<div className="flex items-center justify-between">
								<span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase border border-white/20">
									{presets[activePreset].tag}
								</span>
								<div className="flex items-center gap-3 text-xs font-mono bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
									<Zap className="w-3.5 h-3.5 text-yellow-400" />
									<span>Latency: {presets[activePreset].metrics.latency}</span>
									<span className="opacity-40">|</span>
									<span>{presets[activePreset].metrics.fps}</span>
								</div>
							</div>

							<div>
								<h3 className="text-xl sm:text-3xl font-black mb-2 text-white drop-shadow-md">
									{presets[activePreset].title}
								</h3>
								<div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-mono">
									<Layers className="w-4 h-4 text-blue-400" />
									<span>{presets[activePreset].metrics.stack}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Glass Indicator Bar */}
					<div className="mt-4 pt-3 flex flex-wrap items-center justify-between text-xs text-muted px-2 gap-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1.5">
								<span className="w-2 h-2 rounded-full bg-[#4285F4]" />
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
				</motion.div>
			</div>
		</section>
	);
}
