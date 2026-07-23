"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./Providers";
import { ProjectModal } from "./ui/ProjectModal";
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

export function Projects() {
	const { t, language } = useLanguage();
	const [selectedProject, setSelectedProject] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [reactions, setReactions] = useState<Record<number, string>>({});
	const [activeReactionPost, setActiveReactionPost] = useState<number | null>(
		null,
	);
	const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
	const [openMenu, setOpenMenu] = useState<number | null>(null);
	const [showComments, setShowComments] = useState<Set<number>>(new Set());
	const [comments, setComments] = useState(INITIAL_COMMENTS);
	const [commentInputs, setCommentInputs] = useState<Record<number, string>>(
		{},
	);
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

	const toggleLike = (i: number) => {
		setReactions((prev) => ({
			...prev,
			[i]: prev[i] ? "" : "like",
		}));
	};

	const handleSetReaction = (i: number, reactionId: string) => {
		setReactions((prev) => ({
			...prev,
			[i]: reactionId,
		}));
		setActiveReactionPost(null);
	};

	const handleReactionMouseEnter = (i: number) => {
		if (reactionTimeoutRefs.current[i])
			clearTimeout(reactionTimeoutRefs.current[i]!);
		setActiveReactionPost(i);
	};

	const handleReactionMouseLeave = (i: number) => {
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
			next.has(i) ? next.delete(i) : next.add(i);
			return next;
		});
	};

	const submitComment = (postIndex: number) => {
		const text = (commentInputs[postIndex] || "").trim();
		if (!text) return;
		const newComment: Comment = {
			id: Date.now(),
			author: "Duc Nguyen",
			avatar: "DN",
			text,
			time: language === "vi" ? "Vừa xong" : "Just now",
			likes: 0,
			liked: false,
		};
		setComments((prev) => ({
			...prev,
			[postIndex]: [...(prev[postIndex] || []), newComment],
		}));
		setCommentInputs((prev) => ({ ...prev, [postIndex]: "" }));
	};

	const toggleCommentLike = (postIndex: number, commentId: number) => {
		const key = `${postIndex}-${commentId}`;
		setCommentLikes((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const copyLink = (url: string) => {
		navigator.clipboard.writeText(url).catch(() => { });
		setOpenMenu(null);
	};

	const MORE_ACTIONS = (index: number, project: any) => [
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
			{t.projects.items.map((project: any, index: number) => {
				const meta = POST_META[index] ?? POST_META[0];
				const currentReaction = reactions[index];
				const reactionData = currentReaction
					? REACTIONS.find((r) => r.id === currentReaction)
					: null;
				const saved = savedPosts.has(index);
				const likeCount = meta.likes + (currentReaction ? 1 : 0);
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
							<button className="fb-post-action flex-1">
								<Share2 className="mr-1.5 h-5 w-5" />
								{language === "vi" ? "Chia sẻ" : "Share"}
							</button>
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
															<button
																className="text-xs font-bold"
																style={{ color: "var(--fb-muted)" }}
															>
																{language === "vi" ? "Phản hồi" : "Reply"}
															</button>
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
									<div className="flex gap-2 px-4 py-3">
										<div
											className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
											style={{
												background:
													"linear-gradient(135deg, var(--fb-blue) 0%, #7c3aed 100%)",
											}}
										>
											DN
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
												<button
													className="flex h-8 w-8 items-center justify-center rounded-full"
													style={{ color: "var(--fb-muted)" }}
													onMouseEnter={(e) =>
													((e.currentTarget as HTMLElement).style.background =
														"var(--fb-hover)")
													}
													onMouseLeave={(e) =>
													((e.currentTarget as HTMLElement).style.background =
														"transparent")
													}
												>
													<Smile className="h-4 w-4" />
												</button>
												<button
													className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
													style={{
														color: commentInputs[index]?.trim()
															? "var(--fb-blue)"
															: "var(--fb-muted)",
														background: "transparent",
													}}
													onClick={() => submitComment(index)}
													onMouseEnter={(e) =>
													((e.currentTarget as HTMLElement).style.background =
														"var(--fb-hover)")
													}
													onMouseLeave={(e) =>
													((e.currentTarget as HTMLElement).style.background =
														"transparent")
													}
												>
													<Send className="h-4 w-4" />
												</button>
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
