import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/", // 源路径
        destination: "/home", // 目标路径
        permanent: true, // 永久重定向（301）
      },
    ];
  },
};

export default nextConfig;
