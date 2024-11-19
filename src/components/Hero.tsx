import { useInterval } from '@/hooks/useInterval'
import React, { useState } from 'react'
import quotes from '../../data/quotes'
import TypeOut from './TypeOut'

interface Quote {
  content: string,
  author: string
}

export default function Hero() {
  const [quoteIndex, setQuoteIndex] = useState<number>(0)
  const [quoteInterval, setQuoteInterval] = useState<number>(0)
  const [showQuote, setShowQuote] = useState<boolean>(false)

  useInterval(() => {
    if(quoteIndex != null && quoteIndex < quotes.length -1) {
      setQuoteIndex(quoteIndex + 1)
    } else {
      setQuoteIndex(0)
    }
  }, quoteInterval)

  setTimeout(() => {
    setShowQuote(true)
    setQuoteInterval(4000)
  }, 2500)

  const getQuoteSize = (length: number): string => {
    switch (true) {
      case length < 100:
        return 'text-3xl'
      case length < 125:
        return 'text-2xl'
      case length < 300:
        return 'text-xl'
      default:
        return 'text-subtitle3'
    }
  }

  const quoteEls = quotes.map(({ content, author}, i) => (
    <div
      className='animate-fade mx-w-[60%]' 
      key={`quote-${i}`}>
      <p 
        className={`${getQuoteSize(content.length)} text-soft_white text-center mt-6`}
      >
        &quot;{ content }&quot;
      </p>
      <p className='text-subtitle2 text-soft_white text-right mx-4 my-2'>
        { author }
      </p>
    </div>
      
  ))

  return (
    <div className='absolute top-20 w-full h-72 xl:h-64 p-12 bg-eerie_black'>
      <TypeOut
        forHome={true}
        text='Tony Ventrella'
      />
      {showQuote ?
        <div className='invisible lg:visible flex justify-center mt-4'>
          {quoteEls[quoteIndex]}
        </div>
      : null
      }
    </div>
  )
}
