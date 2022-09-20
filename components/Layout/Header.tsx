import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { useDisclosure, Box, Button } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import NavDrawer from "./NavDrawer"
import Brand from "../Brand"

const Container = styled.div`
  background-image: url("/images/mars-with-tiles.jpeg");
  background-size: cover;
`

const BrandContainer = styled.div`
  cursor: pointer;
`

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container>
      <Box
        px="4"
        py="4"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Link href="/">
            <BrandContainer>
              <Brand />
            </BrandContainer>
          </Link>
        </Box>

        <Button variant="square" colorScheme="WhiteAlpha" onClick={onOpen}>
          <HamburgerIcon color="white" fontSize={22} />
        </Button>
      </Box>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default Header
