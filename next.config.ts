import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  mather: ['/(.*)'],
  images: {
    domains: ['www.spendwithpennies.com'],
  }
};

export default nextConfig;
