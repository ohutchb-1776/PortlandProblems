import type { NextConfig } from "next";

// When deploying to GitHub Pages (a project site), the app is served from
// https://<user>.github.io/<repo>/ , so it needs a base path. The deploy
// workflow sets PAGES_BASE_PATH to "/<repo>"; locally it's empty.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Emit a fully static site (an `out/` folder) that any static host can serve.
  output: "export",
  // GitHub Pages can't run Next's image optimizer.
  images: { unoptimized: true },
  basePath,
  // Ensures a trailing slash so nested routes resolve as folders on static hosts.
  trailingSlash: true,
};

export default nextConfig;
