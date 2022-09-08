/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: { domains: ["ekhaqsvkyqszwbsovncd.supabase.co"] },
}

module.exports = nextConfig
