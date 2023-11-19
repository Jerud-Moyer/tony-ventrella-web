import SubPageLayout from '@/components/SubPageLayout'
import TextEditor from '@/components/TextEditor.jsx'
import EditColumn from '@/components/admin/EditColumn'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Switch, Tab, Tabs, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { forwardRef, useRef, useState } from 'react'

function Admin() {
  const [date, setDate] = useState<Date | null>(null)
  const [headline, setHeadline] = useState<string | null>(null)
  const [bodyText, setBodyText] = useState<string>('')
  const [published, setPublished] = useState<boolean>(false)
  const [adminView, setAdminView] = useState<string>('a')

  const newEntry = {
    title: headline,
    content: bodyText,
    createdAt: date || '',
    published
  }

  const handleAdminViewChange = (
    e: React.SyntheticEvent, val: string
  ) => {
    setAdminView(val)
  }

  const handleBodyText = (string: string): void => {
    setBodyText(string)
  }

  const handleDateChange = (date: Date | null) => {
    if(date) {
      console.log('date here => ', date)
      setDate(date)}
  }
 
  const postColumn = () => {
    if(!date) {
      newEntry.createdAt = new Date().toISOString()
      console.log('entry after insert date => ', newEntry)
    } else {
      newEntry.createdAt.toLocaleString()
    }
    fetch('/api/blog/add-new', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntry)
    })
      .then(res => res.json())
      .then(json => console.log('json => ', json))
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
              label='add a column'
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
            <p className='text-eerie_black mb-4 pl-4'>enter column text below</p>
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
              <Button
                variant='outlined'
                onClick={postColumn}
              >
                Submit New Column
              </Button>
            </div>
          </Box>
        }  
        {adminView == 'b' && 
          <Box>
            <EditColumn />
          </Box>
        }
      </SubPageLayout>
    </div>
  )
}

export default Admin
