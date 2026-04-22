import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Pour les uploads de photos
    },
  },
};

export default nextConfig;
