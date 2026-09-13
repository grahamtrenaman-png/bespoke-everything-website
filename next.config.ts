import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      afterFiles: [
        { source: "/oldbs", destination: "/oldbs/index.html" },
        { source: "/oldbs/", destination: "/oldbs/index.html" },
        { source: "/oldbs/:path*", destination: "/oldbs/index.html" },
      ],
    };
  },
};

export default nextConfig;
