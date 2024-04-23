import Link from 'next/link'
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
    <div className='w-screen bg-eerie_black p-8 relative overflow-hidden flex flex-row items-center justify-center gap-44'>
      <div>
        <div>
          <div 
            ref={titleRef}  
            id='banner_title'
          >
            {showTitle &&
              <div className='good-banner-title text-6xl text-old_gold py-8 animate-rise'>
                The Good We Do
              </div>
            }
          </div>
        </div>
        <div>
          <div className='text-2xl text-soft_white'>
            A new project featuring the best in everyday people.
          </div>
        </div>
      </div>
      <div>
        <Link 
          href={'/the-good-we-do'}
          className='text-mint text-2xl hover:text-dark_green'
        >
          see more here!
        </Link>
      </div>
    </div>
  )
}

export default GoodWeDoBanner
