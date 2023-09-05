import SubPageLayout from '@/components/SubPageLayout'
import React from 'react'

function index() {
  return (
    <div>
      <SubPageLayout typeoutMessage='the printed word'>
        <p
          className='text-eerie_black text-3xl text-center'
        >
          Information on books coming soon!
        </p>
      </SubPageLayout>
    </div>
  )
}

export default index
