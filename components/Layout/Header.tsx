import { HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, useDisclosure } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

import Brand from "../Brand"
import PageContainer from "../PageContainer"
import NavDrawer from "./NavDrawer"

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Box px="4" py="4" position="relative">
        <Image
          alt="Header"
          src="/images/mars-with-tiles.jpeg"
          layout="fill"
          objectFit="cover"
          priority
        />

        <PageContainer alignItems="center" justifyContent="space-between">
          <Box zIndex={2} cursor="pointer">
            <Brand />
          </Box>

          <Button
            variant="square"
            colorScheme="WhiteAlpha"
            onClick={onOpen}
            name="Menu button"
          >
            <HamburgerIcon color="white" fontSize={22} />
          </Button>
        </PageContainer>
      </Box>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default Header
