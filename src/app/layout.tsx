import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DucNV | Front-End Developer",
  description:
    "Portfolio of Duc Nguyen — Front-End Developer specializing in React, Next.js, and TypeScript.",
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
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
