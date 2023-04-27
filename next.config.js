/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.tuk.dev",
    ],
  },
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
  },
}

module.exports = nextConfig
