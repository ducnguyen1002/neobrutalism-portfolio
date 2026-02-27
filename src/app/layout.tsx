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
	title: "Portfolio | Front-End Dev",
	description: "Neobrutalism Portfolio for Front-End Developer",
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
