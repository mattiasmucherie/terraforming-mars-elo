import theme from "./theme"
import { extendTheme } from "@chakra-ui/react"

const chakraTheme = extendTheme({
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
        })
      }
})

export default chakraTheme
