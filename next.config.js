/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  image: {
    domains: ["https://github.com"]
  }
}

module.exports = nextConfig
