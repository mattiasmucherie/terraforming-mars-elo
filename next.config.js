/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "ekhaqsvkyqszwbsovncd.supabase.in",
      "ekhaqsvkyqszwbsovncd.supabase.co",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ]
  },
}

module.exports = nextConfig
