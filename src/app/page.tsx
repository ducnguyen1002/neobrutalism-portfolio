import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
	return (
		<main className="min-h-screen relative overflow-x-hidden selection:bg-[#4285f4] selection:text-white">
			<LoadingScreen />
			<div className="veo-aurora-bg" />
			<CustomCursor />
			<Navbar />
			<Hero />
			<Marquee />
			<Projects />
			<Skills />
			<Footer />
		</main>
	);
}
