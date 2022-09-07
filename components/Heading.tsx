import React, { FC, ReactNode } from "react"
import styled from "styled-components"

const Text = styled.span`
  font-family: "Enter Sansman", Helvetica, sans-serif;
`

const Heading: FC<{ children: ReactNode }> = ({ children }) => {
  return <Text>{children}</Text>
}

export default Heading
