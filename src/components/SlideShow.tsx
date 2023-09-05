import { useInterval } from '@/hooks/useInterval';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Image from 'next/image';
import React, { useState } from 'react'

interface Image {
  title: string;
  caption: string;
}

interface Props {
  slideContent: Image[]
}

function SlideShow({ slideContent }: Props) {
  const [slideIndex, setSlideIndex] = useState<number>(0)
  const defaultInt = 7000
  const [slideInterval, setSlideInterval] = useState<number>(defaultInt)

  useInterval(() => {
    if(slideIndex != null && slideIndex < slideContent.length -1) {
      setSlideIndex(slideIndex + 1)
    } else {
      setSlideIndex(0)
    }
  }, slideInterval)

  const handleAdvance = () => {
    setSlideInterval(0)
    setSlideIndex(curr => {
      if(curr === slideContent.length - 1) {
        return 0
      } else {
        return curr + 1
      }
    })
    setTimeout(() => {
      setSlideInterval(defaultInt)
    }, 500)
  }
  
  const handleRegress = () => {
    setSlideInterval(0)
    setSlideIndex(curr => {
      if(curr === 0) {
        return slideContent.length - 1 
      } else {
        return curr - 1
      }
    })
    setTimeout(() => {
      setSlideInterval(defaultInt)
    }, 500)
  }

  const handlePausePlay = () => {
    if(slideInterval === 0) {
      handleAdvance()
    } else {
      setSlideInterval(0)
    }
  }

  const slides = slideContent.map(({ title, caption }, i) => (
    <div 
      key={`image-${i}`}
      className={`${i === slideIndex ? 'animate-fade block my-auto' : 'hidden'} `}
    >
      <Image 
        alt={caption} 
        src={`/images/${title}`}
        width='500'
        height='500'
        className='mx-auto'
      />
      <p 
        className='text-eerie_black text-center text-2xl'
      >
        { caption }
      </p>
    </div>
  ))

  const indicators = slideContent.map((item, idx)=> (
    <div 
    key={`indicator-${idx}`}
    className={`
      w-2 h-2 rounded-full border-2 border-eerie_black m-2
      ${idx === slideIndex ? 'bg-dark_green' : ''}
    `}
    >
    </div>
  ))

  return (
    <div className='relative h-[700px] flex flex-col items-center'>
      { slides }
      <div className='absolute top-[326px] left-[-75px]'>
        <IconButton  
          aria-label='previous' 
          size='large'
          onClick={handleRegress}
        >
          <ArrowBackIosIcon/>
        </IconButton>
      </div>
      <div className='absolute top-[326px] right-[-75px]'>
        <IconButton  
          aria-label='next' 
          size='large'
          onClick={handleAdvance}
        >
          <ArrowForwardIosIcon/>
        </IconButton>
      </div>
      <div
        className='absolute bottom-[-40px] flex flex-row'
      >
        { indicators }
      </div>
      <div className='absolute bottom-[-96px] right-[226px]'>
        <IconButton  
          aria-label='next' 
          size='large'
          onClick={handlePausePlay}
        >
          {slideInterval === 0 
            ? <PlayCircleOutlineIcon 
                fontSize='large'
              />
            : <PauseCircleOutlineIcon
                fontSize='large'
              />
          }
          </IconButton>
      </div>
    </div>
  )
}

export default SlideShow
