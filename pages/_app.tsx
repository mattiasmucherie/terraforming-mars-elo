import "normalize.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Layout } from "../components"
import { DefaultTheme, ThemeProvider } from "styled-components"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"

const theme: DefaultTheme = {
  colors: {
    primary: "#451804",
    secondary: "#c1440e",
    light: "#e77d11",
    lighter: "#fda600",
  },
}

function MyApp({ Component, pageProps }: AppProps) {
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
      </Head>

      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
