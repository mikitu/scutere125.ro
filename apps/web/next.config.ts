import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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
  },
};

export default nextConfig;
