import React, { FC, useCallback, useMemo } from "react"
import {
  Box,
  CloseButton,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
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
  faChartLine,
  IconDefinition,
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
  padding: 16px 24px;
`

const IconContainer = styled.div`
  width: 34px;
  font-size: 18px;
`

const NavDrawer: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const sections = useMemo(
    () => [
      {
        items: [
          {
            label: "Ranking",
            href: "/player-ranking",
            icon: faListOl,
          },
          { label: "Chart", href: "ranking-chart", icon: faChartLine },
          {
            label: "Matches",
            href: "/match",
            icon: faCalendar,
          },
          { label: "Corporations", href: "/corporation", icon: faBuilding },
        ],
      },
      {
        items: [
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
      },
    ],
    []
  )

  const isActive = useCallback(
    (item: { label: string; href: string; icon: IconDefinition }) =>
      router.pathname === item.href,
    [router]
  )

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />

      <DrawerContent>
        <Flex alignItems="center" justifyContent="space-between" p="4" pr="3">
          <Heading size="md">Menu</Heading>

          <CloseButton onClick={onClose} size="md" />
        </Flex>

        <Divider mb="2" />

        {sections.map(({ items }, i) => (
          <Box key={i}>
            <VStack spacing={0} align="stretch">
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

            <Divider my="2" />
          </Box>
        ))}
      </DrawerContent>
    </Drawer>
  )
}

export default NavDrawer
