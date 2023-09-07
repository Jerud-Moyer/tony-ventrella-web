import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <div className='h-64 w-full p-10 absolute bottom-0 bg-dark_green'>
      <div className='mt-10 block float-right'>
        <p className='pl-3 text-xl text-soft_white'>connect</p>
        <div className='row'>
          <a 
            className='m-2 inline-block'
            href='https://www.linkedin.com/in/tony-ventrella-55426617/'
            target='blank'
          >
            <Image
              alt='linkedin'
              src='/social-icons/iconmonstr-linkedin-3.svg'
              width='40'
              height='40' 
            />
          </a>
          <a className='m-2 inline-block'>
            <Image
              alt='twitter'
              src='/social-icons/iconmonstr-twitter-3.svg'
              width='40'
              height='40'
            />
          </a>
          <a 
            className='m-2 inline-block'
            href='https://www.instagram.com/tonyventrella/'
            target='blank'
          >
            <Image
              alt='instagram'
              src='/social-icons/iconmonstr-instagram-13.svg'
              width='40'
              height='40'
            />
          </a>
          <a 
            className='m-2 inline-block'
            href='https://www.facebook.com/tony.ventrella.7'
            target='blank'
          >
            <Image
              alt='facebook'
              src='/social-icons/iconmonstr-facebook-3.svg'
              width='40'
              height='40'
            />
          </a>
          <a 
            className='m-2 inline-block' 
            href='https://www.youtube.com/results?search_query=tony+ventrella'
            target='blank'
          >
            <Image
              alt='youtube'
              src='/social-icons/iconmonstr-youtube-8.svg'
              width='40'
              height='40'
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
