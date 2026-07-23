import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { SnakeGame } from "@/components/SnakeGame";
import { Footer } from "@/components/Footer";
import { CreatePost } from "@/components/CreatePost";
import { LoadingScreen } from "@/components/LoadingScreen";
import { StoryCarousel } from "@/components/StoryCarousel";

export default function Home() {
	return (
		<main style={{ minHeight: "100vh", background: "var(--fb-bg)" }}>
			<LoadingScreen />
			<Navbar />

			{/* Hero — cover photo + profile header + tabs
			    Uses the same max-w-[1250px] container as the body below */}
			<Hero />

			{/* Body — same max-width and horizontal padding as Hero internals */}
			<div className="mx-auto max-w-6xl pt-4 pb-8">
				<div className="flex items-start gap-4">
					{/* Left sidebar — sticky, 360px fixed */}
					<div
						className="hidden shrink-0 self-start lg:block"
						style={{ width: "360px", position: "sticky", top: "72px" }}
					>
						<Skills />
					</div>

					{/* Right feed — fills remaining width, max 680px */}
					<div className="min-w-0 flex-1">
						<StoryCarousel />
						<CreatePost />
						<Projects />
						{/* <div className="mt-3">
							<SnakeGame />
						</div> */}
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
