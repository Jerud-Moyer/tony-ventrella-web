import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

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
  error?: string
}

type Message = {
  message: string
}

const prisma = new PrismaClient()

// requests are structured /api/blog/paginationSkip/id

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Message>
) {

  console.log('request => ', req.query)
  const reqType = req.query.slug
    ? req.query.slug[0]
    :  null

  const paginationSkip = (req.query.slug && req.query.slug[1])
    ? Number(req.query.slug[1])
    : 0

  // if(reqType === 'add-new') {
  //   const newEntry = req.body
  //   if(newEntry) {
  //     const postedPost = await prisma.post.create({data: newEntry})
  //     res.status(200).json({ post: postedPost })
  //   } else {
  //     res.send({message: 'Whoops theres been a problem!'})
  //   }
  // } else if(reqType === 'get-published') {
  //   const publishedEntries = await prisma.post.findMany({
  //     skip: paginationSkip,
  //     take: 10,
  //     where: {
  //       published: true
  //     },
  //     orderBy: {
  //       createdAt: 'asc'
  //     }
  //   })

  //   if(publishedEntries) {
  //     res.status(200).json({posts: publishedEntries})
  //   }
  // }

  const data: Data = {}

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

    case 'add-new':
      console.log('add-new called')
      const newEntry = req.body
      const postedPost = await prisma.post.create({data: newEntry})
      if(postedPost) data['post'] = postedPost
      else data['error'] = 'there\'s been a problem saving this entry'
      break

    default:
      data['error'] = 'sorry nothing here'
  }

  if(!data.error) {
    res.status(200).json(data)
  } else {
    res.status(500).json(data)
  }
  
}
