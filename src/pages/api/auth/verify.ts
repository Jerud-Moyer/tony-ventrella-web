import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUrl = process.env.EXTERNAL_API_URL as string
  const session = req.cookies.session

  const response = await fetch(`${apiUrl}/user/verify`, {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${session}`
    }
  })
  const user = await response.json()
  
  return res.status(200).json({user})
}
