import { createClient } from "@supabase/supabase-js"

export const supabase =
  // @ts-ignore
  global.supabase ||
  createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
  )

if (process.env.NODE_ENV !== "production") {
  // @ts-ignore
  global.supabase = supabase
}
