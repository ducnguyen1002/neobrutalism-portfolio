"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { useTheme } from "next-themes";
import { useLanguage } from "./Providers";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
	const { theme, setTheme } = useTheme();
	const { language, setLanguage, t } = useLanguage();
	const [mounted, setMounted] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		setMounted(true);
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6 transition-all duration-300">
			<div
				className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
					scrolled
						? "bg-white/85 dark:bg-[#070e18]/85 backdrop-blur-2xl border border-[#0a192f]/10 dark:border-blue-200/15 shadow-[0_12px_40px_-10px_rgba(10,25,47,0.08)] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)]"
						: "bg-white/65 dark:bg-[#0b1524]/60 backdrop-blur-xl border border-[#0a192f]/8 dark:border-blue-200/10 shadow-[0_8px_24px_-6px_rgba(10,25,47,0.04)]"
				}`}
			>
				<div className="flex items-center justify-between px-5 py-3 md:px-7 md:py-3.5">
					{/* Brand Monogram */}
					<Link
						href="/"
						className="flex items-center gap-2 group select-none"
					>
						<span className="font-mono text-xs font-bold tracking-widest text-[#0052ff] dark:text-[#38bdf8]">
							DOC//
						</span>
						<span className="font-bold text-lg tracking-tight text-foreground flex items-center gap-1.5">
							DUC.NV
							<span className="inline-block w-2 h-2 rounded-full bg-[#0052ff] dark:bg-[#38bdf8] animate-pulse" />
						</span>
						<span className="hidden sm:inline-block font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/10 text-[#0052ff] dark:text-[#38bdf8] font-bold">
							ARCHIVE
						</span>
					</Link>

					{/* Desktop Navigation (Without Game Section) */}
					<nav className="hidden md:flex items-center gap-1 text-sm font-medium text-foreground/80">
						<Link
							href="#projects"
							className="px-4 py-1.5 rounded-lg hover:text-foreground hover:bg-foreground/5 transition-colors"
						>
							{t.nav.projects}
						</Link>
						<Link
							href="#skills"
							className="px-4 py-1.5 rounded-lg hover:text-foreground hover:bg-foreground/5 transition-colors"
						>
							{t.nav.skills}
						</Link>
						<Link
							href="#contact"
							className="px-4 py-1.5 rounded-lg hover:text-foreground hover:bg-foreground/5 transition-colors"
						>
							{t.nav.about}
						</Link>
					</nav>

					{/* Actions: Theme Toggle, Lang Switch, Requisition CTA */}
					<div className="flex items-center gap-2">
						{/* Theme Toggle */}
						<button
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							className="w-9 h-9 rounded-xl flex items-center justify-center text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-foreground/10 transition-colors"
							aria-label="Toggle Theme"
						>
							{!mounted ? (
								<div className="w-4 h-4" />
							) : theme === "dark" ? (
								<Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
							) : (
								<Moon className="w-4 h-4 text-blue-900 transition-transform hover:-rotate-12" />
							)}
						</button>

						{/* Language Toggle */}
						<button
							onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
							className="h-9 px-2.5 rounded-xl flex items-center gap-1 font-mono text-xs font-semibold tracking-wider text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-foreground/10 transition-colors"
							title="Switch Language"
						>
							<Languages className="w-3.5 h-3.5 opacity-70" />
							<span>{language.toUpperCase()}</span>
						</button>

						{/* CTA Button */}
						<div className="hidden sm:block">
							<Button
								size="sm"
								variant="primary"
								onClick={() => {
									const contactSection = document.getElementById("contact");
									if (contactSection) {
										contactSection.scrollIntoView({ behavior: "smooth" });
									}
								}}
								className="rounded-xl shadow-none"
							>
								{t.nav.hire}
							</Button>
						</div>

						{/* Mobile Hamburger */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 rounded-xl text-foreground hover:bg-foreground/5 md:hidden border border-foreground/10 transition-colors"
							aria-label="Toggle Menu"
						>
							{isMenuOpen ? (
								<X className="w-5 h-5" />
							) : (
								<Menu className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu Dropdown */}
				<AnimatePresence>
					{isMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="md:hidden border-t border-foreground/10 px-5 py-5 flex flex-col gap-3 font-medium overflow-hidden"
						>
							<Link
								href="#projects"
								onClick={() => setIsMenuOpen(false)}
								className="flex items-center justify-between p-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-foreground/5"
							>
								<span>{t.nav.projects}</span>
								<span className="font-mono text-xs opacity-40">01</span>
							</Link>
							<Link
								href="#skills"
								onClick={() => setIsMenuOpen(false)}
								className="flex items-center justify-between p-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-foreground/5"
							>
								<span>{t.nav.skills}</span>
								<span className="font-mono text-xs opacity-40">02</span>
							</Link>
							<Link
								href="#contact"
								onClick={() => setIsMenuOpen(false)}
								className="flex items-center justify-between p-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-foreground/5"
							>
								<span>{t.nav.about}</span>
								<span className="font-mono text-xs opacity-40">03</span>
							</Link>

							<div className="pt-3 border-t border-foreground/10 flex items-center justify-between">
								<span className="font-mono text-xs text-muted">
									LOC: HANOI, VN // UTC+7
								</span>
								<Button
									size="sm"
									variant="primary"
									className="rounded-lg"
									onClick={() => {
										setIsMenuOpen(false);
										const contactSection = document.getElementById("contact");
										if (contactSection) {
											contactSection.scrollIntoView({ behavior: "smooth" });
										}
									}}
								>
									{t.nav.hire}
								</Button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
}
