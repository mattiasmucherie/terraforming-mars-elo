import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { IconButton, Heading, useDisclosure, Box, Text } from "@chakra-ui/react"
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

const Tagline = styled(Text)`
  line-height: 1.2;
  font-size: 12px;
  margin-left: 1px;
  color: white;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
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
        <Box>
          <Link href="/">
            <Brand size="lg" color="white">
              TerraRanking
            </Brand>
          </Link>

          <Tagline>
            Winning one game was a big step. <br />
            Ranking #1 will give you a new world.
          </Tagline>
        </Box>

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
