import "normalize.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Layout } from "../components"
import { DefaultTheme, ThemeProvider } from "styled-components"

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
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
