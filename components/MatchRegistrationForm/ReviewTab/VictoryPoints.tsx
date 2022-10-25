import { Box, Text } from "@chakra-ui/react"
import React, { FC, ReactNode } from "react"

interface VictoryPointsProps {
  children: ReactNode
}

const VictoryPoints: FC<VictoryPointsProps> = ({ children }) => {
  return (
    <Box
      borderRadius="50%"
      background="rustRed.100"
      h="35px"
      w="35px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="inset 0 0 4px rgba(69, 24, 4, 0.4)"
    >
      <Text fontSize={18} lineHeight={1} color="white" fontWeight="bold">
        {children}
      </Text>
    </Box>
  )
}

export default VictoryPoints
