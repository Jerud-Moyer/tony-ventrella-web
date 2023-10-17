import React, { useEffect, useState } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { blogEntries } from '../../../data/blog-entries'
import { Divider } from '@mui/material'
import BlogList from '@/components/BlogList'

type Column = {
  title: string | null,
  createdAt: Date,
  content: string 
}

function Blog() { 
  const [columns, setColumns] = useState<Column[]>([])
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    fetch('/api/blog/get-count-published')
      .then(res => res.json())
      .then(json => {
        console.log('COUNT! => ', json.count)
        setCount(json.count)
      })

    fetch('/api/blog/get-published/0')
      .then(res => res.json())
      .then(json => {
        console.log('columns? => ', json)
        setColumns(json.posts.map((entry: any) => (
          {
            title: entry.title,
            createdAt: entry.createdAt,
            content: entry.content
          }
        )))
      })
    console.log('is it just the hook?')
  }, [])


  // new above - old below
  const entries = blogEntries.reverse().map((entry, i) => {
    const date = new Date(entry.createdAt).toLocaleDateString()
    const content = entry.content.map((line, i) => (
      <p 
        key={`line-${i}`}
        className='mb-2'  
      >
        {line}
      </p>
    ))
    return (
    <div
      key={`${entry.title}-${i}`}
      className='text-eerie_black'  
    >
      <p className='text-3xl'>{ entry.title }</p>
      <p className='my-4'>{ date }</p>
      <div>
          { ...content }
      </div>
      <div className='my-12'>
        <Divider />
      </div>
    </div>
    )
  })



  return (
    <div>
      <SubPageLayout typeoutMessage='Sport Tones'>
        <div className=''>
          <div className='border-2 border-eerie_black'>
            {columns.length && 
              <BlogList columns={columns}/>
            }
          </div>
          {...entries}
        </div>
      </SubPageLayout>
    </div>
  )
}

export default Blog
