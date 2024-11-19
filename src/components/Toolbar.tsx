import { Button, Menu, MenuItem, Drawer, IconButton } from '@mui/material'
import Link from 'next/link'
import React, { MouseEvent, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

function Toolbar() {
  const [mobileMenuOpen, setMobilemenuOpen] = useState<boolean>(false)
  const [podMenuAnchor, setPodMenuAnchor] = useState<null | HTMLElement>(null)
  const podMenuOpen = Boolean(podMenuAnchor)
  
  const handleOpenPodMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setPodMenuAnchor(e.currentTarget)
  }

  const handlePodMenuClose = () => {
    setPodMenuAnchor(null)
  }

  const handleToggleMobileMenu = (bool: boolean): void => {
    setMobilemenuOpen(bool)
  }

  const mobileMenuContent = (
    <div className='flex flex-col'>
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
          className='mx-2 mt-2 cursor-pointer'
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
            maxWidth: 'fit-content',
            margin: '0 10px'
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

  const desktopMenuContent = (
    <div className='hidden lg:flex items-center invisible lg:visible'>
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
        className='mx-2 mt-2 cursor-pointer'
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

  return (
    <div 
      className='fixed top-0 w-full flex justify-end items-center px-6 py-4 h-20 bg-dark_green text-soft_white text-xl z-10'
    >
      <div className='visible lg:invisible'>
        <IconButton
          onClick={() => handleToggleMobileMenu(true)}
          color='soft_white'  
        >
          <MenuIcon 
            sx={{
              fontSize: 40
            }}
          />
        </IconButton>
        <Drawer
          open={mobileMenuOpen}
          onClose={() => handleToggleMobileMenu(false)}
        >
          <div className='h-full bg-dark_green flex-col'>
            {mobileMenuContent}
          </div>
        </Drawer>
      </div>
      {desktopMenuContent}
    </div>
  )
}

export default Toolbar
