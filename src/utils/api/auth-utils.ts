import { User } from "@/types"
import { post, get } from "./request"

export const postSignup = (newUser: User) => {
  return post('/api/auth/signup', {
    ...newUser,
    client: 'ventrella'
  })
}

export const postLogin = (user: User) => {
  return post('/api/auth/login', {
    ...user,
    client: 'ventrella'
  })
}

export const getVerify = () => {
  return get('/api/auth/verify')
}
