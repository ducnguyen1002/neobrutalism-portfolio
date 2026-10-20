import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
	title: "DucNV // Front-End Developer",
	description:
		"Portfolio of DucNV, Front-End Developer specializing in high-fidelity web applications, React 19, Next.js, and Google Design Systems.",
	icons: {
		icon: "/neobrutalism-portfolio/favicon.png",
		apple: "/neobrutalism-portfolio/favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="vi"
			suppressHydrationWarning
		>
			<head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="antialiased font-sans">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
