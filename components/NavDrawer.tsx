import React, { FC, useEffect, useMemo } from "react"
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

const NavDrawer: FC<{ isOpen: boolean; onClose: any }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const items = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Register Match",
        href: "/new-match",
      },
      {
        label: "Add Player",
        href: "/new-player",
      },
    ],
    []
  )

  // Closes drawer on navigation
  useEffect(() => {
    onClose()
  }, [router.asPath, onClose])

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Heading size="md">Menu</Heading>
        </DrawerHeader>

        <DrawerBody>
          <Box pt="2">
            <VStack spacing={4} align="stretch">
              {items.map((item) => (
                <Box h="35px" key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </Box>
              ))}
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default NavDrawer
