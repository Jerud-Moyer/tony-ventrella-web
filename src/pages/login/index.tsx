import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, LinearProgress, TextField } from '@mui/material'
import { useAuthLoading, useCurrentUser, useLogin } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import SubPageLayout from '@/components/SubPageLayout'

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const login = useLogin()
  const user = useCurrentUser()
  const router = useRouter()
  const loading = useAuthLoading()

  const handleSubmit = async(e: any) => {
    e.preventDefault()
    await login({email, password})
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
    <SubPageLayout typeoutMessage='Enter email and password'>
      {loading &&
        <div className='absolute top-[35vh] left-[12vw] h-fit w-[76vw] pt-24'>
            <LinearProgress/>
        </div>
      }
      <div className={`
        ${loading ? 'blur-sm' : ''}
        flex flex-col
      `}>
        <div className='text-eerie_black text-4xl p-2'>
          Login
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
