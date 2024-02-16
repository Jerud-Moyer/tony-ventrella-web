import React, { useEffect, useRef, useState } from 'react'

function PodcastBanner() {
  const [animateA, setAnimateA] = useState<boolean>(false)
  const [animateB, setAnimateB] = useState<boolean>(false)
  const nameARef = useRef(null)
  const nameBRef = useRef(null)


  useEffect(() => {
    if(window !== undefined) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            if(entry.target.id == 'name_a') setAnimateA(true)
            else setAnimateB(true)
          }
          else if(!entry.isIntersecting) {
            console.log('we hit this? => ', animateA)
            if(entry.target.id == 'name_a') {
              console.log('how bout this?')
              setAnimateA(false)
            }
            if(entry.target.id == 'name_b') setAnimateB(false)
          }
        })
      }, {
        rootMargin: '125px',
        threshold: 1
      })
    
      if(nameARef.current) {
        observer.observe(nameARef.current)
      }
      if(nameBRef.current) {
        observer.observe(nameBRef.current)
      }
    }
  }, [])

  return (
    <div className='w-screen bg-eerie_black p-8 relative overflow-hidden'>
      <div ref={nameARef} id='name_a'>
        {animateA &&
          <div className='podcast-name-a text-6xl font-extrabold text-old_gold p-8 animate-rise'>
            TALKING SPORTS WITH
          </div>
        }
      </div>
      <div ref={nameBRef} id='name_b' className=''>
        {animateB &&
          <div 
            className='podcast-name-b -rotate-12 -translate-y-[155px] translate-x-[120px] text-7xl font-extrabold text-old_gold p-8 animate-rise_later'
          >
            Tony V
          </div>
        }
      </div>
      <div className='text-center text-2xl'>
        a fun and informative podcast about sports in the Pacific Northwest and beyond.
      </div>
      <div className='text-center text-2xl'>
        learn more at&nbsp;
        <a 
          className='text-mint'
          href='https://talkingsportswithtonyv.com/'
          target='blank'  
        >
          talkingsportswithtonyv.com
        </a>
      </div>
      
    </div>
  )
}

export default PodcastBanner
