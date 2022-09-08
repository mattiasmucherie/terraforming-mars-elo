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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListOl, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { faCalendar, faCalendarPlus } from "@fortawesome/free-regular-svg-icons"

const Item = styled(Box)`
  font-size: 22px;
  font-size: 20px;
  height: 2em;
  display: flex;
  align-items: center;
`

const IconContainer = styled.div`
  width: 40px;
  font-size: 18px;
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
        icon: faListOl,
      },
      {
        label: "Matches",
        href: "/match",
        icon: faCalendar,
      },
      {
        label: "Register match",
        href: "/new-match",
        icon: faCalendarPlus,
      },
      {
        label: "Add player",
        href: "/new-player",
        icon: faUserPlus,
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
                <Link href={item.href} key={item.label}>
                  <Item passHref>
                    <IconContainer>
                      <FontAwesomeIcon icon={item.icon} />
                    </IconContainer>
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
