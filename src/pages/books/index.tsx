import SubPageLayout from '@/components/SubPageLayout'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

function Index() {
  const imageOneRef = useRef(null)
  const [showBooks, setShowBooks] = useState<boolean>(false)

  useEffect(() => {
    if(window !== undefined) {
      const picObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            console.log('intersecting! ', entry)
          } else {  
            console.log('not intersecting ', entry)
          }
        })
      })
      
      if(imageOneRef.current) {
        picObserver.observe(imageOneRef.current)
      }

      setTimeout(() => {
        setShowBooks(true)
      }, 1500)
    }
  }, [imageOneRef])

  return (
    <div>
      <SubPageLayout typeoutMessage='the printed word'>
      <p
          className='font-go_bold text-eerie_black text-6xl text-center mb-24 animate-gold_rush glow'
        >
          New Book Coming Soon!
        </p>
        {showBooks &&
          <>
            <p className="text-eerie_black text-3xl m-12">
              Previous Writings:
            </p>
            <div className="flex flex-row gap-16 flex-wrap justify-around">
              <Image 
                height={400}
                width={400} 
                src='/images/smile-in-the-mirror.jpeg'
                alt='book cover'
                ref={imageOneRef}
                className={`animate-pop`}
              />
              <Image 
                height={400}
                width={400} 
                src='/images/smile-in-the-mirror-3rd.jpeg'
                alt='book cover'
                ref={imageOneRef}
                className={`animate-pop`}
              />
              <Image 
                height={400}
                width={400} 
                src='/images/heres-smiling-at-you.jpeg'
                alt='book cover'
                ref={imageOneRef}
                className={`animate-pop`}
              />
            </div>
          </>
        }
      </SubPageLayout>
    </div>
  )
}

export default Index
