import React, { useEffect, useState } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { LinearProgress, Pagination } from '@mui/material'
import BlogList from '@/components/BlogList'
import { Column } from '../types';
import { getCountPublished, getPublishedColumns } from '@/utils/api/column-utils'

type Props = {
  blogId: number;
  typeoutMessage: string;
}

function Blog({
  blogId,
  typeoutMessage
}: Props) { 
  const [columns, setColumns] = useState<Column[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const handleGetColumns = (page: number): void => {
    setLoading(true)
    getPublishedColumns(page, blogId)
      .then(cols => {setColumns(cols)})
      .finally(() => setLoading(false))
  }

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    handleGetColumns(page)
  }

  useEffect(() => {
    getCountPublished(blogId)
      .then(count => setPageCount(Math.ceil(count.count / 10)))
    
    handleGetColumns(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId])


  return (
    <div>
      <SubPageLayout typeoutMessage={typeoutMessage}>
        <div className=''>
          <div className=''>
            {columns.length && 
              <BlogList columns={columns}/>
            }
          </div>
        </div>
        {loading &&
          <LinearProgress />
        }
        {pageCount &&
          <div className='flex justify-center'>
            <Pagination
              shape='rounded'
              count={pageCount}
              onChange={handlePaginationChange}
            />
          </div>
        }
      </SubPageLayout>
    </div>
  )
}

export default Blog
