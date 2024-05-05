import SubPageLayout from '@/components/SubPageLayout'
import Image from 'next/image'
import React from 'react'

function Index() {
  return (
    <div>
      <SubPageLayout typeoutMessage='Steilacoom Talk'>
        <div>
          <p className="text-6xl text-dark_green">
            A big podcast for the small community of Steilacoom, Washington
          </p>
          <p className="text-4xl text-eerie_black">
            hosted by Tony Ventrella
          </p>
          <p className="text-3xl text-eerie_black mt-6">
            So for all things Steilacoom, click below for a listen
          </p>
          <p className='text-2xl text-eerie_black '>And if you want to stay informed don&rsquo;t forget to subscribe!</p>
        </div>
        <div 
          className='pt-16'
        >
          <a 
            href='https://podcasters.spotify.com/pod/show/steilacoom-talk'
            target='blank'  
          >
            <Image 
              width={600}
              height={600}
              src='/images/Steilacoom-Talk.png'
              alt='Steilacoom Washington'
              className='block mx-auto'
            />
          </a>
        </div>
      </SubPageLayout>
    </div>
  )
}

export default Index
