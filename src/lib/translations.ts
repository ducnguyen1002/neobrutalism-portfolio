export const translations = {
	vi: {
		nav: {
			projects: "Dự án",
			skills: "Kỹ năng",
			about: "Về tôi",
			hire: "Tuyển tôi",
		},
		hero: {
			status: "SẴN SÀNG LÀM VIỆC",
			title1: "LẬP TRÌNH VIÊN",
			title2: "FRONT-END",
			desc: "Tôi xây dựng những website vừa <span class='underline decoration-neo-red decoration-8'>táo bạo</span> vừa hiệu quả. Chuyên gia về React, Next.js và thiết kế Neobrutalism.",
			work: "Xem sản phẩm",
			contact: "Liên hệ",
			hireNow: "TUYỂN \n NGAY",
		},
		skills: {
			title: "CÔNG NGHỆ",
			badge: "KỸ NĂNG",
		},
		projects: {
			title: "DỰ ÁN",
			highlight: "TIÊU BIỂU",
			code: "Mã nguồn",
			live: "Trực tiếp",
			items: [
				{
					title: "Dự án số 0",
					description:
						"Nền tảng thương mại điện tử full-stack tập trung vào tốc độ và SEO.",
				},
				{
					title: "Thư viện Brutal UI",
					description:
						"Thư viện component dành cho lập trình viên yêu thích phong cách neobrutalism.",
				},
				{
					title: "Bảng điều khiển Crypto",
					description:
						"Theo dõi danh mục đầu tư crypto với dữ liệu thời gian thực.",
				},
			],
		},
		footer: {
			talk: "HÃY CÙNG",
			talkHighlight: "TRÒ CHUYỆN!",
			desc: "Sẵn sàng cho các dự án freelance và cơ hội làm việc toàn thời gian.",
			madeWith: "Được làm với",
			rights: "Tất cả quyền được bảo lưu.",
		},
		loading: {
			cooking: "DỰ ÁN ĐANG",
			cookingHighlight: "NẤU...",
			warning: "CẢNH BÁO: TRANG WEB NÀY QUÁ ĐỈNH ĐỂ TẢI NHANH",
			messages: [
				"Bình tĩnh, đang vắt óc suy nghĩ...",
				"Đang nạp caffeine cho server...",
				"Đang đuổi mấy con bug cuối cùng...",
				"Đang vẽ thêm vài cái pixel cho đẹp...",
				"Sắp xong rồi, đừng nóng!",
				"Đang tải sự đỉnh cao của bạn...",
				"Hệ thống đang khởi động (bằng niềm tin)...",
			],
		},
	},
	en: {
		nav: {
			projects: "Projects",
			skills: "Skills",
			about: "About",
			hire: "Hire Me",
		},
		hero: {
			status: "OPEN FOR WORK",
			title1: "FRONT-END",
			title2: "DEVELOPER",
			desc: "I build websites that are as <span class='underline decoration-neo-red decoration-8'>bold</span> as they are functional. specialized in React, Next.js, and Neobrutalism Design.",
			work: "View My Work",
			contact: "Contact Me",
			hireNow: "HIRE \n NOW",
		},
		skills: {
			title: "TECH",
			badge: "STACK",
		},
		projects: {
			title: "SELECTED",
			highlight: "PROJECTS",
			code: "Code",
			live: "Live",
			items: [
				{
					title: "Project Zero",
					description:
						"A full-stack e-commerce platform with a focus on speed and SEO.",
				},
				{
					title: "Brutal UI",
					description:
						"A component library for developers who love the neobrutalism style.",
				},
				{
					title: "Crypto Dashboard",
					description:
						"Track your crypto portfolio with real-time data and bold visualizations.",
				},
			],
		},
		footer: {
			talk: "LET'S",
			talkHighlight: "TALK!",
			desc: "Available for freelance projects and full-time opportunities.",
			madeWith: "Made with",
			rights: "All rights reserved.",
		},
		loading: {
			cooking: "PROJECT IS",
			cookingHighlight: "COOKING...",
			warning: "WARNING: THIS SITE IS TOO AWESOME TO LOAD FAST",
			messages: [
				"Stay calm, thinking hard...",
				"Feeding caffeine to the server...",
				"Chasing the last few bugs...",
				"Drawing a few more pixels...",
				"Almost there, don't panic!",
				"Loading your greatness...",
				"System starting (by faith)...",
			],
		},
	},
};

export type Language = "vi" | "en";
export type TranslationType = typeof translations.en;
