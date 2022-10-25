import { TabPanel as ChakraTabPanel } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"

interface VictoryPointsProps {
  children: ReactNode
}

const TabPanel: FC<VictoryPointsProps> = ({ children }) => {
  return (
    <ChakraTabPanel display="flex" flexDirection="column" flexGrow={1}>
      {children}
    </ChakraTabPanel>
  )
}

export default TabPanel
