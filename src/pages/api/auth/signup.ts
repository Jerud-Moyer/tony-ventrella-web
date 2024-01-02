import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie'
import { post } from "@/utils/api/request";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUrl = process.env.EXTERNAL_API_URL as string
  const user = req.body
  
  post(`${apiUrl}/user/signup`, user)
    .then(user => {
      if(user.token) {
        res.setHeader('Set-Cookie', cookie.serialize('session', user.token))
        delete user.token
        return res.status(200).json({user})
      } else if(user.error) {
        throw new Error('There was a problem signing you up.')
      }
    })
}
