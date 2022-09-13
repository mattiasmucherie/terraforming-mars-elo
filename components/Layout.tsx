import React, { FC, ReactNode } from "react"
import Header from "./Header"
import { Box, Flex, Heading } from "@chakra-ui/react"
import Footer from "./Footer"

type LayoutProps = {
  children: ReactNode
  fullWidth?: boolean
  heading?: string
}

const Layout: FC<LayoutProps> = ({ children, fullWidth, heading }) => {
  return (
    <Flex flexDirection="column">
      <Header />

      {heading && (
        <Heading fontSize="18px" p={4} pb={0}>
          {heading}
        </Heading>
      )}

      <Box flexGrow={1} pt={4} pb={6} px={fullWidth ? 0 : 4}>
        {children}
      </Box>

      <Footer />
    </Flex>
  )
}

export default Layout
