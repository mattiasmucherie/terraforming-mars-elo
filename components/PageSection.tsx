import { Box, Button, Center, Heading } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"

interface PageSectionProps {
  heading?: string
  children: ReactNode
  onShowMore?: () => void
}

const PageSection: FC<PageSectionProps> = ({
  heading,
  onShowMore,
  children,
}) => {
  return (
    <Box pb="6">
      {heading && (
        <Heading fontSize="16px" mb={3}>
          {heading}
        </Heading>
      )}

      {children}

      {onShowMore && (
        <Center mt="3">
          <Button
            onClick={onShowMore}
            colorScheme="gray"
            size="sm"
            variant="ghost"
          >
            Show more
          </Button>
        </Center>
      )}
    </Box>
  )
}

export default PageSection
