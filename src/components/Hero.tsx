"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, Star } from "lucide-react";
import { Sticker } from "./Sticker";
import { useLanguage } from "./Providers";

export function Hero() {
	const { t } = useLanguage();

	return (
		<section className="pt-32 pb-20 px-4 relative overflow-hidden">
			<Sticker
				text="🚀 Top Rated"
				color="bg-neo-green"
				rotate={10}
				className="top-40 left-10 hidden xl:block"
			/>
			<Sticker
				text="✨ Creative"
				color="bg-neo-purple"
				rotate={-15}
				className="bottom-40 left-20 hidden xl:block"
			/>
			<Sticker
				text="🔥 Fast AF"
				color="bg-neo-red"
				rotate={5}
				className="top-60 right-20 hidden xl:block"
			/>

			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-0">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
				>
					<div className="inline-flex items-center gap-2 bg-neo-green neo-brutalism-border px-4 py-1 mb-6 font-bold text-sm dark:text-black">
						<Star className="w-4 h-4 fill-black" />
						{t.hero.status}
					</div>

					<h1 className="text-4xl md:text-8xl font-black leading-none mb-6 text-black dark:text-white">
						{t.hero.title1} <br />
						<span className="text-neo-purple">{t.hero.title2}</span>
					</h1>

					<p
						className="text-xl md:text-2xl font-bold mb-8 max-w-xl text-black dark:text-zinc-300"
						dangerouslySetInnerHTML={{ __html: t.hero.desc }}
					/>

					<div className="flex flex-wrap gap-6">
						<Button size="lg">
							{t.hero.work} <ArrowRight className="w-5 h-5 ml-2" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="dark:bg-black dark:text-white"
						>
							{t.hero.contact}
						</Button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="relative"
				>
					<div className="w-full aspect-square bg-neo-yellow neo-brutalism-border neo-brutalism-shadow relative overflow-hidden">
						{/* Placeholder for Profile Image */}
						<div className="absolute inset-0 flex items-center justify-center text-8xl font-black opacity-20 select-none dark:text-black">
							DEV
						</div>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
							className="absolute top-10 right-10 flex items-center justify-center"
						>
							<div className="w-32 h-32 bg-neo-purple neo-brutalism-border neo-brutalism-shadow flex items-center justify-center text-white font-black text-center p-2 leading-none">
								{t.hero.hireNow}
							</div>
						</motion.div>
					</div>

					{/* Decorative floating elements */}
					<motion.div
						animate={{ y: [0, -20, 0] }}
						transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
						className="absolute -bottom-6 -left-6 w-24 h-24 bg-neo-red neo-brutalism-border neo-brutalism-shadow"
					/>
				</motion.div>
			</div>
		</section>
	);
}
