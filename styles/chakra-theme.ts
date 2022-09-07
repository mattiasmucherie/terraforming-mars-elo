import theme from "./theme"
import { extendTheme } from "@chakra-ui/react"

const chakraTheme = extendTheme({
  fonts: {
    heading: `"Enter Sansman", Helvetica, sans-serif`,
    body: `"SourceSansPro", Helvetica, sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: theme.colors.plantationGreen,
        color: "white",
      },
      a: {
        color: "white",
        _hover: {
          textDecoration: "underline",
        },
      },
    }),
  },
})

export default chakraTheme
