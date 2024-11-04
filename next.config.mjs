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
  }
};

export default nextConfig;
