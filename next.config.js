/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const webpack = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}

const webpack5 = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,  
      fs: false 
    };

    return config;
  },
}

module.exports = nextConfig, webpack, webpack5