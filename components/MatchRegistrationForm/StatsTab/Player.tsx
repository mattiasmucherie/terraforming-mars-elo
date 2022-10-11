import {
  Box,
  Divider,
  Flex,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react"
import { Corporation, User } from "@prisma/client"
import { assoc, find, propEq } from "ramda"
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import NextAvatar from "../../NextAvatar"

const Name = styled.div`
  margin-left: 8px;
`

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

  useEffect(() => {
    onChange({ player, ...formData })
  }, [onChange, player, formData])

  const handleCorporationChanged = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const corp = find(propEq("id", e.target.value), corporations)
      setFormData(assoc("corporation", corp))
    },
    [corporations]
  )

  const handleVictoryPointChanged = useCallback((value: string) => {
    const vp = parseInt(value) || ""
    setFormData(assoc("victoryPoints", vp))
  }, [])

  return (
    <Box borderRadius={8} border="1px" borderColor="gray.100" p={3}>
      <Flex alignItems="center">
        <NextAvatar alt={name} src={image || ""} width="32px" height="32px" />

        <Name>{name}</Name>
      </Flex>

      <Divider my="3" />

      <Flex alignItems="center" justifyContent="space-between">
        <Select
          placeholder="Select corp"
          width="64%"
          onChange={handleCorporationChanged}
        >
          {corporations.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>

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
