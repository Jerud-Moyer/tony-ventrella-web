import { useInterval } from '@/hooks/useInterval'
import React, { useEffect, useState } from 'react'
import quotes from '../../data/quotes'

export default function Hero() {
  const [displayName, setDisplayName] = useState<string>('')
  const [nameInterval, setNameInterval] = useState<number>(150)
  const [nameCount, setNameCount] = useState<number>(0)
  const [quoteIndex, setQuoteIndex] = useState<number>(0)
  const [quote, setQuote] = useState<string>('')
  const [quoteInterval, setQuoteInterval] = useState<number>(0)
  const [showQuote, setShowQuote] = useState<boolean>(false)

  useInterval(() => {
    const fullName: string = 'Tony Ventrella'
    const letters: string[] = fullName.split('')
    const limit = letters.length - 1
    setDisplayName(() => (`${displayName}${letters[nameCount]}`))
    if(nameCount >= limit) {
      setNameInterval(0)
    }
    setNameCount(nameCount + 1)
  }, nameInterval)

  useInterval(() => {
    if(quoteIndex != null) {
      setQuote(quotes[quoteIndex])
    }
    if(quoteIndex != null && quoteIndex < quotes.length -1) {
      setQuoteIndex(quoteIndex + 1)
    } else {
      setQuoteIndex(0)
    }
  }, quoteInterval)

  setTimeout(() => {
    setQuote(quotes[quoteIndex])
    setShowQuote(true)
    setQuoteInterval(4000)
  }, 2500)

  const quoteEls = quotes.map((quote, i) => (
    <p 
      className='text-3xl text-soft_white mt-6 animate-fade'
      key={`quote-${i}`}  
    >
          &quot;{ quote }&quot;
    </p>
  ))

  return (
    <div className='absolute top-20 w-full h-64 p-12 bg-eerie_black'>
      <div className='flex justify-start'>
        <p className='name-headline text-7xl text-old_gold mt-4'>
          { displayName }
        </p>
      </div>
      {showQuote ?
      <div className='flex justify-center mt-4'>
        {quoteEls[quoteIndex]}
        {/* <p className='text-3xl text-soft_white mt-6 animate-fade'>
          &quot;{ quote }&quot;
        </p> */}
      </div>
      : null
      }
    </div>
  )
}
