/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["jspdf", "jspdf-autotable"],
  webpack: (config) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
}

module.exports = nextConfig

