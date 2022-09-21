import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useDisclosure, Box, Button } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import NavDrawer from "./NavDrawer"
import Brand from "../Brand"

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Box
        px="4"
        py="4"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Image
          alt="Header"
          src="/images/mars-with-tiles.jpeg"
          layout="fill"
          objectFit="cover"
        />
        <Box zIndex={2} cursor="pointer">
          <Link href="/">
            <Brand />
          </Link>
        </Box>

        <Button variant="square" colorScheme="WhiteAlpha" onClick={onOpen}>
          <HamburgerIcon color="white" fontSize={22} />
        </Button>
      </Box>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default Header
