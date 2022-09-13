import { Heading } from "@chakra-ui/react"
import React, { forwardRef, ForwardRefRenderFunction } from "react"
import styled from "styled-components"

const Container = styled(Heading)`
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);

  &:active {
    text-decoration: underline;
  }
`

const Brand: ForwardRefRenderFunction<{}> = ({}, ref) => {
  return (
    <Container ref={ref} size="lg" color="white">
      TerraRanking
    </Container>
  )
}

export default forwardRef(Brand)
