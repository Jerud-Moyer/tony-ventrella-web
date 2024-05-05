import SubPageLayout from '@/components/SubPageLayout'
import Image from 'next/image'
import React from 'react'

function index() {
  return (
    <div>
      <SubPageLayout typeoutMessage="Talking Sports With Tony V">
        <a
          href='https://talkingsportswithtonyv.com/'
          target='blank' 
          className='text-dark_green text-5xl text-center block w-full pointer mb-10'>
          Visit the podcast site!
        </a>

        <div className='flex justify-center'>
          <Image
            src='/images/Talking-Sports-With-Tony-V-Podcast-Cover.jpg'
            alt='talkin sports with Tony V podcast'
            width={800}
            height={800}
          />
        </div>
        {/* <iframe
          src='https://talkingsportswithtonyv.com/'
          className='w-full aspect-[1/1]'
        /> */}
      </SubPageLayout>
    </div>
  )
}

export default index
