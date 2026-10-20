import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
	return (
		<main className="min-h-screen relative overflow-x-hidden selection:bg-[#4285f4] selection:text-white">
			<LoadingScreen />
			<div className="google-aurora-bg" />
			<CustomCursor />
			<Navbar />
			<Hero />
			<Marquee />
			<About />
			<Skills />
			<Projects />
			<Footer />
			<BackToTop />
		</main>
	);
}
