import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Gzip/Brotli compression for all text assets
  compress: true,

  // Fix Turbopack workspace root resolution
  turbopack: {
    root: process.cwd(),
  },

  // Enable experimental features & tree-shaking optimizations
  experimental: {
    viewTransition: true,
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "date-fns",
      "@tanstack/react-query",
    ],
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Disable X-Powered-By header for security and payload size
  poweredByHeader: false,
};

export default nextConfig;
