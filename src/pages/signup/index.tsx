import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, LinearProgress, TextField } from '@mui/material'
import { useAuthLoading, useCurrentUser, useSignup } from '@/context/AuthContext'
import SubPageLayout from '@/components/SubPageLayout'
import { useRouter } from 'next/router'

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const signup = useSignup()
  const user = useCurrentUser()
  const router = useRouter()
  const loading = useAuthLoading()
  const firstName = process.env.NEXT_PUBLIC_USER_FIRST_NAME

  const handleSubmit = async(e: any) => {
    e.preventDefault()
    await signup({email, password, firstName})
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'email') setEmail(e.target.value)
    else setPassword(e.target.value)
  }

  useEffect(() => {
    if(user) {
      router.push('/admin')
    }
  }, [user, router])

  return (
    <SubPageLayout typeoutMessage='signup for admin access'>
      {loading &&
        <div className='absolute top-[35vh] left-[12vw] h-fit w-[76vw] pt-24'>
          <LinearProgress/>
        </div>
      }
      <div className='flex flex-col'>
        <div className='text-eerie_black text-4xl p-2'>
          Signup
        </div>
        <div className='m-2'>
          <TextField
            label='Email'
            name='email'
            variant='outlined'
            value={email}
            onChange={handleChange}
            sx={{
              width: '300px'
            }}
          />
        </div>
        <div className='m-2'>
          <TextField
            label='Password'
            name='password'
            variant='outlined'
            value={password}
            onChange={handleChange}
            sx={{
              width: '300px'
            }}
          />
        </div>
        <div className='m-2'>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default Login
