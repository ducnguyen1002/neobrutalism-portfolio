"use client";

import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "./Providers";

export function Projects() {
	const { t } = useLanguage();

	return (
		<section
			id="projects"
			className="py-20 px-4 bg-white dark:bg-black border-y-4 border-(--border-color)"
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-5xl font-black mb-12 flex items-center gap-4 text-black dark:text-white">
					{t.projects.title}{" "}
					<span className="text-neo-red italic">{t.projects.highlight}</span>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{t.projects.items.map((project, index) => {
						const projectMeta = [
							{
								tags: ["Next.js", "TypeScript", "Stripe"],
								color: "yellow",
							},
							{
								tags: ["React", "TailwindCSS", "Framer Motion"],
								color: "purple",
							},
							{
								tags: ["React", "D3.js", "Web3"],
								color: "green",
							},
						][index];

						return (
							<Card
								key={index}
								color={projectMeta.color as any}
								className="flex flex-col h-full"
							>
								<div className="h-48 bg-black/10 neo-brutalism-border mb-6 flex items-center justify-center font-black text-4xl overflow-hidden grayscale">
									IMAGE
								</div>
								<h3 className="text-3xl font-black mb-4 dark:text-black">
									{project.title}
								</h3>
								<p className="font-bold mb-6 grow dark:text-black">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2 mb-6">
									{projectMeta.tags.map((tag: string) => (
										<span
											key={tag}
											className="bg-white neo-brutalism-border px-2 py-1 text-xs font-black text-black"
										>
											#{tag}
										</span>
									))}
								</div>

								<div className="flex gap-4">
									<Button
										size="sm"
										variant="outline"
										className="flex-1 dark:bg-black dark:text-white"
									>
										<Github className="w-4 h-4" /> {t.projects.code}
									</Button>
									<Button
										size="sm"
										className="flex-1"
									>
										<ExternalLink className="w-4 h-4" /> {t.projects.live}
									</Button>
								</div>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
