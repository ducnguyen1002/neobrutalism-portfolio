"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, FileCheck, Terminal, Cpu, Database, Award } from "lucide-react";
import { Sticker } from "./Sticker";
import { useLanguage } from "./Providers";

export function Hero() {
	const { t } = useLanguage();

	return (
		<section className="pt-36 pb-24 px-4 relative overflow-hidden">
			{/* Floating Archival Badges */}
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
					{/* Archival metadata stamp */}
					<div className="flex flex-wrap items-center gap-2 mb-6">
						<div className="office-stamp rounded-md bg-foreground/5 border-foreground/15 text-foreground flex items-center gap-1.5 py-1 px-2.5">
							<span className="w-2 h-2 rounded-full bg-blue-500 animate-ping opacity-75" />
							<span className="w-1.5 h-1.5 rounded-full bg-blue-600 -ml-3 mr-1" />
							{t.hero.status}
						</div>
						<span className="font-mono text-xs text-muted">
							{t.hero.refCode || "REF. DOC-01/FE-SPEC"}
						</span>
					</div>

					{/* Editorial Headline */}
					<h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-foreground">
						{t.hero.title1}{" "}
						<span className="block text-foreground/50 font-normal mt-1 tracking-tight">
							{t.hero.title2}
						</span>
					</h1>

					{/* Description */}
					<p
						className="text-lg sm:text-xl text-muted font-normal mb-8 max-w-xl leading-relaxed"
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
							className="rounded-xl shadow-lg gap-2"
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
							<FileCheck className="w-4 h-4 text-muted" />
							{t.hero.contact}
						</Button>
					</div>

					{/* Office Ledger Metadata Row */}
					<div className="grid grid-cols-3 gap-4 pt-6 border-t border-foreground/10 text-xs font-mono">
						<div>
							<div className="text-muted text-[10px] uppercase tracking-wider mb-1">EXPERIENCE</div>
							<div className="font-bold text-sm text-foreground">4+ YEARS</div>
						</div>
						<div>
							<div className="text-muted text-[10px] uppercase tracking-wider mb-1">ARCHITECTURE</div>
							<div className="font-bold text-sm text-foreground">NEXT.JS / TS</div>
						</div>
						<div>
							<div className="text-muted text-[10px] uppercase tracking-wider mb-1">AVAILABILITY</div>
							<div className="font-bold text-sm text-foreground">FULL-TIME</div>
						</div>
					</div>
				</motion.div>

				{/* Right Column: Liquid Glass Dossier Visual Specimen */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
					className="lg:col-span-5 relative"
				>
					{/* Main Liquid Glass Specimen Container */}
					<div className="liquid-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
						{/* Background subtle watermark & grid marks */}
						<div className="absolute top-4 right-4 font-mono text-[10px] text-muted tracking-widest uppercase">
							SYS.ID // 009-DEV
						</div>
						<div className="absolute top-4 left-4 flex gap-1.5">
							<div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
							<div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
							<div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
						</div>

						{/* Center Specimen Card */}
						<div className="mt-8 mb-6 rounded-2xl bg-gradient-to-b from-foreground/[0.04] to-foreground/[0.08] dark:from-white/[0.06] dark:to-white/[0.02] border border-foreground/10 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden aspect-4/3 sm:aspect-square">
							{/* Monogram Wireframe Emblem */}
							<div className="relative mb-6">
								<div className="w-24 h-24 rounded-2xl border border-foreground/20 flex items-center justify-center relative backdrop-blur-sm shadow-inner">
									<div className="w-16 h-16 rounded-xl border border-dashed border-foreground/30 flex items-center justify-center">
										<span className="font-mono text-2xl font-black tracking-tighter text-foreground">
											DN
										</span>
									</div>
									<div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-foreground" />
									<div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-foreground" />
								</div>
							</div>

							<div className="font-mono text-xs uppercase tracking-widest text-muted mb-1">
								CLASSIFIED SPECIMEN
							</div>
							<div className="font-bold text-lg text-foreground tracking-tight">
								Duc Nguyen // Front-End Dev
							</div>
							<p className="font-mono text-[11px] text-muted max-w-xs mt-2 leading-relaxed">
								Specializing in reactive state management, micro-interactions, and design systems.
							</p>

							{/* Rotating circular badge in liquid glass */}
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
								className="absolute -bottom-6 -right-6 hidden sm:flex items-center justify-center"
							>
								<div className="w-28 h-28 rounded-full liquid-glass border border-foreground/20 p-2 flex items-center justify-center shadow-lg">
									<div className="w-full h-full rounded-full border border-dashed border-foreground/30 flex items-center justify-center text-center">
										<span className="font-mono text-[9px] font-bold tracking-widest uppercase text-foreground whitespace-pre-line leading-tight">
											{t.hero.hireNow}
										</span>
									</div>
								</div>
							</motion.div>
						</div>

						{/* Document Footer Controls */}
						<div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-foreground/10 text-muted">
							<span className="flex items-center gap-1.5">
								<Cpu className="w-3.5 h-3.5" /> SPEC: REACT 19
							</span>
							<span className="flex items-center gap-1.5">
								<Database className="w-3.5 h-3.5" /> SECURE DEPLOYMENT
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
