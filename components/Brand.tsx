import { Heading } from "@chakra-ui/react"
import Link from "next/link"
import React, { FC } from "react"
import styled from "styled-components"

const Container = styled(Heading)`
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;

  &:active {
    text-decoration: underline;
  }
`

const Brand: FC = () => {
  return (
    <Link href="/">
      <Container size="lg" color="white">
        TerraRanking
      </Container>
    </Link>
  )
}

export default Brand
