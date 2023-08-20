import TypeOut from '@/components/TypeOut'
import Toolbar from '@/components/Toolbar'
import React from 'react'
import careerImages from '../../../data/career-images'
import SlideShow from '@/components/SlideShow'

function index() {
  return (
    <div className='bg-soft_white h-screen'>
      <Toolbar />
      <div className='absolute top-20 w-full h-18 p-6 bg-eerie_black'>
        <TypeOut
          forHome={false}
          text='from the barbershop to the broadcast booth'
        />
      </div>
      <div className='p-16 w-fit block mx-auto'>
        <SlideShow
          slideContent={careerImages}
        />
      </div>
    </div>
  )
}

export default index
