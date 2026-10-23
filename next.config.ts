import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Hotel Xcaret México's official photos, served from its booking CDN
    remotePatterns: [{ protocol: "https", hostname: "images.trvl-media.com", pathname: "/lodging/**" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Matches the couple's no-search-engine preference (not access control).
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
