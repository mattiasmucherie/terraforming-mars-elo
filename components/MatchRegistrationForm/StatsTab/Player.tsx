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
import React, { FC, useCallback, useEffect, useState } from "react"

import CorporationLogo from "../../CorporationLogo"
import CorporationSelector from "../../CorporationSelector"
import NextAvatar from "../../NextAvatar"

interface FormData {
  name: string
  corporation: Corporation
  victoryPoints: number
}

interface PlayerProps {
  player: User
  corporations: Corporation[]
  onChange: (formData: FormData) => void
}

const Player: FC<PlayerProps> = ({ player, corporations, onChange }) => {
  const { name, image } = player
  const [formData, setFormData] = useState<any>({
    name: "",
    corporation: "",
    victoryPoints: "",
  })
  const {
    isOpen: isCorpSelectorOpen,
    onOpen: openCopSelector,
    onClose: closeCorpSelector,
  } = useDisclosure()

  useEffect(() => {
    onChange({ player, ...formData })
  }, [onChange, player, formData])

  const handleCorporationChanged = useCallback(
    (corp: Corporation) => setFormData(assoc("corporation", corp)),
    []
  )

  const handleVictoryPointChanged = useCallback((value: string) => {
    const vp = parseInt(value) || ""
    setFormData(assoc("victoryPoints", vp))
  }, [])

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
          />
        )}

        <CorporationSelector
          isOpen={isCorpSelectorOpen}
          corporations={corporations}
          onSelect={handleCorporationChanged}
          onClose={closeCorpSelector}
        />

        <InputGroup width="32%">
          <InputLeftAddon>VP</InputLeftAddon>
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
      </Flex>
    </Box>
  )
}

export default Player
