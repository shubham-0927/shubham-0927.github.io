import type { NextConfig } from "next";

// If your repo is username.github.io (root URL), leave basePath empty:
const repoName = "";

// If your repo is username.github.io/portfolio, set it here:
// const repoName = "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(repoName
    ? {
        basePath: repoName,
        assetPrefix: repoName,
      }
    : {}),
};

export default nextConfig;