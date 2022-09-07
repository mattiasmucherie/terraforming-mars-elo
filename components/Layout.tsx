import React, { FC, ReactNode } from "react"
import Header from "./Header"
import styled from "styled-components"

const Container = styled.div`
  padding: 0rem 1.5rem;
`
const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  )
}

export default Layout
