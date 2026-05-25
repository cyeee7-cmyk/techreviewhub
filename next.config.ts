import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "a.impactradius-go.com",
      },
      {
        protocol: "https",
        hostname: "imp.pxf.io",
      },
    ],
  },
};

export default nextConfig;
