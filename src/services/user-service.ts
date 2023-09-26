import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

type RawUser = {
  name: string;
  email: string;
  password: string;
}

type HashedUser = {
  name: string;
  email: string;
  passwordHash: string;
}

type AuthRequest = {
  email: string;
  password: string;
}

type UnHashedUser = {
  name: string;
  email: string;
}

const prisma = new PrismaClient()
const saltRounds = process.env.SALT_ROUNDS as string
const appSecret = process.env.APP_SECRET as string

const toJSON = ({name, email}: HashedUser): UnHashedUser => {
  return {
    name,
    email
  }
}

export const UserService = {
  signup: async({name, email, password}: RawUser) => {
    const passwordHash = await bcrypt.hash(
      password, saltRounds)
    const hashedUser: HashedUser = {
      name,
      email,
      passwordHash
    }
  
    const addUser = await prisma.user.create({
      data: hashedUser
    })
  
    return addUser
  },
  authorize: async({email, password}: AuthRequest) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if(!user) throw new Error('Invalid user/password')

    const validPassword = bcrypt.compare(password, user.passwordHash)

    if(!validPassword) throw new Error('Invalid user/password')

    return user
  },
  authToken: (user: HashedUser): string => {
    return jwt.sign({
      payload: toJSON(user)
    }, appSecret, {
      expiresIn: '24h'
    })
  },
  verifyToken: (token: string) => {
    const payload: JwtPayload | string = jwt.verify(token, appSecret)
    return payload
  }
}
