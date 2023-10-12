import SubPageLayout from '@/components/SubPageLayout'
import TextEditor from '@/components/TextEditor'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'

function Admin() {
  const [date, setDate] = useState(null)
  const [headline, setHeadline] = useState<string | null>(null)


  return (
    <div>
      <SubPageLayout typeoutMessage='add a new column'>
        <div className='my-12'>
          <DatePicker 
            label='select a date'
            value={date}
            onChange={(val) => setDate(val)}
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
        <TextEditor />
      </SubPageLayout>
    </div>
  )
}

export default Admin
