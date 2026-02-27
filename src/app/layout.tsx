import type { Metadata } from "next";
import { Be_Vietnam_Pro, Space_Grotesk } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
	variable: "--font-be-vietnam",
	subsets: ["vietnamese", "latin"],
	weight: ["400", "500", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["vietnamese", "latin"],
});

export const metadata: Metadata = {
	title: "DucNV | Front-End Dev",
	description: "Say hi to my visitors! This is my Neobrutalism Portfolio built with strong support from Antigravity.",
	icons: {
		icon: "/favicon.png",
		apple: "/favicon.png",
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
				className={`${beVietnamPro.variable} ${spaceGrotesk.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
