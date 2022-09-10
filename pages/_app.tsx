import "normalize.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import Script from "next/script"
import Head from "next/head"
import { ThemeProvider } from "styled-components"
import { ChakraProvider } from "@chakra-ui/react"
import { theme, chakraTheme } from "../styles"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TerraRanking</title>
        <meta name="description" content="Ranking for Terraforming Mars" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <Script id="font-awesome">
        <script
          async
          src="https://kit.fontawesome.com/2c2e87960d.js"
          crossOrigin="anonymous"
        ></script>
      </Script>

      <ThemeProvider theme={theme}>
        <ChakraProvider theme={chakraTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </>
  )
}

export default App
