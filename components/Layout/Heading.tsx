import React, { FC, ReactNode } from "react"
import { Heading as ChakraHeading } from "@chakra-ui/react"

interface HeadingProps {
  children: ReactNode
}

const Heading: FC<HeadingProps> = ({ children }) => {
  return (
    <ChakraHeading fontSize="18px" mb={4}>
      {children}
    </ChakraHeading>
  )
}

export default Heading
