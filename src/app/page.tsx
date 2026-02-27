import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { SnakeGame } from "@/components/SnakeGame";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
	return (
		<main className="min-h-screen relative overflow-x-hidden">
			<LoadingScreen />
			<div className="grid-bg" />
			<div className="noise-overlay" />
			<CustomCursor />
			<Navbar />
			<Hero />
			<Marquee />
			<Skills />
			<Projects />
			<SnakeGame />
			<Footer />
		</main>
	);
}
