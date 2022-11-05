import React, { FC, ReactNode } from "react"
import styled from "styled-components"

interface MegaCreditsProps {
  children: ReactNode
}

const Container = styled.div`
  background: rgb(212, 186, 0);
  background: radial-gradient(
    circle,
    rgba(212, 186, 0, 1) 38%,
    rgba(200, 148, 2, 1) 100%
  );
  border: 1px solid #1a0f00;
  box-sizing: border-box;
  color: white;
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 1);
  font-weight: bold;
  height: 32px;
  width: 32px;
  font-size: 18px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const MegaCredits: FC<MegaCreditsProps> = ({ children }) => {
  return <Container>{children}</Container>
}

export default MegaCredits
