/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap() {
    return {
      "/": { page: "/" },
      "/horarios": { page: "/horarios" },
      "/pagos": { page: "/pagos" },
      "/planes": { page: "/planes" },
    };
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
