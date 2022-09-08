import { NextPage } from "next"
import { FormEventHandler, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { Layout } from "../components"

const NewPlayer: NextPage = () => {
  const [name, setName] = useState("")
  const router = useRouter()

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/api/users/new", { name })
      router.push("/")
    } catch (e) {
      console.error()
    }
  }
  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setName(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </Layout>
  )
}
export default NewPlayer
