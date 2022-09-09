/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: { domains: ["ekhaqsvkyqszwbsovncd.supabase.co"] },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/player-ranking",
      },
    ]
  },
}

module.exports = nextConfig
