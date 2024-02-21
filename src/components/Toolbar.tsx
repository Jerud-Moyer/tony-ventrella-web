import Link from 'next/link'
import React from 'react'

function Toolbar() {
  return (
    <div 
      className='fixed top-0 w-full flex justify-end px-6 py-4 h-20 bg-dark_green text-soft_white text-xl z-10'
    >
      <Link 
        className='m-3 cursor-pointer'
        href='/'
      >
        speaking
      </Link>
      <Link 
        className='m-3 cursor-pointer'
        href='/the-good-we-do'
      >
        the good we do
      </Link>
      <Link 
        className='m-3 cursor-pointer'
        href='/sport-tones'
      >
        sport tones
      </Link>
      <Link 
        className='m-3 cursor-pointer'
        href='/podcast'
      >
        podcast
      </Link>
      <Link 
        className='m-3 cursor-pointer'
        href='/books'  
      >
        books
      </Link>
      <Link 
        className='m-3 cursor-pointer'
        href='/career'  
      >
        career
      </Link>
      <Link 
        className='m-3 cursor-pointer'
        href='/#contact'
        scroll={false}
      >
        contact
      </Link>
    </div>
  )
}

export default Toolbar
