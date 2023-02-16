import {
  Box,
  CloseButton,
  Divider,
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react"
import { Corporation } from "@prisma/client"
import React, { FC, useCallback } from "react"

import CorporationLogo from "../CorporationLogo"

interface CorporationSelectorProps {
  isOpen: boolean
  corporations: Corporation[]
  onSelect: (corp: Corporation) => void
  onClose: () => void
}

const CorporationSelector: FC<CorporationSelectorProps> = ({
  isOpen,
  corporations,
  onSelect,
  onClose,
}) => {
  const handleClick = useCallback(
    (c: Corporation) => () => {
      onSelect(c)
      onClose()
    },
    [onSelect, onClose]
  )

  return (
    <Modal
      onClose={onClose}
      size="full"
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />

      <ModalContent background="whisperGray.100">
        <ModalHeader background="white" pr={4}>
          <Flex alignItems="center" justifyContent="space-between">
            Select corporation
            <CloseButton onClick={onClose} />
          </Flex>
        </ModalHeader>

        <Divider />

        <SimpleGrid columns={2} gridColumnGap="1px" gridRowGap="1px">
          {corporations.map((c) => (
            <Box
              background="white"
              onClick={handleClick(c)}
              height="118px"
              flexGrow="1"
              display="flex"
              alignItems="center"
              justifyContent="center"
              key={c.id}
            >
              <CorporationLogo id={c.id} name={c.name} size={30} />
            </Box>
          ))}
        </SimpleGrid>

        <Divider />
      </ModalContent>
    </Modal>
  )
}

export default CorporationSelector
