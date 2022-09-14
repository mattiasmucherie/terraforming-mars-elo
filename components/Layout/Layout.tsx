import React, { FC, ReactNode } from "react"
import { Box, Flex, Heading } from "@chakra-ui/react"
import Header from "../Header"
import Footer from "../Footer"

type LayoutProps = {
  children: ReactNode
  heading?: string
}

const Layout: FC<LayoutProps> = ({ children, heading }) => {
  return (
    <Flex flexDirection="column">
      <Header />

      <Box flexGrow={1} p={4} pb={6}>
        {heading && (
          <Heading fontSize="18px" mb={4}>
            {heading}
          </Heading>
        )}

        {children}
      </Box>

      <Footer />
    </Flex>
  )
}

export default Layout
