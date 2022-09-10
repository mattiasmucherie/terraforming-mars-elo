import React, { FC, useCallback, useMemo } from "react"
import {
  Box,
  Drawer,
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
import {
  faBuilding,
  faListOl,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import { faCalendar, faCalendarPlus } from "@fortawesome/free-regular-svg-icons"

const Item = styled(Box)`
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: 5px solid;
  border-color: ${(p) =>
    p.$isActive ? p.theme.colors.mangoOrange : "transparent"};
  box-sizing: border-box;
  padding: 11px 24px 13px;
`

const IconContainer = styled.div`
  width: 34px;
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
        href: "/player-ranking",
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
      { label: "Corporations", href: "/corporation", icon: faBuilding },
    ],
    []
  )

  const isActive = useCallback(
    (item: any) => router.pathname === item.href,
    [router]
  )

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Heading size="md">Menu</Heading>
        </DrawerHeader>

        <Box pt="2">
          <VStack spacing={2} align="stretch">
            {items.map((item) => (
              <Link href={item.href} key={item.label}>
                <Item passHref $isActive={isActive(item)} onClick={onClose}>
                  <IconContainer>
                    <FontAwesomeIcon icon={item.icon} />
                  </IconContainer>
                  {item.label}
                </Item>
              </Link>
            ))}
          </VStack>
        </Box>
      </DrawerContent>
    </Drawer>
  )
}

export default NavDrawer
