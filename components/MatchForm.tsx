import { Corporation, User } from "@prisma/client"
import { ChangeEvent, FC, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import axios from "axios"
import {
  Box,
  Button,
  Center,
  Divider,
  IconButton,
  List,
  ListItem,
  OrderedList,
  Select,
  Text,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2rem;
`
const ListContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`

interface MatchFormProps {
  users: User[]
  corporations: Corporation[]
}
type RankedPlayers = User & { corporationId?: string }

const MatchForm: FC<MatchFormProps> = ({ users, corporations }) => {
  const [listOfPlayers, setListOfPlayers] = useState<User[]>(users)
  const [rankingOfPlayers, setRankingOfPlayers] = useState<RankedPlayers[]>([])
  const router = useRouter()

  const handleCorpChange = (
    e: ChangeEvent<HTMLSelectElement>,
    p: User & Corporation
  ) => {
    const corp = corporations.find((c) => c.name === e.target.value)
    if (corp) {
      setRankingOfPlayers((prevState) => {
        const index = prevState.findIndex((ps) => ps.id === p.id)
        return prevState.map((uc, i) => {
          if (i === index) {
            return { ...uc, corporationId: corp.id }
          }
          return uc
        })
      })
    }
  }
  const handleOnClickAdd = (u: User) => {
    setRankingOfPlayers((prevState) => [...prevState, u])
    setListOfPlayers((prevState) => prevState.filter((p) => p.id !== u.id))
  }
  const handleOnClickRemove = (u: User) => {
    setRankingOfPlayers((prevState) => prevState.filter((p) => p.id !== u.id))
    setListOfPlayers((prevState) => [...prevState, u])
  }

  const handleSubmit = async () => {
    try {
      const listOfNames = rankingOfPlayers.map((p) => ({
        name: p.name,
        corporationId: p.corporationId,
      }))
      await axios.post("/api/match/new", listOfNames)
      router.push("/")
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Container>
      <ListContainer>
        <List>
          {listOfPlayers.map((u) => (
            <ListItem key={u.id}>
              <button onClick={() => handleOnClickAdd(u)}>{u.name}</button>
            </ListItem>
          ))}
        </List>
        <Center height="200px">
          <Divider orientation="vertical" />
        </Center>
        <OrderedList>
          {rankingOfPlayers.map((p) => (
            <ListItem key={p.id} pb="3">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pr="0"
                pb="1"
              >
                <Text>{p.name}</Text>
                <IconButton
                  aria-label={`Remove ${p.name} from list`}
                  size="sm"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={() => handleOnClickRemove(p)}
                />
              </Box>
              <Select
                placeholder="Select corp"
                size="sm"
                onChange={(e) => handleCorpChange(e, p)}
              >
                {corporations.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </ListItem>
          ))}
        </OrderedList>
      </ListContainer>
      <Button onClick={handleSubmit}>Submit New Match</Button>
    </Container>
  )
}

export default MatchForm
