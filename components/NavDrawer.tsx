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
import styled from "styled-components"
import { UpDownIcon, AddIcon, CalendarIcon } from "@chakra-ui/icons"

const Item = styled(Box)`
  font-size: 22px;
  font-size: 20px;
  height: 2em;
  display: flex;
  align-items: center;
`

const IconContainer = styled.div`
  margin-right: 0.6em;
  padding-bottom: 3px; // Visually aligns with label
`

const NavDrawer: FC<{ isOpen: boolean; onClose: any }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const items = useMemo(
    () => [
      {
        label: "Ranking",
        href: "/",
        icon: <UpDownIcon h="3" w="3" />,
      },
      {
        label: "Register match",
        href: "/new-match",
        icon: <AddIcon h="3" w="3" />,
      },
      {
        label: "Add player",
        href: "/new-player",
        icon: <AddIcon h="3" w="3" />,
      },
      { label: "Matches", href: "/match", icon: <CalendarIcon h="3" w="3" /> },
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
                <Link href={item.href} key={item.label}>
                  <Item passHref>
                    <IconContainer>{item.icon}</IconContainer>
                    {item.label}
                  </Item>
                </Link>
              ))}
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default NavDrawer
