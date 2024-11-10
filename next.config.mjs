/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  compress: false,
  headers: () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
  experimental: {
    // esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
      },
    ],
  }
};

export default nextConfig;
