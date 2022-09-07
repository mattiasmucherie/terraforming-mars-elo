import { User } from "@prisma/client"
import { FC, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import axios from "axios"

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
const ListOfPlayers = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const Rank = styled.ol``
const Player = styled.li``

interface MatchFormProps {
  users: User[]
}

const MatchForm: FC<MatchFormProps> = ({ users }) => {
  const [listOfPlayers, setListOfPlayers] = useState<User[]>(users)
  const [rankingOfPlayers, setRankingOfPlayers] = useState<User[]>([])

  const router = useRouter()

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
        corporation: null,
      }))
      await axios.post("/api/new-match", listOfNames)
      router.push("/")
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Container>
      <ListContainer>
        <ListOfPlayers>
          {listOfPlayers.map((u) => (
            <Player key={u.id}>
              <button onClick={() => handleOnClickAdd(u)}>{u.name}</button>
            </Player>
          ))}
        </ListOfPlayers>
        <Rank>
          {rankingOfPlayers.map((p) => (
            <Player key={p.id} onClick={() => handleOnClickRemove(p)}>
              {p.name}
            </Player>
          ))}
        </Rank>
      </ListContainer>
      <button onClick={handleSubmit}>Submit New Match</button>
    </Container>
  )
}

export default MatchForm
