import React, { FC, ReactNode } from "react"
import { Box, Flex, IconButton } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"
import Heading from "./Heading"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isEmpty } from "ramda"

const PageHeader = styled(Flex)``

const StyledHeading = styled(Heading)`
  margin-bottom: 0 !important;
`

const Actions = styled(Flex)`
  & > * {
    margin-left: 8px;
  }
`

type LayoutProps = {
  children: ReactNode
  heading?: string | Function
  actions?: Array<any>
}

const Layout: FC<LayoutProps> = ({ children, heading, actions = [] }) => {
  const pageHeaderMarginBottom = heading || !isEmpty(actions) ? 4 : 0

  return (
    <Flex flexDirection="column">
      <Header />

      <Box flexGrow={1} p={4} pb={6}>
        <PageHeader
          mb={pageHeaderMarginBottom}
          justifyContent="space-between"
          alignItems="center"
        >
          {typeof heading === "string" && (
            <StyledHeading>{heading}</StyledHeading>
          )}

          {typeof heading === "function" && heading()}

          <Actions>
            {actions?.map((a) => (
              <IconButton
                aria-label={a.ariaLabel}
                size="sm"
                icon={<FontAwesomeIcon icon={a.icon} size="1x" />}
                onClick={a.onClick}
                key={a.ariaLabel}
                colorScheme={a.colorScheme}
              />
            ))}
          </Actions>
        </PageHeader>

        {children}
      </Box>

      <Footer />
    </Flex>
  )
}

export default Layout
