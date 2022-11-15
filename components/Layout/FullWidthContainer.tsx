import { useTheme, WithCSSVar } from "@chakra-ui/react"
import type { Dict } from "@chakra-ui/utils"
import React, { FC, ReactNode } from "react"
import styled from "styled-components"

interface Props {
  chakraTheme: WithCSSVar<Dict>
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
  const chakraTheme = useTheme()
  return <Container chakraTheme={chakraTheme}>{children}</Container>
}

export default FullWidthContainer
