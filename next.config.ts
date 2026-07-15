import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "run-agent-6a0daa76ca417fb67ba0b96d-mpql72cn-preview.agent-sandbox-bj-c1-gw.trae.cn",
    "127.0.0.1",
  ],

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
