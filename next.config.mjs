/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Disable SWC minification
  webpack: (config) => {
    config.optimization.minimize = false; // Disable Terser minification
    return config;
  },
};

export default nextConfig;
