import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import React, { FC } from "react"

interface SubmitButtonProps {
  onClick: () => void
  isLoading: boolean
}

const SubmitButton: FC<SubmitButtonProps> = ({ onClick, isLoading }) => {
  return (
    <Button
      colorScheme="green"
      w="100%"
      mt={4}
      rightIcon={<ArrowForwardIcon />}
      {...{ onClick, isLoading }}
    >
      Register match
    </Button>
  )
}

export default SubmitButton
