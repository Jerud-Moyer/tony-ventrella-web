import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

type Props = {
  handler: (string: string) => void,
  stringVal: string
}

function TextEditor({handler, stringVal}: Props) {
  // const [value, setValue] = useState<string>('')

  const ReactQuill = useMemo(() => (
    dynamic(() => import('react-quill'), {ssr: false})
  ), []) 

  // useEffect(() => {
  //   console.log(value)
  // }, [value])
  
  return (
    <div className='text-eerie_black'>
      <ReactQuill 
        theme='snow'
        value={stringVal}
        onChange={(e) => handler(e)}
      />
    </div>
  )
}

export default TextEditor
