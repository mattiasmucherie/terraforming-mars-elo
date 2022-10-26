import { useTheme } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"
import styled from "styled-components"

interface Props {
  chakraTheme: { breakpoints: { md: string } }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 -16px;
  flex-grow: 1;

  @media screen and (min-width: ${(p: Props) => p.chakraTheme.breakpoints.md}) {
    margin: 0;
  }
`

interface FullWidthContainerProps {
  children: ReactNode
}

const FullWidthContainer: FC<FullWidthContainerProps> = ({ children }) => {
  const chakraTheme = useTheme() as any
  return <Container chakraTheme={chakraTheme}>{children}</Container>
}

export default FullWidthContainer
