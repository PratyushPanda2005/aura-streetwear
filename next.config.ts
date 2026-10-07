import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Only use standalone output for Docker / self-hosting. Vercel deployment natively manages build tracing.
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

