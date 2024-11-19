import { AlertColor, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import Alert from '@/components/Alert'

interface ErrorState {
  firstName: boolean;
  email: boolean;
  subject: boolean;
  message: boolean
}

function ContactForm() {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success')
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<ErrorState>({
    firstName: false,
    email: false,
    subject: false,
    message: false
  })

  const handleChange = ({ target }: 
    ChangeEvent<
    HTMLTextAreaElement 
    | HTMLInputElement
    | HTMLSelectElement
    >
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

  const validate = (): boolean => {
    const requiredFields = [
      'firstName',
      'email',
      'subject',
      'message'
    ]
    let isValid = true
    requiredFields.forEach(field => {
      switch (field) {
        case 'firstName':
          const hasNameInput = firstName.length > 0
          setErrors(curr => (
            {...curr, firstName: !hasNameInput}
          ))
          isValid = hasNameInput
          break;
        case 'email':
          const hasEmailInput = email.length > 0
          setErrors(curr => (
            {...curr, email: !hasEmailInput}
          ))
          isValid = hasEmailInput
          break
        case 'subject':
          const hasSubjectInput = subject.length > 0
          setErrors(curr => (
            {...curr, subject: !hasSubjectInput}
          ))
          isValid = hasSubjectInput
          break;
        case 'message':
          const hasMessageInput = message.length > 0
          setErrors(curr => (
            {...curr, message: !hasMessageInput}
          ))
          isValid = hasMessageInput
          break;
        default:
          break;
      }
    })
    return isValid
  }

  const clearForm = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  const handleSendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('errors => ', errors)
    let validated: boolean = validate()
    if(validated) {
      setLoading(true)
      fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          subject,
          message
        })
      })
        .then(res => res.json())
        .then(res => {
          if(res.ok) {
            console.log('res? => ', res)
            setResponse('Thank you for reaching out! Tony will get back to you as soon as possible.')
            setAlertSeverity('success')
          }
        })
        .catch(err => {
          setResponse(`sorry an error occured ${err}`)
          setAlertSeverity('error')
        })
        .finally(() => {
          clearForm()
          setLoading(false)
        })
    }
  }


  return (
    <div className='relative p-10 mt-32 mx-auto max-w-fit border-2 border-dark_green rounded-lg'>
      <p className='ml-6 mb-6 text-4xl text-eerie_black italic'>
        Contact
      </p>
      <div className='flex flex-col md:flex-row justify-around'>
        <div className='mx-12'>
          <div className='m-6'>
            <TextField
              error={errors.firstName}
              helperText={errors.firstName ? 'required field' : ''}
              variant='outlined'
              label='first name'
              color={errors.firstName ? 'error' : 'dark_green'}
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
              error={errors.email}
              helperText={errors.email ? 'required field' : ''} 
              variant='outlined'
              label='email'
              color={errors.email ? 'error' : 'dark_green'}
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
              sx={{
                minWidth: 194
              }}  
            >
              <InputLabel 
                id='subject-label'
                sx={{
                  color: errors.subject ? '#d53a3a' : '#44633f',
                  '&.Mui-focused': {
                    color: errors.subject ? '#d53a3a' : '#44633f',
                  }
                }}
              >
                subject
              </InputLabel>
              <Select
                error={errors.subject}
                label='subject'
                labelId='subject-label'
                color={errors.subject ? 'error' : 'dark_green'}
                name='subject'
                id='subject'
                value={subject}
                onChange={handleChange}
              >
                <MenuItem value='speaking'>
                  I&rsquo;m interested in booking you for a speaking event
                </MenuItem>
                <MenuItem value='podcast'>
                  I&rsquo;m curious about the podcast
                </MenuItem>
                <MenuItem value='books'>
                  I&rsquo;d like to know more about your books
                </MenuItem>
                <MenuItem value='hello'>
                  I just want to say hello!
                </MenuItem>
              </Select>
              <FormHelperText
                error={errors.subject}
              >
                {errors.subject ? 'please select a subject' : ''}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='m-6 mt-8'>
            <TextField
              error={errors.message}
              helperText={errors.message ? 'required field' : ''}
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
      {loading &&
        <div 
          className='absolute h-full w-full top-0 left-0 flex justify-center items-center backdrop-blur-sm z-10'
        >
          <div className='w-fit h-fit'>
            <CircularProgress 
              color='success'
            />
          </div>
        </div>
      }
      <Alert
        severity={alertSeverity}
        message={response}
      />
    </div>
  )
}

export default ContactForm
