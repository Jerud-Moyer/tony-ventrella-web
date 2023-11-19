import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { uploadToS3 } from '@/utils/s3/s3-service'

type BlogEntry = {
  id: String,
  title: String | null,
  content: String | null,
  createdAt: Date,
  updatedAt: Date,
  published: Boolean
}

type Data = {
  post?: BlogEntry,
  posts?: BlogEntry[],
  count?: number,
  error?: string,
  url?: string
}

type Message = {
  message: string
}

const prisma = new PrismaClient()

// requests are structured /api/blog/reqType/paginationSkip/id

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Message>
) {
  const reqType = req.query.slug
    ? req.query.slug[0]
    :  null

  const paginationSkip = (req.query.slug && req.query.slug[1])
    ? Number(req.query.slug[1])
    : 0

  const data: Data = {}
  const extApiUrl = process.env.EXTERNAL_API_URL as string

  console.log('reqType => ', reqType)
  switch(reqType) {
    case 'get-count-published':
      const count = await prisma.post.count({
        where: {
          published: true
        }
      })
      if(count) data['count'] = count
      else data['error'] = 'there\'s been a problem getting the count'
      break
    
    case 'get-published':
      const publishedEntries = await prisma.post.findMany({
        skip: paginationSkip,
        take: 10,
        where: {
          published: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      })
      if(publishedEntries) data['posts'] = publishedEntries
      else data['error'] = 'there was a problem getting the posts'
      break

    case 'get-all':
      // const entries = await prisma.post.findMany({
      //   skip: paginationSkip,
      //   take: 25
      // })
      const res = await fetch(`${extApiUrl}/columns?page=${paginationSkip}&limit=25`)
      console.log('res? => ', res)
      const entries = await res.json()
      console.log('entries? => ', entries)
      if(entries) data['posts'] = entries.results
      else data['error'] = 'there was a problem getting the posts'
      break

    case 'add-new':
      const newEntry = req.body
      console.log('add-new => ', newEntry)
      // const postedPost = await prisma.post.create({data: newEntry})
      const post = await fetch(`${extApiUrl}/columns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      })
      const postedPost = await post.json()
      if(postedPost) data['post'] = postedPost
      else data['error'] = 'there\'s been a problem saving this entry'
      break

    case 'upload-image':
      const {
        encodedImage,
        date     
      } = req.body
      const newUrl = await uploadToS3(
        Buffer.from(encodedImage, 'base64'),
        date
      )
      data['url'] = newUrl
      break

    default:
      data['error'] = 'sorry nothing here'
  }

  if(!data.error) {
    console.log('no error? => ', data)
    res.status(200).json(data)
  } else {
    res.status(500).json(data)
  }
  
}
