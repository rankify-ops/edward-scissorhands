import type { NextConfig } from "next";

// Set only while previewing on the GitHub Pages project URL
// (NEXT_PUBLIC_BASE_PATH=/edward-scissorhands). Unset at domain cutover.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Sibling projects share a parent folder with its own lockfile; without this
  // Turbopack picks that parent as the root and warns on every build.
  turbopack: { root: __dirname },
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
