import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nvduc.vercel.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0e17" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Nguyễn Văn Đức (DucNV) — Front-End Developer | React 19 & Next.js",
    template: "%s | Nguyễn Văn Đức (DucNV)",
  },
  description:
    "Portfolio của Nguyễn Văn Đức (DucNV) - Kỹ sư Front-End với hơn 4 năm kinh nghiệm thực chiến chuyên sâu Next.js 16, React 19, TypeScript, TailwindCSS v4, Directus Headless CMS và tối ưu hiệu năng cao (< 50ms).",
  applicationName: "DucNV Portfolio",
  authors: [
    {
      name: "Nguyễn Văn Đức (DucNV)",
      url: "https://github.com/ducnguyen1002",
    },
  ],
  generator: "Next.js 16",
  keywords: [
    "Nguyễn Văn Đức",
    "DucNV",
    "Front-End Developer",
    "Kỹ sư Front-End",
    "React 19 Developer",
    "Next.js 16",
    "TypeScript",
    "TailwindCSS v4",
    "Directus CMS",
    "GSAP Animation",
    "Web Performance Optimization",
    "Portfolio Lập trình viên",
    "Thiết kế giao diện web",
    "Google Design System",
    "High-Performance Web Apps",
    "Thanh Hóa Developer",
    "Vietnam Front-End Engineer",
  ],
  creator: "Nguyễn Văn Đức",
  publisher: "Nguyễn Văn Đức",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "vi-VN": `${siteUrl}?lang=vi`,
      "en-US": `${siteUrl}?lang=en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: siteUrl,
    title: "Nguyễn Văn Đức (DucNV) — Front-End Developer | React 19 & Next.js",
    description:
      "Kỹ sư Front-End chuyên sâu React 19 & Next.js. Biến ý tưởng phức tạp thành sản phẩm web mượt mà, thẩm mỹ tinh chuẩn và tối ưu tốc độ tương tác < 50ms.",
    siteName: "Nguyễn Văn Đức (DucNV) Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nguyễn Văn Đức (DucNV) - Front-End Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Văn Đức (DucNV) — Front-End Developer | React 19 & Next.js",
    description:
      "Kỹ sư Front-End chuyên sâu React 19 & Next.js. Biến ý tưởng phức tạp thành sản phẩm web mượt mà, thẩm mỹ tinh chuẩn và tối ưu tốc độ.",
    images: ["/og-image.png"],
    creator: "@ducnguyen1002",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Nguyễn Văn Đức",
      alternateName: ["DucNV", "Nguyen Van Duc"],
      jobTitle: "Front-End Developer",
      description:
        "Kỹ sư Front-End với hơn 4 năm kinh nghiệm chuyên sâu trong việc kiến tạo và vận hành các hệ thống web quy mô lớn, Next.js 16, React 19, TypeScript, Directus Headless CMS và hoạt họa GSAP.",
      url: siteUrl,
      image: `${siteUrl}/favicon.png`,
      email: "mailto:ducduc1022000@gmail.com",
      telephone: "+84363026362",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Thanh Hóa",
        addressCountry: "VN",
      },
      sameAs: [
        "https://github.com/ducnguyen1002",
        "https://linkedin.com",
        "https://twitter.com",
      ],
      knowsAbout: [
        "React 19",
        "Next.js 16",
        "TypeScript",
        "TailwindCSS v4",
        "Directus Headless CMS",
        "GSAP Motion",
        "Echarts Data Visualization",
        "Web Performance Optimization",
        "Google Design System",
        "Real-time Financial Dashboards",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Nguyễn Văn Đức (DucNV) — Front-End Developer Portfolio",
      description:
        "Portfolio trực tuyến của Nguyễn Văn Đức (DucNV) xây dựng theo chuẩn Google Design System & Liquid Glass.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: ["vi-VN", "en-US"],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Nguyễn Văn Đức (DucNV) Developer Profile",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
