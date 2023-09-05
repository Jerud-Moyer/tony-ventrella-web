import TypeOut from '@/components/TypeOut'
import Toolbar from '@/components/Toolbar'
import React from 'react'
import careerImages from '../../../data/career-images'
import SlideShow from '@/components/SlideShow'
import SubPageLayout from '@/components/SubPageLayout'

function index() {
  return (
    <div>
      <SubPageLayout 
        typeoutMessage='from the barbershop to the broadcast booth'
      >
        <div className='w-fit block mx-auto'>
          <SlideShow
            slideContent={careerImages}
          />
        </div>
      </SubPageLayout>
    </div>
  )
}

export default index
