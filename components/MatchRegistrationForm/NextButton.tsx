import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import React, { FC } from "react"

interface NextButtonProps {
  onClick: () => void
  isDisabled?: boolean
}

const NextButton: FC<NextButtonProps> = ({ onClick, isDisabled }) => {
  return (
    <Button
      w="100%"
      mt={4}
      rightIcon={
        <ArrowForwardIcon style={{ position: "relative", top: 0.5 }} />
      }
      {...{ onClick, isDisabled }}
    >
      Next
    </Button>
  )
}

export default NextButton
