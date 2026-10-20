import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nguyễn Văn Đức (DucNV) — Front-End Developer Portfolio",
    short_name: "DucNV Portfolio",
    description:
      "Portfolio của Nguyễn Văn Đức (DucNV) - Kỹ sư Front-End chuyên sâu React 19, Next.js 16, TypeScript, TailwindCSS v4, Directus Headless CMS và tối ưu hiệu năng cao.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0e17",
    theme_color: "#1a73e8",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
