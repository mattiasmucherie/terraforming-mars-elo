import "normalize.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { ChakraProvider } from "@chakra-ui/react"
import { theme, chakraTheme } from "../styles"
import { Head, RouterProgressBar } from "../components"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />

      <RouterProgressBar />

      <ThemeProvider theme={theme}>
        <ChakraProvider theme={chakraTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </>
  )
}

export default App
