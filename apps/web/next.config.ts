import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'static.honda.ro',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'honda-moto.ro',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hondanews.eu',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.honda.co.uk',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
