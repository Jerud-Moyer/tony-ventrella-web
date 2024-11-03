import Blog from '@/components/Blog'
import React from 'react'

function Index() {


  return (
    <div>
      <Blog 
        blogId={34}
        typeoutMessage='Remembering Tony'
        forRemembrance={true}
      />
    </div>
  )
}

export default Index
