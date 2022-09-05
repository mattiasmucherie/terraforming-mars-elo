import React from "react"
import styled from "styled-components"
import PageContainer from "./PageContainer"

const Container = styled.div`
  padding: 22px 0;
`

const PageTitle = styled.h1`
  font-size: 26px;
  margin: 0;
`

const Header = () => {
  return (
    <Container>
      <PageContainer>
        <PageTitle>Terra Ranking</PageTitle>
      </PageContainer>
    </Container>
  )
}

export default Header
