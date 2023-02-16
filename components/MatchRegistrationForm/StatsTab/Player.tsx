import {
  Box,
  Button,
  Divider,
  Flex,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { Corporation, User } from "@prisma/client"
import { assoc } from "ramda"
import React, { FC, useEffect, useState } from "react"

import CorporationLogo from "../../CorporationLogo"
import CorporationSelector from "../../CorporationSelector"
import NextAvatar from "../../NextAvatar"

export interface PlayerData {
  corporation: Corporation | null
  victoryPoints?: number
  megaCredits?: number
  isTied: boolean
}

interface PlayerProps {
  player: User
  corporations: Corporation[]
  onChange: (formData: { player: User } & PlayerData) => void
  isTied: boolean
}

const Player: FC<PlayerProps> = ({
  player,
  corporations,
  isTied,
  onChange,
}) => {
  const { name, image } = player
  const [formData, setFormData] = useState<PlayerData>({
    corporation: null,
    isTied: isTied,
  })
  const {
    isOpen: isCorpSelectorOpen,
    onOpen: openCopSelector,
    onClose: closeCorpSelector,
  } = useDisclosure()

  useEffect(() => {
    onChange({ player, ...formData })
  }, [onChange, player, formData])

  useEffect(() => {
    setFormData(assoc("isTied", isTied))
  }, [isTied])

  const handleCorporationChanged = (corp: Corporation) =>
    setFormData(assoc("corporation", corp))

  const handleVictoryPointChanged = (value: string) => {
    const vp = parseInt(value)
    const newValue = isNaN(vp) ? 0 : vp
    setFormData(assoc("victoryPoints", newValue))
  }

  const handleMegaCreditChanged = (value: string) => {
    const mc = parseInt(value)
    const newValue = isNaN(mc) ? undefined : mc
    setFormData(assoc("megaCredits", newValue))
  }

  return (
    <Box borderRadius={8} border="1px" borderColor="gray.100" p={3}>
      <Flex alignItems="center">
        <NextAvatar alt={name} src={image || ""} width="38px" height="38px" />

        <Text fontSize={18} ml={3}>
          {name}
        </Text>
      </Flex>

      <Divider my="3" />

      <Flex alignItems="center" justifyContent="space-between">
        {!formData.corporation && (
          <Button onClick={openCopSelector}>Select corporation</Button>
        )}

        {formData.corporation && (
          <CorporationLogo
            id={formData.corporation.id}
            onClick={openCopSelector}
            size={30}
            name={formData.corporation.name}
          />
        )}

        <CorporationSelector
          isOpen={isCorpSelectorOpen}
          corporations={corporations}
          onSelect={handleCorporationChanged}
          onClose={closeCorpSelector}
        />

        <Box width="32%">
          <InputGroup>
            <InputLeftAddon w={14}>VP</InputLeftAddon>
            <NumberInput
              value={formData.victoryPoints}
              min={20}
              max={200}
              allowMouseWheel
              onChange={handleVictoryPointChanged}
            >
              <NumberInputField
                pr={2}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
              />
            </NumberInput>
          </InputGroup>

          {isTied && (
            <InputGroup mt={2}>
              <InputLeftAddon w={14}>M€</InputLeftAddon>
              <NumberInput
                value={formData.megaCredits}
                min={0}
                allowMouseWheel
                onChange={handleMegaCreditChanged}
              >
                <NumberInputField
                  pr={2}
                  borderTopLeftRadius={0}
                  borderBottomLeftRadius={0}
                />
              </NumberInput>
            </InputGroup>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default Player
