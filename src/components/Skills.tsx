"use client";

import { useLanguage } from "./Providers";
import {
	MapPin,
	Briefcase,
	GraduationCap,
	Github,
	Linkedin,
	Mail,
} from "lucide-react";
import type { Profile, Skill } from "@/types/database";
import { Tooltip } from "./ui/Tooltip";

interface SkillsProps {
	profile?: Profile | null;
	skills?: Skill[];
}

// Fallback data when Supabase is empty
const FALLBACK_SKILLS = [
	"React",
	"Next.js",
	"TypeScript",
	"Tailwind CSS",
	"RESTful API",
	"GraphQL",
	"Zustand",
	"Directus",
	"WordPress",
	"Git",
	"GSAP",
];

const photos = [
	"/projects/benhvien175_homepage_screenshot.png",
	"/projects/upstock_homepage_screenshot.png",
	"/projects/tanhoangminh_homepage_screenshot.png",
];

export function Skills({ profile, skills }: SkillsProps) {
	const { language } = useLanguage();

	const skillNames =
		skills && skills.length > 0
			? skills.map((s) => s.name)
			: FALLBACK_SKILLS;

	const displayName = profile?.full_name ?? "Duc Nguyen";
	const displayTitle = profile?.title ?? "Front-End Developer";
	const displayBio =
		profile?.bio ??
		(language === "vi"
			? "Lập trình viên Front-End với 3+ năm kinh nghiệm, chuyên về React & Next.js. Đam mê tạo ra những giao diện đẹp và hiệu năng cao."
			: "Front-End Developer with 3+ years of experience, specializing in React & Next.js. Passionate about creating beautiful, high-performance UIs.");
	const displayEmail = profile?.email ?? "ducduc1022000@gmail.com";
	const displayGithub = profile?.github ?? "github.com/ducnguyen1002";
	const displayLinkedin = profile?.linkedin ?? "linkedin.com/in/ducnguyen";
	const displayLocation = profile?.location ?? "Hà Nội, Việt Nam";

	return (
		<div id="skills" className="flex flex-col gap-3">
			{/* ── Giới thiệu Panel ── */}
			<div className="fb-card p-4">
				<h2
					className="mb-3 text-xl font-bold"
					style={{ color: "var(--fb-text)" }}
				>
					{language === "vi" ? "Giới thiệu" : "Intro"}
				</h2>

				{/* Bio */}
				<p
					className="mb-4 text-center text-[15px] leading-relaxed"
					style={{ color: "var(--fb-text)" }}
				>
					{displayBio}
				</p>

				{/* Open to work badge */}
				<div
					className="mb-4 flex items-start gap-2 rounded-lg p-3"
					style={{
						background: "rgba(49, 162, 76, 0.08)",
						border: "1px solid rgba(49, 162, 76, 0.3)",
					}}
				>
					<div
						className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
						style={{ background: "var(--fb-green)" }}
					/>
					<div>
						<p
							className="text-sm font-semibold"
							style={{ color: "var(--fb-green)" }}
						>
							{language === "vi" ? "Đang tìm việc" : "Open to work"}
						</p>
						<p className="mt-0.5 text-xs" style={{ color: "var(--fb-muted)" }}>
							{displayTitle} · {displayLocation}
						</p>
					</div>
				</div>

				{/* Info rows */}
				<div className="flex flex-col gap-0.5">
					<div className="fb-info-row">
						<Briefcase
							className="h-5 w-5 shrink-0"
							style={{ color: "var(--fb-text)" }}
						/>
						<span>
							{language === "vi" ? "Làm việc tại " : "Works as "}
							<span className="font-semibold">{displayTitle}</span>
						</span>
					</div>

					<div className="fb-info-row">
						<GraduationCap
							className="h-5 w-5 shrink-0"
							style={{ color: "var(--fb-text)" }}
						/>
						<span>
							{language === "vi"
								? "3+ năm kinh nghiệm"
								: "3+ years of experience"}
						</span>
					</div>

					<div className="fb-info-row">
						<MapPin
							className="h-5 w-5 shrink-0"
							style={{ color: "var(--fb-text)" }}
						/>
						<span>
							{language === "vi" ? "Sống tại " : "Lives in "}
							<span className="font-semibold">{displayLocation}</span>
						</span>
					</div>

					<a
						href={`mailto:${displayEmail}`}
						className="fb-info-row"
						style={{ textDecoration: "none" }}
					>
						<Mail
							className="h-5 w-5 shrink-0"
							style={{ color: "var(--fb-text)" }}
						/>
						<span style={{ color: "var(--fb-blue)" }}>{displayEmail}</span>
					</a>

					<a
						href={
							displayGithub.startsWith("http")
								? displayGithub
								: `https://${displayGithub}`
						}
						target="_blank"
						rel="noreferrer"
						className="fb-info-row"
						style={{ textDecoration: "none" }}
					>
						<Github
							className="h-5 w-5 shrink-0"
							style={{ color: "var(--fb-text)" }}
						/>
						<span style={{ color: "var(--fb-blue)" }}>{displayGithub}</span>
					</a>

					<a
						href={
							displayLinkedin.startsWith("http")
								? displayLinkedin
								: `https://${displayLinkedin}`
						}
						target="_blank"
						rel="noreferrer"
						className="fb-info-row"
						style={{ textDecoration: "none" }}
					>
						<Linkedin
							className="h-5 w-5 shrink-0"
							style={{ color: "var(--fb-text)" }}
						/>
						<span style={{ color: "var(--fb-blue)" }}>{displayLinkedin}</span>
					</a>
				</div>

				{/* Edit button */}
				<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
					<button
						className="mt-3 w-full rounded-lg py-2 text-sm font-semibold transition-colors"
						style={{ background: "var(--fb-icon-bg)", color: "var(--fb-text)" }}
						onMouseEnter={(e) =>
							((e.currentTarget as HTMLElement).style.background =
								"var(--fb-divider)")
						}
						onMouseLeave={(e) =>
							((e.currentTarget as HTMLElement).style.background =
								"var(--fb-icon-bg)")
						}
					>
						{language === "vi" ? "Chỉnh sửa chi tiết" : "Edit details"}
					</button>
				</Tooltip>
			</div>

			{/* ── Photos Panel ── */}
			<div className="fb-card p-4">
				<div className="mb-3 flex items-center justify-between">
					<h2 className="text-xl font-bold" style={{ color: "var(--fb-text)" }}>
						{language === "vi" ? "Ảnh" : "Photos"}
					</h2>
					<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
						<button
							className="text-sm font-semibold transition-colors"
							style={{ color: "var(--fb-blue)" }}
						>
							{language === "vi" ? "Xem tất cả ảnh" : "See all photos"}
						</button>
					</Tooltip>
				</div>

				<div className="grid grid-cols-3 gap-1">
					{photos.map((src, i) => (
						<div
							key={i}
							className="aspect-square cursor-pointer overflow-hidden rounded-lg"
							style={{ background: "var(--fb-icon-bg)" }}
						>
							<img
								src={src}
								alt={`Project ${i + 1}`}
								className="h-full w-full object-cover transition-opacity"
								onMouseEnter={(e) =>
									((e.target as HTMLImageElement).style.opacity = "0.85")
								}
								onMouseLeave={(e) =>
									((e.target as HTMLImageElement).style.opacity = "1")
								}
							/>
						</div>
					))}
				</div>
			</div>

			{/* ── Skills Panel ── */}
			<div className="fb-card p-4">
				<div className="mb-3 flex items-center justify-between">
					<h2 className="text-xl font-bold" style={{ color: "var(--fb-text)" }}>
						{language === "vi" ? "Kỹ năng" : "Skills"}
					</h2>
					<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
						<button
							className="text-sm font-semibold"
							style={{ color: "var(--fb-blue)" }}
						>
							{language === "vi" ? "Chỉnh sửa" : "Edit"}
						</button>
					</Tooltip>
				</div>

				<div className="flex flex-wrap gap-2">
					{skillNames.map((skill) => (
						<span
							key={skill}
							className="cursor-default rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
							style={{
								background: "var(--fb-icon-bg)",
								color: "var(--fb-text)",
							}}
							onMouseEnter={(e) =>
								((e.currentTarget as HTMLElement).style.background =
									"var(--fb-divider)")
							}
							onMouseLeave={(e) =>
								((e.currentTarget as HTMLElement).style.background =
									"var(--fb-icon-bg)")
							}
						>
							{skill}
						</span>
					))}
				</div>
			</div>

			{/* ── Hobbies Panel ── */}
			<div className="fb-card p-4">
				<div className="mb-3 flex items-center justify-between">
					<h2 className="text-xl font-bold" style={{ color: "var(--fb-text)" }}>
						{language === "vi" ? "Sở thích" : "Hobbies"}
					</h2>
					<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
						<button
							className="text-sm font-semibold transition-colors"
							style={{ color: "var(--fb-blue)" }}
						>
							{language === "vi" ? "Chỉnh sửa" : "Edit"}
						</button>
					</Tooltip>
				</div>
				<div className="flex flex-wrap gap-2">
					{[
						{ vi: "🏊 Bơi lội", en: "🏊 Swimming" },
						{ vi: "🏋️ Gym", en: "🏋️ Gym" },
						{ vi: "🎮 Liên minh huyền thoại", en: "🎮 League of Legends" },
						{ vi: "🎧 Nghe nhạc", en: "🎧 Listening to music" },
					].map((hobby, i) => (
						<span
							key={i}
							className="cursor-default rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors"
							style={{
								borderColor: "var(--fb-divider)",
								color: "var(--fb-text)",
								background: "transparent",
							}}
							onMouseEnter={(e) =>
								((e.currentTarget as HTMLElement).style.background =
									"var(--fb-icon-bg)")
							}
							onMouseLeave={(e) =>
								((e.currentTarget as HTMLElement).style.background =
									"transparent")
							}
						>
							{language === "vi" ? hobby.vi : hobby.en}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
