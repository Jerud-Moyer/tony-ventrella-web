import React, { useEffect, useState } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { 
  Button, 
  LinearProgress, 
  Pagination, 
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import BlogList from '@/components/BlogList'
import { Column } from '../types';
import { getCountPublished, getPublishedColumns, notifyAdmin, postColumn } from '@/utils/api/column-utils'
import TextEditor from './TextEditor';
import dayjs from 'dayjs';
import Notification from './Notification';

type Props = {
  blogId: number;
  typeoutMessage: string;
  forRemembrance?: boolean;
}

function Blog({
  blogId,
  typeoutMessage,
  forRemembrance
}: Props) { 
  const [columns, setColumns] = useState<Column[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [headline, setHeadline] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [memFormOpen, setMemFormOpen] = useState<boolean>(false)
  const [thankYou, setThankYou] = useState<string>('')

  const newMemory: Column = {
    title: headline,
    content: content,
    created_at: new Date().toISOString(),
    published: false,
    blog_id: 3
  }

  const handleGetColumns = (page: number): void => {
    setLoading(true)
    getPublishedColumns(page, blogId)
      .then(cols => {setColumns(cols)})
      .finally(() => setLoading(false))
  }

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    handleGetColumns(page)
  }

  const thanksForTheMemory = () => {
    setThankYou('Thank you! Your  memory has been submitted for review. Please check back soon to see it published!')
    setTimeout(() => {
      setThankYou('')
    }, 5000)
  }

  const handleCreateMemory = () => {
    setLoading(true)
    postColumn(newMemory)
      .then(json => console.log('JSON => ', json))
      .finally(() => {
        setMemFormOpen(false)
        notifyAdmin()
        setLoading(false)
        thanksForTheMemory()
      })
  }

  const handleContentChange = (val:string): void => {
    setContent(val)
  }

  useEffect(() => {
    getCountPublished(blogId)
      .then(count => setPageCount(Math.ceil(count.count / 10)))
    console.log('we firing this? => ', blogId)
    handleGetColumns(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId])


  return (
    <div>
      <SubPageLayout typeoutMessage={typeoutMessage}>
        <div className=''>
          {forRemembrance &&
            <div className="mb-8">
              <p className="text-eerie_black text-3xl my-6">
                A Place for Family, Friends and Fans to share their memories.
              </p>
              <Accordion expanded={memFormOpen}>
                <AccordionSummary>
                <div className='py-4'>
                  <Button
                    variant='contained'
                    onClick={() => setMemFormOpen(!memFormOpen)}
                  >
                    Add a Memory
                  </Button>
                </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className='my-12'>
                      <TextField
                        label='enter a headline or title for your memory'
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        fullWidth
                      />
                  </div>
                  <p className='text-eerie_black py-4'>
                    Use the text-editor below to share your memory. Include text and an image if you want, please be sure to include your name and your relationship to Tony!
                  </p>
                  <TextEditor
                    stateHandler={handleContentChange}
                    stringVal={content}
                  />
                  <div className='py-4'>
                    <Button
                      variant='contained'
                      onClick={handleCreateMemory}
                    >
                      Submit Memory
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          }
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
      <Notification 
        severity='success'
        message={thankYou} 
      />
    </div>
  )
}

export default Blog
