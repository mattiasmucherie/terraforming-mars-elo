/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
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
