import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { IconButton, Heading, useDisclosure, Box } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import NavDrawer from "./NavDrawer"
import Brand from "../Brand"

const Container = styled.div`
  background-image: url("/images/mars-with-tiles.jpeg");
  background-size: cover;
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
            <div>
              <Brand />
            </div>
          </Link>
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