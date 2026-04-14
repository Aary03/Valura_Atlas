/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint is run separately — don't block production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
