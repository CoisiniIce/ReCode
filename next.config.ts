import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Source path
        source: "/",
        // Destination path
        destination: "/home",
        // Permanent redirect (301)
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
