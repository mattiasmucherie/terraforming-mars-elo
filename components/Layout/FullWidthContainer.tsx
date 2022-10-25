import React, { FC, ReactNode } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 -16px;
  flex-grow: 1;
`

interface FullWidthContainerProps {
  children: ReactNode
}

const FullWidthContainer: FC<FullWidthContainerProps> = ({ children }) => {
  return <Container>{children}</Container>
}

export default FullWidthContainer
