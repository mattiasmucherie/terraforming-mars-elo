export const axiosUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : process.env.VERCEL_URL
