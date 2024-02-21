import React, { useEffect, useRef, useState } from 'react'

function GoodWeDoBanner() {
  const [showTitle, setShowTitle] = useState<boolean>(false)
  const titleRef = useRef(null)

  useEffect(() => {
    if(window !== undefined) {
      const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            setShowTitle(true)
          } else if(!entry.isIntersecting) {
            setShowTitle(false)
          }
        })

      }, {
        rootMargin: '150px',
        threshold: 1
      })

      if(titleRef.current) {
        titleObserver.observe(titleRef.current)
      }
    }
  }, [])

  return (
    <div className='w-screen bg-eerie_black p-8 relative overflow-hidden'>
      <div>
        <div ref={titleRef} id='banner_title'>
          {showTitle &&
            <div className='good-banner-title text-6xl text-old_gold p-8 animate-rise'>
              The Good We Do
            </div>
          }
        </div>
      </div>
      <div>
        <div className='text-2xl'>
          A new project featuring the best in everyday people.
        </div>
      </div>
    </div>
  )
}

export default GoodWeDoBanner
