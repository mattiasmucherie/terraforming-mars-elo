import React from "react"
import styled from "styled-components"
import Link from "next/link"

const HeaderContainer = styled.header`
  padding: 2rem;
`

const PageTitle = styled.h1`
  font-size: 26px;
  margin: 0;
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
    color: black;
    text-decoration: none;
  }
`
const Header = () => {
  return (
    <HeaderContainer>
      <PageTitle>Terra Ranking</PageTitle>
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
