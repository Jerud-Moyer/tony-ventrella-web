import Link from 'next/link'
import React from 'react'

function Toolbar() {
  return (
    <div className='fixed top-0 w-full flex justify-end px-6 py-4 h-20 bg-dark_green text-xl z-10'>
      <Link 
        className='m-2 cursor-pointer'
        href='/'
      >
        speaking
      </Link>
      <Link 
        className='m-2 cursor-pointer'
        href='/podcast'
      >
        podcast
      </Link>
      <Link 
        className='m-2 cursor-pointer'
        href='/books'  
      >
        books
      </Link>
      <Link 
        className='m-2 cursor-pointer'
        href='/career'  
      >
        career
      </Link>
      <Link 
        className='m-2 cursor-pointer'
        href='/#contact'
        scroll={false}
      >
        contact
      </Link>
    </div>
  )
}

export default Toolbar
