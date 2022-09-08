import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { IconButton, Heading, useDisclosure, Box } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import NavDrawer from "./NavDrawer"

const Container = styled.div`
  background: orange;
  background-image: url("/images/mars-with-tiles.jpeg");
  background-size: cover;
`

const Brand = styled(Heading)`
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
`

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container>
      <Box
        px="4"
        py="6"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Brand size="lg" color="white">
            TerraRanking
          </Brand>
        </Link>

        <IconButton
          onClick={onOpen}
          aria-label="Open menu"
          icon={<HamburgerIcon />}
        />
      </Box>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default Header
