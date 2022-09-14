import theme from "./theme"
import { extendTheme } from "@chakra-ui/react"

const chakraTheme = extendTheme({
  fonts: {
    heading: `"Enter Sansman", Helvetica, sans-serif`,
    body: `"SourceSansPro", Helvetica, sans-serif`,
  },
  components: {
    Text: {
      baseStyle: { color: theme.colors.black },
    },
    Heading: {
      baseStyle: { color: theme.colors.black },
    },
    Table: {
      baseStyle: () => ({
        thead: {
          th: { color: theme.colors.black },
        },
      }),
    },
  },
})

export default chakraTheme
