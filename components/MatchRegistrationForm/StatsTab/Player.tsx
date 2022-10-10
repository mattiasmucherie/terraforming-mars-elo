import {
  Box,
  Divider,
  Flex,
  IconButton,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react"
import { Corporation, User } from "@prisma/client"
import React, { FC } from "react"
import styled from "styled-components"

import NextAvatar from "../../NextAvatar"

const Name = styled.div`
  margin-left: 8px;
`

interface PlayerProps {
  player: User
  position?: number
  corporations: Corporation[]
}

const Player: FC<PlayerProps> = ({ player, corporations, position }) => {
  const { name, image } = player

  return (
    <Box borderRadius={8} border="1px" borderColor="gray.100" p={3} mb={2}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <NextAvatar alt={name} src={image || ""} width="32px" height="32px" />

          <Name>{name}</Name>
        </Flex>

        {position || "?"}
      </Flex>

      <Divider my="3" />

      <Flex alignItems="center" justifyContent="space-between">
        <Select
          placeholder="Select corp"
          width="48%"
          // onChange={(e) => handleCorpChange(e, p)}
        >
          {corporations.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </Select>

        <InputGroup width="48%">
          <InputLeftAddon>VP</InputLeftAddon>
          <NumberInput
            defaultValue={20}
            min={20}
            max={200}
            allowMouseWheel
            //   onChange={(e) => handleNumberInputChange(e, p)}
            placeholder="Victory points"
          >
            <NumberInputField
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </Flex>
    </Box>
  )
}

export default Player
