import theme from "./theme"
import { extendTheme } from "@chakra-ui/react"

const chakraTheme = extendTheme({
  fonts: {
    heading: `"Enter Sansman", Helvetica, sans-serif`,
    body: `"SourceSansPro", Helvetica, sans-serif`,
  },
  components: {
    Button: {
      variants: {
        square: {
          p: 0,
        },
      },
    },
    Text: {
      baseStyle: { color: theme.colors.neroBlack },
    },
    Heading: {
      baseStyle: { color: theme.colors.neroBlack },
    },
    Table: {
      baseStyle: () => ({
        thead: {
          th: { color: theme.colors.neroBlack },
        },
      }),
    },
  },
})

export default chakraTheme
