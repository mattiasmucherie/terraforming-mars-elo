import React, { FC, ReactNode } from "react"
import Header from "./Header"
import { Box, Flex } from "@chakra-ui/react"
import Footer from "./Footer"

const Layout: FC<{ children: ReactNode; fullWidth?: boolean }> = ({
  children,
  fullWidth,
}) => {
  return (
    <Flex flexDirection="column">
      <Header />

      <Box flexGrow={1} pt={4} pb={6} px={fullWidth ? 0 : 4}>
        {children}
      </Box>

      <Footer />
    </Flex>
  )
}

export default Layout
