import type { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient, Prisma } from '@prisma/client'
import { uploadToS3 } from '@/utils/s3/s3-service'

type BlogEntry = {
  id: String,
  title: String | null,
  content: String | null,
  createdAt: Date,
  updatedAt: Date,
  published: Boolean
}

type Blog = {
  id: number,
  name: string
}

type Data = {
  post?: BlogEntry,
  posts?: BlogEntry[],
  count?: number,
  error?: string,
  url?: string,
  blogs?: Blog[]
}

type Message = {
  message: string
}

// const prisma = new PrismaClient()

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

  const id = (req.query.slug && req.query.slug[2])
    ? req.query.slug[2]
    : null

  const data: Data = {}
  const extApiUrl = process.env.EXTERNAL_API_URL as string

  switch(reqType) {
    case 'get-count-published':
      const publishedCountRes = await fetch(`${extApiUrl}/columns/count-published/${id}`)
      const publishedCount =  await publishedCountRes.json()
      if(publishedCount) data['count'] = publishedCount
      else data['error'] = 'there\'s been a problem getting the count'
      break

    case 'get-count':
      const countRes = await fetch(`${extApiUrl}/columns/count/${id}`)
      const count = await countRes.json()
      if(count) data['count'] = count
      else data['error'] = 'there was a problem getting the count'
      break
    
    case 'get-published':
      const publishedRes = await fetch(`${extApiUrl}/columns/published?page=${paginationSkip}&limit=10&blogId=${id}`)
      const publishedEntries = await publishedRes.json()
      if(publishedEntries) data['posts'] = publishedEntries.results
      else data['error'] = 'there was a problem getting the posts'
      break

    case 'get-by-id':
      const singleEntryRes = await fetch(`${extApiUrl}/columns/${id}`)
      const entry = await singleEntryRes.json()

      if(entry) {
        data['posts'] = entry
      } else {
        data['error'] = 'there was a problem getting this entry.'
      }
      break

    case 'get-all':
      const res = await fetch(`${extApiUrl}/columns?page=${paginationSkip}&limit=10`)
      const entries = await res.json()
      if(entries) data['posts'] = entries.results
      else data['error'] = 'there was a problem getting the posts'
      break

    case 'get-all-by-blog':
      const resp = await fetch(`${extApiUrl}/columns/blog?page=${paginationSkip}&limit=10&blogId=${id}`)
      const entriesByBlog = await resp.json()
      if(entriesByBlog) data['posts'] = entriesByBlog.results
      else data['error'] = 'there was a problem getting the posts'
      break

    case 'add-new':
      const newEntry = req.body
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

    case 'update-entry':
      const entryForUpdate = req.body
      const updatedEntryRes = await fetch(`${extApiUrl}/columns`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entryForUpdate)
      })
      const updatedEntry = await updatedEntryRes.json()
      if(updatedEntry) data['post'] = updatedEntry
      else data['error'] = 'there was a problem updating your post'
      break

    case 'delete-entry':
      const deletedEntryRes = await fetch(`${extApiUrl}/columns/${id}`, {
        method: 'DELETE'
      })
      if(deletedEntryRes) {
        const deletedEntry = await deletedEntryRes.json()
        data['posts'] = deletedEntry 
      } else {
        data['error'] = 'there was a problem deleting your post'
      }
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

    case 'get-blogs':
      const blogs = await fetch(`${extApiUrl}/blogs`)
      const blogJson = await blogs.json()
      if(blogs) {
        data['blogs'] = blogJson
      } else {
        data['error'] = 'there was a problem getting the blogs'
      }
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
