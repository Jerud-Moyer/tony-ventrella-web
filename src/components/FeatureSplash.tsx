import Link from 'next/link'
import React from 'react'

function FeatureSplash() {
  return (
    <div className='invisible md:visible w-screen py-2 px-14 bg-dark_green mt-[270px] lg:mt-60'>
      <p className='text-2xl text-soft_white animate-pop'>
        Check out the brand new podcast here:
        <span className='px-4 hover:text-mint'>
          <Link href='/podcasts/steilacoom-talk'>
            STEILACOOM TALK
          </Link>
        </span>
      </p>
    </div>
  )
}

export default FeatureSplash
