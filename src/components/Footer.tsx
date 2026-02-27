"use client";

import { Github, Twitter, Linkedin, Heart } from "lucide-react";
import { useLanguage } from "./Providers";

export function Footer() {
	const { t } = useLanguage();

	return (
		<footer className="py-20 px-4 bg-white dark:bg-black border-t-4 border-(--border-color)">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
				<div>
					<h2 className="text-4xl font-black mb-4 text-black dark:text-white">
						{t.footer.talk}{" "}
						<span className="text-neo-yellow underline">
							{t.footer.talkHighlight}
						</span>
					</h2>
					<p className="text-xl font-bold max-w-md mb-8 text-black/70 dark:text-zinc-400">
						{t.footer.desc}
					</p>
					<div className="flex gap-6">
						<a
							href="#"
							className="p-3 bg-neo-purple neo-brutalism-border neo-brutalism-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
						>
							<Github className="w-6 h-6 dark:text-white" />
						</a>
						<a
							href="#"
							className="p-3 bg-neo-yellow neo-brutalism-border neo-brutalism-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-black"
						>
							<Linkedin className="w-6 h-6" />
						</a>
						<a
							href="#"
							className="p-3 bg-neo-green neo-brutalism-border neo-brutalism-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-black"
						>
							<Twitter className="w-6 h-6" />
						</a>
					</div>
				</div>

				<div className="text-center md:text-right">
					<p className="text-2xl font-black mb-2 italic text-black dark:text-white">
						hello@frontend.dev
					</p>
					<p className="font-bold flex items-center justify-center md:justify-end gap-2 text-black/70 dark:text-zinc-300">
						{t.footer.madeWith}{" "}
						<Heart className="w-4 h-4 fill-neo-red text-neo-red" /> by
						Antigravity AI
					</p>
					<p className="text-xs font-bold mt-4 opacity-50 text-black dark:text-white">
						{t.footer.rights} © 2024 PORTFOLIO.
					</p>
				</div>
			</div>
		</footer>
	);
}
