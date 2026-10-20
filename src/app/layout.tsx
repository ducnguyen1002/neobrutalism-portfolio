import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-google-sans",
	subsets: ["vietnamese", "latin"],
	weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "DucNV // Front-End Engineering & Generative UI Architect",
	description: "Portfolio of DucNV, Senior Front-End Developer inspired by Google Veo & Google DeepMind. Pushing the frontier of high-fidelity web experiences, React 19, and Next.js.",
	icons: {
		icon: "/neobrutalism-portfolio/favicon.png",
		apple: "/neobrutalism-portfolio/favicon.png",
	},
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body
				className={`${plusJakartaSans.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
