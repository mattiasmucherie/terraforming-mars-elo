import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { Heading } from "@chakra-ui/react"

const HeaderContainer = styled.header`
  padding: 1.5rem;
`

const PageHeaderLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.seedBrown};
`

const ItemContainer = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: space-between;
`
const Items = styled.li`
  list-style: none;
  padding: 1rem 0;
  a {
    text-decoration: none;
  }
`
const Header = () => {
  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <PageHeaderLink>
          <Heading size="lg">TerraRanking</Heading>
        </PageHeaderLink>
      </Link>
      <ItemContainer>
        <Items>
          <Link href="/new-player">New Player</Link>
        </Items>
        <Items>
          <Link href="/new-match">New Match</Link>
        </Items>
      </ItemContainer>
    </HeaderContainer>
  )
}

export default Header
