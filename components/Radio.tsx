import { CheckIcon } from "@chakra-ui/icons"
import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div<{ isActive: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.mangoOrange : p.theme.colors.whisperGray};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms ease-out;
`

interface RadioProps {
  isActive: boolean
}

const Radio: FC<RadioProps> = ({ isActive }) => {
  return (
    <Container isActive={isActive}>
      {isActive && <CheckIcon w="16px" h="16px" color="#fff" />}
    </Container>
  )
}

export default Radio
