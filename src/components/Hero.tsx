"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, Sparkles, Play, Sliders, CheckCircle2, Cpu, Eye, Zap } from "lucide-react";
import { useLanguage } from "./Providers";
import { useState } from "react";

export function Hero() {
	const { t } = useLanguage();
	const [activePreset, setActivePreset] = useState(0);

	const presets = [
		{
			id: "175",
			title: "175 Military Hospital",
			prompt: "Generate an accessible, high-scale medical portal with sub-second page loads and Directus Headless CMS...",
			metrics: { latency: "42ms", fps: "60 FPS", stack: "Next.js 16 + Directus" },
			image: "/neobrutalism-portfolio/projects/benhvien175_homepage_screenshot.png",
			tag: "HEALTHCARE ARCHITECTURE",
		},
		{
			id: "upsc",
			title: "UPSC Stock Portal",
			prompt: "Architect a real-time financial trading terminal with Echarts streaming, low latency, and GraphQL...",
			metrics: { latency: "18ms", fps: "120 FPS", stack: "Next.js + Echarts + GraphQL" },
			image: "/neobrutalism-portfolio/projects/upstock_homepage_screenshot.png",
			tag: "FINTECH REAL-TIME",
		},
		{
			id: "thm",
			title: "Tan Hoang Minh Group",
			prompt: "Choreograph an editorial luxury brand experience with cinematic GSAP scroll animations...",
			metrics: { latency: "65ms", fps: "60 FPS", stack: "Next.js + GSAP Motion" },
			image: "/neobrutalism-portfolio/projects/tanhoangminh_homepage_screenshot.png",
			tag: "LUXURY EDITORIAL",
		},
	];

	return (
		<section className="pt-36 pb-24 px-4 relative overflow-hidden">
			<div className="max-w-6xl mx-auto flex flex-col items-center text-center">
				{/* Google Veo 3 Prompt Capsule */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 backdrop-blur-xl mb-8 max-w-2xl text-left"
				>
					<div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
						<Sparkles className="w-3.5 h-3.5 text-white" />
					</div>
					<span className="text-xs sm:text-sm font-medium text-foreground/90 truncate">
						<strong className="text-[#1a73e8] dark:text-[#8ab4f8]">Veo 3 Front-End // </strong>
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
					<span className="veo-gradient-text block mt-1">
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
						className="gap-2 px-8 py-3.5 text-base"
					>
						{t.hero.contact}
						<ArrowRight className="w-4 h-4 ml-1" />
					</Button>
				</motion.div>

				{/* Veo 3 Interactive Generative Showcase Sandbox */}
				<motion.div
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="w-full max-w-5xl rounded-3xl p-4 sm:p-6 bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/15 backdrop-blur-2xl shadow-2xl relative"
				>
					{/* Interactive Preset Selector Bar */}
					<div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-foreground/10 gap-3">
						<div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
							{presets.map((preset, index) => (
								<button
									key={preset.id}
									onClick={() => setActivePreset(index)}
									className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all select-none whitespace-nowrap ${
										activePreset === index
											? "bg-[#1a73e8] text-white shadow-md shadow-blue-500/20"
											: "bg-foreground/5 hover:bg-foreground/10 text-foreground/80"
									}`}
								>
									{preset.title}
								</button>
							))}
						</div>

						<div className="flex items-center gap-2 font-mono text-xs text-muted">
							<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
							<span>Veo Engine 3.0 Ultra // 1080p 60fps</span>
						</div>
					</div>

					{/* Cinematic Display Screen */}
					<div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group">
						<img
							src={presets[activePreset].image}
							alt={presets[activePreset].title}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>

						{/* Overlay Generative Specs */}
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
								<p className="font-mono text-xs sm:text-sm text-zinc-300 mb-2 flex items-center gap-2">
									<Sparkles className="w-4 h-4 text-purple-400" />
									{presets[activePreset].prompt}
								</p>
								<div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
									<h3 className="text-xl sm:text-3xl font-black tracking-tight text-white">
										{presets[activePreset].title}
									</h3>
									<Button
										size="sm"
										variant="aurora"
										className="gap-2"
										onClick={() => {
											const el = document.getElementById("projects");
											if (el) el.scrollIntoView({ behavior: "smooth" });
										}}
									>
										<Eye className="w-4 h-4" />
										Inspect Architecture
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Live Stats Row */}
					<div className="grid grid-cols-3 gap-4 pt-6 mt-2 text-center">
						{t.hero.stats.map((stat, i) => (
							<div key={i} className="flex flex-col">
								<span className="text-xs text-muted font-medium mb-1">{stat.label}</span>
								<span className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
									{stat.value}
								</span>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
