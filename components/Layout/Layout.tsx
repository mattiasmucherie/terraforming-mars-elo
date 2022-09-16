import React, { FC, ReactNode } from "react"
import { Box, Flex } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"
import Heading from "./Heading"

type LayoutProps = {
  children: ReactNode
  heading?: string | Function
}

const Layout: FC<LayoutProps> = ({ children, heading }) => {
  return (
    <Flex flexDirection="column">
      <Header />

      <Box flexGrow={1} p={4} pb={6}>
        {typeof heading === "string" && <Heading>{heading}</Heading>}

        {typeof heading === "function" && heading()}

        {children}
      </Box>

      <Footer />
    </Flex>
  )
}

export default Layout
