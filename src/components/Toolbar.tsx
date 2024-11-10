import { Button, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import React, { MouseEvent, useState } from 'react'

function Toolbar() {
  const [podMenuAnchor, setPodMenuAnchor] = useState<null | HTMLElement>(null)
  const podMenuOpen = Boolean(podMenuAnchor)
  
  const handleOpenPodMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setPodMenuAnchor(e.currentTarget)
  }

  const handlePodMenuClose = () => {
    setPodMenuAnchor(null)
  }

  return (
    <div 
      className='fixed top-0 w-full flex justify-end px-6 py-4 h-20 bg-dark_green text-soft_white text-xl z-10'
    >
      <Link 
        className='mx-2 mt-1 cursor-pointer'
        href='/'
      >
        <Button
          variant="text" 
          color={'soft_white'}
          sx={{
            textTransform: 'none',
            fontSize: '20px',
            marginBottom: '-5px'
          }}
        >
          speaking
        </Button>
      </Link>
      <Link 
        className='mx-2 mt-1 cursor-pointer'
        href='/remembering-tony'
      >
        <Button
          variant="text" 
          color={'soft_white'}
          sx={{
            textTransform: 'none',
            fontSize: '20px',
            marginBottom: '-5px'
          }}
        >
          remembering Tony
        </Button>
      </Link>
      <Link 
        className='mx-2 mt-1 cursor-pointer'
        href='/the-good-we-do'
      >
        <Button
          variant="text" 
          color={'soft_white'}
          sx={{
            textTransform: 'none',
            fontSize: '20px',
            marginBottom: '-5px'
          }}
        >
          the good we do
        </Button>
      </Link>
      <Link 
        className='mx-2 mt-1 cursor-pointer'
        href='/sport-tones'
      >
        <Button
          variant="text"
          color={'soft_white'}
          sx={{
            textTransform: 'none',
            fontSize: '20px',
          }}      
        >
          sport tones
        </Button>
      </Link>
      <Button
        variant="text" 
        onClick={handleOpenPodMenu}
        color={'soft_white'}
        sx={{
          textTransform: 'none',
          fontSize: '20px',
          margin: '0 5px -7px 5px'
        }}
      >
        podcasts
      </Button>
      <Menu 
        open={podMenuOpen}
        onClose={handlePodMenuClose}  
        anchorEl={podMenuAnchor}
      >
        <MenuItem onClick={handlePodMenuClose}>
          <Link 
            className='m-3 cursor-pointer'
            href='/podcasts/talking-sports'
          >
            Talking Sports with Tony V.
          </Link>
        </MenuItem>
        <MenuItem onClick={handlePodMenuClose}>
          <Link 
            className='m-3 cursor-pointer'
            href='/podcasts/steilacoom-talk'
          >
            Steilacoom Talk
          </Link>
        </MenuItem>
      </Menu>
      <Link 
        className='mx-2 mt-1 cursor-pointer'
        href='/books'  
      >
        <Button
          variant="text" 
          color={'soft_white'}
          sx={{
            textTransform: 'none',
            fontSize: '20px',
            marginBottom: '-5px'
          }}
        >
          books
        </Button>
      </Link>
      <Link 
        className='mx-2 mt-1 cursor-pointer'
        href='/career'  
      >
        <Button
          variant="text" 
          color={'soft_white'}
          sx={{
            textTransform: 'none',
            fontSize: '20px',
            marginBottom: '-5px'
          }}
        >
          career
        </Button>
      </Link>
      <Link 
        className='mx-2 mt-1 cursor-pointer'
        href='/#contact'
        scroll={false}
      >
        <Button
          variant="text" 
          color={'soft_white'}
          sx={{
            textTransform: 'none',
            fontSize: '20px',
            marginBottom: '-5px'
          }}
        >
          contact
        </Button>
      </Link>
    </div>
  )
}

export default Toolbar
