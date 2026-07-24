"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, PenLine, Plus, ChevronDown } from "lucide-react";
import { useLanguage } from "./Providers";
import { Tooltip } from "./ui/Tooltip";
import type { Profile } from "@/types/database";

interface HeroProps {
	profile?: Profile | null;
}

export function Hero({ profile }: HeroProps) {
	const { language } = useLanguage();
	const [activeTab, setActiveTab] = useState("posts");
	const [showSkillsList, setShowSkillsList] = useState(false);

	const tabs = [
		{ id: "posts", labelVi: "Bài viết", labelEn: "Posts", href: "#" },
		{ id: "about", labelVi: "Giới thiệu", labelEn: "About", href: "#skills" },
		{
			id: "projects",
			labelVi: "Dự án",
			labelEn: "Projects",
			href: "#projects",
		},
		{ id: "game", labelVi: "Trò chơi", labelEn: "Game", href: "#game" },
	];

	const handleTabClick = (tab: (typeof tabs)[0]) => {
		setActiveTab(tab.id);
		if (tab.href !== "#") {
			const el = document.getElementById(tab.href.replace("#", ""));
			el?.scrollIntoView({ behavior: "smooth" });
		}
	};

	/* Decorative avatar row — friend-like colored circles */
	const avatarColors = ["#1b74e4", "#7c3aed", "#db2777", "#f59e0b", "#31a24c"];

	return (
		<div style={{ marginTop: "var(--fb-topbar-h)" }}>
			<div className="mx-auto max-w-6xl">
				{/* ── Cover Photo ── */}
				<div
					className="relative overflow-hidden rounded-b-xl"
					style={{ background: "var(--fb-card)" }}
				>
					<div
						className="relative overflow-hidden rounded-b-xl"
						style={{ height: "clamp(200px, 30vw, 350px)" }}
					>
						{/* Gradient cover */}
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(135deg, #1877f2 0%, #7c3aed 35%, #db2777 65%, #f59e0b 100%)",
							}}
						/>
						{/* Subtle dot pattern overlay */}
						<div
							className="absolute inset-0 opacity-[0.15]"
							style={{
								backgroundImage:
									"radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 0)",
								backgroundSize: "28px 28px",
							}}
						/>
						{/* Gradient fade at bottom for smooth blend */}
						<div
							className="absolute right-0 bottom-0 left-0 h-24"
							style={{
								background:
									"linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
							}}
						/>

						{/* Add cover photo button */}
						<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
							<button
								className="absolute right-4 bottom-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shadow-sm transition-colors"
								style={{
									background: "rgba(255,255,255,0.88)",
									color: "#050505",
								}}
							>
								<Camera className="h-4 w-4" />
								{language === "vi" ? "Thêm ảnh bìa" : "Add cover photo"}
							</button>
						</Tooltip>
					</div>

					{/* ── Profile Section ── */}
					<div style={{ background: "var(--fb-card)" }}>
						<div className="p-4">
							<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
								{/* Avatar + name block */}
								<div className="flex flex-col gap-4 sm:flex-row sm:items-end">
									{/* Avatar circle — overlaps cover by ~40px */}
									<div className="relative -mt-15 shrink-0 sm:-mt-20">
										<div
											className="flex h-35 w-35 items-center justify-center rounded-full text-5xl font-bold text-white sm:h-[168px] sm:w-[168px]"
											style={{
												background:
													"linear-gradient(135deg, #1b74e4 0%, #7c3aed 100%)",
												border: "4px solid var(--fb-card)",
												boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
											}}
										>
											{profile?.full_name
												? profile.full_name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
												: "DN"}
										</div>
										{/* Green online dot */}
										<div
											className="absolute right-2 bottom-2 h-7 w-7 rounded-full"
											style={{
												background: "var(--fb-green)",
												border: "4px solid var(--fb-card)",
											}}
										/>
									</div>

									{/* Name & stats */}
									<div className="pb-3 sm:pb-4">
										<h1
											className="text-3xl leading-tight font-bold"
											style={{ color: "var(--fb-text)" }}
										>
											{profile?.full_name ?? "Duc Nguyen"}
										</h1>
										<p
											className="mt-0.5 text-sm"
											style={{ color: "var(--fb-muted)" }}
										>
											{profile?.title ?? "Front-End Developer"}
										</p>

										{/* Stats line */}
										<p
											className="mt-0.5 text-[13px] font-semibold"
											style={{ color: "var(--fb-muted)" }}
										>
											{language === "vi"
												? "3 dự án nổi bật · 10 kỹ năng"
												: "3 featured projects · 10 skills"}
										</p>

										{/* Decorative avatar row (skills/connections) */}
										<div className="relative mt-2">
											<div
												className="flex cursor-pointer items-center gap-1 hover:underline"
												onClick={() => setShowSkillsList(!showSkillsList)}
											>
												{avatarColors.map((color, i) => (
													<div
														key={i}
														className="h-8 w-8 rounded-full"
														style={{
															background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
															border: "2px solid var(--fb-card)",
															marginLeft: i === 0 ? 0 : "-8px",
														}}
													/>
												))}
												<span
													className="ml-2 text-[13px] font-semibold select-none"
													style={{ color: "var(--fb-muted)" }}
												>
													{language === "vi"
														? "React, Next.js và 8 công nghệ khác"
														: "React, Next.js and 8 more technologies"}
												</span>
											</div>

											{/* Skills Popover */}
											<AnimatePresence>
												{showSkillsList && (
													<motion.div
														initial={{ opacity: 0, y: 5 }}
														animate={{ opacity: 1, y: 0 }}
														exit={{ opacity: 0, y: 5 }}
														transition={{ duration: 0.15 }}
														className="absolute bottom-full left-0 z-50 mt-2 w-[320px] rounded-xl p-3 shadow-lg"
														style={{
															background: "var(--fb-card)",
															border: "1px solid var(--fb-border)",
														}}
													>
														<p
															className="mb-2 text-xs font-bold uppercase"
															style={{ color: "var(--fb-muted)" }}
														>
															{language === "vi"
																? "Kỹ năng chuyên môn"
																: "Technical Skills"}
														</p>
														<div className="flex flex-wrap gap-1.5">
															{[
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
															].map((skill) => (
																<span
																	key={skill}
																	className="rounded-md border px-2.5 py-1 text-[13px] font-medium"
																	style={{
																		background: "var(--fb-bg)",
																		color: "var(--fb-text)",
																		borderColor: "var(--fb-divider)",
																	}}
																>
																	{skill}
																</span>
															))}
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									</div>
								</div>

								{/* Action buttons */}
								<div className="mt-2 flex flex-wrap items-center gap-2 pb-4 sm:mt-0">
									<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
										<button className="fb-btn-primary">
											<Plus className="h-4 w-4" />
											{language === "vi" ? "Thêm vào tin" : "Add to story"}
										</button>
									</Tooltip>
									<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
										<button className="fb-btn-secondary">
											<PenLine className="h-4 w-4" />
											{language === "vi" ? "Chỉnh sửa trang" : "Edit profile"}
										</button>
									</Tooltip>
									<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
										<button
											className="fb-btn-secondary"
											style={{
												width: "36px",
												padding: 0,
												justifyContent: "center",
											}}
										>
											<ChevronDown className="h-5 w-5" />
										</button>
									</Tooltip>
								</div>
							</div>
						</div>

						{/* Divider */}
						<div
							style={{
								borderTop: "1px solid var(--fb-border)",
								marginLeft: "16px",
								marginRight: "16px",
							}}
						/>

						{/* ── Tab Bar ── */}
						<div className="scrollbar-hide flex items-stretch overflow-x-auto px-2 pt-2 md:px-6">
							{tabs.map((tab) => {
								const isActive = activeTab === tab.id;
								return (
									<button
										key={tab.id}
										onClick={() => handleTabClick(tab)}
										className="relative mx-0.5 shrink-0 rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors"
										style={{
											color: isActive ? "var(--fb-blue)" : "var(--fb-muted)",
										}}
										onMouseEnter={(e) => {
											if (!isActive)
												(e.currentTarget as HTMLElement).style.background =
													"var(--fb-hover)";
										}}
										onMouseLeave={(e) => {
											if (!isActive)
												(e.currentTarget as HTMLElement).style.background =
													"transparent";
										}}
									>
										{language === "vi" ? tab.labelVi : tab.labelEn}

										{isActive && (
											<motion.div
												layoutId="fb-tab-bar"
												className="absolute right-0 bottom-0 left-0 rounded-full"
												style={{
													height: "3px",
													background: "var(--fb-blue)",
												}}
											/>
										)}
									</button>
								);
							})}

							{/* More button */}
							<Tooltip content={language === "vi" ? "Chức năng này không khả dụng" : "This feature is unavailable"}>
								<button
									className="ml-auto shrink-0 rounded-lg px-4 py-3 text-[15px] font-semibold"
									style={{ color: "var(--fb-muted)" }}
									onMouseEnter={(e) => {
										(e.currentTarget as HTMLElement).style.background =
											"var(--fb-hover)";
									}}
									onMouseLeave={(e) => {
										(e.currentTarget as HTMLElement).style.background =
											"transparent";
									}}
								>
									···
								</button>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
