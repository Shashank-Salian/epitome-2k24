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
};

export default nextConfig;
