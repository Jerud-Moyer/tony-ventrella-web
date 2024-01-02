import React, { useEffect, useState } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { LinearProgress, Pagination } from '@mui/material'
import BlogList from '@/components/BlogList'
import { Column } from '../../types';
import { getCountPublished, getPublishedColumns } from '@/utils/api/column-utils'

function Blog() { 
  const [columns, setColumns] = useState<Column[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const handleGetColumns = (page: number): void => {
    setLoading(true)
    getPublishedColumns(page)
      .then(cols => {setColumns(cols)})
      .finally(() => setLoading(false))
  }

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    handleGetColumns(page)
  }

  useEffect(() => {
    getCountPublished()
      .then(count => setPageCount(Math.ceil(count.count / 10)))
    
    handleGetColumns(1)
  }, [])


  return (
    <div>
      <SubPageLayout typeoutMessage='Sport Tones'>
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
