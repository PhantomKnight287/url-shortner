/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path",
        destination: "/api/redirect/:path",
      },
    ];
  },
};

module.exports = nextConfig;
