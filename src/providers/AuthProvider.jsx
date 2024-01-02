import { AuthContext } from "@/context/AuthContext"
import { getVerify, postLogin, postSignup } from "@/utils/api/auth-utils"
import { useEffect, useState } from "react"

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = (newUser) => {
    setLoading(true)
    postSignup(newUser)
      .then(res => {
        setCurrentUser(res.user)
      })
      .finally(() => setLoading(false))
  }

  const login = (user) => {
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
