import { Heading } from "@chakra-ui/react"
import React from "react"
import styled from "styled-components"

const Container = styled(Heading)`
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);

  &:active {
    text-decoration: underline;
  }
`

const Brand = () => {
  return (
    <Container size="lg" color="white">
      TerraRanking
    </Container>
  )
}

export default Brand
