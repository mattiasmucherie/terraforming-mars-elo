import type { ApiError, Provider } from "@supabase/gotrue-js/src/lib/types"
import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"

interface ContextValues {
  session?: Session | null
  user?: User | null
  signOut?: () => Promise<{ error: ApiError | null }>
  signIn?: (email: string) => Promise<{
    session: Session | null
    user: User | null
    provider?: Provider
    url?: string | null
    error: ApiError | null
  }>
}
export const AuthContext = createContext<ContextValues>({})

export const AuthProvider = ({
  supabase,
  children,
}: {
  supabase: SupabaseClient
  children: JSX.Element[]
}) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const activeSession = (supabase as SupabaseClient).auth.session()
    setSession(activeSession)
    setUser(activeSession?.user ?? null)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signOut: () => supabase.auth.signOut(),
        signIn: (email) => supabase.auth.signIn({ email }),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
