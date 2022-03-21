require("dotenv-safe").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "images.ctfassets.net"],
  },
};

module.exports = nextConfig;
