"use client";

import { Card } from "./ui/Card";
import { useLanguage } from "./Providers";

const skills = [
	{ name: "React", color: "yellow" },
	{ name: "Next.js", color: "purple" },
	{ name: "TypeScript", color: "green" },
	{ name: "Tailwind CSS", color: "blue" },
	{ name: "Framer Motion", color: "red" },
	{ name: "Node.js", color: "yellow" },
	{ name: "Supabase", color: "purple" },
	{ name: "PostgreSQL", color: "green" },
	{ name: "Git", color: "blue" },
	{ name: "UI Design", color: "red" },
];

export function Skills() {
	const { t } = useLanguage();

	return (
		<section
			id="skills"
			className="py-20 px-4 bg-[#f6f6f6] dark:bg-[#1a1a1a]"
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-5xl font-black mb-12 flex items-center gap-4 text-black dark:text-white">
					{t.skills.title}{" "}
					<span className="bg-neo-yellow px-4 py-1 neo-brutalism-border dark:text-black">
						{t.skills.badge}
					</span>
				</h2>

				<div className="flex flex-wrap gap-4">
					{skills.map((skill, index) => (
						<div
							key={index}
							className={`text-2xl font-black px-6 py-3 neo-brutalism-border neo-brutalism-shadow bg-(--card-background) hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default select-none`}
						>
							<span className={`text-neo-${skill.color}`}>{skill.name}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
