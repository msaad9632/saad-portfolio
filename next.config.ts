import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Raw photo uploads before sharp compresses them can easily exceed the 1MB default.
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
