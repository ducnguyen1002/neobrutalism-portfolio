"use client";

export function Footer() {
	const links = [
		"Quyền riêng tư",
		"Điều khoản",
		"Quảng cáo",
		"Lựa chọn quảng cáo",
		"Cookie",
		"Thông tin thêm",
	];

	return (
		<footer className="mt-2 flex justify-center px-4 py-6">
			<div className="max-w-3xl">
				<div className="mb-1 flex flex-wrap gap-x-1.5 gap-y-1">
					{links.map((link) => (
						<span
							key={link}
							className="cursor-pointer text-xs hover:underline"
							style={{ color: "var(--fb-muted)" }}
						>
							{link} ·
						</span>
					))}
				</div>
				<p className="text-xs" style={{ color: "var(--fb-muted)" }}>
					<span className="font-semibold">Meta</span> © 2026 &nbsp;|&nbsp; DucNV
					Portfolio · Made with ❤️ Google Antigravity
				</p>
			</div>
		</footer>
	);
}
