import { ChakraProvider } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"
import { ThemeProvider } from "styled-components"

import { chakraTheme, theme } from "../styles"

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
    </ThemeProvider>
  )
}

export default Providers
