import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import axios from "axios"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { ChangeEvent, FormEventHandler, useCallback, useState } from "react"

import { withLayout } from "../components"

const NewPlayer: NextPage = () => {
  const [name, setName] = useState("")
  const router = useRouter()

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/api/users/new", { name })
      router.push("/")
    } catch (e) {
      console.error(e)
    }
  }

  const handleInputChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  )

  return (
    <form onSubmit={onSubmit}>
      <FormControl isRequired mb="4">
        <FormLabel>Player name</FormLabel>
        <Input
          value={name}
          onChange={handleInputChanged}
          placeholder="Ex. Mark Watney"
        />
      </FormControl>

      <Button colorScheme="green" type="submit">
        Add
      </Button>
    </form>
  )
}
export default withLayout(NewPlayer, { heading: "Add player" })
