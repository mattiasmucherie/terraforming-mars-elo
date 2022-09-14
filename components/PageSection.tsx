import { Box, Heading } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"

interface PageSectionProps {
  heading: string
  children: ReactNode
}

const PageSection: FC<PageSectionProps> = ({ heading, children }) => {
  return (
    <Box pb="6">
      <Heading fontSize="16px" mb={3}>
        {heading}
      </Heading>

      {children}
    </Box>
  )
}

export default PageSection
