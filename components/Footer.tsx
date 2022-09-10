import { Box, Flex, Text } from "@chakra-ui/react"
import React from "react"
import styled from "styled-components"
import BrandSymbol from "./BrandSymbol"

const Container = styled(Flex)`
  background: ${(p) => p.theme.colors.plantationGreen};
  justify-content: space-between;
  align-items: center;
`

const Tagline = styled(Text)`
  line-height: 1.25;
  font-size: 11px;
  margin-left: 1px;
  color: white;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
`

const Footer = () => {
  return (
    <Container p="4">
      <BrandSymbol />

      <Tagline textAlign="right">
        Winning one game was a big step. <br />
        Ranking #1 will give you a new world.
      </Tagline>
    </Container>
  )
}

export default Footer
