"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, FileCheck, Terminal, Cpu, Database, Sparkles, ShieldCheck } from "lucide-react";
import { Sticker } from "./Sticker";
import { useLanguage } from "./Providers";

export function Hero() {
	const { t } = useLanguage();

	return (
		<section className="pt-36 pb-24 px-4 relative overflow-hidden">
			{/* High-Contrast Floating Badges */}
			<Sticker
				text="STATUS: VERIFIED"
				subtext="REV. 2026 // PRODUCTION"
				rotate={-4}
				icon="shield"
				className="top-36 left-8 hidden 2xl:block"
			/>
			<Sticker
				text="ENGINEERING SPEC"
				subtext="REACT 19 + NEXT.JS"
				rotate={3}
				icon="terminal"
				className="bottom-24 left-16 hidden 2xl:block"
			/>
			<Sticker
				text="PERFORMANCE AUDIT"
				subtext="CORE WEB VITALS: 99+"
				rotate={-2}
				icon="sparkles"
				className="top-48 right-12 hidden 2xl:block"
			/>

			<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
				{/* Left Dossier Overview */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
					className="lg:col-span-7 flex flex-col"
				>
					{/* Archival metadata stamp with strong blue contrast */}
					<div className="flex flex-wrap items-center gap-2 mb-6">
						<div className="office-stamp rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30 text-[#0052ff] dark:text-[#38bdf8] flex items-center gap-2 py-1.5 px-3 font-mono font-bold">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052ff] dark:bg-[#38bdf8] opacity-75" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052ff] dark:bg-[#38bdf8]" />
							</span>
							{t.hero.status}
						</div>
						<span className="font-mono text-xs font-semibold text-muted tracking-wider">
							{t.hero.refCode || "REF. DOC-01/FE-SPEC"}
						</span>
					</div>

					{/* Editorial Headline with Electric Blue Contrast */}
					<h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] mb-6 text-foreground">
						{t.hero.title1}{" "}
						<span className="block bg-gradient-to-r from-[#0052ff] via-[#1d4ed8] to-[#0284c7] dark:from-[#38bdf8] dark:via-[#60a5fa] dark:to-[#93c5fd] bg-clip-text text-transparent font-black mt-1">
							{t.hero.title2}
						</span>
					</h1>

					{/* Description - High Contrast & Legible */}
					<p
						className="text-lg sm:text-xl text-foreground/85 dark:text-zinc-200 font-normal mb-8 max-w-xl leading-relaxed"
						dangerouslySetInnerHTML={{ __html: t.hero.desc }}
					/>

					{/* Actions */}
					<div className="flex flex-wrap gap-4 items-center mb-10">
						<Button
							size="lg"
							variant="primary"
							onClick={() => {
								const el = document.getElementById("projects");
								if (el) el.scrollIntoView({ behavior: "smooth" });
							}}
							className="rounded-xl gap-2 text-white"
						>
							{t.hero.work} <ArrowRight className="w-4 h-4 ml-1" />
						</Button>
						<Button
							size="lg"
							variant="secondary"
							onClick={() => {
								const el = document.getElementById("contact");
								if (el) el.scrollIntoView({ behavior: "smooth" });
							}}
							className="rounded-xl gap-2"
						>
							<FileCheck className="w-4 h-4 text-[#0052ff] dark:text-[#38bdf8]" />
							{t.hero.contact}
						</Button>
					</div>

					{/* Office Ledger Metadata Row with High-Contrast Blue Accents */}
					<div className="grid grid-cols-3 gap-4 pt-6 border-t border-foreground/15 text-xs font-mono">
						<div>
							<div className="text-muted text-[10px] uppercase tracking-wider mb-1 font-semibold">EXPERIENCE</div>
							<div className="font-extrabold text-base text-[#0052ff] dark:text-[#38bdf8]">4+ YEARS</div>
						</div>
						<div>
							<div className="text-muted text-[10px] uppercase tracking-wider mb-1 font-semibold">STACK</div>
							<div className="font-extrabold text-base text-foreground">NEXT.JS / TS</div>
						</div>
						<div>
							<div className="text-muted text-[10px] uppercase tracking-wider mb-1 font-semibold">AVAILABILITY</div>
							<div className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">IMMEDIATE</div>
						</div>
					</div>
				</motion.div>

				{/* Right Column: High-Contrast Liquid Glass Specimen Container */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
					className="lg:col-span-5 relative"
				>
					{/* Main Liquid Glass Specimen Container */}
					<div className="liquid-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden group border-2 border-blue-500/25 dark:border-blue-400/30 shadow-2xl">
						{/* Background subtle watermark & grid marks */}
						<div className="absolute top-4 right-4 font-mono text-[10px] font-bold text-[#0052ff] dark:text-[#38bdf8] tracking-widest uppercase">
							SYS.ID // 009-DEV
						</div>
						<div className="absolute top-4 left-4 flex gap-1.5">
							<div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
							<div className="w-2.5 h-2.5 rounded-full bg-blue-400/60" />
							<div className="w-2.5 h-2.5 rounded-full bg-blue-300/40" />
						</div>

						{/* Center Specimen Card with Vivid Blue Glow */}
						<div className="mt-8 mb-6 rounded-2xl bg-gradient-to-b from-blue-500/5 via-blue-500/10 to-transparent dark:from-blue-500/15 dark:to-transparent border border-blue-500/20 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden aspect-4/3 sm:aspect-square">
							{/* Monogram Wireframe Emblem with Electric Blue Accent */}
							<div className="relative mb-6">
								<div className="w-24 h-24 rounded-2xl border-2 border-blue-500/40 bg-white/50 dark:bg-zinc-900/50 flex items-center justify-center relative backdrop-blur-md shadow-lg shadow-blue-500/10">
									<div className="w-16 h-16 rounded-xl border border-dashed border-[#0052ff] dark:border-[#38bdf8] flex items-center justify-center">
										<span className="font-mono text-2xl font-black tracking-tighter text-[#0052ff] dark:text-[#38bdf8]">
											DN
										</span>
									</div>
									<div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#0052ff] dark:border-[#38bdf8]" />
									<div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#0052ff] dark:border-[#38bdf8]" />
								</div>
							</div>

							<div className="font-mono text-xs uppercase tracking-widest text-[#0052ff] dark:text-[#38bdf8] font-bold mb-1">
								ENGINEERING ARCHIVE
							</div>
							<div className="font-black text-xl text-foreground tracking-tight">
								Duc Nguyen
							</div>
							<p className="font-mono text-xs text-foreground/80 dark:text-zinc-300 max-w-xs mt-2 leading-relaxed">
								Senior Front-End Architecture, Design Systems & High-Performance UI.
							</p>

							{/* Rotating circular badge in liquid glass */}
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
								className="absolute -bottom-6 -right-6 hidden sm:flex items-center justify-center"
							>
								<div className="w-28 h-28 rounded-full liquid-glass border-2 border-blue-500/30 p-2 flex items-center justify-center shadow-xl">
									<div className="w-full h-full rounded-full border border-dashed border-[#0052ff] dark:border-[#38bdf8] flex items-center justify-center text-center">
										<span className="font-mono text-[9px] font-black tracking-widest uppercase text-[#0052ff] dark:text-[#38bdf8] whitespace-pre-line leading-tight">
											{t.hero.hireNow}
										</span>
									</div>
								</div>
							</motion.div>
						</div>

						{/* Document Footer Controls */}
						<div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-foreground/15 text-foreground/80 dark:text-zinc-300 font-semibold">
							<span className="flex items-center gap-1.5 text-[#0052ff] dark:text-[#38bdf8]">
								<Cpu className="w-3.5 h-3.5" /> SPEC: REACT 19
							</span>
							<span className="flex items-center gap-1.5">
								<Database className="w-3.5 h-3.5 text-blue-500" /> DEPLOYED
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
