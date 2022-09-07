import theme from "./theme"
import { extendTheme } from "@chakra-ui/react"

const chakraTheme = extendTheme({
  fonts: {
    heading: `"Enter Sansman", Helvetica, sans-serif`,
    body: `"SourceSansPro", Helvetica, sans-serif`,
  },
})

export default chakraTheme
