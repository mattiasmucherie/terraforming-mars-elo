/** @type {import('next').NextConfig} */

let nextConfig = {
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
      "cloudflare-ipfs.com",
      "ui-avatars.com",
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
module.exports = withBundleAnalyzer(nextConfig)
