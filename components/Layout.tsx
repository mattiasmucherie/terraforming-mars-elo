import React, { FC, ReactNode } from "react"
import Header from "./Header"
import { Box } from "@chakra-ui/react"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box pt="2">{children}</Box>
    </>
  )
}

export default Layout
