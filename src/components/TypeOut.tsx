import { useInterval } from '@/hooks/useInterval';
import React, { useState } from 'react'

interface Props {
  forHome: boolean;
  text: string;
}

function TypeOut({forHome, text}: Props) {
  const [textToDisplay, setTextToDisplay] = useState<string>('')
  const [textInterval, setTextInterval] = useState<number>(150)
  const [textCount, setTextCount] = useState<number>(0) 

  useInterval(() => {
    const letters: string[] = text.split('')
    const limit = letters.length - 1
    setTextToDisplay(() => (`${textToDisplay}${letters[textCount]}`))
    if(textCount >= limit) {
      setTextInterval(0)
    }
    setTextCount(textCount + 1)
  }, textInterval)

  return (
    <div className='flex justify-start'>
      <p 
        className={`name-headline text-old_gold mt-4 ${forHome ? 'text-7xl' : 'text-4xl'}`}
      >
          { textToDisplay }
      </p>
    </div>
  )
}

export default TypeOut
