import SubPageLayout from '@/components/SubPageLayout'
import TextEditor from '@/components/TextEditor.jsx'
import EditColumn from '@/components/admin/EditColumn'
import { Column } from '@/types'
import { getColumnById, postColumn, updateColumn } from '@/utils/api/api-utils'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Switch, Tab, Tabs, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, { useState } from 'react'

function Admin() {
  const [date, setDate] = useState<any>(null)
  const [headline, setHeadline] = useState<string>('')
  const [bodyText, setBodyText] = useState<string>('')
  const [published, setPublished] = useState<boolean>(false)
  const [adminView, setAdminView] = useState<string>('a')
  const [idToUpdate, setIdToUpdate] = useState<number | null>(null)

  const newEntry: Column = {
    id: idToUpdate,
    title: headline,
    content: bodyText,
    created_at: date || '',
    published
  }

  const handleAdminViewChange = (
    e: React.SyntheticEvent, val: string
  ) => {
    setAdminView(val)
  }

  const clearForm = (): void => {
    setHeadline('')
    setDate(null)
    setPublished(false)
    setBodyText('')
    setIdToUpdate(null)
  }

  const handleBodyText = (string: string): void => {
    setBodyText(string)
  }

  const handleDateChange = (date: Date | null) => {
    if(date) {
      console.log('date here => ', date)
      setDate(date)}
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
    updateColumn(newEntry)
  }
 
  const handlePostColumn = () => {
    if(!date) {
      newEntry.created_at = new Date().toISOString()
      console.log('entry after insert date => ', newEntry)
    } else {
      newEntry.created_at.toLocaleString()
    }

    postColumn(newEntry)
    // fetch('/api/blog/add-new', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(newEntry)
    // })
    //   .then(res => res.json())
    //   .then(json => console.log('json => ', json))
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

        {adminView === 'a' &&
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
                  Publish this column now?
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
            <EditColumn handleInitEdit={handleInitEdit} />
          </Box>
        }
      </SubPageLayout>
    </div>
  )
}

export default Admin
