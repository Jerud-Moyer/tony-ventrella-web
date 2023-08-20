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
      <a className='m-2 cursor-pointer'>podcast</a>
      <a className='m-2 cursor-pointer'>books</a>
      <Link 
        className='m-2 cursor-pointer'
        href='/career'  
      >
        career
      </Link>
      <a className='m-2 cursor-pointer'>contact</a>
    </div>
  )
}

export default Toolbar
