import "normalize.css"
import "../styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import type { AppProps } from "next/app"

import { Head, Providers, RouterProgressBar } from "../components"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />

      <RouterProgressBar />

      <Providers>
        <Component {...pageProps} />
      </Providers>
      <Analytics />
    </>
  )
}

export default App
