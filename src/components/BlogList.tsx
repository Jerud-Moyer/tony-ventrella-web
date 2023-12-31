import { Divider } from '@mui/material'
import React from 'react'
import { Column } from '@/types'

type Props = {
  columns: Column[]
}

function BlogList({ columns }: Props) {

  const displayableColumns = columns.map((col: Column, i) => (
        <div key={`${col}-${i}`} className='text-eerie_black'>
          {col.title &&
            <p className='text-3xl'>
              {col.title}
            </p>
          }
          <p className='my-4'>
            {new Date(col.created_at).toLocaleDateString()}
          </p>
          <div className='column-body'>
            <p dangerouslySetInnerHTML={{__html: col.content}}/>
          </div>
          <div className='my-12'>
            <Divider />
          </div>
        </div>
      ))

  return (
    <div>
      {...displayableColumns}
    </div>
  )
}

export default BlogList
