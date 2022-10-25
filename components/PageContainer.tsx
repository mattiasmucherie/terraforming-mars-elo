import { Container, FlexboxProps } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
  alignItems?: string
  justifyContent?: string
  flexDirection?: string
}

const PageContainer: FC<PageContainerProps> = ({
  children,
  alignItems,
  justifyContent,
  flexDirection,
}) => {
  return (
    <Container
      maxWidth="container.md"
      display="flex"
      p={0}
      alignItems={alignItems as FlexboxProps["flexDirection"]}
      justifyContent={justifyContent as FlexboxProps["flexDirection"]}
      flexDirection={flexDirection as FlexboxProps["flexDirection"]}
    >
      {children}
    </Container>
  )
}

export default PageContainer
