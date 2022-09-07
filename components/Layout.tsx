import React, { FC, ReactNode } from "react"
import Header from "./Header"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
