/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {},
  webpack: (config, { isServer }) => {
    // Exclude canvas from server bundle (Three.js optional dep)
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas'];
    }
    return config;
  },
};

module.exports = nextConfig;
