import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Workflow } from "@/components/Workflow";
import { Projects } from "@/components/Projects";
import { Standards } from "@/components/Standards";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BackToTop } from "@/components/BackToTop";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
	return (
		<main className="min-h-screen relative overflow-x-hidden selection:bg-[#4285f4] selection:text-white">
			<SmoothScroll />
			<LoadingScreen />
			<div className="google-aurora-bg" />
			<CustomCursor />
			<Navbar />
			<Hero />
			<Marquee />
			<About />
			<Experience />
			<Skills />
			<Workflow />
			<Projects />
			<Standards />
			<FAQ />
			<Footer />
			<BackToTop />
		</main>
	);
}

