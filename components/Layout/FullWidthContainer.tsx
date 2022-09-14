import { Box } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"
import styled from "styled-components"

const Container = styled.div`
  margin: 0 -16px;
`

interface FullWidthContainerProps {
  children: ReactNode
}

const FullWidthContainer: FC<FullWidthContainerProps> = ({ children }) => {
  return <Container>{children}</Container>
}

export default FullWidthContainer
