import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

function ContactForm() {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleChange = ({ target }: 
    ChangeEvent<HTMLTextAreaElement 
    | HTMLInputElement
    | HTMLSelectElement>
    | SelectChangeEvent
    ) => {
    const { name, value } = target
    switch (name) {
      case 'first-name':
        return setFirstName(value);
      case 'last-name':
        return setLastName(value);
      case 'email':
        return setEmail(value);
      case 'subject':
        return setSubject(value);
      case 'message':
        return setMessage(value);
      default:
        console.log('wut')
    }

  }

  const handleSendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    alert( `when we set this up you will get an email from: ${firstName} ${lastName}
    with their email: ${email} 
    a subject from the dropdown list: ${subject} 
    and of course a message: ${message}`)
  }


  return (
    <div className='p-10 mt-32 mx-auto max-w-fit border-2 border-dark_green rounded-lg'>
      <p className='ml-6 mb-6 text-4xl text-eerie_black italic'>
        Contact
      </p>
      <div className='flex flex-row justify-around'>
        <div className='mx-12'>
          <div className='m-6'>
            <TextField
              variant='outlined'
              label='first name'
              color='dark_green'
              name='first-name'
              id='first_name'
              value={firstName}
              onChange={handleChange}
            />
          </div>
          <div className='m-6'>
            <TextField
              variant='outlined'
              label='last name'
              color='dark_green'
              name='last-name'
              id='last_name'
              value={lastName}
              onChange={handleChange}
            />
          </div>
          <div className='m-6'>
            <TextField
              variant='outlined'
              label='email'
              color='dark_green'
              name='email'
              id='email'
              value={email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='mx-12'>
          <div className='m-6'>
            <FormControl
              color='dark_green'
              sx={{
                minWidth: 194
              }}  
            >
              <InputLabel id='subject-label' >
                subject
              </InputLabel>
              <Select
                labelId='subject-label'
                label='subject'
                color='dark_green'
                name='subject'
                id='subject'
                value={subject}
                onChange={handleChange}
              >
                <MenuItem value='speaking'>
                  I&rsquo;m interested in booking you for a speaking event
                </MenuItem>
                <MenuItem value='books'>
                  I&rsquo;d like to know more about your books
                </MenuItem>
                <MenuItem value='hello'>
                  I just want to say hello!
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='m-6 mt-8'>
            <TextField
                variant='outlined'
                label='message'
                color='dark_green'
                name='message'
                id='message'
                multiline
                rows={4}
                fullWidth
                value={message}
                onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className='max-w-fit mx-auto'>
        <Button
          variant='outlined'
          color='dark_green'
          onClick={handleSendEmail}
        >
          send email
        </Button>
      </div>
    </div>
  )
}

export default ContactForm
