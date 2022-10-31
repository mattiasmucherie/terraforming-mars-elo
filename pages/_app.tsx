import "normalize.css"
import "../styles/globals.css"

import type { AppProps } from "next/app"

import { Head, Providers, RouterProgressBar } from "../components"
import { AuthProvider } from "../lib/auth"
import { supabase } from "../lib/supabase"

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider supabase={supabase}>
      <Head />

      <RouterProgressBar />

      <Providers>
        <Component {...pageProps} />
      </Providers>
    </AuthProvider>
  )
}

export default App
