import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { CreatePost } from "@/components/CreatePost";
import { LoadingScreen } from "@/components/LoadingScreen";
import { StoryCarousel } from "@/components/StoryCarousel";
import { ContactFloat } from "@/components/ContactFloat";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Profile, Project, Skill } from "@/types/database";

export default async function Home() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	// Fetch all data in parallel
	const [profileRes, projectsRes, skillsRes] = await Promise.all([
		supabase.from("profile").select("*").eq("id", 1).single(),
		supabase
			.from("projects")
			.select("*, project_tags(tag)")
			.order("sort_order", { ascending: true }),
		supabase.from("skills").select("*").order("sort_order", { ascending: true }),
	]);

	const profile = profileRes.data as Profile | null;
	const projects = (projectsRes.data ?? []) as Project[];
	const skills = (skillsRes.data ?? []) as Skill[];

	return (
		<main style={{ minHeight: "100vh", background: "var(--fb-bg)" }}>
			<LoadingScreen />
			<Navbar />

			{/* Hero — cover photo + profile header + tabs */}
			<Hero profile={profile} />

			{/* Body */}
			<div className="mx-auto max-w-6xl pt-4 pb-8">
				<div className="flex items-start gap-4">
					{/* Left sidebar — sticky, 360px fixed */}
					<div
						className="hidden shrink-0 self-start lg:block"
						style={{ width: "360px", position: "sticky", top: "72px" }}
					>
						<Skills profile={profile} skills={skills} />
					</div>

					{/* Right feed */}
					<div className="min-w-0 flex-1">
						<StoryCarousel />
						<CreatePost />
						<Projects projects={projects} />
					</div>
				</div>
			</div>

			<Footer />

			{/* Floating contact button — fixed position */}
			<ContactFloat />
		</main>
	);
}
