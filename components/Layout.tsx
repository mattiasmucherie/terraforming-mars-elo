import React, { FC, ReactNode } from "react"
import Header from "./Header"
import { Box } from "@chakra-ui/react"

const Layout: FC<{ children: ReactNode; fullWidth?: boolean }> = ({
  children,
  fullWidth,
}) => {
  return (
    <>
      <Header />
      <Box py={4} px={fullWidth ? 0 : 4}>
        {children}
      </Box>
    </>
  )
}

export default Layout
