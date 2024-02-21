import { Column } from "@/types"

export const getCount = async(blogId: number) => {
  const res = await fetch(`/api/blog/get-count/0/${blogId}`)
  const json = await res.json()
  return json.count
}

export const getCountPublished = async(blogId: number) => {
  const res = await fetch(`/api/blog/get-count-published/0/${blogId}`)
  const json = await res.json()
  return json.count
}

export const getColumnById = async(id: number) => {
  const res = await fetch(`/api/blog/get-by-id/0/${id}`)
  const json = await res.json()
  return json.posts
}

export const getColumns = async(page: number, blogId: number): Promise<Column[]> => {
  const res = await fetch(`/api/blog/get-all-by-blog/${page}/${blogId}`)
  const json = await res.json()
  return json.posts
}

export const getPublishedColumns = async(page: number, blogId: number): Promise<Column[]> => {
  const res = await fetch(`/api/blog/get-published/${page}/${blogId}`)
  const json = await res.json()
  return json.posts
}

export const postColumn = async(newEntry: Column) => {
  const res = await fetch('/api/blog/add-new', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newEntry)
  })
  const json = await res.json()
  return json
}

export const updateColumn = async(column: Column) => {
  const res = await fetch('/api/blog/update-entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(column)
  })
  const json = await res.json()
  return json
}

export const deleteColumn = async(id: number) => {
  const res = await fetch(`/api/blog/delete-entry/0/${id}`)
  const json = await res.json()
  return json
}

export const getBlogs = async() => {
  const res = await fetch('/api/blog/get-blogs')
  const json = await res.json()
  return json
}
