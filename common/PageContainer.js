import React from "react"
import styled from "styled-components"

const Container = styled.div`
  padding: 0 16px;
`

const PageContainer = ({ children }) => {
  return <Container>{children}</Container>
}

export default PageContainer
