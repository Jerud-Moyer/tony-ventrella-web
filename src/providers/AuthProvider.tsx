import { AuthContext } from "@/context/AuthContext"
import { User } from "@/types"
import { getVerify, postLogin, postSignup } from "@/utils/api/auth-utils"
import { useEffect, useState } from "react"

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const signup = (newUser: User) => {
    setLoading(true)
    postSignup(newUser)
      .then(res => {
        setCurrentUser(res.user)
      })
      .finally(() => setLoading(false))
  }

  const login = (user: User) => {
    setLoading(true)
    postLogin(user)
      .then(res => setCurrentUser(res.user))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getVerify()
      .then((res) => {
        if(res.user.email) {
          setCurrentUser(res.user)
        } else {
          setCurrentUser(null)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const authState = {
    currentUser,
    loading,
    signup,
    login
  }

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
