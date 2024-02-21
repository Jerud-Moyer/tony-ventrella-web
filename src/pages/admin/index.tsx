import Notification from '@/components/Notification'
import SubPageLayout from '@/components/SubPageLayout'
import TextEditor from '@/components/TextEditor.jsx'
import EditColumn from '@/components/admin/EditColumn'
import { useAuthLoading, useCurrentUser } from '@/context/AuthContext'
import { Blog, Column } from '@/types'
import { deleteColumn, getColumnById, getCountPublished, postColumn, updateColumn, getBlogs } from '@/utils/api/column-utils'
import { Box, Button, FormControl, FormControlLabel, FormLabel, LinearProgress, Radio, RadioGroup, Switch, Tab, Tabs, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function Admin() {
  const [date, setDate] = useState<any>(null)
  const [headline, setHeadline] = useState<string>('')
  const [bodyText, setBodyText] = useState<string>('')
  const [published, setPublished] = useState<boolean>(false)
  const [adminView, setAdminView] = useState<string>('a')
  const [idToUpdate, setIdToUpdate] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<string>('')
  const [messageType, setMessageType] = useState<'warning' | 'success'>('success')
  const [blogId, setBlogId] = useState<number>(1)
  const [blogs, setBlogs] = useState<Blog[]>([])
 
  const authLoading = useAuthLoading()
  const currentUser = useCurrentUser()
  const router = useRouter()

  const newEntry: Column = {
    id: idToUpdate,
    title: headline,
    content: bodyText,
    created_at: date || '',
    published,
    blog_id: blogId
  }

  const clearForm = (): void => {
    setHeadline('')
    setDate(null)
    setPublished(false)
    setBodyText('')
    setIdToUpdate(null)
    setBlogId(1)
  }

  const handleAdminViewChange = (
    e: React.SyntheticEvent, val: string
  ): void => {
    setAdminView(val)
    clearForm()
  }
  
  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBlogId(Number(e.target.value))
  }

  const notify = (severity: 'warning' | 'success', message: string): void => {
    setMessageType(severity)
    setNotification(message)
  }

  const handleBodyText = (string: string): void => {
    setBodyText(string)
  }

  const handleDateChange = (date: Date | null) => {
    if(date) setDate(date)
  }

  const handleInitEdit = (id: number | null): void => {
    if(id) {
      setAdminView('a')
      getColumnById(id)
        .then(col => {
          setHeadline(col.title)
          setDate(() => (dayjs(new Date(col.created_at))))
          setPublished(col.published)
          setBodyText(col.content)
          setIdToUpdate(id)
          setBlogId(col.blog_id)
        })
      }
    }
    
  const handleCancelEdit = (): void => {
    clearForm()
  }
  
  const handleUpdateColumn = (): void => {
    setLoading(true)
    
    updateColumn(newEntry)
      .then(res => {
        if(res.error) {
          notify('warning', res.error)
        } else {
          notify('success', 'Column successfully updated!')
          clearForm()
        }
      })
      .finally(() => setLoading(false))
  }

  const handleDeleteColumn = (id: number): void => {
    setLoading(true)
    deleteColumn(id)
      .then(res => {
        if(res.error) {
          notify('warning', res.error)
        } else {
          notify('success', 'Column successfully deleted')
        }
      })
      .finally(() => setLoading(false))
  }
 
  const handlePostColumn = () => {
    setLoading(true)
    if(!date) {
      newEntry.created_at = new Date().toISOString()
    } else {
      newEntry.created_at.toLocaleString()
    }

    postColumn(newEntry)
      .then(res => {
        if(res.error) {
          notify('warning', res.error)
        } else {
          notify('success', 'New column posted successfully!')
          clearForm()
        }
      })
      .finally(() => setLoading(false))
  }

  const handleGetBlogs = () => {
    getBlogs()
     .then(res => {
      setBlogs(res.blogs)
     })
  }

  useEffect(() => {
    if(!currentUser) {
      router.push('/login')
    } else {
      notify('success', `Welcome ${currentUser.firstName}!`)
      handleGetBlogs()
    }
  }, [currentUser, router])

  return (
    <div>
      <SubPageLayout typeoutMessage='add a new column'>
        {authLoading
          ? 
          <div className='block mt-[50vh] ml-[25%] w-[50%] max-h-fit'>
            <LinearProgress />
          </div>
          :
          <>
            <div className='w-full flex justify-center'>
              <Tabs 
                value={adminView}
                onChange={handleAdminViewChange}  
              >
                <Tab 
                  label={!idToUpdate ? 'add a column' : 'edit'}
                  value='a'  
                />
                <Tab
                  label='edit a column'
                  value='b'
                />
              </Tabs>
            </div>

            {adminView === 'a' && !loading &&
              <Box>
                <div className='my-12'>
                  <FormControl>
                    <FormLabel>
                      select a blog
                    </FormLabel>
                    
                    <RadioGroup
                      value={blogId}
                      name='blog-radios'
                      onChange={handleBlogChange}
                    >
                      {blogs &&
                        blogs.map((blog) => (
                          <FormControlLabel 
                            value={blog.id}
                            control={<Radio />}
                            label={blog.name}
                            key={blog.name}
                            sx={{
                              color: '#111910',
                              textTransform: 'capitalize'
                            }}
                          />
                        ))
                      }
                    </RadioGroup>
                    
                  </FormControl>
                </div>
                <div className='my-12'>
                  <DatePicker 
                    label='select a date'
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
                <div className='my-12'>
                  <TextField
                    label='enter a headline'
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    fullWidth
                  />
                </div>
                <FormLabel>
                  enter column text below
                </FormLabel>
                <TextEditor 
                  stateHandler={handleBodyText}
                  stringVal={bodyText}
                />
                <div className='my-12'>
                  <FormControl>
                    <FormLabel>
                      publish this column now?
                    </FormLabel>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={published}
                          onChange={() => setPublished(!published)}
                        />
                      }
                      label={published ? 'yes' : 'no'}
                      sx={{
                        color: '#111910',
                      }}
                    />
                  </FormControl>
                </div>
                <div className='my-4'>
                  {idToUpdate
                  ?
                  <>
                    <div className='flex'>
                      <div className='mr-4'>
                        <Button
                          variant='outlined'
                          onClick={handleUpdateColumn}
                        >
                          Submit Edited Column
                        </Button>
                      </div>
                      <div>
                        <Button
                          variant='outlined'
                          onClick={handleCancelEdit}
                        >
                          Cancel Edit Column
                        </Button>
                      </div>
                    </div>
                  </>
                  :
                    <Button
                      variant='outlined'
                      onClick={handlePostColumn}
                    >
                      Submit New Column
                    </Button>
                  }
                </div>
              </Box>
            }  
            {adminView == 'b' && 
              <Box>
                <EditColumn 
                  handleInitEdit={handleInitEdit} 
                  handleDeleteColumn={handleDeleteColumn}            
                  blogs={blogs} 
                />
              </Box>
            }
          
          <Notification 
            severity={messageType}
            message={notification}
          />
          {loading &&
            <div className='absolute top-0 left-0 min-h-full min-w-full z-[100] backdrop-blur-md'>
              <div className='block mt-[50vh] ml-[25%] w-[50%] max-h-fit'>
                <LinearProgress />
              </div>
            </div>
          }
        </>
      }
      </SubPageLayout>
    </div>
  )
}

export default Admin
