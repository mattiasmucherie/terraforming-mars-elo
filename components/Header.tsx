import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { IconButton, Heading, useDisclosure, Box } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import NavDrawer from "./NavDrawer"

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        p="4"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Heading size="lg">TerraRanking</Heading>
        </Link>

        <IconButton
          onClick={onOpen}
          variant="outline"
          aria-label="Open menu"
          icon={<HamburgerIcon />}
        />
      </Box>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
