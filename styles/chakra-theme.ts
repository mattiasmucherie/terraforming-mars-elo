import { extendTheme } from "@chakra-ui/react"
import { compose, reduce, tap, toPairs } from "ramda"

import theme from "./theme"

const chakraTheme = extendTheme({
  fonts: {
    heading: `"Enter Sansman", Helvetica, sans-serif`,
    body: `"SourceSansPro", Helvetica, sans-serif`,
  },
  colors: {
    ...compose(
      reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            100: value,
            200: value,
            300: value,
            400: value,
            500: value,
            600: value,
            700: value,
            800: value,
            900: value,
          },
        }),
        {}
      ),
      toPairs
    )(theme.colors),
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
