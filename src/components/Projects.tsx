"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./Providers";
import { ProjectModal } from "./ui/ProjectModal";
import { Tooltip } from "./ui/Tooltip";
import type { Project } from "@/types/database";
import {
	ThumbsUp,
	MessageCircle,
	Share2,
	Globe,
	MoreHorizontal,
	ExternalLink,
	Github,
	Bookmark,
	Link2,
	Flag,
	EyeOff,
	Send,
	Smile,
} from "lucide-react";

const POST_META = [
	{
		timeVi: "2 giờ trước",
		timeEn: "2 hours ago",
		likes: 47,
		comments: 8,
		shares: 3,
	},
	{
		timeVi: "1 ngày trước",
		timeEn: "1 day ago",
		likes: 91,
		comments: 14,
		shares: 7,
	},
	{
		timeVi: "3 ngày trước",
		timeEn: "3 days ago",
		likes: 63,
		comments: 5,
		shares: 2,
	},
];

interface Comment {
	id: number;
	author: string;
	avatar: string;
	text: string;
	time: string;
	likes: number;
	liked: boolean;
}

const INITIAL_COMMENTS: Record<number, Comment[]> = {
	0: [
		{
			id: 1,
			author: "Minh Tuấn",
			avatar: "MT",
			text: "Website bệnh viện trông rất chuyên nghiệp! 👏",
			time: "1 giờ trước",
			likes: 5,
			liked: false,
		},
		{
			id: 2,
			author: "Thu Hương",
			avatar: "TH",
			text: "UI sạch đẹp, tải nhanh nữa. Impressive!",
			time: "30 phút trước",
			likes: 2,
			liked: false,
		},
	],
	1: [
		{
			id: 1,
			author: "Quang Huy",
			avatar: "QH",
			text: "Dashboard chứng khoán real-time này xịn quá! Echarts render nhanh không?",
			time: "20 giờ trước",
			likes: 8,
			liked: false,
		},
	],
	2: [
		{
			id: 1,
			author: "Lan Anh",
			avatar: "LA",
			text: "Animation GSAP mượt mà, cảm giác premium lắm! 🔥",
			time: "2 ngày trước",
			likes: 12,
			liked: false,
		},
		{
			id: 2,
			author: "Thanh Long",
			avatar: "TL",
			text: "Website Tân Hoàng Minh trông rất sang trọng, xứng đáng với thương hiệu!",
			time: "1 ngày trước",
			likes: 7,
			liked: false,
		},
	],
};

const AVATAR_COLORS = [
	"#1b74e4",
	"#7c3aed",
	"#db2777",
	"#059669",
	"#d97706",
	"#dc2626",
];

function getAvatarColor(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++)
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export const REACTIONS = [
	{
		id: "like",
		emoji: "👍",
		labelVi: "Thích",
		labelEn: "Like",
		color: "var(--fb-blue)",
	},
	{
		id: "love",
		emoji: "❤️",
		labelVi: "Yêu thích",
		labelEn: "Love",
		color: "#f02849",
	},
	{
		id: "care",
		emoji: "🥰",
		labelVi: "Thương thương",
		labelEn: "Care",
		color: "#f7b125",
	},
	{
		id: "haha",
		emoji: "😆",
		labelVi: "Haha",
		labelEn: "Haha",
		color: "#f7b125",
	},
	{ id: "wow", emoji: "😮", labelVi: "Wow", labelEn: "Wow", color: "#f7b125" },
	{ id: "sad", emoji: "😢", labelVi: "Buồn", labelEn: "Sad", color: "#f7b125" },
	{
		id: "angry",
		emoji: "😡",
		labelVi: "Phẫn nộ",
		labelEn: "Angry",
		color: "#f25268",
	},
];

// Normalized project shape used across the component
interface NormalizedProject {
	id?: number;
	title: string;
	description: string;
	github: string;
	live: string;
	image: string;
	tags: string[];
}

interface ProjectsProps {
	projects?: Project[];
}

// Shape DB projects to match existing UI expectations
function normalizeProject(p: Project): NormalizedProject {
	const tags = (p.project_tags ?? []).map((t: any) =>
		typeof t === "string" ? t : t.tag
	);
	return {
		id: p.id,
		title: p.title,
		description: p.short_description ?? p.content ?? "",
		github: p.github_url ?? "#",
		live: p.live_url ?? "#",
		image: p.cover_image ?? "",
		tags,
	};
}

export function Projects({ projects: dbProjects }: ProjectsProps) {
	const { t, language } = useLanguage();

	// Merge DB projects (preferred) with fallback translation data
	const projectList: NormalizedProject[] = dbProjects && dbProjects.length > 0
		? dbProjects.map(normalizeProject)
		: (t.projects.items as any[]).map((p: any) => ({
			title: p.title,
			description: p.description,
			github: p.github,
			live: p.live,
			image: p.image,
			tags: p.tags,
		}));
	const [selectedProject, setSelectedProject] = useState<NormalizedProject | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [reactions, setReactions] = useState<Record<number, string>>({});
	// reactionDbIds: maps postIndex → reaction id in DB (for DELETE)
	const [reactionDbIds, setReactionDbIds] = useState<Record<number, number>>({});
	// reactionCounts from DB
	const [reactionCounts, setReactionCounts] = useState<Record<number, number>>({});
	const [activeReactionPost, setActiveReactionPost] = useState<number | null>(null);
	const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
	const [openMenu, setOpenMenu] = useState<number | null>(null);
	const [showComments, setShowComments] = useState<Set<number>>(new Set());
	const [comments, setComments] = useState<Record<number, Comment[]>>(INITIAL_COMMENTS);
	const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
	// Comment form: require name+email before submitting
	const [commentName, setCommentName] = useState("");
	const [commentEmail, setCommentEmail] = useState("");
	const [commentSubmitting, setCommentSubmitting] = useState<Record<number, boolean>>({});
	const [commentLikes, setCommentLikes] = useState<Record<string, boolean>>({});
	const menuRefs = useRef<Record<number, HTMLDivElement | null>>({});
	const reactionTimeoutRefs = useRef<Record<number, NodeJS.Timeout | null>>({});

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (openMenu !== null) {
				const ref = menuRefs.current[openMenu];
				if (ref && !ref.contains(e.target as Node)) setOpenMenu(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [openMenu]);

	// Fetch reaction counts from DB on mount
	useEffect(() => {
		projectList.forEach((project, i) => {
			if (!project.id) return;
			fetch(`/api/reactions?project_id=${project.id}`)
				.then((r) => r.json())
				.then((data) => {
					if (typeof data.count === "number") {
						setReactionCounts((prev) => ({ ...prev, [i]: data.count }));
					}
				})
				.catch(() => { });
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchComments = useCallback(async (postIndex: number) => {
		const project = projectList[postIndex];
		if (!project?.id) return;
		try {
			const res = await fetch(`/api/comments?project_id=${project.id}`);
			const data = await res.json();
			if (Array.isArray(data)) {
				const mapped: Comment[] = data.map((c: any) => ({
					id: c.id,
					author: c.name,
					avatar: c.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
					text: c.content,
					time: new Date(c.created_at).toLocaleDateString(language === "vi" ? "vi-VN" : "en-US"),
					likes: 0,
					liked: false,
				}));
				setComments((prev) => ({ ...prev, [postIndex]: mapped }));
			}
		} catch { /* keep existing comments */ }
	}, [projectList, language]);

	const toggleLike = async (i: number) => {
		const project = projectList[i];
		const currentReaction = reactions[i];

		if (currentReaction) {
			// Remove reaction
			const dbId = reactionDbIds[i];
			if (dbId) {
				fetch(`/api/reactions?id=${dbId}`, { method: "DELETE" }).catch(() => { });
			}
			setReactions((prev) => ({ ...prev, [i]: "" }));
			setReactionCounts((prev) => ({ ...prev, [i]: Math.max(0, (prev[i] ?? 1) - 1) }));
		} else {
			// Add reaction
			setReactions((prev) => ({ ...prev, [i]: "like" }));
			setReactionCounts((prev) => ({ ...prev, [i]: (prev[i] ?? 0) + 1 }));
			if (project?.id) {
				fetch("/api/reactions", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ project_id: project.id, name: "Anonymous" }),
				})
					.then((r) => r.json())
					.then((data) => {
						if (data?.id) setReactionDbIds((prev) => ({ ...prev, [i]: data.id }));
					})
					.catch(() => { });
			}
		}
	};

	const handleSetReaction = async (i: number, reactionId: string) => {
		const project = projectList[i];
		const currentReaction = reactions[i];

		if (!currentReaction) {
			// New reaction
			setReactionCounts((prev) => ({ ...prev, [i]: (prev[i] ?? 0) + 1 }));
			if (project?.id) {
				fetch("/api/reactions", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ project_id: project.id, name: reactionId }),
				})
					.then((r) => r.json())
					.then((data) => {
						if (data?.id) setReactionDbIds((prev) => ({ ...prev, [i]: data.id }));
					})
					.catch(() => { });
			}
		}
		setReactions((prev) => ({ ...prev, [i]: reactionId }));
		setActiveReactionPost(null);
	};

	const handleReactionMouseEnter = (i: number) => {
		if (reactionTimeoutRefs.current?.[i])
			clearTimeout(reactionTimeoutRefs.current[i]!);
		setActiveReactionPost(i);
	};

	const handleReactionMouseLeave = (i: number) => {
		if (!reactionTimeoutRefs.current) reactionTimeoutRefs.current = {};
		reactionTimeoutRefs.current[i] = setTimeout(() => {
			setActiveReactionPost((prev) => (prev === i ? null : prev));
		}, 300);
	};

	const toggleSave = (i: number) => {
		setSavedPosts((prev) => {
			const next = new Set(prev);
			next.has(i) ? next.delete(i) : next.add(i);
			return next;
		});
		setOpenMenu(null);
	};

	const toggleComments = (i: number) => {
		setShowComments((prev) => {
			const next = new Set(prev);
			if (next.has(i)) {
				next.delete(i);
			} else {
				next.add(i);
				// Fetch from DB when opening for the first time
				if (!comments[i]) fetchComments(i);
			}
			return next;
		});
	};

	const submitComment = async (postIndex: number) => {
		const text = (commentInputs[postIndex] || "").trim();
		if (!text || !commentName.trim() || !commentEmail.trim()) return;
		const project = projectList[postIndex];

		setCommentSubmitting((prev) => ({ ...prev, [postIndex]: true }));
		try {
			if (project?.id) {
				// Submit to Supabase via API
				const res = await fetch("/api/comments", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						project_id: project.id,
						name: commentName,
						email: commentEmail,
						content: text,
					}),
				});
				if (res.ok) {
					const saved = await res.json();
					const newComment: Comment = {
						id: saved.id,
						author: commentName,
						avatar: commentName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
						text,
						time: language === "vi" ? "Vừa xong" : "Just now",
						likes: 0,
						liked: false,
					};
					setComments((prev) => ({ ...prev, [postIndex]: [...(prev[postIndex] || []), newComment] }));
					setCommentInputs((prev) => ({ ...prev, [postIndex]: "" }));
				}
			} else {
				// Fallback: local only
				const newComment: Comment = {
					id: Date.now(),
					author: commentName || "Duc Nguyen",
					avatar: (commentName || "DN").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
					text,
					time: language === "vi" ? "Vừa xong" : "Just now",
					likes: 0,
					liked: false,
				};
				setComments((prev) => ({ ...prev, [postIndex]: [...(prev[postIndex] || []), newComment] }));
				setCommentInputs((prev) => ({ ...prev, [postIndex]: "" }));
			}
		} finally {
			setCommentSubmitting((prev) => ({ ...prev, [postIndex]: false }));
		}
	};

	const toggleCommentLike = (postIndex: number, commentId: number) => {
		const key = `${postIndex}-${commentId}`;
		setCommentLikes((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const copyLink = (url: string) => {
		navigator.clipboard.writeText(url).catch(() => { });
		setOpenMenu(null);
	};

	const MORE_ACTIONS = (index: number, project: NormalizedProject) => [
		{
			icon: <Bookmark className="h-4 w-4" />,
			labelVi: savedPosts.has(index) ? "Đã lưu bài viết" : "Lưu bài viết",
			labelEn: savedPosts.has(index) ? "Post saved" : "Save post",
			onClick: () => toggleSave(index),
			active: savedPosts.has(index),
		},
		{
			icon: <Link2 className="h-4 w-4" />,
			labelVi: "Sao chép liên kết",
			labelEn: "Copy link",
			onClick: () => copyLink(project.live),
		},
		{
			icon: <ExternalLink className="h-4 w-4" />,
			labelVi: "Mở trang web",
			labelEn: "Open website",
			onClick: () => {
				window.open(project.live, "_blank");
				setOpenMenu(null);
			},
		},
		{
			icon: <Github className="h-4 w-4" />,
			labelVi: "Xem mã nguồn",
			labelEn: "View source code",
			onClick: () => {
				window.open(project.github || "#", "_blank");
				setOpenMenu(null);
			},
		},
		{
			icon: <EyeOff className="h-4 w-4" />,
			labelVi: "Ẩn bài viết",
			labelEn: "Hide post",
			onClick: () => setOpenMenu(null),
		},
		{
			icon: <Flag className="h-4 w-4" />,
			labelVi: "Báo cáo bài viết",
			labelEn: "Report post",
			onClick: () => setOpenMenu(null),
		},
	];

	return (
		<div id="projects" className="flex flex-col gap-3">
			{projectList.map((project, index) => {
				const meta = POST_META[index] ?? POST_META[0];
				const currentReaction = reactions[index];
				const reactionData = currentReaction
					? REACTIONS.find((r) => r.id === currentReaction)
					: null;
				const saved = savedPosts.has(index);
				const dbCount = reactionCounts[index] ?? 0;
				const likeCount = dbCount > 0 ? dbCount : meta.likes + (currentReaction ? 1 : 0);
				const postComments = comments[index] || [];
				const isCommentsOpen = showComments.has(index);

				return (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.08, duration: 0.35 }}
						className="fb-card overflow-hidden"
					>
						{/* ── Post Header ── */}
						<div className="flex items-start justify-between p-4 pb-3">
							<div className="flex items-center gap-3">
								<div
									className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
									style={{
										background:
											"linear-gradient(135deg, var(--fb-blue) 0%, #7c3aed 100%)",
									}}
								>
									DN
								</div>
								<div>
									<p
										className="text-[15px] leading-tight font-semibold"
										style={{ color: "var(--fb-text)" }}
									>
										Duc Nguyen
									</p>
									<div className="flex items-center gap-1">
										<span
											className="text-xs"
											style={{ color: "var(--fb-muted)" }}
										>
											{language === "vi" ? meta.timeVi : meta.timeEn}
										</span>
										<span style={{ color: "var(--fb-muted)" }}>·</span>
										<Globe
											className="h-3 w-3"
											style={{ color: "var(--fb-muted)" }}
										/>
									</div>
								</div>
							</div>

							{/* More options button + dropdown */}
							<div
								className="relative"
								ref={(el) => {
									menuRefs.current[index] = el;
								}}
							>
								<button
									className="fb-icon-btn"
									style={{ width: "36px", height: "36px" }}
									onClick={() => setOpenMenu(openMenu === index ? null : index)}
								>
									<MoreHorizontal className="h-5 w-5" />
								</button>

								<AnimatePresence>
									{openMenu === index && (
										<motion.div
											initial={{ opacity: 0, scale: 0.95, y: -4 }}
											animate={{ opacity: 1, scale: 1, y: 0 }}
											exit={{ opacity: 0, scale: 0.95, y: -4 }}
											transition={{ duration: 0.12 }}
											className="absolute top-10 right-0 z-50 w-64 overflow-hidden rounded-lg"
											style={{
												background: "var(--fb-card)",
												boxShadow:
													"0 8px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
												border: "1px solid var(--fb-border)",
											}}
										>
											{MORE_ACTIONS(index, project).map((action, ai) => (
												<button
													key={ai}
													onClick={action.onClick}
													className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors"
													style={{
														color: action.active
															? "var(--fb-blue)"
															: "var(--fb-text)",
														background: "transparent",
													}}
													onMouseEnter={(e) =>
													((e.currentTarget as HTMLElement).style.background =
														"var(--fb-hover)")
													}
													onMouseLeave={(e) =>
													((e.currentTarget as HTMLElement).style.background =
														"transparent")
													}
												>
													<span
														style={{
															color: action.active
																? "var(--fb-blue)"
																: "var(--fb-text)",
														}}
													>
														{action.icon}
													</span>
													<span className="font-medium">
														{language === "vi"
															? action.labelVi
															: action.labelEn}
													</span>
												</button>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						{/* ── Post Body ── */}
						<div className="px-4 pb-3">
							<p
								className="text-[15px] leading-relaxed"
								style={{ color: "var(--fb-text)" }}
							>
								🚀{" "}
								{language === "vi"
									? "Duc vừa hoàn thành dự án: "
									: "Duc just completed a project: "}
								<span className="font-semibold">{project.title}</span>
							</p>
							<p
								className="mt-1.5 text-[15px] leading-relaxed"
								style={{ color: "var(--fb-text)", opacity: 0.85 }}
							>
								{project.description}
							</p>
							<div className="mt-2 flex flex-wrap gap-1">
								{project.tags.map((tag: string) => (
									<span
										key={tag}
										className="text-[15px] font-medium"
										style={{ color: "var(--fb-blue)" }}
									>
										#{tag}
									</span>
								))}
							</div>
						</div>

						{/* ── Project Image + Link Preview ── */}
						<div
							className="cursor-pointer"
							onClick={() => {
								setSelectedProject({ ...project });
								setIsModalOpen(true);
							}}
						>
							<div style={{ overflow: "hidden", maxHeight: "320px" }}>
								<img
									src={project.image}
									alt={project.title}
									className="w-full object-cover transition-opacity"
									style={{ display: "block" }}
									onMouseEnter={(e) =>
										((e.target as HTMLImageElement).style.opacity = "0.92")
									}
									onMouseLeave={(e) =>
										((e.target as HTMLImageElement).style.opacity = "1")
									}
								/>
							</div>
							<div
								className="flex items-center justify-between px-4 py-3"
								style={{ background: "var(--fb-icon-bg)" }}
							>
								<div className="mr-3 overflow-hidden">
									<p
										className="truncate text-xs font-medium tracking-wide uppercase"
										style={{ color: "var(--fb-muted)" }}
									>
										{project.live.replace("https://", "").split("/")[0]}
									</p>
									<p
										className="truncate text-[15px] font-semibold"
										style={{ color: "var(--fb-text)" }}
									>
										{project.title}
									</p>
								</div>
								<button
									className="fb-btn-secondary shrink-0"
									style={{ height: "32px", fontSize: "0.875rem" }}
									onClick={(e) => {
										e.stopPropagation();
										window.open(project.live, "_blank");
									}}
								>
									{language === "vi" ? "Truy cập" : "Visit"}
								</button>
							</div>
						</div>

						{/* ── Reaction + comment count bar ── */}
						<div
							className="flex items-center justify-between px-4 py-2 text-[15px]"
							style={{ color: "var(--fb-muted)" }}
						>
							<div
								className="flex cursor-pointer items-center gap-1.5 hover:underline"
								onClick={() => toggleLike(index)}
							>
								<div className="flex">
									<span
										className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-white"
										style={{ background: "var(--fb-blue)", fontSize: "10px" }}
									>
										👍
									</span>
									<span
										className="-ml-1 flex h-[18px] w-[18px] items-center justify-center rounded-full text-white"
										style={{ background: "#f02849", fontSize: "10px" }}
									>
										❤️
									</span>
								</div>
								<span>{likeCount}</span>
								{saved && (
									<span
										className="ml-2 text-xs font-semibold"
										style={{ color: "var(--fb-blue)" }}
									>
										· {language === "vi" ? "Đã lưu" : "Saved"}
									</span>
								)}
							</div>
							<button
								className="hover:underline"
								onClick={() => toggleComments(index)}
							>
								{language === "vi"
									? `${postComments.length} bình luận · ${meta.shares} lượt chia sẻ`
									: `${postComments.length} comments · ${meta.shares} shares`}
							</button>
						</div>

						{/* Divider */}
						<div
							style={{
								borderTop: "1px solid var(--fb-border)",
								margin: "0 16px",
							}}
						/>

						{/* ── Action Buttons ── */}
						<div className="relative flex px-2 py-1">
							{/* Like Button Wrapper for Hover */}
							<div
								className="relative flex flex-1"
								onMouseEnter={() => handleReactionMouseEnter(index)}
								onMouseLeave={() => handleReactionMouseLeave(index)}
							>
								{/* The Popover */}
								<AnimatePresence>
									{activeReactionPost === index && (
										<motion.div
											initial={{ opacity: 0, y: 10, scale: 0.9 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: 10, scale: 0.9 }}
											transition={{ duration: 0.15 }}
											className="absolute bottom-full left-0 z-50 mb-1 flex items-center gap-1 rounded-full px-3 py-2"
											style={{
												background: "var(--fb-card)",
												boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
												border: "1px solid var(--fb-border)",
											}}
										>
											{REACTIONS.map((r) => (
												<button
													key={r.id}
													className="text-[28px] leading-none transition-transform hover:scale-125"
													style={{ transformOrigin: "bottom" }}
													onClick={(e) => {
														e.stopPropagation();
														handleSetReaction(index, r.id);
													}}
													title={language === "vi" ? r.labelVi : r.labelEn}
												>
													{r.emoji}
												</button>
											))}
										</motion.div>
									)}
								</AnimatePresence>

								<button
									className="fb-post-action w-full"
									style={{
										color: reactionData
											? reactionData.color
											: "var(--fb-muted)",
										fontWeight: reactionData ? 700 : 600,
									}}
									onClick={() => toggleLike(index)}
								>
									{reactionData ? (
										<span className="mr-1.5 text-[20px] leading-none">
											{reactionData.emoji}
										</span>
									) : (
										<ThumbsUp className="mr-1.5 h-5 w-5" />
									)}
									{reactionData
										? language === "vi"
											? reactionData.labelVi
											: reactionData.labelEn
										: language === "vi"
											? "Thích"
											: "Like"}
								</button>
							</div>

							<button
								className="fb-post-action flex-1"
								onClick={() => toggleComments(index)}
							>
								<MessageCircle className="mr-1.5 h-5 w-5" />
								{language === "vi" ? "Bình luận" : "Comment"}
							</button>
							<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
								<button className="fb-post-action flex-1">
									<Share2 className="mr-1.5 h-5 w-5" />
									{language === "vi" ? "Chia sẻ" : "Share"}
								</button>
							</Tooltip>
						</div>

						{/* ── Comments Section ── */}
						<AnimatePresence>
							{isCommentsOpen && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.2 }}
									style={{
										borderTop: "1px solid var(--fb-border)",
										overflow: "hidden",
									}}
								>
									{/* Existing Comments */}
									<div className="flex flex-col gap-3 px-4 pt-3">
										{postComments.map((comment) => {
											const likeKey = `${index}-${comment.id}`;
											const cLiked = commentLikes[likeKey];
											const cLikeCount = comment.likes + (cLiked ? 1 : 0);
											return (
												<div key={comment.id} className="flex gap-2">
													{/* Avatar */}
													<div
														className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
														style={{
															background: getAvatarColor(comment.author),
														}}
													>
														{comment.avatar}
													</div>
													<div className="flex-1">
														{/* Comment bubble */}
														<div
															className="inline-block rounded-2xl px-3 py-2"
															style={{
																background: "var(--fb-icon-bg)",
																maxWidth: "100%",
															}}
														>
															<p
																className="text-xs font-bold"
																style={{ color: "var(--fb-text)" }}
															>
																{comment.author}
															</p>
															<p
																className="text-[15px]"
																style={{ color: "var(--fb-text)" }}
															>
																{comment.text}
															</p>
														</div>
														{/* Comment actions */}
														<div className="mt-1 ml-2 flex items-center gap-3">
															<button
																className="text-xs font-bold transition-colors"
																style={{
																	color: cLiked
																		? "var(--fb-blue)"
																		: "var(--fb-muted)",
																}}
																onClick={() =>
																	toggleCommentLike(index, comment.id)
																}
															>
																{language === "vi" ? "Thích" : "Like"}
																{cLikeCount > 0 && ` · ${cLikeCount}`}
															</button>
															<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
																<button
																	className="text-xs font-bold"
																	style={{ color: "var(--fb-muted)" }}
																>
																	{language === "vi" ? "Phản hồi" : "Reply"}
																</button>
															</Tooltip>
															<span
																className="text-xs"
																style={{ color: "var(--fb-muted)" }}
															>
																{comment.time}
															</span>
														</div>
													</div>
												</div>
											);
										})}
									</div>

									{/* Comment Input */}
									<div className="flex flex-col gap-2 px-4 py-3">
										{/* Name & Email fields */}
										<div className="flex gap-2">
											<input
												type="text"
												value={commentName}
												onChange={(e) => setCommentName(e.target.value)}
												placeholder={language === "vi" ? "Tên của bạn *" : "Your name *"}
												className="flex-1 rounded-lg px-3 py-1.5 text-xs outline-none"
												style={{
													background: "var(--fb-icon-bg)",
													color: "var(--fb-text)",
													border: "1px solid var(--fb-border)",
												}}
											/>
											<input
												type="email"
												value={commentEmail}
												onChange={(e) => setCommentEmail(e.target.value)}
												placeholder="Email *"
												className="flex-1 rounded-lg px-3 py-1.5 text-xs outline-none"
												style={{
													background: "var(--fb-icon-bg)",
													color: "var(--fb-text)",
													border: "1px solid var(--fb-border)",
												}}
											/>
										</div>
										{/* Comment input row */}
										<div className="flex gap-2">
											<div
												className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
												style={{
													background: commentName
														? `linear-gradient(135deg, ${getAvatarColor(commentName)} 0%, #7c3aed 100%)`
														: "linear-gradient(135deg, var(--fb-blue) 0%, #7c3aed 100%)",
												}}
											>
												{commentName
													? commentName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
													: "?"}
											</div>
											<div
												className="flex flex-1 items-center gap-2 rounded-full px-3 pr-2"
												style={{ background: "var(--fb-icon-bg)" }}
											>
												<input
													type="text"
													value={commentInputs[index] || ""}
													onChange={(e) =>
														setCommentInputs((prev) => ({
															...prev,
															[index]: e.target.value,
														}))
													}
													onKeyDown={(e) => {
														if (e.key === "Enter" && !e.shiftKey) {
															e.preventDefault();
															submitComment(index);
														}
													}}
													placeholder={
														language === "vi"
															? "Viết bình luận..."
															: "Write a comment..."
													}
													className="flex-1 bg-transparent py-2 text-sm outline-none"
													style={{ color: "var(--fb-text)" }}
													autoFocus
												/>
												<div className="flex shrink-0 items-center gap-1">
													<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
														<button
															className="flex h-8 w-8 items-center justify-center rounded-full"
															style={{ color: "var(--fb-muted)" }}
															onMouseEnter={(e) =>
																((e.currentTarget as HTMLElement).style.background = "var(--fb-hover)")
															}
															onMouseLeave={(e) =>
																((e.currentTarget as HTMLElement).style.background = "transparent")
															}
														>
															<Smile className="h-4 w-4" />
														</button>
													</Tooltip>
													<button
														className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
														style={{
															color:
																commentInputs[index]?.trim() && commentName && commentEmail
																	? "var(--fb-blue)"
																	: "var(--fb-muted)",
															background: "transparent",
														}}
														onClick={() => submitComment(index)}
														disabled={commentSubmitting[index]}
														onMouseEnter={(e) =>
															((e.currentTarget as HTMLElement).style.background = "var(--fb-hover)")
														}
														onMouseLeave={(e) =>
															((e.currentTarget as HTMLElement).style.background = "transparent")
														}
													>
														<Send className="h-4 w-4" />
													</button>
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				);
			})}

			<ProjectModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				project={selectedProject}
			/>
		</div>
	);
}
