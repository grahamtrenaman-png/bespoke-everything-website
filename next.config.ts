import type { NextConfig } from "next";
import { JALIPI_APP_ORIGIN } from "./lib/jalipi-zone";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      afterFiles: [
        { source: "/oldbs", destination: "/oldbs/index.html" },
        { source: "/oldbs/", destination: "/oldbs/index.html" },
        { source: "/oldbs/:path*", destination: "/oldbs/index.html" },
        // Logos the jalipi deck pages load by absolute path. Page requests
        // themselves are rewritten in proxy.ts so the site login applies.
        { source: "/demo/logos/:path*", destination: `${JALIPI_APP_ORIGIN}/demo/logos/:path*` },
      ],
      // Only chunks this site does not have itself fall through to jalipi —
      // filenames are content-hashed, so there is no collision.
      fallback: [
        { source: "/_next/static/:path*", destination: `${JALIPI_APP_ORIGIN}/_next/static/:path*` },
      ],
    };
  },
};

export default nextConfig;
