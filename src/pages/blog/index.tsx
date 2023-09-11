import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { blogEntries } from '../../../data/blog-entries'

function blog() { 
  const entries = blogEntries.map((entry, i) => {
    const date = new Date(entry.createdAt).toLocaleDateString()
    const content = entry.content.map((line, i) => (
      <p 
        key={`line-${i}`}
        className='mb-2'  
      >
        {line}
      </p>
    ))
    return (
    <div
      key={`${entry.title}-${i}`}
      className='text-eerie_black'  
    >
      <p className='text-3xl'>{ entry.title }</p>
      <p className='my-4'>{ date }</p>
      <div>
          { ...content }
      </div>
    </div>
    )
  })
  return (
    <div>
      <SubPageLayout typeoutMessage='Sport Tones'>
        <div className=''>
          {...entries}
        </div>
      </SubPageLayout>
    </div>
  )
}

export default blog