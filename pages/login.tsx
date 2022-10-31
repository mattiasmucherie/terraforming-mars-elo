import { useState } from "react"

import { withLayout } from "../components"
import LoginCard from "../components/LoginCard"
import { useAuth } from "../lib/auth"

const Login = () => {
  const [email, setEmail] = useState("")

  const { user, signIn, signOut } = useAuth()
  console.warn(user)
  return (
    <div>
      <LoginCard></LoginCard>
    </div>
  )
}

export default withLayout(Login)
