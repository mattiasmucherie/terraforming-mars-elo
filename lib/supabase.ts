/* eslint-disable @typescript-eslint/ban-ts-comment */

import { createClient } from "@supabase/supabase-js"

export const supabase =
  // @ts-ignore
  global.supabase ||
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )

if (process.env.NODE_ENV !== "production") {
  // @ts-ignore
  global.supabase = supabase
}
