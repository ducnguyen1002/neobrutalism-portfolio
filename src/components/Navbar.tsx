"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { useTheme } from "next-themes";
import { useLanguage } from "./Providers";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
	const { theme, setTheme } = useTheme();
	const { language, setLanguage, t } = useLanguage();
	const [mounted, setMounted] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 p-2 md:p-4 lg:p-6">
			<div className="max-w-7xl mx-auto bg-white dark:bg-[#2a2a2a] neo-brutalism-border neo-brutalism-shadow">
				<div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
					<Link
						href="/"
						className="text-xl md:text-2xl font-black tracking-tighter text-black dark:text-white shrink-0"
					>
						PORT<span className="text-neo-purple">FOLIO</span>
					</Link>

					<div className="hidden md:flex items-center gap-8 font-bold text-black dark:text-white">
						<Link
							href="#projects"
							className="hover:underline decoration-4 underline-offset-4"
						>
							{t.nav.projects}
						</Link>
						<Link
							href="#skills"
							className="hover:underline decoration-4 underline-offset-4"
						>
							{t.nav.skills}
						</Link>
						<Link
							href="#about"
							className="hover:underline decoration-4 underline-offset-4"
						>
							{t.nav.about}
						</Link>
					</div>

					<div className="flex items-center gap-2 md:gap-4">
						<button
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							className="hidden md:flex p-2 neo-brutalism-border bg-white hover:translate-x-px hover:translate-y-px transition-all items-center justify-center w-11 h-11"
							aria-label="Toggle Theme"
						>
							{!mounted ? (
								<div className="w-5 h-5" />
							) : theme === "dark" ? (
								<Sun className="w-5 h-5 text-black fill-neo-yellow" />
							) : (
								<Moon className="w-5 h-5 text-black fill-black" />
							)}
						</button>

						<button
							onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
							className="hidden md:flex w-11 h-11 neo-brutalism-border bg-neo-blue text-white hover:translate-x-px hover:translate-y-px transition-all font-black items-center justify-center text-sm"
						>
							{language === "vi" ? "EN" : "VI"}
						</button>

						<div className="hidden md:block">
							<Button
								size="sm"
								variant="primary"
							>
								{t.nav.hire}
							</Button>
						</div>

						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 neo-brutalism-border bg-neo-yellow text-black md:hidden"
						>
							{isMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden border-t-4 border-(--border-color) bg-white dark:bg-[#2a2a2a] p-4 flex flex-col gap-4 font-black">
						<Link
							href="#projects"
							onClick={() => setIsMenuOpen(false)}
							className="text-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white"
						>
							{t.nav.projects}
						</Link>
						<Link
							href="#skills"
							onClick={() => setIsMenuOpen(false)}
							className="text-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white"
						>
							{t.nav.skills}
						</Link>
						<Link
							href="#about"
							onClick={() => setIsMenuOpen(false)}
							className="text-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white"
						>
							{t.nav.about}
						</Link>

						<div className="grid grid-cols-2 gap-4">
							<button
								onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
								className="flex p-3 neo-brutalism-border bg-white items-center justify-center gap-2"
							>
								{theme === "dark" ? (
									<>
										<Sun className="w-5 h-5 text-black fill-neo-yellow" />
										<span className="text-sm text-black">LIGHT</span>
									</>
								) : (
									<>
										<Moon className="w-5 h-5 text-black" />
										<span className="text-sm text-black">DARK</span>
									</>
								)}
							</button>

							<button
								onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
								className="flex p-3 neo-brutalism-border bg-neo-blue text-white items-center justify-center gap-2"
							>
								<Languages className="w-5 h-5" />
								<span className="text-sm">
									{language === "vi" ? "EN" : "VI"}
								</span>
							</button>
						</div>

						<Button
							className="w-full justify-center text-lg"
							onClick={() => setIsMenuOpen(false)}
						>
							{t.nav.hire}
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
}
