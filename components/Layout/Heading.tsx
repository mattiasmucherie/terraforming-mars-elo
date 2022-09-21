import { Heading as ChakraHeading } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"

interface HeadingProps {
  children: ReactNode
  className?: string
}

const Heading: FC<HeadingProps> = ({ children, className }) => {
  return (
    <ChakraHeading fontSize="18px" mb={4} className={className}>
      {children}
    </ChakraHeading>
  )
}

export default Heading
