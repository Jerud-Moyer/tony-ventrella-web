import Notification from '@/components/Notification'
import SubPageLayout from '@/components/SubPageLayout'
import TextEditor from '@/components/TextEditor.jsx'
import EditColumn from '@/components/admin/EditColumn'
import { Column } from '@/types'
import { deleteColumn, getColumnById, getCountPublished, postColumn, updateColumn } from '@/utils/api/column-utils'
import { Box, Button, FormControl, FormControlLabel, FormLabel, LinearProgress, Switch, Tab, Tabs, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
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

  const newEntry: Column = {
    id: idToUpdate,
    title: headline,
    content: bodyText,
    created_at: date || '',
    published
  }

  const clearForm = (): void => {
    setHeadline('')
    setDate(null)
    setPublished(false)
    setBodyText('')
    setIdToUpdate(null)
  }

  const handleAdminViewChange = (
    e: React.SyntheticEvent, val: string
  ) => {
    setAdminView(val)
    clearForm()
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

  return (
    <div>
      <SubPageLayout typeoutMessage='add a new column'>
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
            />
          </Box>
        }
      </SubPageLayout>
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
    </div>
  )
}

export default Admin
