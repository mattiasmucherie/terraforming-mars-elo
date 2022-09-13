import { NextPage } from "next"
import { FormEventHandler, useCallback, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { withLayout } from "../components"
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"

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
    (e: any) => setName(e.target.value),
    []
  )

  return (
    <form onSubmit={onSubmit}>
      <FormControl isRequired mb="4">
        <FormLabel>Player name</FormLabel>
        <Input
          value={name}
          onChange={handleInputChanged}
          placeholder="Mark Watney..."
        />
      </FormControl>

      <Button colorScheme="green" type="submit">
        Add
      </Button>
    </form>
  )
}
export default withLayout(NewPlayer, { heading: "Add player" })
