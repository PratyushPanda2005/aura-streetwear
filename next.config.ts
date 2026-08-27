import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Only use standalone output for Docker / self-hosting. Vercel deployment natively manages build tracing.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
